import classNames from 'classnames';
import { TypographyProps } from '../types';
import styles from './index.module.scss';
import { useContext } from 'react';
import { AuthContext } from 'context/AuthContext';

export function Typography({
  etaType,
  first,
  second,
  superscript,
  profileType,
  style,
  updateCubePercentage,
}: TypographyProps) {
  const { isLogin } = useContext(AuthContext);

  const handleClick = () => {
    updateCubePercentage?.(etaType, profileType);
  };

  return (
    <div
      className={classNames(
        styles.typography,
        !isLogin ? 'invisible' : ''
      )}
      style={style}
      onClick={handleClick}
    >
      <span className={styles.text}>{first}</span>

      <span className={styles.text}>{second}</span>

      <span className={styles.superscript}>{superscript}</span>
    </div>
  );
}
