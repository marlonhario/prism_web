import {
  MouseEvent,
  ReactNode,
  useEffect,
  useRef,
  useState
} from 'react';
import cn from 'classnames';
import { createPortal } from 'react-dom';

import Typography from '../../Typography';
import { ArrowDownIcon } from '../../Icons';
import './styles.scss';

interface Option {
  id: string;
  name: string;
}

type Props = JSX.IntrinsicElements['div'] & {
  data: Option[];
  selected?: string;
  placeholder?: string;
  isDisabled?: boolean;
  className?: string;
  onChange(id: string): void;
}

const componentName = 'equity-converter-eta-dropdown';

const ETADropdown = (props: Props) => {
  const {
    data,
    selected,
    placeholder,
    isDisabled,
    className,
    onChange,
    ...defaultProps
  } = props;

  const dropdownRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<HTMLDivElement>(null);

  const [optionsStyle, setOptionsStyle] = useState<Object>({});
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleDropdownClickOutside = (event: Event) => {
      if (!dropdownRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    const handleDropdownWheel = (event: Event) => {
      if (!dropdownRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('click', handleDropdownClickOutside);
    document.addEventListener('wheel', handleDropdownWheel);

    return () => {
      document.removeEventListener('click', handleDropdownClickOutside);
      document.removeEventListener('wheel', handleDropdownWheel);
    }
  }, []);

  useEffect(() => {
    const dropdownEl = dropdownRef.current;
    const optionsEl = optionsRef.current;

    if (dropdownEl && optionsEl) {
      const contentRect = dropdownEl.getBoundingClientRect();
      const optionsRect = optionsEl.getBoundingClientRect();
      const commonStyle = {
        left: contentRect.left,
        width: contentRect.width,
        zIndex: 1020
      };
      const totalHeight = (
        contentRect.top +
        contentRect.height +
        optionsRect.height
      );

      if (totalHeight > window.innerHeight) {
        setOptionsStyle((prev) => ({
          ...prev,
          ...commonStyle,
          top: (contentRect.top - 2) - optionsRect.height,
        }));
      } else {
        setOptionsStyle((prev) => ({
          ...prev,
          ...commonStyle,
          top: (contentRect.top + 2) + contentRect.height
        }));
      }
    }
  }, [isOpen]);

  const handleChange = (event: MouseEvent<HTMLSpanElement>, id: string) => {
    if (!isDisabled) {
      event.stopPropagation();

      setIsOpen(false);
      onChange(id);
    }
  }

  const handleDropdownClick = () => {
    if (!isDisabled) {
      setIsOpen((prev) => !prev);
    }
  }

  const renderSelected = () => {
    if (selected) {
      const exists = data.find((item) =>
        item.id === selected);

      return exists?.name;
    }

    return placeholder || 'Please select';
  }

  const renderOptions = () => {
    return (
      data.map((item) => (
        <Typography
          key={item.id}
          fontFamily={'Graphik'}
          fontSize={12}
          fontWeight={400}
          className={cn(`${componentName}-option-item flex items-center px-3 py-1`, {
            [item.id.toLowerCase()]: true
          })}
          style={{
            lineHeight: '16px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase'
          }}
          onClick={(event) => handleChange(event, item.id)}
        >
          {item.name}
        </Typography>
      ))
    );
  }

  const renderToPortal = (el: ReactNode) => {
    return createPortal(el, document.body);
  }

  return (
    <div
      {...defaultProps}
      ref={dropdownRef}
      className={cn(componentName, className, {
        disabled: isDisabled,
        open: isOpen
      })}
      onClick={handleDropdownClick}
    >
      <div className={`${componentName}-selected flex items-center relative`}>
        <Typography
          fontFamily={'Graphik'}
          fontSize={13}
          fontWeight={900}
          className={`${componentName}-selected-text flex-1`}
          style={{
            lineHeight: '18px',
            letterSpacing: '0.2em'
          }}
        >
          {renderSelected()}
        </Typography>

        <span className={`${componentName}-selected-icon flex items-center justify-center bg-white ml-auto`}>
          <ArrowDownIcon />
        </span>
      </div>

      {renderToPortal(
        <div
          ref={optionsRef}
          className={cn(`${componentName}-options flex flex-col fixed`, {
            open: isOpen
          })}
          style={optionsStyle}
        >
          {renderOptions()}
        </div>
      )}
    </div>
  );
}

export default ETADropdown;