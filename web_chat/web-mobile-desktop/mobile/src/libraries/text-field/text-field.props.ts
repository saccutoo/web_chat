import { TextInputProps, ViewStyle } from 'react-native';

export interface TextFieldProps extends TextInputProps {
  placeHolderText?: string;
  placeHolderColor?: string;
  inputStyle?: ViewStyle;
  containerStyle?: ViewStyle;
  onChangeValue?: (value: string) => void;
  lable?: string;
  iConRight?: string;
  onPressIconR?: () => void;
  passInput?: boolean;
  errorTxt?: string;
  errorInput?: boolean;
  isDomain?: boolean;
}
