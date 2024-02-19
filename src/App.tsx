import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { AuthContextProvider } from 'context/AuthContext';
import StoreConfig from 'store';
// import MobilePlaceholder from 'pages/MobilePlaceholder';

import 'react-reflex/styles.css';
import 'assets/fonts/fonts.css';
import 'styles/tailwind.css';
import 'styles/main.scss';

import PrismRoutes from './PrismRoutes';

function App() {
  return (
    <Provider store={StoreConfig.store}>
      <PersistGate persistor={StoreConfig.persistor}>
        <AuthContextProvider>
          {/* {navigator.userAgent.match(/Android/i) ||
          navigator.userAgent.match(/iPhone/i) ? (
            <MobilePlaceholder />
          ) : ( */}
            <PrismRoutes />
          {/* )} */}
        </AuthContextProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
