import { useState, createContext, useContext, PropsWithChildren } from 'react';

export type PerspectiveSliderStateContext = {
  slider: [number, number];
  setSlider(value: [number, number]): void;
};

const contextDefaultValues: PerspectiveSliderStateContext = {
  slider: [50, 50],
  setSlider: () => { },
};

export const PerspectiveSliderContext =
  createContext<PerspectiveSliderStateContext>(contextDefaultValues);

const { Provider } = PerspectiveSliderContext;

const PerspectiveSliderContextProvider = ({ children }: PropsWithChildren<{}>) => {
  const [slider, setSlider] =
    useState<[number, number]>(contextDefaultValues.slider);

  return (
    <Provider
      value={{
        slider,
        setSlider,
      }}
    >
      {children}
    </Provider>
  );
};

const usePerspectiveSliderContext = () => useContext(PerspectiveSliderContext);

export { PerspectiveSliderContextProvider, usePerspectiveSliderContext };