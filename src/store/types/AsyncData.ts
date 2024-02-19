import { Optional } from 'store/types/Optional';

export enum AsyncStatus {
  INITIAL = 'INITIAL',
  LOADING = 'LOADING',
  COMPLETE = 'COMPLETE',
  ERROR = 'ERROR',
}

export type AsyncData<T> =
  | {
      status: AsyncStatus.INITIAL;
      errors: Record<string, string>;
      data: Optional<T>;
    }
  | {
      status: AsyncStatus.LOADING;
      errors: Record<string, string>;
      data: Optional<T>;
    }
  | {
      status: AsyncStatus.ERROR;
      errors: Record<string, string>;
      data: Optional<T>;
    }
  | {
      status: AsyncStatus.COMPLETE;
      errors: Record<string, string>;
      data: T;
    };
