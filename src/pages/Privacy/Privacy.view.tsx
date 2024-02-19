import PublicPageContent from 'components/fragments/PublicPage/PublicPageContent';
import PublicPageMenu from 'components/fragments/PublicPage/PublicPageMenu';
import { PrivacyProps, PRIVACY_MENU, PRIVACY_CONTENT } from './Privacy.props';
import './styles.scss';

const PrivacyView: React.FC<PrivacyProps> = (props: PrivacyProps) => {
  return (
    <>
      <div className="w-1/5">
        <PublicPageMenu scrollToContent={props.scrollToContent} menu={PRIVACY_MENU} title="Privacy Policy" />
      </div>
      <div className="privacy w-3/5 text-white font-light text-base overflow-y-auto prism-scrollbar about-scrollbar">
        <PublicPageContent addToContentRef={props.addToContentRef} content={PRIVACY_CONTENT} className="list-decimal list-inside" />
      </div>
    </>
  );
};

export default PrivacyView;