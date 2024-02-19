// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useState, useRef, useEffect } from 'react';
import newPerspectives from 'assets/videos/newPerspectives_1200x860_v01.mp4';
import growthDividend from 'assets/videos/growthDividend_1200x860_v01.mp4';
import powerOfConnection from 'assets/videos/powerOfConnection_1200x860_v01.mp4';
import equityRelease from 'assets/videos/equityRelease_1200x860_v01.mp4';
import './Styles.scss';

const HomeAnimation = ({ parentDimension }: any) => {
  const [growthShow, setGrowthShow] = useState<boolean>(false);
  const [powerShow, setPowerShow] = useState<boolean>(false);
  const [equityReleaseShow, setEquityReleaseShow] = useState<boolean>(false);

  /**
   * window size listener for video background
   */
  const inheritDimension = {
    height: parentDimension.height * 0.87,
    width:
      parentDimension.width > 950
        ? parentDimension.width * 0.66
        : parentDimension.width > 800
        ? '100%'
        : 790,
  };

  const fadeRefInvest = useRef();
  const fadeRefGrowth = useRef();
  const fadeRefPower = useRef();
  const fadeRefEquity = useRef();

  const videoProps = [
    {
      ref: fadeRefInvest,
      src: newPerspectives,
      display: true,
      text: ['A New', 'Perspective', 'A New Era', 'of Investing.'],
    },
    {
      ref: fadeRefGrowth,
      src: powerOfConnection,
      display: growthShow,
      text: [
        'Empowering',
        'Investors',
        'with New',
        'Instruments',
        'of Precision.',
      ],
    },
    {
      ref: fadeRefPower,
      src: growthDividend,
      display: powerShow,
      text: [
        'Revealing',
        'New Market',
        'Infrastructure,',
        'Powered by',
        'Connection.',
      ],
    },
    {
      ref: fadeRefEquity,
      src: equityRelease,
      display: equityReleaseShow,

      text: ['Optimisation', 'through', 'Greater Capital', 'Efficiency.'],
    },
  ];

  /**
   * intersecting oberver, if true show growth details
   */
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        setGrowthShow(true);
      }
    });
    observer.observe(fadeRefGrowth.current);
  }, []);

  /**
   * intersecting oberver, if true show power details
   */
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        setPowerShow(true);
      }
    });
    observer.observe(fadeRefPower.current);
  }, []);

  /**
   * intersecting oberver, if true show equity release details
   */
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        setEquityReleaseShow(true);
      }
    });
    observer.observe(fadeRefEquity.current);
  }, []);


  /**
   * background video dimensions property
   */
  const videoDimensions = {
    width: inheritDimension.width,
    maxWidth: inheritDimension.width,
    height: inheritDimension.height,
    maxHeight: inheritDimension.height,
  };

  return (
    <div className="w-full min-h-full home-animation">
      {videoProps.map((item, index) => {
        const subHeader =
          index === 0 ? (
            <>
              <div className="division fade"></div>
              <div className="status fade">Coming Soon</div>
            </>
          ) : (
            ''
          );

        return (
          <div
            className="video-container"
            style={{ height: inheritDimension.height }}
            ref={item.ref}
          >
            <div className="overlay"></div>
            <video
              src={item.src}
              style={videoDimensions}
              autoPlay
              playsInline
              loop={false}
              muted
            />
            <div className="content">
              {item.text.map((text) => (
                <h1 className={`${item.display ? 'fade' : ''}`}>{text}</h1>
              ))}
              {subHeader}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default HomeAnimation;
