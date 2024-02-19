import * as React from 'react';
import cn from 'classnames';
import './styles.scss';

const Transition = ({
  isHorizontal,
  className,
  isOpen,
  children,
  isResetTransitionHeight,
  isMoveFromRight,
}) => {
    return (<div className={cn("transition", className, { "width": isHorizontal, "height": !isHorizontal, "show": isOpen, "reset": isResetTransitionHeight, 'right' : isMoveFromRight })}>
      {children}
    </div>);
};

export default Transition;
