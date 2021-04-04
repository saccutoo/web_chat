import { ViewStyle } from 'react-native';
import colors from './colors';

const CIRCLE_BORDER_STYLE: ViewStyle = {
  borderRadius: 9999,
  borderColor: colors.primaryColor,
};

const CIRCLE_DEFAULT_BORDER_STYLE: ViewStyle = {
  borderRadius: 9999,
  borderColor: colors.line,
};

const SQUARE_BORDER_STYLE: ViewStyle = {
  borderRadius: 15,
  borderColor: colors.primaryColor,
};

const SQUARE_DEFAULT_BORDER_STYLE: ViewStyle = {
  borderRadius: 15,
  borderColor: colors.line,
};

const SHADOW_STYLE: ViewStyle = {
  shadowColor: colors.dim,
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,

  elevation: 5,
};
