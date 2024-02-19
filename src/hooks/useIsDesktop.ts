import { FIRST_LAYOUT_CHANGE } from 'common/consts/breakpoints';
import useWindowSize from './useWindowSize';

const useIsDesktop = () => {
    const { width } = useWindowSize();
    return width && width >= FIRST_LAYOUT_CHANGE;
}

export default useIsDesktop;