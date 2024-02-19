import { CSSProperties } from 'react';

/**
 * color variations of the cube
 */
export type Perspective = 'red' | 'green' | 'blue' | 'purple';

/**
 * payoff profile
 */
export type Profile = 'growth' | 'income';

/**
 * percentage allocation/distribution of payoff profile of the cube
 */
export type Allocations = [number, number];

/**
 * 2d views of the cube
 */
export type CubeViews = 'cubeTopView'
  | 'cubeRightView'
  | 'cubeLeftView';

export interface SliderProps {
  value: number;
  minValue?: number;
  maxValue?: number;
  step?: number;
  /**
   * value to prevennt sliding to max and miin values
   */
  threshold?: number;
  /**
   * additional classnames
   */
  className?: string;
  /**
   * additional main style
   */
  style?: CSSProperties;
  /**
   * additional style for range
   */
  rangeStyle?: CSSProperties;
  /**
   * additional style for track
   */
  trackStyle?: CSSProperties;
  /**
   * additional style for track thumb
   */
  trackThumbStyle?: CSSProperties;
  onChange(value: number): void;
  onMouseDown?(): void;
  onMouseUp?(): void;
}

export interface TypographyProps {
  etaType: Perspective;
  profileType: Profile;
  first: string;
  second: string;
  superscript: string;
  style?: CSSProperties;
  /**
   * update cube percentage base on Perspective
   * @param newEtaType next Perspective
   * @param activeEtaTypeValue current Perspective
   * @param skipResetExpandedETA 
   * @param derivedETAContent 
   * @returns 
   */
  updateCubePercentage?: (
    newEtaType: Perspective | '',
    activeEtaTypeValue: Profile | '',
    skipResetExpandedETA?: boolean,
    derivedETAContent?: any
  ) => void;
}

export interface ViewsProps {
  perspective: Perspective;
  allocations: Allocations;
  sliderProfile?: Profile;
  sliderPercentage: [number, number];
  /**
   * hide percentage text of the cube
   */
  hideViewText?: boolean;
  customShare?: boolean
  onClickCube?(): void;
}

export type MainInfographicSliderComponent = Omit<SliderProps, 'value' | 'onChange'> & {
  component: 'slider';
  sliderEtaType: string;
  allocationIndex: number;
}

export type MainInfographicTypographyComponent = TypographyProps & Omit<TypographyProps, 'updateCubePercentage'> & {
  component: 'typography';
}

/**
 * infographic compoment to be render around the cube
 */
export type MainInfographicComponent = MainInfographicSliderComponent
  | MainInfographicTypographyComponent

/**
 * position of infographic around the cube
 */
export type MainInfographicPosition = 'topRight'
  | 'centerRight'
  | 'bottomRight'
  | 'bottomLeft'
  | 'centerLeft'
  | 'topLeft'
  | 'outerBottomRight'
  | 'outerTopLeft';

export interface AllocationInfographic {
  [prop: number]: {
    view: CubeViews,
    /**
     * position property of box model: top, right, bottom, left
     */
    property?: string,
    /**
     * value of the position property
     */
    adjustedPropertyValue?: number;
    /**
     * additional styles
     */
    style?: CSSProperties;
  };
}

/**
 * infographic around the cube
 */
export type MainInfographic = {
  main: Record<any, MainInfographicComponent>;
  allocation: AllocationInfographic;
}

/**
 * infographic of inside the cube (percentage allocation/distribution of payoff profile of the cube)
 */
export type PerspectiveInfographic = Record<Perspective, MainInfographic>;

/**
 * typography infographic for custom share
 */
export type CustomShareInfographicTypography = Record<Profile, Pick<TypographyProps, 'first' | 'second' | 'superscript'> & { color: string }>;

/**
 * infographic for custom share
 */
export type CustomShareInfographic = Record<Perspective, CustomShareInfographicTypography>;

export interface CubeModelConfigProps {
  views: CubeViews[],
  /**
   * infographics of the cube
   */
  infographics: {
    /**
     * infographics around the cube
     */
    main: Record<MainInfographicPosition, MainInfographicTypographyComponent & { outerGlow?: CSSProperties, height: number; }>;
    perspective: PerspectiveInfographic;
    customShare: CustomShareInfographic;
    sliders: Record<Perspective, any>;
  };
}

export type PerspectiveConfigProps = Record<CubeViews, CSSProperties[]>;

export interface CubeModelProps {
  activeEtaType?: Profile | '',
  perspective?: Perspective;
  etaPairs?: string[];
  etaType?: Perspective | '';
  profile?: Profile;
  sliderProfile?: Profile;
  /**
   * percentage allocation of the cube
   */
  allocations?: Allocations;
  /**
   * percentage allocation of the cube
   */
  sliderPercentage: [number, number];
  /**
   * adjusting slider index
   */
  adjustingIndex?: number;
  /**
   * lock max value of allocations and slider percentage
   */
  isDemo?: boolean;
  /**
   * check if user is authorized
   */
  canView?: boolean;
  /**
   * checck if user has selected any Security
   */
  hasActiveSecurity?: boolean;
  /**
   * hide percentage text of the cube
   */
  hideViewText?: boolean;
  /**
   * hide cube outer background
   */
  hideBackground?: boolean;
  /**
   * hide cube infographics
   */
  hideInfoGraphics?: boolean;
  /**
   * check if view is for custom share
   */
  customShare?: boolean;
  onClickCube?(): void;
  onAllocationsChange(allocations: Allocations, etaType: string): void;
  /**
   * update cube percentage base on Perspective
   * @param newEtaType next Perspective
   * @param activeEtaTypeValue current Perspective
   * @param skipResetExpandedETA 
   * @param derivedETAContent 
   * @returns 
   */
  updateCubePercentage: (
    newEtaType: Perspective | '',
    activeEtaTypeValue: Profile | '',
    skipResetExpandedETA?: boolean,
    derivedETAContent?: any
  ) => void;
  /**
   * hover over effect or light transition
   */
  showType?: 'interval' | 'hover';
  /**
   * transition between hover over effect annd light transition
   * @param etaType perpective of hovered infographic
   * @param profileType payoff profile of hovered infographic
   * @param showType 
   */
  onHover(
    etaType?: Perspective,
    profileType?: Profile,
    /**
     * hover over
     */
    showType?: 'interval' | 'hover'
  ): void;
}