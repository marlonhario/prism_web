import { ETAApi } from 'common/interfaces/Markets/ETAApi';
import React, { createContext, useState } from 'react';

interface ETAContextProps {
  children: React.ReactNode;
}

const defaultContext = {
  etas: [] as ETAApi[],
  setEtas: (etas: ETAApi[]) => {},
};

const ETAContext = createContext(defaultContext);

const ETAContextProvider: React.FC<ETAContextProps> = (
  props: ETAContextProps
) => {
  const [etas, setEtas] = useState<ETAApi[]>(defaultContext.etas);

  return (
    <ETAContext.Provider
      value={{
        etas,
        setEtas
      }}
    >
      {props.children}
    </ETAContext.Provider>
  );
};

export { ETAContextProvider, ETAContext };
