import ROUTES from "common/consts/routes";

const CookiesView: React.FC = () => {
  return (
    <>
      <div className="public-top-bar sm:mb-0 w-full sm:w-1/4 ">
        <h1 className="mb-0 disclaimer-header font-normal md:font-extralight text-2xl md:text-5xl text-white">
          Cookies
        </h1>
      </div>
      <div className="w-full sm:w-3/4 mt-10 mb-10 md:mb-0 md:mt-0 px-9 md:px-0 text-white font-light text-base max-w-none sm:max-w-4xl overflow-y-auto prism-scrollbar about-scrollbar">
        <p className="mb-4">
          Our website uses cookies, pixels, pixel tags, tracking links and other
          third-party technologies (known collectively as ‘cookies'). A cookie
          is a small file of data placed by Prism or other third parties (e.g.,
          Google), that we store on your device when you use our website. We use
          cookies to collect data about your browser type, the operating system
          you are using, the web pages you visited, your internet service
          provider and your state location. Our collection and use of this data
          (which may include your Personal Information) through cookies allows
          our servers to recognise your computer when you visit our website in
          the future and helps us improve your user experience and enhance the
          products and services we provide.
        </p>
        <p className="mb-4">
          You can configure your internet browser to accept all cookies, reject
          all cookies or notify you when a cookie is sent. If you refuse the use
          of cookies in this way, you may not be able to access the full
          functionality of our website. Please refer to your internet browser's
          instructions or help screens to learn more about these functions.
        </p>
        <p className="mb-4">
          All information collected via cookies is still governed by our Privacy
          Policy. A copy of our Privacy Policy can be found at: <a href={`${ROUTES.PRIVACY}`} className="text-white hover:text-white">https://www.prism.markets{ROUTES.PRIVACY}</a>
        </p>
      </div>
    </>
  );
};

export default CookiesView;
