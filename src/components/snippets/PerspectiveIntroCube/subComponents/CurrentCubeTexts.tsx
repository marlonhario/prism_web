import { FC } from 'react';
import IntroCubeTexts, {
  IntroCubeTextsProps,
  PositionTypes,
} from './IntroCubeTexts';
interface Props {
  cubeTexts: IntroCubeTextsProps[];
}
const CubeTexts: FC<Props> = ({ cubeTexts }) => {
  return (
    <div>
      {cubeTexts.map((cube) => (
        <IntroCubeTexts
          key={`${cube.position}-${cube.texts.top}-intro-cube-texts`}
          position={cube.position as PositionTypes}
          texts={cube.texts}
        />
      ))}
    </div>
  );
};

export default CubeTexts;
