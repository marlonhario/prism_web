import { Nullable } from 'common/types';

type TokenState = Nullable<{
  id: number;
  authorization: string;
  expiresIn: number;
}>;

export default TokenState;
