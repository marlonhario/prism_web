import { PublicPageContentProps } from './PublicPageContent.props';
import './styles.scss';

const PublicPageContentView: React.FC<PublicPageContentProps> = (props: PublicPageContentProps) => {
  return (
    <ol className={props.className}>
      {props.content.map((content, i, arr) => {
        return (
          <li
            key={i}
            className={`text-[27px] font-light mb-5 pb-2 ${
              i < arr.length - 1 ? 'border-b border-black' : ''
            }`}
            ref={el => props.addToContentRef(el)}
          >
            {content.title}
            <div className="public-content text-base mt-2">
              {content.content}
            </div>
          </li>
        );
      })}
    </ol>
  );
};

export default PublicPageContentView;
