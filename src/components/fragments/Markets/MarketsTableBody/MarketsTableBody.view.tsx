import { MarketsTableBodyProps } from './MarketsTableBody.props';
import MarketsTableBodyContent from '../MarketsTableBodyContent';
import './styles.scss';
import { Virtuoso } from 'react-virtuoso';
import CustomShareForm from '../CustomShareForm';

const MarketsTableBodyView: React.FC<MarketsTableBodyProps> = (
  props: MarketsTableBodyProps
) => {
  return (
    <>
      <div className="flex flex-row overflow-y-auto bg-[#F4F4F4] securities-rows h-full">
        <div className="w-full flex flex-col text-white font-din2014">
          {/* Virtualise the list of the securities */}
          <Virtuoso
            ref={props.virtuoso}
            // style={{ height: '100%', direction: 'rtl' }}
            className="prism-scrollbar prism-scrollbar-markets h-full rtl"
            data={props.securityList}
            itemContent={(index, security) => {
              return (
                <>
                  {index === 0 && <CustomShareForm />}
                  {/* The content of each row of security */}
                  <MarketsTableBodyContent
                    index={index}
                    security={security}
                    selectedEtas={props.selectedEtas}
                    key={security.ticker}
                    handleETAClick={props.handleETAClick}
                  />
                </>
              );
            }}
          />
        </div>
      </div>
    </>
  );
};

export default MarketsTableBodyView;
