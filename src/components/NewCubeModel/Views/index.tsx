import { useMemo } from 'react';
import classNames from 'classnames';

import { CubeConfig } from '../config';
import { PerspectiveConfigProps, ViewsProps } from '../types';
import styles from './index.module.scss';

export function Views({
  perspective,
  allocations,
  sliderProfile,
  hideViewText,
  customShare,
  onClickCube
}: ViewsProps) {
  /**
   * @returns computed and memoized allocations/distributions 
   * of the cube based on perspective
   */
  const viewsAllocations = useMemo(() => {
    const perspectiveConfig = {
      red: {
        cubeTopView: [
          {
            width: '100%',
            height: '100%',
          },
          {
            position: 'absolute',
            width: '100%',
            height: '100%',
            left: `-${100 - allocations[1]}%`,
            top: `${100 - allocations[1]}%`,
          },
        ],
        cubeRightView: [
          {
            width: '100%',
            height: `${allocations[0]}%`,
          },
          {
            width: '100%',
            height: `${allocations[1]}%`,
          },
        ],
        cubeLeftView: [
          {
            width: '100%',
            height: `${allocations[0]}%`,
          },
          {
            width: '100%',
            height: `${allocations[1]}%`,
          },
        ],
      },
      green: {
        cubeTopView: [
          {
            width: `${allocations[0]}%`,
            height: '100%',
          },
          {
            width: `${allocations[1]}%`,
            height: '100%',
          },
        ],
        cubeRightView: [
          {
            width: `${allocations[0]}%`,
            height: '100%',
          },
          {
            width: `${allocations[1]}%`,
            height: '100%',
          },
        ],
        cubeLeftView: [
          {
            width: '100%',
            height: '100%',
          },
          {
            position: 'absolute',
            width: '100%',
            height: '100%',
            left: `${100 - allocations[1]}%`,
            top: `-${100 - allocations[1]}%`,
          },
        ],
      },
      blue: {
        cubeTopView: [
          {
            width: '100%',
            height: '100%',
          },
          {
            position: 'absolute',
            width: '100%',
            height: '100%',
            left: `-${100 - allocations[1]}%`,
            top: `${100 - allocations[1]}%`,
          },
        ],
        cubeRightView: [
          {
            width: '100%',
            height: `${allocations[0]}%`,
          },
          {
            width: '100%',
            height: `${allocations[1]}%`,
          },
        ],
        cubeLeftView: [
          {
            width: '100%',
            height: `${allocations[0]}%`,
          },
          {
            width: '100%',
            height: `${allocations[1]}%`,
          }
        ]
      },
      purple: {
        cubeTopView: [
          {
            width: '100%',
            height: '100%',
          },
          {
            position: 'absolute',
            width: '100%',
            height: '100%',
            left: `-${100 - allocations[1]}%`,
            top: `${100 - allocations[1]}%`,
          }
        ],
        cubeRightView: [
          {
            width: '100%',
            height: `${allocations[0]}%`,
          },
          {
            width: '100%',
            height: `${allocations[1]}%`,
          }
        ],
        cubeLeftView: [
          {
            width: '100%',
            height: `${allocations[0]}%`,
          },
          {
            width: '100%',
            height: `${allocations[1]}%`,
          }
        ]
      }
    }

    return perspectiveConfig[perspective] as PerspectiveConfigProps;
  }, [perspective, allocations]);

  /**
   * position and render infographic inside the cube (percentage allocation/distribution)
   * @param cubeView CubeView
   * @param index 0-based index of payoff profile
   * @returns 
   */
  const renderViewText = (cubeView: string, index: number) => {
    const allocationConfig =
      CubeConfig.infographics.perspective[perspective].allocation[index];

    if (allocationConfig && allocationConfig.view === cubeView) {
      const { style, property, adjustedPropertyValue = -17 } = allocationConfig;

      const allocationValue = allocations[index];
      const propValue = 180 * (allocationValue / 100) + adjustedPropertyValue;
      const nextPropValue = `${propValue / 2}px`;
      const nextStyle = {
        ...style,
        [property || '']: nextPropValue,
      };

      return (
        <div
          className={styles.viewText}
          style={{
            ...nextStyle,
            display: allocationValue >= 12 ? 'flex' : 'none',
          }}
        >
          <span>{allocations[index]?.toFixed(2)}%</span>
          <span> OF SHARE</span>
        </div>
      );
    }

    return null;
  };

  /**
   * render infographic for custom share
   * @returns 
   */
  const renderCustomShareViewText = () => {
    return (
      <div
        className={styles.customShareViewText}
        onClick={onClickCube}
      >
        <span>{perspective} Perspective</span>

        <span>Click to Adjust Pricing</span>
      </div>
    );
  }

  return (
    <div
      className={classNames(styles.cubeViews, styles[perspective])}
    >
      {CubeConfig.views.map((cubeView, i) => (
        <div
          key={i}
          className={classNames(styles.cubeView, styles[cubeView])}
          onClick={onClickCube}
        >
          {viewsAllocations?.[cubeView].map((allocation, index) => (
            <div
              key={index}
              className={classNames(styles.cubeViewAllocation, sliderProfile && styles[sliderProfile])}
              style={{ ...allocation }}
            >
              {!hideViewText && renderViewText(cubeView, index)}
            </div>
          ))}
        </div>
      ))}

      {(perspective && customShare) && renderCustomShareViewText()}
    </div>
  );
}
