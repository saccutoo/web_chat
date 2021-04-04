import { ViewStyle, TextStyle } from 'react-native';
import { DimensionHelpers } from 'helpers/dimension-helpers';
import colors from './colors';
import spacing from './spacings';

/**
 * Width container buttons, inputs
 */
const CONTAINER_BUTTON_INPUT: ViewStyle = {
  width: DimensionHelpers.width * 0.8,
};

/**
 * Space vertical
 */
const SPACE_VERTICAL: ViewStyle = {
  marginVertical: 10,
};

const SPACE_VERTICAL_SMALLER: ViewStyle = {
  marginVertical: 3,
};

/**
 * Space horizontal
 */
const SPACE_HORIZONTAL: ViewStyle = {
  marginHorizontal: 10,
};

/**
 * Shadow button, input
 */
const SHADOW_BUTTON_INPUT: ViewStyle = {
  backgroundColor: colors.white,
  borderColor: colors.borderBtn,
  borderWidth: 0.1,
  shadowColor: colors.black,
  shadowOffset: {
    width: 0,
    height: 0.5,
  },
  shadowOpacity: 0.1,
  shadowRadius: 2.84,
  elevation: 2,
  borderRadius: 20,
};

/**Shadow container */
const SHADOW_CONTAINER: ViewStyle = {
  ...SHADOW_BUTTON_INPUT,
  borderRadius: 8,
  shadowOffset: {
    width: 0,
    height: 1.5,
  },
  shadowOpacity: 0.15,
  shadowRadius: 10.84,
  elevation: 4,
};

const SHADOW_CROSS: ViewStyle = {
  backgroundColor: colors.white,
  borderColor: colors.borderBtn,
  borderWidth: 0.1,
  shadowColor: colors.black,
  shadowOffset: {
    width: 0,
    height: 0.5,
  },
  shadowOpacity: 0.1,
  shadowRadius: 2.84,

  borderRadius: 20,
};

/**Divider bottom */
const ITEM_BOTOTM_DIVIDER: ViewStyle = {
  borderBottomColor: colors.dim,
  borderBottomWidth: 0.5,
  paddingVertical: spacing.medium,
  marginHorizontal: spacing.large,
};

/**
 * Primary text
 */
const LABEL: TextStyle = {
  color: colors.text,
  // fontSize: FONT_SIZES.large
};

/**
 * Authentication
 */

const TITLE_HEADER: TextStyle = {
  color: colors.title,
  fontWeight: '400',
  fontSize: 18,
};

const TITLE_BUTTON: TextStyle = {
  color: colors.black,
  fontWeight: '500',
};

export {
  TITLE_HEADER,
  TITLE_BUTTON,
  CONTAINER_BUTTON_INPUT,
  SHADOW_BUTTON_INPUT,
  SHADOW_CONTAINER,
  SPACE_HORIZONTAL,
  SPACE_VERTICAL,
  SPACE_VERTICAL_SMALLER,
  ITEM_BOTOTM_DIVIDER,
  LABEL,
  SHADOW_CROSS,
};
