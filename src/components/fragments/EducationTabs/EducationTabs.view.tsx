import React from 'react';
import {
  EducationTabsProps,
} from './EducationTabs.props';

import './EducationTabs.scss';

const EducationTabsView: React.FC<EducationTabsProps> = ({
  children
}: EducationTabsProps) => {
  // const isMobile = useMediaQuery('(max-width: 1024px)');

  return (
    <div className="flex flex-col w-full h-full font-din2014">
      <div className="flex-grow h-full overflow-hidden">
        {children}
      </div>
    </div>
  );
};

export default EducationTabsView;
