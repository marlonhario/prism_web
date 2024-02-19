import { PublicPageContent } from "common/interfaces";
import { Nullable } from "common/types";

export interface PrivacyProps {
    addToContentRef: (el: Nullable<HTMLLIElement>) => void;
    scrollToContent: (index: number) => void;
}

export const PRIVACY_MENU:string[] = [
    'Privacy and your rights',
    'Collection of personal information',
    'Use and disclosure of personal information',
    'The prism website',
    'Security of personal information',
    'Accessing and updating personal information',
    'Complaints',
    'Contact us',
    'Maintenance and acceptance of our privacy policy'
]

export const PRIVACY_CONTENT: PublicPageContent[] = [
    {
      title: 'Privacy and your rights',
      content: (
        <p>
          Prism Global Group Ltd (“Prism”, “we” or “us”) is a financial services
          company that specialises in the creation, management and marketing of
          fractional shares. Our customers and investors are entitled to expect
          that we will treat any information provided by them within the terms of
          relevant privacy responsibilities. This includes Australian Commonwealth
          Government legislation in relation to privacy. This policy sets out how
          Prism collects and uses personal information. We encourage anyone
          reading this policy to refer to the Office of the Australian Information
          Commissioner’s website at www.oaic.gov.au which contains important
          information about privacy laws in Australia.
        </p>
      ),
    },
    {
      title: 'Collection of personal information',
      content: (
        <>
          <p>
            Personal information is information or an opinion that can identify an
            individual or from which the identity of the individual can be
            reasonably ascertained. An individual’s name, address and telephone
            number are examples of personal information.
          </p>
          <p>
            We collect personal information provided by you or your authorised
            intermediaries which is reasonably necessary to:
          </p>
          <ul className="list-disc list-outside ml-7">
            <li>provide you with quality products and services;</li>
            <li>
              do all things necessary to administer, manage, develop and protect
              those products and services;
            </li>
            <li>
              consider applications and approaches which you make to us; and
            </li>
            <li>maintain your contact details.</li>
          </ul>
          <p>
            When Prism provides you with products and services, we may need to
            collect certain information from you. The type of personal information
            which we collect will depend upon the dealings which you have with
            Prism and may include:
          </p>
          <ul className="list-disc list-outside ml-7">
            <li>name;</li>
            <li>address;</li>
            <li>email address;</li>
            <li>telephone number;</li>
            <li>age or birth date;</li>
            <li>profession, occupation or job title;</li>
            <li>employer details;</li>
            <li>social media profiles;</li>
            <li>
              any additional information relating to you that is provided to us
              directly (including through our website) or indirectly through the
              use of third party intermediaries, including marketing contractors,
              third party websites, portals and registries; and
            </li>
            <li>
              information you provide to us through our service centre, customer
              surveys, web forms or visits by our representatives from time to
              time.
            </li>
          </ul>
          <p className="!font-bold">Consequences if information not provided</p>
          <p>
            When we ask you to provide us with personal information, if you do not
            provide us with that information or if that information is incomplete
            or inaccurate, it may:
          </p>
          <ol>
            <li>prevent us from providing our products and services to you;</li>
            <li>
              limit our ability to provide you with the level of service which you
              would normally expect from us; or
            </li>
            <li>prevent us from being able to contact you.</li>
          </ol>
          <p className="!font-bold">Sensitive information</p>
          <p>
            We only collect sensitive information about you with your consent or
            otherwise in accordance with the law in relation to the services we
            provide. Sensitive information also includes information or opinion
            relating to:
          </p>
          <p>racial or ethnic origin;</p>
          <p>political opinions;</p>
          <p>membership of a political association;</p>
          <p>religious beliefs or affiliations;</p>
          <p>philosophical beliefs;</p>
          <p>sexual preferences or practices;</p>
          <p>criminal convictions; or</p>
          <p>membership of a professional or trade association.</p>
          <p className="!font-bold">Indirect collection of information</p>
          <p>
            We generally try to collect personal information directly from you or
            through authorised intermediaries. This may include service providers
            that assist us in the provision of products and services.
          </p>
        </>
      ),
    },
    {
      title: 'Use and disclosure of personal information',
      content: (
        <>
          <p>
            Personal information which is collected by Prism is generally used and
            disclosed for the main purpose for which the information was collected
            or for related purposes, which would be within your reasonable
            expectations. This may include the following purposes:
          </p>
          <p>
            to provide products and services to you and to send communications
            requested by you;
          </p>
          <p>
            to answer enquiries and provide information or advice about existing
            and new products or services;
          </p>
          <p>
            to conduct business processing functions including providing personal
            information to our related bodies corporate, contractors, service
            providers or other third parties;
          </p>
          <p>
            for the administrative, marketing (including direct marketing),
            planning, product or service development, quality control and research
            purposes of Prism, its related bodies corporate, contractors or
            service providers;
          </p>
          <p>
            to provide your updated personal information to our related bodies
            corporate, contractors or service providers;
          </p>
          <p>
            to update our records and keep your contact details up to date; and
          </p>
          <p>to process and respond to any complaint made by you.</p>
          <p>
            We may otherwise use or disclose your personal information where the
            use or disclosure is required or authorised by law (for example,
            disclosure to government regulatory and law enforcement agencies) or
            in emergency situations.
          </p>
          <p>
            If Prism wishes to use or disclose your personal information in other
            circumstances, we will seek your consent to do so.
          </p>
          <p>
            Members of Prism Group may share an individual's personal information
            with their related entities. In this case, the information may only be
            used or disclosed by the related entity for the main purpose for which
            it was collected, for purposes related to the main purpose, where
            required or authorised by law, or for other purposes if the individual
            has consented.
          </p>
          <p>
            Prism does not sell personal information to companies outside Prism
            Group.
          </p>
          <p>
            We may disclose your personal information to our contractors and
            service providers that assist us in the operation of our business or
            the provision of services (for example, an internet service provider,
            mailing house, marketing contractor or providers of any website,
            portal or share registry). Prism requires these organisations to agree
            to comply with this Privacy Policy.
          </p>
          <p>
            If third party service providers are located in countries outside of
            Australia, our agreements with these parties generally include an
            obligation for them to comply with Australian privacy law and our
            Privacy Policy.
          </p>
          <p className="!font-bold">Marketing and Affiliated Support Services</p>
          <p>
            We may send you direct marketing communications and information about
            our or affiliated support services or products that we consider may be
            in your best interests.
          </p>
          <p>
            These communications may be sent in various forms, including email,
            mail, SMS and fax, in accordance with applicable marketing laws. The
            Spam Act 2003 (Cth) restricts the circumstances in which Prism can
            send you commercial electronic messages (including email and SMS text
            messages). Prism may send other advertising material to you where the
            advertising material is related to the purpose for which the personal
            information was collected.
          </p>
          <p>
            You consent to us sending you those direct marketing communications by
            any of the above methods. If you indicate a preference for a
            particular method of communication, we will endeavour to use that
            method wherever practical to do so. If you no longer wish to receive
            such promotional information from Prism, you may advise us in writing.
            Commercial electronic messages from Prism will include information
            about how to contact us, and unsubscribe if required. Prism records
            would normally be amended within 30 days or as otherwise required by
            the Spam Act. Details of how to contact us are set out below.
          </p>
        </>
      ),
    },
    {
      title: 'The Prism Website',
      content: (
        <>
          <p className="!font-bold">Collection of personal information</p>
          <p>
            Personal information may be collected when an individual uses the
            Prism website under the domain name{' '}
            <a href="/">https://www.prism.markets</a>.
          </p>
          <p>
            An individual may visit the Prism website without providing us with
            any personal information. However, we may collect personal information
            about an individual accessing the website if they use the ‘Contact us’
            section of the website.
          </p>
          <p className="!font-bold">Website Security</p>
          <p>
            As with any internet transaction, the transmission of data over the
            internet is not completely secure. While we take reasonable steps to
            protect all the personal information in our possession that we have
            collected via the website in accordance with our general personal
            information management practices to reduce the risk of misuse and loss
            and from unauthorised access, modification or disclosure, we cannot
            guarantee the security of all data submitted to us over the internet.
          </p>
          <p className="!font-bold">Use of cookies and web tracking</p>
          <p>
            Cookies. Cookies are small text files placed in visitors' computer
            browsers. These technologies are used in analyzing trends,
            administering the Site, tracking users' movements around the Site and
            to gather demographic information about our user base as a whole. We
            may receive reports based on the use of these technologies by these
            companies on an individual as well as aggregated basis. Users can
            control the use of cookies at the individual browser level. If you
            reject cookies, you may still use our Site, but your ability to use
            some features or areas of our Site may be limited.
          </p>
          <p>
            Pixel Tags/Web Beacons. A pixel tag (also known as a web beacon) is a
            piece of code embedded on the Site that collects information about
            users’ engagement on that web page. Pixel tags allow us to record, for
            example, that a user has visited a particular web page or clicked on a
            particular advertisement.
          </p>
          <p className="!font-bold">Links</p>
          <p>
            We may, from time to time, include links in the website to the
            websites of other organisations which may be of interest to you. We
            make no representations or warranties in relation to the privacy
            practices of any third party website and we are not responsible for
            the privacy policies or the content of any third party website. Third
            party websites are responsible for informing you about their own
            privacy practices.
          </p>
          <p className="!font-bold">Email</p>
          <p>
            If an individual emails us, the email may contain personal information
            about that individual. We will treat the information in accordance
            with our general personal information management practices outlined in
            this Privacy Policy.
          </p>
          <p className="!font-bold">Third Party Website Service Providers</p>
          <p>
            Where we outsource the development, maintenance and hosting of the
            website to third party service providers. We may disclose personal
            information about an individual to our third party service providers
            so that they can effectively provide these services.
          </p>
        </>
      ),
    },
    {
      title: 'Security of personal information',
      content: (
        <>
          <p>
            We take reasonable steps to protect all of the personal information we
            hold from misuse, loss, unauthorised access, modification or
            disclosure. This protection applies in relation to information stored
            in both electronic and hard copy form.
          </p>
          <p>
            Prism will destroy or permanently de-identify any personal information
            collected which is no longer required.
          </p>
          <p>
            External organisations which provide support services to Prism are
            also required to appropriately safeguard the security of the personal
            information which we provide to them.
          </p>
        </>
      ),
    },
    {
      title: 'Accessing and updating personal information',
      content: (
        <>
          <p>
            You may request access to your personal information or request us to
            correct information which we hold about you. To make a request, please
            put your request in writing using the contact details below. We may
            require proof of your identification before we can provide you with
            access to your personal information.
          </p>
          <p>
            In normal circumstances we will give you full access to the personal
            information which we hold about you. However, in some circumstances,
            we may not be required by law to provide an individual with access to
            or to correct their personal information. If this is the case, you
            will be provided with the reason(s) for our decision.
          </p>
          <p>
            We will normally provide access without charge unless you request
            access to a large volume of personal information, or we have to access
            our archived records to obtain the information. In these
            circumstances, we may impose a fee to recover our reasonable costs.
          </p>
        </>
      ),
    },
    {
      title: 'Complaints',
      content: (
        <>
          <p>
            If you wish to make a privacy complaint, you may contact the Privacy
            Officer using the contact details below. You will need to provide us
            with sufficient details regarding your complaint, as well as any
            supporting evidence and/or information.
          </p>
          <p>
            We will investigate the issue and determine the steps we will
            undertake to resolve your complaint. We will contact you if we require
            any additional information and will notify you in writing of the
            determination of our Privacy Officer. We will aim to ensure that your
            complaint is resolved in a timely and appropriate manner.
          </p>
          <p>
            If you feel that we have not adequately dealt with your complaint, you
            may contact the Australian Privacy Commissioner via{' '}
            <a href="www.oaic.gov.au" target="_blank">
              www.oaic.gov.au.
            </a>
          </p>
        </>
      ),
    },
    {
      title: 'Contact us',
      content: (
        <>
          <p>
            If you have any questions or feedback about this Privacy Policy or
            your personal information, please contact the Company Secretary at:
          </p>
          <p>Privacy Officer</p>
          <p>Prism Global Group</p>
          <p>
            Email:{' '}
            <a href="mailto:privacy@prism.markets">privacy@prism.markets</a>
          </p>
        </>
      ),
    },
    {
      title: 'Maintenance and Acceptance of our Privacy Policy',
      content: (
        <>
          <p className="!mb-5">
            This is the latest Privacy Policy and it replaces any other Privacy
            Policy published by us to date, whether on the website or in hard
            copy. We reserve the right to revise this Privacy Policy from time to
            time and your continued use of our website or services constitutes
            your acceptance of any revised Privacy Policy.
          </p>
          <p>Date: October 2021</p>
        </>
      ),
    },
  ];
  