import { AsyncData, AsyncStatus } from 'store/types/AsyncData';
import { AppErr } from 'store/types/AppErr';
import { Optional } from 'store/types/Optional';

export function asyncData<T>(
  status: AsyncStatus.INITIAL,
  data?: Optional<T>,
  _?: Optional<T>
): AsyncData<T>;
export function asyncData<T>(
  status: AsyncStatus.LOADING,
  data?: Optional<T>,
  _?: Optional<T>
): AsyncData<T>;
export function asyncData<T>(
  status: AsyncStatus.COMPLETE,
  data: T,
  _?: Optional<T>
): AsyncData<T>;
export function asyncData<T>(
  status: AsyncStatus.ERROR,
  errors: AppErr,
  data?: Optional<T>
): AsyncData<T>;
export function asyncData<T>(
  status: AsyncStatus,
  errorsOrData: AppErr | T,
  data?: Optional<T>
): AsyncData<T> {
  // eslint-disable-next-line no-bitwise
  if (status === AsyncStatus.LOADING) {
    return {
      errors: {},
      status: AsyncStatus.LOADING,
      data: errorsOrData as T,
    };
  }
  // eslint-disable-next-line no-bitwise
  if ([AsyncStatus.COMPLETE, AsyncStatus.INITIAL].includes(status)) {
    return {
      errors: {},
      status,
      data: errorsOrData as T,
    };
  }
  return {
    errors: errorsOrData as AppErr,
    status: AsyncStatus.ERROR,
    data,
  };
}
