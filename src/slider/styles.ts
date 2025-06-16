import {StyleSheet} from 'react-native';
import {DEFAULT_THUMB_SIZE, DEFAULT_TRACK_HEIGHT} from './utils';

const styles = StyleSheet.create({
  container: {},
  trackContainer: {
    height: DEFAULT_THUMB_SIZE,
    justifyContent: 'center',
  },
  track: {
    position: 'absolute',
    left: 0,
    right: 0,
    borderRadius: DEFAULT_TRACK_HEIGHT / 2,
  },
  progress: {
    position: 'absolute',
    left: 0,
    borderRadius: DEFAULT_TRACK_HEIGHT / 2,
  },
  thumb: {
    position: 'absolute',
    borderRadius: DEFAULT_THUMB_SIZE / 2,
    shadowColor: '#22223B',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 2,
  },
  valueText: {
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 16,
    color: '#d9d9d9',
  },
  point: {
    position: 'absolute',
    borderRadius: 50,
    zIndex: 1,
  },
  floatingLabel: {
    position: 'absolute',
    zIndex: 2,
    alignItems: 'center',
  },
  labelContainer: {
    backgroundColor: '#22223B',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  labelText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
   verticalContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  verticalTrackContainer: {
    width: DEFAULT_THUMB_SIZE,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  verticalTrack: {
    height: '100%',
    width: DEFAULT_TRACK_HEIGHT,
    position: 'absolute',
  },
  verticalProgress: {
    width: DEFAULT_TRACK_HEIGHT,
    position: 'absolute',
    bottom: 0,
  },
  verticalValueText: {
    marginBottom: 0,
    marginRight: 10,
    writingDirection: 'ltr',
  },
});
export default styles;
