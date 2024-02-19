import { useSelector } from 'react-redux';
import { Optional } from 'store/types/Optional';
import { fallback } from 'store/utils/Data';
import { AppState } from 'store/state/AppState';

function useSelectorSafe<Value>(
  fn: (optimisticObj: Required<AppState>) => Optional<Value>,
  defaultVal: Value
): Value;

function useSelectorSafe<Value>(
  fn: (optimisticObj: Required<AppState>) => Optional<Value>,
  defaultVal?: undefined
): Optional<Value>;

function useSelectorSafe<Value>(
  fn: (optimisticObj: Required<AppState>) => Optional<Value>,
  defaultVal?: Value
) {
  return useSelector(
    defaultVal !== undefined
      ? fallback<AppState, Value>(fn, defaultVal)
      : fallback<AppState, Optional<Value>>(fn, undefined)
  );
}

export default useSelectorSafe;
