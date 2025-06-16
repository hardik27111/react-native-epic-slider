import React from 'react';
import {View, Text, Animated} from 'react-native';
import {SliderProps} from './types';
import {DEFAULT_THUMB_SIZE, DEFAULT_TRACK_HEIGHT} from './utils';
import useSlider from './hooks/useSlider';
import styles from './styles';

const Slider: React.FC<SliderProps> = ({
  min,
  max,
  step = 1,
  value,
  onChange,
  style,
  showValue = true,
  valuePrefix = '',
  valueSuffix = '',
  trackColor = '#E5E4E2',
  thumbColor = '#22223B',
  trackHeight = DEFAULT_TRACK_HEIGHT,
  trackWidth,
  thumbSize = DEFAULT_THUMB_SIZE,
  allowDecimal = false,
  disableTrackTouch = false,
  Thumb,
  points = [],
  showFloatingLabel = false,
  FloatingLabel,
  trackStyles,
  trackProgressStyles,
  // orientation = 'horizontal',
  // verticalHeight = 200,
  ...restProps
}) => {
  const {
    displayValue,
    trackPanResponder,
    currentValue,
    isDragging,
    trackContainerRef,
    panResponder,
    sliderContainerRef,
    customThumbRef,
    sliderRef,
    progressAnim,
    thumbAnim,
    // isVertical,
    getPositionFromValue,
  } = useSlider({
    value,
    min,
    max,
    step,
    allowDecimal,
    onChange,
    thumbSize,
    // orientation,
  });

  const renderThumb = () => {
    if (Thumb) {
      return (
        <Animated.View
          onLayout={event => {
            const {width, height} = event.nativeEvent.layout;
            customThumbRef.current.width = width;
            customThumbRef.current.height = height;
          }}
          style={[
            {
              position: 'absolute',
              left: thumbAnim,
              zIndex: 2,
              transform: [{scale: isDragging ? 1.2 : 1}],
            },
          ]}
          {...panResponder.panHandlers}>
          {Thumb}
        </Animated.View>
      );
    }

    return (
      <Animated.View
        style={[
          styles.thumb,
          {
            width: thumbSize,
            height: thumbSize,
            backgroundColor: thumbColor,
            left: thumbAnim,
            transform: [{scale: isDragging ? 1.2 : 1}],
          },
        ]}
        {...panResponder.panHandlers}
      />
    );
  };

  const renderPoints = () => {
    return points.map((point, index) => {
      const pointPosition = getPositionFromValue(point.value);
      const pointSize = point.size || 10;
      const isActive =
        point.value <= (value !== undefined ? value : currentValue);

      if (point.customPoint) {
        return (
          <View
            key={`point-${index}`}
            style={[
              styles.point,
              {
                position: 'absolute',
                left: pointPosition,
                top: '50%',
                transform: [
                  {translateX: -pointSize / 2}, // Center horizontally
                  {translateY: -pointSize / 2}, // Center vertically
                ],
                opacity: isActive ? 1 : 0.5,
                alignItems: 'center',
                justifyContent: 'center',
                width: pointSize,
                height: pointSize,
              },
            ]}>
            {point.customPoint}
          </View>
        );
      }

      return (
        <View
          key={`point-${index}`}
          style={[
            styles.point,
            {
              width: pointSize,
              height: pointSize,
              backgroundColor: isActive
                ? thumbColor
                : point.color || trackColor,
              left: pointPosition - pointSize / 2,
              top: '50%',
              transform: [{translateY: -pointSize / 2}],
              opacity: isActive ? 1 : 0.5,
              borderWidth: isActive ? 2 : 0,
              borderColor: thumbColor,
            },
          ]}
        />
      );
    });
  };

  const renderFloatingLabel = () => {
    if (!showFloatingLabel) return null;

    const sliderValue = value !== undefined ? value : currentValue;
    const displayValue = typeof sliderValue === 'number' ? sliderValue : min;

    if (FloatingLabel) {
      return (
        <Animated.View
          style={[
            styles.floatingLabel,
            {
              left: thumbAnim,
              opacity: isDragging ? 1 : 0,
              transform: [
                {scale: isDragging ? 1 : 0.5},
                {translateY: isDragging ? -30 : 0},
                {translateX: -(customThumbRef.current.width || thumbSize) / 2},
              ],
            },
          ]}>
          <FloatingLabel value={displayValue} {...restProps} />
        </Animated.View>
      );
    }

    return (
      <Animated.View
        style={[
          styles.floatingLabel,
          {
            left: thumbAnim,
            opacity: isDragging ? 1 : 0,
            transform: [
              {scale: isDragging ? 1 : 0.5},
              {translateY: isDragging ? -30 : 0},
              {translateX: -(customThumbRef.current.width || thumbSize)},
            ],
          },
        ]}>
        <View style={styles.labelContainer}>
          <Text style={styles.labelText}>
            {valuePrefix}
            {displayValue}
            {valueSuffix}
          </Text>
        </View>
      </Animated.View>
    );
  };

  return (
    <View
      style={[
        styles.container,
        // isVertical && {
        //   height: verticalHeight,
        //   alignItems: 'center',
        // },
        style,
      ]}
      onLayout={event => {
        const {width, height} = event.nativeEvent.layout;
        // sliderContainerRef.current.width = isVertical ? height : width;
        sliderContainerRef.current.width = width;
      }}>
      {showValue && (
        <Text style={styles.valueText}>
          {valuePrefix}
          {displayValue}
          {valueSuffix}
        </Text>
      )}
      <View
        style={[
          styles.trackContainer,
          // isVertical && styles.verticalTrackContainer,
          {height: DEFAULT_THUMB_SIZE},
        ]}
        ref={trackContainerRef}
        {...(!disableTrackTouch ? trackPanResponder.panHandlers : {})}
        onLayout={event => {
          const {width, height} = event.nativeEvent.layout;
          // sliderRef.current.width = isVertical ? height : width;
          sliderRef.current.width = width;
          sliderRef.current.height = height;
        }}>
        <View
          style={[
            styles.track,
            // isVertical && styles.verticalTrack,
            {
              // height: isVertical ? verticalHeight : trackHeight,
              // width: isVertical ? trackHeight : (trackWidth || sliderContainerRef.current.width),
              height: trackHeight,
              width: trackWidth || sliderContainerRef.current.width,
              backgroundColor: trackColor,
            },
            trackStyles,
          ]}
        />
        <Animated.View
          style={[
            styles.progress,
            // isVertical && styles.verticalProgress,
            {
              // height: isVertical ? progressAnim : trackHeight,
              // width: isVertical ? trackHeight : progressAnim,
              height: trackHeight,
              width: progressAnim,
              backgroundColor: thumbColor,
            },
            trackProgressStyles,
          ]}
        />

        {points?.length > 0 && renderPoints()}
        {renderFloatingLabel()}
        {renderThumb()}
      </View>
    </View>
  );
};

export default Slider;
