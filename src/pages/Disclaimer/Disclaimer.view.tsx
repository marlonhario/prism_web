import './styles.scss';

const Disclaimer: React.FC = () => {
  return (
    <>
      <div className="public-top-bar sm:mb-0 w-full sm:w-1/4 ">
        <h1 className="mb-0 disclaimer-header font-normal md:font-extralight text-2xl md:text-5xl text-white md:text-[#343741]">
          Disclaimer
        </h1>
      </div>
      <div className="w-full sm:w-3/4 mt-10 mb-10 md:mb-0 md:mt-0 px-9 md:px-0 text-white font-light text-base max-w-none sm:max-w-4xl overflow-y-auto prism-scrollbar about-scrollbar">
        <p className="mb-4">
          This disclaimer is for Prism Global Group Ltd (ACN 630 730 415), Prism
          Operations Australia Pty Ltd (ACN 650 476 378) and Prism Securities
          Australia Ltd (ACN 650 488 136) and any other associated entities
          referred to collectively as “Prism”.
        </p>
        <p className="mb-4">
          Prism Operations Australia Pty Ltd is a Corporate Authorised
          Representative (authorised representative number: 1292289) of Sanlam
          Private Wealth Pty Ltd (“Sanlam”) which is the holder of an Australian
          Financial Services Licence (AFS Licence No. 337927). The opinions
          expressed in this website and any accompanying publications and
          documents are those of Prism and are subject to change.
        </p>
        <p className="mb-4">
          Although all information in this website and associated publications
          and documents is obtained from sources believed to be reliable and in
          good faith, no representation of warranty, express or implied is made
          as to its accuracy or completeness. The website, publications and
          documents may not be reproduced, or copies circulated, without prior
          authority from Prism. Unless otherwise expressly stated to the
          contrary, the information on this website is not a recommendation to
          invest in any financial products or services offered by Prism.
        </p>
        <p className="mb-4">
          Unless otherwise expressly stated to the contrary, this website is not
          designed or intended to provide personal financial or investment
          advice. The information, tools and calculators on this website are
          indicative only and are prepared without considering your individual
          objectives, financial situation or needs. You should consider the
          information in light of your own objectives, financial situation and
          needs. You should do this before making an investment decision on the
          basis of any information on this website. To make this assessment, we
          recommend you obtain the assistance of an independent financial
          adviser.
        </p>
      </div>
    </>
  );
};

export default Disclaimer;
