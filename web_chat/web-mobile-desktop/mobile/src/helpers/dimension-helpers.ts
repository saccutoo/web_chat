import { Dimensions, PixelRatio } from 'react-native';

const screen = Dimensions.get('window');

export const DimensionHelpers = {
  width: screen.width,
  height: screen.height,
};

export const widthPercentageToDP = (widthPercent: string) => {
  const elemWidth =
    typeof widthPercent === 'number' ? widthPercent : parseFloat(widthPercent);

  // Use PixelRatio.roundToNearestPixel method in order to round the layout
  // size (dp) to the nearest one that correspons to an integer number of pixels.
  return PixelRatio.roundToNearestPixel((screen.width * elemWidth) / 100);
};

export const heightPercentageToDP = (heightPercent: string) => {
  // Parse string percentage input and convert it to number.
  const elemHeight =
    typeof heightPercent === 'number'
      ? heightPercent
      : parseFloat(heightPercent);

  // Use PixelRatio.roundToNearestPixel method in order to round the layout
  // size (dp) to the nearest one that correspons to an integer number of pixels.
  return PixelRatio.roundToNearestPixel((screen.height * elemHeight) / 100);
};