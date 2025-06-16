import {ViewStyle} from 'react-native';

export interface FloatingLabelProps {
  /** Current value of the slider */
  value: number;
  /** Any additional props that can be passed to the floating label */
  [key: string]: any;
}

export interface SliderProps {
  /** Minimum value of the slider range */
  min: number;

  /** Maximum value of the slider range */
  max: number;

  /**
   * Step value for incrementing/decrementing the slider
   * @default 1
   */
  step?: number;

  /**
   * Allow decimal values in the slider
   * @default false
   */
  allowDecimal?: boolean;

  /**
   * Controlled value of the slider. If not provided, slider will use internal state
   */
  value?: number;

  /**
   * Callback function that is called when the slider value changes
   * @param value The new value of the slider
   */
  onChange?: (value: number) => void;

  /**
   * Custom styles for the slider container
   */
  style?: ViewStyle;

  /**
   * Show the current value above the slider
   * @default true
   */
  showValue?: boolean;

  /**
   * Prefix to display before the value (e.g., "$" for currency)
   * @default ''
   */
  valuePrefix?: string;

  /**
   * Suffix to display after the value (e.g., "%" for percentage)
   * @default ''
   */
  valueSuffix?: string;

  /**
   * Color of the unfilled track
   * @default '#E5E4E2'
   */
  trackColor?: string;

  /**
   * Color of the thumb and filled track
   * @default '#22223B'
   */
  thumbColor?: string;

  /**
   * Height of the slider track
   * @default DEFAULT_TRACK_HEIGHT
   */
  trackHeight?: number;

  /**
   * Width of the slider track. If not provided, uses container width
   */
  trackWidth?: number;

  /**
   * Size of the thumb (width and height)
   * @default DEFAULT_THUMB_SIZE
   */
  thumbSize?: number;

  /**
   * Disable touch interaction with the track. When true, only the thumb can be dragged
   * @default false
   */
  disableTrackTouch?: boolean;

  /**
   * Custom thumb component to replace the default circular thumb
   * Must be a valid React element
   */
  Thumb?: React.ReactNode;

  /**
   * Array of points to display on the slider track
   * Each point can have custom appearance and position
   */
  points?: {
    /** Value at which to display the point */
    value: number;
    /** Color of the point (for default point shape) */
    color?: string;
    /** Size of the point (width and height) */
    size?: number;
    /** Custom component to replace the default point shape */
    customPoint?: React.ReactNode;
  }[];

  /**
   * Show a floating label above the thumb while dragging
   * @default false
   */
  showFloatingLabel?: boolean;

  /**
   * Custom floating label component to replace the default label
   * Must be a valid React element
   */
  FloatingLabel?: React.ComponentType<FloatingLabelProps>;

  /** Custom styles for the track */
  trackStyles?: ViewStyle;

  trackProgressStyles?: ViewStyle;

  /**
   * Direction of the slider
   * @default 'horizontal'
   */
  orientation?: 'horizontal' | 'vertical';
  /**
   * Height of the slider when in vertical orientation
   */
  verticalHeight?: number;
}
