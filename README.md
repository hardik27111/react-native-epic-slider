# React Native Epic Slider

![NPM Version](https://img.shields.io/npm/v/react-native-epic-slider)
![NPM Downloads](https://img.shields.io/npm/dw/react-native-epic-slider)
[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)

A highly customizable and feature-rich slider component for React Native with support for custom thumbs, points, floating labels, and more.

![React Native Epic Slider Demo](https://github.com/hardik27111/react-native-epic-slider/blob/main/assets/demo.png?raw=true)

## Features

- 🎨 Fully customizable design
- 👆 Smooth touch interactions
- 🏷️ Custom floating labels
- 🎯 Track points support
- 📏 Custom track and thumb sizes
- 🎭 Custom thumb component
- 🔢 Decimal and step value support
- 🎨 Rich styling options

## Installation

```bash
# Using npm
npm install react-native-epic-slider

# Using yarn
yarn add react-native-epic-slider

# Using pnpm
pnpm add react-native-epic-slider
```

## Basic Usage

```jsx
import Slider from 'react-native-epic-slider';

const App = () => {
  return (
    <Slider
      min={0}
      max={100}
      value={50}
      onChange={(value) => console.log('Current value:', value)}
    />
  );
};
```

## Advanced Usage

```jsx
import Slider from 'react-native-epic-slider';

const App = () => {
  const CustomThumb = () => (
    <View style={styles.customThumb}>
      <Text>📍</Text>
    </View>
  );

  const CustomFloatingLabel = ({ value }) => (
    <View style={styles.labelContainer}>
      <Text style={styles.labelText}>{value}%</Text>
    </View>
  );

  return (
    <Slider
      min={0}
      max={100}
      value={50}
      step={5}
      showFloatingLabel={true}
      FloatingLabel={CustomFloatingLabel}
      Thumb={CustomThumb}
      points={[
        { value: 25, color: '#FF5733' },
        { value: 50, color: '#33FF57' },
        { value: 75, color: '#3357FF' },
      ]}
      thumbColor="#2196F3"
      trackColor="#E0E0E0"
      onChange={(value) => console.log('Current value:', value)}
    />
  );
};
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `min` | number | `0` | Minimum value of the slider |
| `max` | number | `100` | Maximum value of the slider |
| `value` | number | - | Current value of the slider |
| `step` | number | `1` | Step value for incrementing/decrementing |
| `onChange` | function | - | Callback function when value changes |
| `allowDecimal` | boolean | `false` | Allow decimal values |
| `showValue` | boolean | `true` | Show current value above slider |
| `valuePrefix` | string | `''` | Prefix for the displayed value |
| `valueSuffix` | string | `''` | Suffix for the displayed value |
| `trackColor` | string | `'#E5E4E2'` | Color of the unfilled track |
| `thumbColor` | string | `'#22223B'` | Color of the thumb and filled track |
| `trackHeight` | number | `4` | Height of the slider track |
| `trackWidth` | number | - | Width of the slider track |
| `thumbSize` | number | `20` | Size of the thumb |
| `disableTrackTouch` | boolean | `false` | Disable touch interaction with track |
| `Thumb` | component | - | Custom thumb component |
| `points` | array | `[]` | Array of points to display on track |
| `showFloatingLabel` | boolean | `false` | Show floating label while dragging |
| `FloatingLabel` | component | - | Custom floating label component |
| `trackStyles` | style | - | Additional styles for track |
| `trackProgressStyles` | style | - | Additional styles for progress track |

### Points Props

Each point in the `points` array can have the following properties:

| Prop | Type | Description |
|------|------|-------------|
| `value` | number | Value at which to display the point |
| `color` | string | Color of the point |
| `size` | number | Size of the point |
| `customPoint` | component | Custom component for the point |

## Contributing

Feel free to submit issues and enhancement requests!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## Author

Your Name
- GitHub: [@hardik27111](https://github.com/hardik27111)
- npm: [react-native-epic-slider](https://www.npmjs.com/package/react-native-epic-slider)

## Support

If you found this project helpful, please consider giving it a ⭐️!

## Donation

If you find my projects and contributions helpful, consider supporting me. Your support means a lot and helps me continue creating and sharing more cool stuff.

<a href="https://www.buymeacoffee.com/hardikviradiya" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" alt="Buy Me A Coffee" style="height: 41px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>

## Hire

I'm a skilled React and React Native developer ready to help with your project. Let's create something great together!
Contact me <a herf='mailto:hardikviradiya27@gmail.com'>hardikviradiya27@gmail.com</a>