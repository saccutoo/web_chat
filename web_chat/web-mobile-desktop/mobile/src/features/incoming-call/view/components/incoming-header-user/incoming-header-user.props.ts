import { User } from '../../../../../core/common/types/user';
import { KindOfMsg } from '../../../../../core/common/types/message';
/* 
    Created by thaolt
*/

export interface IncomingHeaderUserProps {
  onBack: () => void;
  userInfo: User
  typeCall: KindOfMsg
}
