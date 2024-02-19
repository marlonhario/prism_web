import { BackToTopProps } from './BackToTop.props';
import BackToTopImg from 'assets/svg/back-to-top.svg';

const BackToTopView: React.FC<BackToTopProps> = (props: BackToTopProps) => (
  <div className="flex items-center justify-center w-full bg-[#343741] pt-2">
    <button
      className="bg-[#474C55] pt-1 pb-1.5 px-3 rounded-t-xl"
      onClick={props.handleClick}
    >
      <img src={BackToTopImg} alt="back to top" />
    </button>
  </div>
);

export default BackToTopView;
