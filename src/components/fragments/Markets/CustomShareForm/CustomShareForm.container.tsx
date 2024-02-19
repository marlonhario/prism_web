import { useContext, useState } from 'react';
import CustomShareFormView from './CustomShareForm.view';
import { CustomShareContext } from 'context/CustomShareContext';
import { useNavigate } from 'react-router-dom';
import ROUTES from 'common/consts/routes';
import { isEmpty } from 'lodash';

const CustomShareFormContainer: React.FC = () => {
  const [underlyingShareForm, setUnderlyingShareForm] = useState<number>(100);
  const [dividendYieldForm, setDividendYieldForm] = useState<number>(4);
  const { setUnderlyingShare, setDividendYield, currency, setCurrency } =
    useContext(CustomShareContext);

  const navigate = useNavigate();

  const handleFormRequest = () => {
    if (underlyingShareForm && dividendYieldForm) {
      setUnderlyingShare(underlyingShareForm || 0);
      setDividendYield(dividendYieldForm || 0);
      navigate(ROUTES.CUSTOM_SHARE, { state: { showMarkets: false } });
    }
  };

  return (
    <CustomShareFormView
      currency={currency}
      underlyingShareForm={underlyingShareForm}
      setUnderlyingShareForm={setUnderlyingShareForm}
      dividendYieldForm={dividendYieldForm}
      setCurrency={setCurrency}
      setDividendYieldForm={setDividendYieldForm}
      handleFormRequest={handleFormRequest}
    />
  );
};

export default CustomShareFormContainer;
