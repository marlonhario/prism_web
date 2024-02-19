import ROUTES from 'common/consts/routes';

const EmailView: React.FC = () => {
  return (
  <>
      <div className="public-top-bar sm:mb-0 w-full sm:w-1/4 ">
        <h1 className="mb-0 disclaimer-header font-normal md:font-extralight text-2xl md:text-5xl text-white md:text-[#343741]">
          Email
        </h1>
      </div>

      <div className="w-full sm:w-3/4 mt-10 mb-10 md:mb-0 md:mt-0 px-9 md:px-0 text-white font-light text-base max-w-none sm:max-w-4xl overflow-y-auto prism-scrollbar about-scrollbar">
        <p className="mb-4">
          The below disclaimers are generally applicable to all electronic
          messages that you receive from the following entities:
        </p>
        <p className="mb-4">
          Prism Global Group Ltd (ACN 630 730 415), Prism Operations Australia
          Pty Ltd (ACN 650 476 378) and Prism Securities Australia Ltd (ACN 650
          488 136) and any other associated entities referred to collectively as
          “Prism”.
        </p>
        <p className="mb-4">
          Prism Operations Australia Pty Ltd is as an Corporate Authorised
          Representative (authorised representative number: 1292289) of Sanlam
          Private Wealth Pty Ltd (“Sanlam”) which is the holder of an Australian
          Financial Services Licence (AFS Licence No. 337927).
        </p>
        <h2 className='font-light font-[27px] text-white mb-4'>Financial Product Advice </h2>
        <p className="mb-[5px] font-semibold">General Advice </p>
        <p className="mb-4">
          This email may contain general advice. Any general advice provided has
          been prepared without taking into account your objectives, financial
          situation or needs. Before acting on the information we provide you
          should consider the appropriateness of the information, having regard
          to your objectives, financial situation and needs. You should seek
          personal financial advice before making any financial or investment
          decisions. Where the electronic communication refers to a particular
          financial product, you should obtain a copy of the relevant product
          disclosure statement or offer document before making any decision in
          relation to the product.
        </p>
        <p className="mb-[5px] font-semibold">General Disclaimers </p>
        <p className="mb-4">
          All investment decisions, no matter how well investigated, involve
          risk. While the information provided is believed to be accurate, Prism
          does not accept responsibility for any inaccuracy, or any actions
          taken in reliance upon this information.
        </p>
        <p className="mb-[5px] font-semibold">Privacy Policy </p>
        <p className="mb-4">
          At Prism, the privacy of your personal information is important to us.
          Prism maintains a Privacy Policy to provide you with general
          information about how we collect, store, use and disclose your
          personal information in accordance with the Australian Privacy
          Principles. A copy of our Privacy Policy can be found here:{' '}
          <a href={`${ROUTES.PRIVACY}`} className="text-white hover:text-white">
            https://www.prism.markets{ROUTES.PRIVACY}
          </a>
        </p>
        <p className="mb-4">We retain copies of messages and monitor them.</p>
        <p className="mb-4">
          Prism reserves the right, to the extent permitted by applicable law,
          to monitor electronic communications and store such messages in a
          manner and at a location within Prism's discretion.
        </p>
        <p className="mb-[5px] font-semibold">
          This message is not intended as an official communication.{' '}
        </p>
        <p className="mb-4">
          Unless otherwise agreed, an electronic message is not intended as an
          official document or confirmation, and we do not accept responsibility
          for, or guarantee it to be, accurate, timely, secure, error or
          virus-free. The information in this communication is provided purely
          as an informational courtesy. In the event of a conflict between this
          communication and official communications (i.e., statements,
          confirmations, etc.), the official communication controls.
        </p>
        <p className="mb-[5px] font-semibold">
          Information may not be secure when transmitted over the Internet.
        </p>
        <p className="mb-4">
          Prism makes no representation or warranty that electronic messages
          will be confidential. Electronic messages may be intercepted or
          accessed by unauthorized or unintended parties, may not arrive at the
          intended destination, or may not arrive in the form transmitted.
        </p>
        <p className="mb-4">
          Electronic messages may be delayed, and information in electronic
          messages may not be up to date and may not be updated.
        </p>
        <p className="mb-4">
          Electronic message communications cannot be guaranteed to be timely,
          secure or error free. Information provided speaks only as of its date.
          We have not undertaken, and will not undertake, any duty to update the
          information or otherwise advise you of changes in our opinion or in
          the research or information we make available to you.
        </p>
        <p className="mb-[5px] font-semibold">Employee Securities Trading</p>
        <p className="mb-4">
          Employees and/or associates of Prism may hold one or more of the
          securities that are issued or recommended by Prism.
        </p>
        <p className="mb-[5px] font-semibold">Financial Services Guide </p>
        <p className="mb-4">
          Our Financial Services Guide contains important information about the
          financial services provided by Prism Operations Australia Pty Ltd.
        </p>
        <p className="mb-4">
          Prism Operations Australia Pty Ltd is as an Corporate Authorised
          Representative (authorised representative number: 1292289) of Sanlam
          Private Wealth Pty Ltd (“Sanlam”) which is the holder of an Australian
          Financial Services Licence (AFS Licence No. 337927).{' '}
        </p>
      </div>
      </>
  );
};

export default EmailView;
