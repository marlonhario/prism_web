import { MainContext } from 'context/MainContext';
import { AuthContext } from 'context/AuthContext';
import { useContext, useState } from 'react';
import { LoginModalProps, LoginModalPublicProps } from './LoginModal.props';
import LoginModalView from './LoginModal.view';
import useIsHideLeftPane from 'hooks/useIsHideLeftPane';
import { useNavigate } from 'react-router-dom';
import { EducationTabIndex } from '../EducationTabs';

const LoginModalContainer: React.FC<LoginModalPublicProps> = (
  props: LoginModalPublicProps
) => {
  const [error, setError] = useState(false);
  const [password, setPassword] = useState('');
  const { expand, setExpand } = useContext(MainContext);
  const { setIsLogin, setShowLightbox } = useContext(AuthContext);
  const isHideLeftPane = useIsHideLeftPane(EducationTabIndex.HOME);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const one_day = 8.64e7;
    if (password === 'prism@123') {
      const now = new Date();
      const item = {
        value: 'true',
        expiry: now.getTime() + one_day,
        // expiry: now.getTime() + 60000,
      };

      //store the data that the user is logged in the local storage
      localStorage.setItem('templogin', JSON.stringify(item));
      setError(false);
      setExpand(false);
      props.setShowLogin(false);
      setIsLogin(true);
      !isHideLeftPane && setShowLightbox(true);
      isHideLeftPane && navigate('/perspective?ticker=III');
    } else {
      setError(true);
      setIsLogin(false);
    }
  };

  const combinedProps: LoginModalProps = {
    ...props,
    expand,
    error,
    password,
    setPassword,
    handleLogin,
  };
  return <LoginModalView {...combinedProps} />;
};

export default LoginModalContainer;
