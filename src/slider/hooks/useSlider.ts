import {useState, useRef, useEffect} from 'react';
import {View, Animated, PanResponder} from 'react-native';
import { SliderProps } from '../types';

interface Props extends SliderProps {}

const useSlider = ({ value, min, max, orientation, step, allowDecimal, onChange, thumbSize }: Props) => {
  const [sliderCoordinate, setSliderCoordinate] = useState({
    x: 0,
    y: 0,
    height: 0,
    width: 0,
  });
  const [currentValue, setCurrentValue] = useState(value);
  const [isDragging, setIsDragging] = useState(false);
  const sliderContainerRef = useRef<{width: number | null}>({width: null});
  const customThumbRef = useRef<{
    width: number | null;
    height: number | null;
  }>({width: null, height: null});
  const selectionRange = useRef({
    min: min,
    max: max,
  });
  const trackContainerRef = useRef<View>(null);
  const sliderRef = useRef<{
    x: number;
    y: number;
    width: number;
    height: number;
  }>({x: 0, y: 0, width: 0, height: 0});
  const progressAnim = useRef(new Animated.Value(0)).current;
  const thumbAnim = useRef(new Animated.Value(0)).current;
// const isVertical = orientation === 'vertical';
  // Reset value when min or max changes
  useEffect(() => {
    selectionRange.current = {
      min: min,
      max: max,
    };
    // Reset to min value when range changes

    setCurrentValue(min);
    onChange?.(min);
  }, [min, max]);

  useEffect(() => {
    if (trackContainerRef.current) {
      trackContainerRef.current.measureInWindow((x, y, width, height) => {
        setSliderCoordinate({
          ...sliderCoordinate,
          x,
          y,
          width,
          height,
        });
        sliderRef.current = {
          x,
          y,
          width,
          height,
        };
      });
    }
  }, [trackContainerRef.current]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (_, gestureState) => {
        setIsDragging(true);
      },
      onPanResponderMove: (_, gestureState) => {
        if (sliderRef.current.width === 0) return;

        const startX = sliderRef.current.x;
        const endX = startX + sliderRef.current.width;
        const touchX = gestureState.moveX;

        // Calculate the percentage of touch position relative to slider width
        const percentage = Math.max(
          0,
          Math.min(1, (touchX - startX) / (endX - startX)),
        );

        // Map the percentage to the min-max range
        const range = selectionRange.current.max - selectionRange.current.min;
        let newValue = selectionRange.current.min + range * percentage;

        // Apply step if needed
        if (!allowDecimal) {
          const stepCount = Math.round(
            (newValue - selectionRange.current.min) / (step || 1),
          );
          newValue = selectionRange.current.min + stepCount * (step || 1);
        } else {
          newValue = parseFloat(newValue.toFixed(2));
        }

        // Ensure value is within bounds
        newValue = Math.min(
          selectionRange.current.max,
          Math.max(selectionRange.current.min, newValue),
        );

        if (value === undefined) {
          setCurrentValue(newValue);
        }
        onChange?.(newValue);

        // Update animated values directly
        const newPosition = getPositionFromValue(newValue);
        const newProgressWidth = Math.max(
          0,
          Math.min(sliderRef.current.width, newPosition),
        );
        const newThumbLeft = Math.max(
          0,
          Math.min(
            sliderRef.current.width -
              (customThumbRef.current.width || thumbSize || 0),
            newPosition - (customThumbRef.current.width || thumbSize || 0),
          ),
        );

        progressAnim.setValue(newProgressWidth);
        thumbAnim.setValue(newThumbLeft);
      },
      onPanResponderRelease: () => {
        setIsDragging(false);
      },
    }),
  ).current;

//   const getPositionFromTouch = (evt: any) => {
//     if (sliderRef.current.width === 0) return 0;

//     const touch = isVertical ? evt.nativeEvent.pageY : evt.nativeEvent.pageX;
//     const start = isVertical ? sliderRef.current.y : sliderRef.current.x;
//     const length = isVertical ? sliderRef.current.height : sliderRef.current.width;
//     const end = start + length;

//     // For vertical slider, we need to invert the percentage calculation
//     let percentage = (touch - start) / (end - start);
//     if (isVertical) {
//       percentage = 1 - percentage; // Invert for vertical
//     }

