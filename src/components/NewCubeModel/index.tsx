import classNames from 'classnames';

import { EquityOuterCube } from 'pages/EquityOptimiser/components';
import { Allocations, CubeModelProps, Perspective, Profile } from './types';
import { Infographics } from './Infographics';
import { Views } from './Views';
import styles from './index.module.scss';

export function NewCubeModel(props: CubeModelProps) {
  const {
    perspective,
    etaType,
    profile,
    sliderProfile,
    allocations,
    sliderPercentage,
    hasActiveSecurity,
    canView,
    hideViewText,
    hideBackground,
    hideInfoGraphics,
    customShare,
    onClickCube,
    updateCubePercentage,
    onHover,
  } = props;

  const infoGraphicsView = !hideInfoGraphics && (
    <Infographics
      {...props}
      perspective={perspective}
      etaType={etaType}
      profile={profile}
      activeEtaType={sliderProfile}
      hasActiveSecurity={hasActiveSecurity}
      updateCubePercentage={updateCubePercentage}
      onHover={onHover}
    />
  );

  return (
    <div className={styles.cubeModel}>
      <div className={styles.cubePerspective}>
        {canView ? (
          <>
            <Views
              perspective={perspective!}
              allocations={allocations!}
              sliderProfile={sliderProfile}
              sliderPercentage={sliderPercentage}
              hideViewText={hideViewText}
              customShare={customShare}
              onClickCube={onClickCube}
            />

            {infoGraphicsView}
          </>
        ) : (
          infoGraphicsView
        )}
      </div>


      <div className={styles.outerHexagon}>
        <div className={classNames(styles.innerHexagon, {
          '!opacity-0': hideBackground
        })} />

        <div className={`cubemodel-inner-hexagon ${styles.background}`} />

        <div className={`cubemodel-background-hexagon ${styles.overlay}`} />

        <div className={classNames('cubemodel-overlay-hexagon mt-[-63px] opacity-90', {
          '!opacity-0': hideBackground
        })}>
          <EquityOuterCube />
        </div>
      </div>
    </div>
  );
}

export type { Allocations, CubeModelProps, Perspective, Profile };
