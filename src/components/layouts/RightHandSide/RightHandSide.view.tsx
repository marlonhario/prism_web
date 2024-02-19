import { useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { MainContext } from 'context/MainContext';
import { HandSideProps } from 'common/interfaces/LayoutSides';
import { AuthContext } from 'context/AuthContext';
import cn from 'classnames';
import ROUTES from 'common/consts/routes';

const RightHandSideView: React.FC<HandSideProps> = (props: HandSideProps) => {

  const location = useLocation();
  const { expand } = useContext(MainContext);
  const { isLogin } = useContext(AuthContext);

  return (

    <div
      className={`w-${
        expand ? 1 : 2
      }/3 pl-[10px] pane-articles relative h-full  transition-[width] duration-300 ${props.className}`}
      id="right-pane"
    >
      <div className="relative paper h-full max-h-full overflow-hidden">
        <div
          className={cn(
            'absolute top-0 w-full h-full transition-all duration-300',
            location.pathname === ROUTES.CONTACT
              ? 'flex justify-center items-center'
              : '',
            !isLogin ? 'flex flex-row' : ''
          )}
        >
          {/* {props.showContact ? <MapContainer /> : props.children} */}
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default RightHandSideView;
