import React from 'react';
import ModalScreen from '../../modal/modal.screen';
import './detail-popup.scss';

function DetailPopupScreen(props : any){
    const { listEles , eleHeader , onClosePopup  } = props;
    const showDetailPopup = () =>{
        return listEles.map((ele:any , index:number) =>{
            const onClick = () =>{
                ele.onClick && ele.onClick()
                onClosePopup && onClosePopup()
            }
            if(ele.eleContext){
                return  <ModalScreen  open={ false } headerContent={ "Xác nhận xóa tin nhắn" } context={ ele.eleContext } hasPadding={ true }  key={ index }>
                            <li onClick={ onClick } >
                                {
                                    ele.icon && ele.icon
                                }
                                <span>
                                    { ele.text }
                                </span>           
                            </li>
                        </ModalScreen>
            }
            return (
                <li onClick={ onClick } key={ index }>
                    {
                        ele.icon && ele.icon
                    }
                    <span>
                        { ele.text }
                    </span>
                </li>
            )
        })
    }
    return (
        <div className="detailpopup-container">
            {
                eleHeader && eleHeader
            }
            <ul className="detailpopup-detail">
                {
                    showDetailPopup()
                }
            </ul>
        </div>
    );

}

export default DetailPopupScreen;