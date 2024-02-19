import { useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { MainContext } from 'context/MainContext';
import { HandSideProps } from 'common/interfaces/LayoutSides';
import ROUTES from 'common/consts/routes';

const LeftHandSideView: React.FC<HandSideProps> = (props: HandSideProps) => {
  const location = useLocation();
  const { expand, setExpand } = useContext(MainContext);


  return (
    <div
      className={`w-${
        expand ? 2 : 1
      }/3 pr-[10px] relative transition-[width] duration-300 ${props.className}`}
      id={'left-pane'}
    >
      <div className="home-pane relative h-full max-h-full rounded-[15px] shadow-lg overflow-hidden">
        {location.pathname !== ROUTES.OPTIMISER && (
          <div className="slide-control">
            <button
              type="button"
              className={expand ? 'collapse' : ''}
              onClick={() => {
                setExpand(!expand);
              }}
            />
          </div>
        )}
        {props.children}
      </div>
    </div>
  );
};

export default LeftHandSideView;
