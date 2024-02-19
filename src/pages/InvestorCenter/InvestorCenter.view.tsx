import PublicPageContent from 'components/fragments/PublicPage/PublicPageContent';
import PublicPageMenu from 'components/fragments/PublicPage/PublicPageMenu';
import { InvestorCenterProps, INVESTOR_CENTER_MENU, INVESTOR_CENTER_CONTENT } from './InvestorCenter.props';
import './styles.scss';

const InvestorCenterView: React.FC<InvestorCenterProps> = (props: InvestorCenterProps) => {
  return (
    <>
      <div className="w-1/5">
        <PublicPageMenu scrollToContent={props.scrollToContent} menu={INVESTOR_CENTER_MENU} title="Investor Centre" />
      </div>
      <div className="investor-center text-white font-light text-base prism-scrollbar about-scrollbar">
        <div className={'w-3/5'}>
          <PublicPageContent addToContentRef={props.addToContentRef} content={INVESTOR_CENTER_CONTENT} className="list-decimal list-inside" />
        </div>
      </div>
    </>
  );
};

export default InvestorCenterView;
