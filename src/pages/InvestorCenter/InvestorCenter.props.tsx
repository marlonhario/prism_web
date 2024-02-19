import { PublicPageContent } from 'common/interfaces';
import { Nullable } from 'common/types';
import DIRECTORS from 'common/consts/directors';
import DirectorContent from 'components/articles/About/DirectorContent';

export interface InvestorCenterProps {
  addToContentRef: (el: Nullable<HTMLLIElement>) => void;
  scrollToContent: (index: number) => void;
}

export const INVESTOR_CENTER_MENU: string[] = [
  'Country of incorporation and registration',
  'Description of business',
  'Details of the nominated adviser and other key advisers',
  'Board of Directors',
  'Corporate Governance & Directors’ responsibilities',
  'Share Information',
  'Investor and Shareholder Documents',
  'Investor Contacts',
];

const SHARE_INFO = [
  {
    first: 'EPIC/TIDM Symbol',
    second: 'PGGP'
  },
  {
    first: 'SEDOL',
    second: 'B4JXWP66',
  },
  {
    first: 'ISIN',
    second: 'GB00B4JXWP66',
  },
  {
    first: 'Bloomberg symbol',
    second: 'XXX',
  },
  {
    first: 'Reuters',
    second: 'XXXX',
  },
  {
    first: 'Currency',
    second: 'GBP',
  },
  {
    first: 'Par value',
    second: '30 pence',
  },
  {
    first: 'Exchange listed',
    second: 'London',
  },
];

