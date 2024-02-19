import { AboutProps } from './About.props';
import DIRECTORS from 'common/consts/directors';
import DirectorHeader from './DirectorHeader';
import DirectorContent from './DirectorContent';
import { Collapse } from 'antd';
import './styles.scss';

const { Panel } = Collapse;

const AboutView: React.FC<AboutProps> = (props: AboutProps) => {
  return (
    <div
      className={`h-full prism-scrollbar about-scrollbar overflow-y-auto overflow-x-hidden ${props.expanded ? 'expand' : ''
        }`}
    >
      <div className={`challenge-section flex flex-col h-full`}>
        <h2
          className={'font-light text-4xl text-white w-fit border-b border-white pb-5 pt-14 mb-5 pl-[87px] text-right'}>
          Innovation
        </h2>
        <p
          className={'text-white w-[234px] font-light ml-[87px] text-base'}
        >
          Prism’s unique innovation brings to the equity markets a suite of
          investment instruments, soon to be available on well-known stock
          exchanges, empowering investors with greater design over their
          portfolios.
        </p>
      </div>
      <div className={`unlock-section flex flex-col items-end h-full`}>
        <h2
          className={'font-light text-4xl text-white w-fit border-b border-white pb-5 pt-14 mb-5 w-[302px] sm:w-[339px]'}>
          Unlock Potential
        </h2>
        <div
          className={'text-white w-[202px] font-light mr-[100px] sm:mr-[137px] text-base'}
        >
          Prism believes in the power of connection to unlock potential,
          providing investors with greater capital efficiency through a whole
          new spectrum of choice.
        </div>
      </div>
      <div
        className={'innovation-section flex flex-col h-full'}
      >
        <h2
          className={'font-light text-4xl text-white w-fit border-b border-white pb-5 pt-14 mb-5 pl-[87px] text-right'}>
          Evolution
        </h2>
        <p
          className={'text-white grow w-[234px] font-light ml-[87px] text-base'}
        >
          Operating within the traditional equities markets, Prism’s unique
          financial infrastructure represents an evolution for global financial
          markets.
        </p>
        {/* <h2 className="font-extralight text-4xl text-white ml-[50px] mb-4">
          Directors
        </h2> */}
      </div>
      {/* <div>
        <Collapse
          className={`directors-collapse ${!props.expanded ? 'not-expanded' : ''}`}
        // ghost={true}
        // bordered={false}
        >
          {DIRECTORS.map((director, index) => (
            <Panel
              style={{
                zIndex: director.zIndex,
              }}
              showArrow={false}
              header={
                <DirectorHeader
                  name={director.name}
                  position={director.position}
                  imageSource={director.imageSource}
                  expanded={props.expanded}
                />
              }
              key={index}

            >
              <DirectorContent
                name={director.name}
                imageSource={director.imageSource}
                expanded={props.expanded}
                summary={director.summary}
                contentWidth="w-auto"
              />
            </Panel>
          ))}
        </Collapse>
      </div> */}
    </div>
  );
};

export default AboutView;
