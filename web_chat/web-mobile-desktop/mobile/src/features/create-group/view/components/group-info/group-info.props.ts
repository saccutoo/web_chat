/* 
    Created by lolngdq
*/

import { Image } from "react-native-image-crop-picker";

export interface GroupInfoProps {
  onChangeText: (txt: string) => void;
  onChooseImage: () => void;
  emptyNameGr: boolean;
  imageGr?: any
}
