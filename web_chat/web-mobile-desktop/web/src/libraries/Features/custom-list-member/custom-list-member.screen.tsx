import getApiUrl from '../../Functions/get-api-url';
import CircleAvatarScreen from '../circle-avtar/circle-avatar.screen';
import CustomListMemberAdapter from './custom-list-member.adapter';
import './custom-list-member.scss';
/**
 * Lấy ra List Member để tag tên trong input chat
 */
function CustomListMember(props: any) {
    const { onChoose } = props
    const userId = localStorage.getItem("userId");
    const { listMember } = CustomListMemberAdapter();
    const ShowListMember = () => {
        if (listMember) {
            return listMember.map((item: any, index: number) => {
                if (item.user.id !== userId) {
                    return <div className="customer-list-member-item" key={index}>
                        <CircleAvatarScreen
                            src={getApiUrl(item.user.avatar) || ""}
                            isOnline={false}
                            class="img-32"
                            hasCursor={false}
                        ></CircleAvatarScreen>
                        <p className="customer-list-member-name" onClick={() => onChoose(item.user)}>{item.user.userName}</p>
                    </div>
                }
                return <></>
            })
        }
        return <div></div>
    }
    return <div className="customer-list-member">
        <div className="customer-list-member-item">
            <CircleAvatarScreen
                src="https://cactusthemes.com/blog/wp-content/uploads/2018/01/tt_avatar_small.jpg"
                isOnline={false}
                class="img-32"
                hasCursor={false}
            ></CircleAvatarScreen>
            <p className="customer-list-member-name">all</p>
        </div>

        {
            ShowListMember()
        }
    </div>;
}
export default CustomListMember