import { tempVerifyAccess } from 'components/common/utils';
import { createContext, useState } from 'react';

interface AuthContextProps {
  children: React.ReactNode;
}

interface AuthContextState {
  isLogin: boolean;
  setIsLogin: (isLogin: boolean) => void;
  showLightbox: (boolean);
  setShowLightbox: (showLightbox: boolean) => void;
}

const defaultContext: AuthContextState = {
  isLogin: tempVerifyAccess(),
  setIsLogin: (isLogin: boolean) => {},
  showLightbox: false,
  setShowLightbox: (showLightbox: boolean) => {},
};

const AuthContext = createContext(defaultContext);

const AuthContextProvider: React.FC<AuthContextProps> = (
  props: AuthContextProps
) => {
  const [isLogin, setIsLogin] = useState(tempVerifyAccess());
  const [showLightbox, setShowLightbox] = useState(false);

  return (
    <AuthContext.Provider value={{ isLogin, setIsLogin, showLightbox, setShowLightbox }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export {AuthContextProvider, AuthContext };