export const INVESTOR_CENTER_CONTENT: PublicPageContent[] = [
  {
    title: 'Country of incorporation and registration',
    content: (
      <p>
        Prism Global Group plc is incorporated and registered in England and
        Wales (registration number: 05289187). Its main country of operation is
        the [Australia/United Kingdom].  [PGGP] is subject to the UK City Code
        on Takeovers and Mergers.
      </p>
    ),
  },
  {
    title: 'Description of business',
    content: (
      <>
        <p>
          Prism has created a unique financial infrastructure, enabling the
          separation of income and growth of an individual share, while
          simultaneously offering investors the opportunity to realign the risk
          and reward components.
        </p>
        <p className="font-bold !mb-[5px]">
          These separate components (known as Prism Allocations) are offered in
          two different forms:{' '}
        </p>
        <p className="!mb-[5px]">- Prism Exchange Traded Allocations (ETAs) </p>
        <p>- Prism Off-Market Allocations (POAs)</p>
        <p className="font-bold !mb-[5px]">
          Prism Allocations allow investors to:{' '}
        </p>
        <p className="!mb-[5px]">- Amplify yield </p>
        <p className="!mb-[5px]">- Accelerate growth </p>
        <p className="!mb-[5px]">- Realign risk </p>
        <p>- Unlock value </p>
        <p className="font-bold !mb-[5px]">Australia </p>
        <p className="!mb-[5px]">Level 14 </p>
        <p className="!mb-[5px]">167 Macquarie St </p>
        <p className="!mb-[5px]">Sydney NSW 2000 </p>
        <p>Australia </p>
        <p className="font-bold !mb-[5px]">United Kingdom </p>
        <p className="!mb-[5px]">50 Jermyn Street </p>
        <p className="!mb-[5px]">London </p>
        <p>SW1Y 6LX </p>
        <p className="!mb-[5px]">25 Old Broad Street </p>
        <p className="!mb-[5px]">London </p>
        <p className="!mb-[5px]">SW1Y 6LX </p>
        <p>EC2N 1HQ </p>
      </>
    ),
  },
  {
    title: 'Details of the nominated adviser and other key advisers',
    content: (
      <>
        <p className="font-bold !mb-[5px]">
          Independent auditors: <span className="font-light">[TBC]</span>
        </p>
        <p className="font-bold !mb-[5px]">
          Broker: <span className="font-light">[TBC]</span>
        </p>
        <p className="font-bold !mb-[5px]">
          Analysts: <span className="font-light">[TBC]</span>
        </p>
        <p className="font-bold !mb-[5px]">
          Legal advisers:{' '}
          <span className="font-light">
            Baker & McKenzie, 100 New Bridge Street London EC4V 6JA United
            Kingdom and Tower One – International Towers Sydney, Level 46, 100
            Barangaroo Avenue Sydney NSW 2000 Australia{' '}
          </span>
        </p>
        <p className="font-bold !mb-[5px]">
          Principal Bankers: <span className="font-light">[TBC]</span>
        </p>
        <p className="font-bold !mb-[5px]">
          Registrars:{' '}
          <span className="font-light">
            Computershare Investor Services Pty Limited, Level 3, 60 Carrington
            Street Sydney, NSW, 2000
          </span>
        </p>
        <p className="font-bold !mb-[5px]">
          Communications Consultancy:{' '}
          <span className="font-light">
            Novella Communications Limited, Somerset House, Strand, London WC2R
            1LA{' '}
          </span>
        </p>
        <p className="!mb-[5px] font-light">
          Auditor to Prism (UK): [TBC] [Address]{' '}
        </p>
        <p className="!mb-[5px] font-light">
          (Member of the Institute of Chartered Accountants in England & Wales){' '}
        </p>
        <p className="font-bold !mb-[5px]">
          Auditor to Prism (Australia):{' '}
          <span className="font-light">
            Hall Chadwick. Level 40, 2 Park Street Sydney NSW 2000 Australia
          </span>
        </p>
        <p className="font-bold !mb-[5px]">
          Joint Reporting Accountant:{' '}
          <span className="font-light">
            Crowe U.K. LLP. 55 Ludgate Hill London EC4M 7JW
          </span>
        </p>
        <p className="!mb-[5px] font-light">
          (Member of the Institute of Chartered Accountants in England & Wales){' '}
        </p>
        <p className="font-bold !mb-[5px]">
          Registrar:{' '}
          <span className="font-light">
            Share Registrars Limited. Suite E, First Floor, 9 Lion & Lamb Yard
            Farnham Surrey GU9 7LL
          </span>
        </p>
      </>
    ),
  },
  {
    title: 'Board of Directors',
    content: (
      <>
        <p>About PGG: The board of Directors</p>
        <p>
          The Board is responsible for directing, providing appropriate advice,
          and supervising the Company's business strategy, and is responsible to
          shareholders for the Group's financial and operational performance as
          well as its risk management. The Board delegates the development and
          implementation of Group strategy and day-to-day management issues to
          the Executive Directors.
        </p>
        <p>
          The Board is made up of three Executive Directors, and four
          Non-executive Directors. The Board considers that the Non-executive
          Directors bring an independent judgement to bear, and is satisfied
          that between the Directors, it has an effective and appropriate
          balance of independence on the one hand, and knowledge of the Company
          on the other, to enable it to discharge its duties and
          responsibilities effectively.
        </p>
        {DIRECTORS.map((director, index) => {
          return (
            <div className="mb-20" key={index}>
              <h3 className="text-[#ffffff7a] text-[23px] mb-0">
                {director.position}
              </h3>
              <h3 className="text-white text-[23px] mb-10">{director.name}</h3>
              <DirectorContent
                name={director.name}
                imageSource={director.imageSource}
                expanded={true}
                summary={director.summary}
                contentWidth="w-full"
              />
            </div>
          );
        })}
      </>
    ),
  },
  {
    title: 'Corporate Governance & Directors’ responsibilities',
    content: (
      <>
        <p>
          PGGP is committed to high standards of corporate governance throughout
          the Group. The Board recognises the importance of, and is committed
          to, ensuring that effective corporate governance procedures are in
          place as appropriate for a public Company of its size and complexity
          and in the light of the risks and challenges it faces. PGGP has
          adopted{' '}
          <span className="font-bold">The QCA Corporate Governance Code</span>.
          The s ction below sets out to explain how PGGP seeks to apply the
          principles of the QCA Corporate Governance Code and how its
          application supports the Group's medium- to long-term success.
        </p>
        <p className="font-bold">
          Establish a strategy and business model which promote long-term value
          for shareholders
        </p>
        <p>
          PGGP has developed a financial infrastructure that enables, through
          the Prism Global algorithm, the separation of income, growth and the
          realignment of risk and reward from individual shares. These separate
          components will be individually tradeable securities on a recognised
          exchange and known as Exchange Traded Allocations or ETAs.
        </p>
        <p>
          PGGP intends to launch multiple series listed of ETAs across global
          markets, starting with ETAs covering Australian and UK-listed shares,
          with the ETAs trading on Cboe and the London Stock Exchange, before
          expanding to European and US markets. PGGP also offers bespoke OTC
          products for institutional and wholesale investors.
        </p>
        <p>
          The Board believes there is a strong and growing market for PGGP's
          products, and the recent listing should enable the Company to:
        </p>
        <ul className="list-disc list-outside ml-7">
          <li>
            enhance its profile and activities, thereby helping it to attract
            new partners, brokers and investors;
          </li>
          <li>
            recruit and retain appropriately skilled staff by offering
            attractive packages including equity incentives; and{' '}
          </li>
          <li>
            to access further funding through capital markets for future organic
            development{' '}
          </li>
        </ul>
        <p>
          PGGP has a strategy of developing local applications of its ETAs in
          the major global securities markets in a form which meets domestic
          regulatory requirements. It also intends to develop variations of its
          product suite, in response to market demand. The Group will use the
          full spectrum of distribution channels and marketing resources to
          achieve strong sales in each market, whilst building a strong base of
          Assets Under Allocation (AUA), which will provide recurring income
          over the life of the products.{' '}
        </p>
        <p className="font-bold">
          Seek to understand and meet shareholder needs and expectations
        </p>
        <p>
          The Directors seek to build on a mutual understanding of objectives
          between PGGP and its shareholders by meeting to discuss long-term
          issues and receive feedback, communicating regularly throughout the
          year and issuing trading updates as appropriate.
        </p>
        <p>
          The CEO and CFO meet with major shareholders and present to analysts
          after the full-year and interim results announcements, as well as
          regularly throughout the year. From time to time, the Company will
          organise ‘Capital Market Days’ to provide further opportunities for
          shareholders and other stakeholders to meet the Board and senior
          management. The Company allows investors to address questions and
          comments to PGGP management through the [website] link on the
          corporate website.
        </p>
        <p>
          The Board also seeks to use the Annual General Meeting to communicate
          with shareholders, and to give them the opportunity to ask questions
          and present their views to the whole Board.
        </p>
        <p className="font-bold">
          Consider wider stakeholder and social responsibilities and their
          implications for long-term success
        </p>
        <p>
          PGGP takes its responsibilities as a corporate citizen seriously. The
          Board’s primary goal is to create shareholder value, but in a
          responsible way which serves all stakeholders.
        </p>
        <p>
          Further information on our Corporate and Social Responsibility
          activities can be found here.
        </p>
        <p className="font-bold">
          Embed effective risk management, considering both opportunities and
          threats, throughout the organisation
        </p>
        <p>
          The Board is responsible for the Group's risk management and
          undertakes a systematic review of the key risks and uncertainties
          which the Group faces. It seeks to embed risk management and to
          facilitate the implementation of risk management measures throughout
          the Group’s businesses, and to ensure that all acquired operations are
          speedily integrated with Group best practice.
        </p>
        <p>
          The Audit Committee assists the Board in reviewing the systems of
          internal control. The Board and Group approach to risk is set out in
          the Audit Committee report and the most recent ‘Principal Risks and
          Uncertainties’ are identified in the Annual Report for the year ended
          31st December 2021.
        </p>
        <p>
          A comprehensive risk register was developed in XXXX which is reviewed
          at regular intervals by a committee represented by operational,
          financial and legal management. As a result of these reviews,
          mitigating actions are proposed, implemented and their effectiveness
          regularly monitored.
        </p>
        <p>
          The Audit Committee formally review the work of the Risk Management
          Committee on an annual basis.
        </p>
        <p className="font-bold">
          Maintain the Board as a well-functioning, balanced team led by the
          Chairman
        </p>
        <p>
          The Chairman is responsible for the effective management of the Board.
          The composition and effectiveness of the Board is reviewed regularly.
        </p>
        <p>
          With effect from XXX, a ‘Board Effectiveness Review’ will be completed
          annually by the Remuneration Committee, and the results will be
          debated at the appropriate Board meeting. This review includes an
          assessment of whether the Board has functioned in compliance with this
          principle through assessing, inter alia, Directors' level of skills
          and experience, the Board's performance, review of Company strategy,
          and the quantity and quality of Board meetings.
        </p>
        <p className="font-bold">
          Ensure that between them the Directors have the necessary up-to-date
          experience, skills and capabilities
        </p>
        <p>
          This is part of the ‘Board Effectiveness Review’ outlined above. A
          summary of the experience, skills and capabilities of each of the
          Board of Directors can be found here.
        </p>
        <p className="font-bold">
          Evaluate Board performance based on clear and relevant objectives,
          seeking continuous improvement
        </p>
        <p>This is part of the “Board Effectiveness Review” outlined above. </p>
        <p className="font-bold">
          Promote a corporate culture that is based on ethical values and
          behaviours
        </p>
        <p>
          The Board recognises that its prime responsibility is to promote the
          success of the Group for the benefit of its members as a whole. The
          Board also understands that it has a responsibility towards employees,
          partners, customers and suppliers. The Group has a strong ethical
          culture, always challenging itself to improve and always seeking to
          meet or exceed the expectations of employees, partners, customers,
          suppliers and shareholders.
        </p>
        <p>
          To continue its success, and to fulfil its ambition to remain the
          global leader in technology-driven workplace learning and talent
          management solution, the Board recognises that it is vital to continue
          attracting and retaining the best talent. To do this, PGGP works hard
          to create an environment in which employees at all levels can thrive,
          develop and achieve their ambitions, but to do so in ways that first
          and foremost promotes the Group's values of honesty, trust, loyalty
          and working together, with a healthy balance of competition and
          cooperation.
        </p>
        <p>
          The Group has an anti-bribery policy which each of its businesses has
          implemented, in addition to adequate procedures to prevent bribery as
          described by the Bribery Act 2010. The Group also has in place a
          Whistleblowing policy.
        </p>
        <p className="font-bold">
          Maintain governance structures and processes that are fit for purpose
          and support good decision-making by the Board
        </p>
        <p>
          The Board as a whole is responsible for directing, providing
          appropriate advice, and supervising the Company's business strategy,
          and is responsible to shareholders for the Group's financial and
          operational performance, as well as its risk management. The Board
          delegates the development and implementation of Group strategy and
          day-to-day management issues to the Executive Directors. The Board
          reviews and approves the Group's strategy, budgets and corporate
          actions.
        </p>
        <p>
          High-level strategic decisions are discussed and taken by the full
          Board. Investment decisions (above a de minimis level) are taken by
          the full Board. Operational decisions are taken by the Managing
          Directors within the framework approved in the annual financial plan
          and within a framework of Board-approved authorisation levels.
        </p>
        <p>
          The Board regulations define a framework of high-level authorities
          that maps the structure of delegation below Board level, as well as
          specifying issues which remain within the Board's preserve. The Board
          typically meets at least ten times a year to consider a formal
          schedule of matters, including the operating performance of the
          business, and to review PGGP's financial plan and business model.
        </p>
        <p>
          The Board is made up of three Executive Directors, and four
          Non-Executive Directors. The Board considers that the Non-Executive
          Directors bring an independent judgement to bear, and is satisfied
          that between the Directors, it has an effective and appropriate
          balance of independence on the one hand, and knowledge of the Company
          on the other, to enable it to discharge its duties and
          responsibilities effectively.
        </p>
        <p>
          All Directors have access to the advice and services of the Company
          Secretary and other independent professional advisers as required. The
          Company Secretary role is performed by the Chief Financial Officer,
          who is also an Executive Director. The Company Secretary is assisted
          by an in-house legal department and outside advisers in fulfilling his
          responsibilities. Non-Executive Directors have access to key members
          of staff and are entitled to attend management meetings in order to
          familiarise themselves with all aspects of PGGP.
        </p>
        <p>
          It is the responsibility of the Chairman and the Company Secretary to
          ensure that Board members receive sufficient and timely information
          regarding corporate and business issues to enable them to discharge
          their duties.
        </p>
        <p>
          The number of Board and Committee meetings held, together with the
          attendance record of each Director, is provided in the Company's
          Annual Reports.
        </p>
        <p>
          The Company has established an Audit Committee and a Remuneration
          Committee with effect from Admission. Details of the committees are
          set out below.{' '}
        </p>
        <p className="!mb-[5px]">Audit Committee</p>
        <p>
          The Company has established an Audit Committee, comprising XXXXX and
          XXXX. The Audit Committee is chaired by XXXXX and meets at least twice
          each year. The Committee's responsibilities include ensuring that
          appropriate financial reporting procedures are properly maintained and
          reported on, and meeting with the Company's auditors and reviewing
          their reports and accounts and the Company's internal controls.
        </p>
        <p className="!mb-[5px]">Remuneration Committee</p>
        <p>
          The Company has established a Remuneration Committee, comprising XXXXX
          and XXXXX. The Remuneration Committee is chaired by XXXXX and meets at
          least twice each year. The Remuneration Committee's responsibilities
          include reviewing the performance of the Executive Directors, setting
          their remuneration levels, determining the payment of bonuses and
          considering the grant of options under the share option schemes.
        </p>
        <p className="font-bold">
          Communicate how the Company is governed and is performing by
          maintaining a dialogue with shareholders and other relevant
          stakeholders
        </p>
        <p>
          The compliance with this principle has been addressed through regular
          meetings with investors, and regular staff and other stakeholder
          meetings as outlined above.
        </p>
        <p>
          Details of the{' '}
          <span className="underline">
            corporate governance code that the company has decided to apply
          </span>{' '}
           together with details of compliance with that code.
        </p>
        <ul className="list-disc list-outside ml-7 mb-[15px]">
          <li>
            The Board recognises the value of good governance and complies with
            the provisions of the QCA Guidelines insofar as possible for a
            company of the size and nature of the Company.
          </li>
        </ul>
        <p>Details of other listings or trading platforms:</p>
        <ul className="list-disc list-outside ml-7">
          <li>
            Prism Global Group plc is listed solely on the Standard List Segment
            of the Main Market of the London Stock Exchange.
          </li>
          <li>
            The company is subject to the UK City Code on Takeovers and Mergers.
          </li>
        </ul>
      </>
    ),
  },
  {
    title: 'Share Information',
    content: (
      <>
        <ul className="list-disc list-outside ml-7 mb-10">
          <li>Number of securities in issue</li>
          <li>Percentage of securities not in public hand</li>
          <li>List of significant shareholders.</li>
          <li>Table eg:</li>
        </ul>
        <table className="w-2/5 ml-3 mb-10">
          <thead>
            <tr>
              <th className="w-1/2"></th>
              <th className="w-1/2 font-light text-[#343741]">
                Ordinary Share
              </th>
            </tr>
          </thead>
          <tbody>
            {SHARE_INFO.map((info, i) => {
              return (
                <tr
                  className={`${
                    i % 2 === 0 ? 'bg-[#C0C1C6]' : 'bg-[#C0C1C6B2]'
                  }`}
                  key={i}
                >
                  <td className="font-bold pl-[18px] border-r border-[#474C55]">
                    {info.first}
                  </td>
                  <td className="pl-[18px]">{info.second}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <p className="!mb-[5px]">Market Data - Share Price</p>
        <ul className="list-disc list-outside ml-7">
          <li>Share Price Graph</li>
          <li>Trading Volumes</li>
        </ul>
      </>
    ),
  },
  {
    title: 'Investor and Shareholder Documents',
    content: (
      <ul className="list-disc list-outside ml-7">
        <li>Articles of association</li>
        <li>Latest Annual Report and all other financial reports published</li>
        <li>Press Releases</li>
        <li>Shareholder Circulars and documentation</li>
        <li>Other news</li>
      </ul>
    ),
  },
  {
    title: 'Investor Contacts',
    content: (
      <ul className="list-disc list-outside ml-7">
        <li>Name of IR person</li>
        <li>Email of IR person</li>
      </ul>
    ),
  },
];
