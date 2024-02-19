import { ETAApi } from 'common/interfaces/Markets/ETAApi';
import { Perspective } from 'components/NewCubeModel';
import { EducationTabIndex } from "components/fragments/EducationTabs";
import React, { createContext, useState } from 'react';

interface MainContextProps {
  children: React.ReactNode;
}

interface MainContextState {
  etaPairs: Perspective[];
  setETAPairs: (arr: Perspective[]) => void;
  expand: boolean;
  setExpand: (expand: boolean) => void;
  etas: ETAApi[];
  setEtas: (etas: ETAApi[]) => void;
  educationTabIndex: EducationTabIndex;
  setEducationTabIndex: (educationTabIndex: EducationTabIndex) => void;

}

const defaultContext: MainContextState = {
  etaPairs: [],
  setETAPairs: (arr: Perspective[]) => { },
  expand: true,
  setExpand: (expand: boolean) => { },
  etas: [] as ETAApi[],
  setEtas: (etas: ETAApi[]) => { },
  educationTabIndex: 0,
  setEducationTabIndex: (educationTabIndex: EducationTabIndex) => { },
};

const MainContext = createContext(defaultContext);

const MainContextProvider: React.FC<MainContextProps> = (
  props: MainContextProps
) => {

  const [etaPairs, setETAPairs] = useState<Perspective[]>([
    'green',
    'red',
    'blue',
    'purple',
  ]);

  const [expand, setExpand] = useState(defaultContext.expand);
  const [etas, setEtas] = useState<ETAApi[]>(defaultContext.etas);
  const [educationTabIndex, setEducationTabIndex] = useState(defaultContext.educationTabIndex);

  return (
    <MainContext.Provider
      value={{
        etaPairs,
        setETAPairs,
        expand,
        setExpand,
        etas,
        setEtas,
        educationTabIndex,
        setEducationTabIndex,
      }}
    >
      {props.children}
    </MainContext.Provider>
  );
};

export { MainContextProvider, MainContext };