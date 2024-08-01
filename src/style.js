const { StyleSheet } = require('react-native');
import { COLOR_WHITE } from './constants';

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    margin: 0,
    paddingVertical: 0,
  },
  container: {
    ...StyleSheet.absoluteFill,
    backgroundColor: COLOR_WHITE
  },
  mainView: {
    flex: 1,
  },
  headerView: {
    flex: 0,
  },
});
export default styles;
