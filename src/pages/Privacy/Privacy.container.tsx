import { Nullable } from 'common/types';
import { useRef } from 'react';
import PrivacyView from './Privacy.view';

const PrivacyContainer: React.FC = () => {
  const contentRef = useRef<Nullable<HTMLLIElement>[]>([]);

  /**
   * @description adds the content elements to the ref for it to be scrollable
   * @param el Content element
   */
  const addToContentRef = (el: Nullable<HTMLLIElement>) => {
    contentRef.current.push(el);
  };

  /**
   * @description scroll the page depending on what menu is clicked in the left side
   * @param index the index of the menu in the left side of the page
   */
  const scrollToContent = (index: number) => {
    contentRef.current[index]?.scrollIntoView({behavior: 'smooth'});
  };

  return (
    <PrivacyView
      addToContentRef={addToContentRef}
      scrollToContent={scrollToContent}
    />
  );
};

export default PrivacyContainer;
