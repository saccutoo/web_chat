import { IconArrowLeft2 } from "../../Icons/icon.screen";
import GoBackButtonAdapter from "./goback-button.adapter";
import "./goback-button.scss";

function GoBackButtonScreen(props: any){
    const { onClick } = props;

    const {
        redirectToLastPage
    } = GoBackButtonAdapter()

    return (
        <div className="gobackbutton-container cursor-pointer">
            <div onClick={ onClick ? onClick : redirectToLastPage }>
                <IconArrowLeft2></IconArrowLeft2>
                <span className="margin-left-8">Quay lại</span>
            </div>
        </div>
    )
}

export default GoBackButtonScreen;