//     percentage = Math.max(0, Math.min(1, percentage));
//     return percentage;
//   };

  const calculateValueFromTouch = (touchPosition: number) => {
    // const startPosition = isVertical ? sliderRef.current.y : sliderRef.current.x;
    // const sliderLength = isVertical ? sliderRef.current.height : sliderRef.current.width;
    const startPosition = sliderRef.current.x;
    const sliderLength = sliderRef.current.width;
    const endPosition = startPosition + sliderLength;

    // Calculate the percentage of touch position relative to slider length
    let percentage = Math.max(
      0,
      Math.min(1, (touchPosition - startPosition) / (endPosition - startPosition)),
    );

    // Invert percentage for vertical slider
    // if (isVertical) {
    //   percentage = 1 - percentage;
    // }

    // Map the percentage to the min-max range
    const range = selectionRange.current.max - selectionRange.current.min;
    let newValue = selectionRange.current.min + range * percentage;

    // Apply step if needed
    if (!allowDecimal) {
      const stepCount = Math.round(
        (newValue - selectionRange.current.min) / (step || 0),
      );
      newValue = selectionRange.current.min + stepCount * (step || 0);
    } else {
      newValue = parseFloat(newValue.toFixed(2));
    }

    // Ensure value is within bounds
    return Math.min(
      selectionRange.current.max,
      Math.max(selectionRange.current.min, newValue),
    );
  };

  const trackPanResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt, gestureState) => {
        setIsDragging(true);
        // Handle initial touch
        const newValue = calculateValueFromTouch(evt.nativeEvent.pageX);

        if (value === undefined) {
          setCurrentValue(newValue);
        }
        onChange?.(newValue);

        // Update animated values
        const newPosition = getPositionFromValue(newValue);
        const newProgressWidth = Math.max(
          0,
          Math.min(sliderRef.current.width, newPosition),
        );
        const newThumbLeft = Math.max(
          0,
          Math.min(
            sliderRef.current.width -
              (customThumbRef.current.width || thumbSize || 0),
            newPosition - (customThumbRef.current.width || thumbSize || 0),
          ),
        );

        progressAnim.setValue(newProgressWidth);
        thumbAnim.setValue(newThumbLeft);
      },
      onPanResponderMove: (evt, gestureState) => {
        if (sliderRef.current.width === 0) return;

        const newValue = calculateValueFromTouch(gestureState.moveX);

        if (value === undefined) {
          setCurrentValue(newValue);
        }
        onChange?.(newValue);

        // Update animated values
        const newPosition = getPositionFromValue(newValue);
        const newProgressWidth = Math.max(
          0,
          Math.min(sliderRef.current.width, newPosition),
        );
        const newThumbLeft = Math.max(
          0,
          Math.min(
            sliderRef.current.width -
              (customThumbRef.current.width || thumbSize || 0),
            newPosition - (customThumbRef.current.width || thumbSize || 0),
          ),
        );

        progressAnim.setValue(newProgressWidth);
        thumbAnim.setValue(newThumbLeft);
      },
      onPanResponderRelease: () => {
        setIsDragging(false);
      },
    }),
  ).current;

  const getPositionFromValue = (val: number) => {
    if (sliderRef.current.width === 0) return 0;
    const range = selectionRange.current.max - selectionRange.current.min;
    const percentage = (val - selectionRange.current.min) / range;
    const position = percentage * sliderRef.current.width;
    return isNaN(position) ? 0 : position;
  };

  const displayValue = value !== undefined ? value : currentValue;
  const position = getPositionFromValue(displayValue || min);
  const progressWidth = Math.max(
    0,
    Math.min(sliderRef.current.width, position),
  );
  const thumbLeft = Math.max(
    0,
    Math.min(
      sliderRef.current.width - (customThumbRef.current.width || thumbSize || 0),
      position - (customThumbRef.current.width || thumbSize || 0),
    ),
  );

  // Initialize animated values
  useEffect(() => {
    Animated.parallel([
      Animated.spring(progressAnim, {
        toValue: progressWidth,
        useNativeDriver: false,
        bounciness: 0,
      }),
      Animated.spring(thumbAnim, {
        toValue: thumbLeft,
        useNativeDriver: false,
        bounciness: 0,
      }),
    ]).start();
  }, [progressWidth, thumbLeft]);

  return {
    sliderCoordinate,
    currentValue: displayValue,
    isDragging,
    progressAnim,
    displayValue,
    trackPanResponder,
    thumbAnim,
    panResponder,
    sliderRef,
    customThumbRef,
    selectionRange,
    getPositionFromValue,
    calculateValueFromTouch,
    setCurrentValue,
    setSliderCoordinate,
    sliderContainerRef,
    trackContainerRef,
    thumbSize: customThumbRef.current.width || thumbSize || 0,
  }
};

export default useSlider;
