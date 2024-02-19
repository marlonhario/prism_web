import React, { createContext, useState } from 'react';

interface OptimiserContextProps {
  children: React.ReactNode;
}

const defaultContext = {
  step: 0,
  setStep: (step: number) => {},
};

const OptimiserContext = createContext(defaultContext);

const OptimiserContextProvider: React.FC<OptimiserContextProps> = (
  props: OptimiserContextProps
) => {
  const [step, setStep] = useState(
    defaultContext.step
  );

  return (
    <OptimiserContext.Provider
      value={{
        step,
        setStep
      }}
    >
      {props.children}
    </OptimiserContext.Provider>
  );
};

export { OptimiserContextProvider, OptimiserContext };
