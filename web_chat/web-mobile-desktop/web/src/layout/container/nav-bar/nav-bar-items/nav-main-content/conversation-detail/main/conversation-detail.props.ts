import { IBodyConversationDetail } from "../body/body-conversation-detail.props";
import { IHeaderConversationDetail } from "../header/header-conversation-detail.props";

export interface IConversationDetail{
    header:IHeaderConversationDetail,
    body:IBodyConversationDetail,
    onChangeDisplay: any
}
