import React from 'react';
import cn from 'classnames';
import Header from "../Header/";
import Footer from "../Footer/";
import './styles.scss';

  // Main page Component which renders the Header and Footer along with PageContent along with option to ignore Header and footer while rendering
const ContentPage = ({ 
  children, 
  childrenClassName, 
  className, 
  isDarkbackground = true, 
  skipHeader = false, 
  skipFooter = false,
  triggerEquityConverter,
  triggerETAShowCase

 }) => {

  return (
    <div className={cn('flex', className)}>
      <div className={cn('page-content', { 
        "dark-background" : isDarkbackground,
        "white-background": !isDarkbackground
        })}>
        {!skipHeader && (
          <Header triggerEquityConverter={triggerEquityConverter} triggerETAShowCase={triggerETAShowCase}/>
        )}
        <div className={cn(childrenClassName, "page-main pb-12")}>
          { children }
        </div>
        {!skipFooter && (
          <Footer />
        )}
      </div>
    </div>
  );
}

export default ContentPage;