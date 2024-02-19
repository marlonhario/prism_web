import classNames from 'classnames';

import { CubeConfig } from '../config';
import { CubeModelProps, MainInfographicTypographyComponent } from '../types';
import { Typography } from '../Typography';
import styles from './index.module.scss';

export function Infographics({
  showType,
  perspective,
  etaPairs,
  etaType,
  profile,
  activeEtaType,
  hasActiveSecurity,
  updateCubePercentage,
  onHover,
}: CubeModelProps) {
  const infographics = CubeConfig.infographics.main;

  const onMouseOver = (value: MainInfographicTypographyComponent) => {
    onHover(value.etaType, value.profileType, 'hover');
  };

  const onMouseOut = (value: MainInfographicTypographyComponent) => {
    onHover(undefined, undefined, undefined);
  };

  return (
    <div className={styles.infographics}>
      {Object.entries(infographics)
        .filter((arr) => etaPairs?.includes(arr[1]?.etaType))
        .map(([key, value]) => (
          <div
            key={key}
            data-etatype={value.etaType}
            data-profiletype={value.profileType}
            className={classNames(styles.infographicsContent, styles[key], {
              // show and highlight
              [styles.active]:
                perspective === value.etaType &&
                activeEtaType === value.profileType,
              // show and highlight
              [styles.focus]: profile === value.profileType,
              // show but don't highlight
              [styles.hover]: etaType === value.etaType,
              // show but don't highlight
              [styles.static]:
                perspective === value.etaType &&
                activeEtaType !== value.profileType,
            })}
            onMouseOver={() => onMouseOver(value)}
            onMouseOut={() => onMouseOut(value)}
          >
            <div
              className={styles.infographicComponentWrapper}
              style={{ height: value.height }}
            >
              {((hasActiveSecurity && showType === 'hover') ||
                value.etaType === perspective) && (
                  <Typography
                    {...value}
                    updateCubePercentage={
                      hasActiveSecurity ? updateCubePercentage : undefined
                    }
                  />
                )}
            </div>
          </div>
        ))}
    </div>
  );
}
