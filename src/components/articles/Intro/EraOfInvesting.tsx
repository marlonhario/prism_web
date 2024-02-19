import React, { useState } from 'react';
import clsx from 'classnames';


const EraOfInvesting = React.forwardRef(
  (
    props: React.HtmlHTMLAttributes<HTMLDivElement>,
    ref: React.Ref<HTMLDivElement>
  ) => {
    const [hideIntro, setHideIntro] = useState(true);

    const handleVideoEnded = () => {
      setHideIntro(false);
    };

    return (
      <div ref={ref} {...props}>
        <div
          className="flex justify-end w-full h-full bg-red-700"
          style={{ maxHeight: 700 }}
        >
          <video
            style={{
              backgroundImage:
                'url(videos/landingPageAnimations_newPerspective_v01-poster-00001.jpg)',
              width: '100%',
              minWidth: 1024,
            }}
            onEnded={handleVideoEnded}
            autoPlay
            muted
          >
            <source
              src="videos/landingPageAnimations_newPerspective_v01-transcode.mp4"
              type="video/mp4"
            />
            <source
              src="videos/landingPageAnimations_newPerspective_v01-transcode.webm"
              type="video/webm"
            />
          </video>
        </div>
        <div
          className="absolute top-0 flex w-full h-full"
          style={{ minWidth: 1024 }}
        >
          <div className="flex h-full" style={{ flex: 1 }} />
          <div
            className="flex flex-col justify-center items-center h-full"
            style={{ flex: 1 }}
          >
            <div className="mb-10">
              <h2
                className={clsx(
                  'font-normal transition-opacity duration-300 ease-in-out',
                  hideIntro ? 'opacity-0' : 'opacity-1'
                )}
              >
                A New
                <br />
                Perspective
                <br />
                A New Era of
                <br />
                Investing
              </h2>
              <p
                className={clsx(
                  'max-w-md font-light text-sm transition-opacity duration-500 ease-in-out',
                  hideIntro ? 'opacity-0' : 'opacity-1'
                )}
              >
                <strong>Introducing Exchange Traded Allocations (ETAs)</strong>
                <br />
                Bought like a share and traded like a share
                <br />
                ETAs allows investors to trade either the
                <br />
                Growth or Dividend component of a share With
                <br />
                six new risk allocations.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default EraOfInvesting;
