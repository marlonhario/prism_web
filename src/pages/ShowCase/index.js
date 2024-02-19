import React from 'react';
import ETAShowCase from 'pages/Perspective';
import PageContent from 'components/common/ContentPage';
import './styles.scss';

// Page Component to render the ETAShowCase Content without the MarketList. This page is available only for testing purpose
const ETACase = () => {
  return (
    <>
      <div className="flex justify-center">
        <PageContent skipFooter={true} skipHeader={true} className="w-full">
          <ETAShowCase className="prism-perspective" />
        </PageContent>
      </div>
    </>
  );
};

export default ETACase;