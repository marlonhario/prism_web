import { useRef, useState } from 'react';
import { IntroVideoProps } from './IntroVideo.props';
import { ReactComponent as PlayBtn } from 'assets/lightbox/play-btn.svg';
import { ReactComponent as PauseBtn } from 'assets/lightbox/pause-btn.svg';

const IntroVideoView: React.FC<IntroVideoProps> = (props: IntroVideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const pauseRef = useRef<SVGSVGElement>(null);
  const playRef = useRef<SVGSVGElement>(null);
  const [playing, setPlaying] = useState(false);

  /**
  * @description plays the video if the play button is  clicked
  */
  const playVideo = () => {
    setPlaying(true);
    videoRef.current?.play();
    hidePauseIcon();
  };

  /**
   *@description pauses the video if the pause button is clicked
   */
  const pauseVideo = () => {
    setPlaying(false);
    videoRef.current?.pause();
    hidePlayIcon();
  };

  const showPauseIcon = () => {
    pauseRef.current?.classList.remove('invisible');
    pauseRef.current?.classList.add('visible');
  };

  const hidePauseIcon = () => {
    pauseRef.current?.classList.add('invisible');
    pauseRef.current?.classList.remove('visible');
  };

  const showPlayIcon = () => {
    playRef.current?.classList.remove('invisible');
    playRef.current?.classList.add('visible');
  };

  const hidePlayIcon = () => {
    playRef.current?.classList.add('invisible');
    playRef.current?.classList.remove('visible');
  };

  return (
    <>
      <video
        src={props.src}
        poster={props.thumbnail}
        ref={videoRef}
        className="h-full"
        onMouseEnter={() => (playing ? showPauseIcon() : showPlayIcon())}
        onMouseLeave={() => (playing ? hidePauseIcon() : hidePlayIcon())}
      ></video>
      {playing ? (
        <PauseBtn
          className="absolute cursor-pointer self-center invisible w-10 sm:w-32"
          ref={pauseRef}
          onClick={pauseVideo}
          onMouseEnter={showPauseIcon}
        />
      ) : (
        <PlayBtn
          className="absolute cursor-pointer self-center w-10 sm:w-32"
          onClick={playVideo}
          ref={playRef}
          onMouseEnter={showPlayIcon}
        />
      )}
    </>
  );
};

export default IntroVideoView