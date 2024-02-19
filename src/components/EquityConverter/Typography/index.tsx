import { PropsWithChildren } from 'react';
import cn from 'classnames';
import { kebabCase } from 'lodash';

import './styles.scss';

type Props = JSX.IntrinsicElements['span'] & {
  /**
   * Font family to use.
   * default: 'inherit'.
   */
  fontFamily?: 'Open Sans' | 'Graphik';
  /**
   * Font size to use from 8 to 60 express as px.
   * default: 'inherit'.
   */
  fontSize?: number;
  /**
   * Font weight to use from 100 to 9000.
   * default: 'inherit'.
   */
  fontWeight?: 100
  | 200
  | 300
  | 400
  | 500
  | 600
  | 700
  | 800
  | 900;
  className?: string;
}

const Typography = (props: PropsWithChildren<Props>) => {
  const {
    fontFamily,
    fontWeight,
    fontSize,
    className,
    children,
    ...defaultProps
  } = props;

  return (
    <span
      {...defaultProps}
      className={cn('equity-converter-typography', className, {
        [kebabCase(fontFamily)]: fontFamily,
        [`fs${fontSize}`]: fontSize,
        [`fw${fontWeight}`]: fontWeight
      })}
    >
      {children}
    </span>
  );
}

export default Typography;