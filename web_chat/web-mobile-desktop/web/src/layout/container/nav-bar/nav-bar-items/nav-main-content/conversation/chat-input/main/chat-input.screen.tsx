import React, { useRef } from 'react';
import CustomInputScreen from '../../../../../../../../libraries/Features/custom-input/custom-input.screen';
import UploadFileScreen from '../upload-file/upload-file.screen';
import './chat-input.scss';
import ChatInputAdapter from './chat-input.adapter';
import { Picker } from 'emoji-mart'
import useOutsideClick from '../../../../../../../../libraries/Hooks/useOutsideClick';
import { IconDeleteDisabled, IconGimFile, IconSendMessage, IconSmileCircle } from '../../../../../../../../libraries/Icons/icon.screen';


const styleCustomInput = {
    // backgroundImage:`url('${ iconSmileCircle }')`,
    backgroundPosition: '99% 50%',
    padding: '10px 35px 10px 10px',
    borderRadius: '8px',
    fontSize: '14px',
}

function ChatInputScreen(props: any) {
    const ref: any = useRef<HTMLInputElement | null>(null)

    useOutsideClick(ref, () => {
        setVisibleEmojiPicker(false);
    });

    const {
        respondedMess,
        classNameChatInput,
        showContextRespondedMess,
        hasUploadFiles,
        handleFileSelect,
        removeFile,
        setIsMultilineText,
        message, setMessage,
        sendChat,
        isFocused,
        setIsFocused,
        addEmoji,
        isVisibleEmojiPicker, setVisibleEmojiPicker,
        editedMess,
        files,
        removeEditedmess,
        isSendChat,
        pushNotificationTagName,
        listMemberTag,
        GetListMemberTag
    } = ChatInputAdapter(props)

    return (
        <div className={classNameChatInput()} id="chat-input">
            {
                respondedMess && (
                    <div className="chatinput-responseMess">
                        <div>
                            <span className="subtitle-regular-3">
                                Trả lời
                                <span className="subtitle-bold-2"> {respondedMess.userName ? respondedMess.userName : "chính bạn"} </span>
                            </span>
                            <p className="chatinput-responseMess-context  text-overflow-ellipsis body-regular">
                                {showContextRespondedMess()}
                            </p>
                        </div>
                        <IconDeleteDisabled onClick={() => { props.setRespondedMess() }} className="chatinput-responseMess-icon-cancel cursor-pointer"></IconDeleteDisabled>
                    </div>
                )
            }
            {
                (hasUploadFiles && files) && (
                    <div className="chatinput-uploadfiles">
                        {
                            files.map((file: any, index: number) =>
                                <UploadFileScreen
                                    key={index}
                                    file={file}
                                    removeFile={removeFile}
                                ></UploadFileScreen>
                            )
                        }
                    </div>
                )
            }
            <div className="chatinput-main">
                {
                    editedMess ? (
                        <IconDeleteDisabled onClick={removeEditedmess} className="cursor-pointer icon-svg--hover" ></IconDeleteDisabled>
                    ) : (
                        <IconGimFile onClick={handleFileSelect} className="cursor-pointer icon-svg--hover" ></IconGimFile>
                    )
                }

                <CustomInputScreen
                    setValue={setMessage}
                    value={message}
                    placeHolder="Nhập nội dung bình luận"
                    class=""
                    style={styleCustomInput}
                    setIsMultiline={setIsMultilineText}
                    isMultiline={true}
                    isTextArea={true}
                    isFocused={isFocused}
                    setIsFocused={setIsFocused}
                    isSendChat={isSendChat}
                    ListMemberTag={GetListMemberTag}
                ></CustomInputScreen>

                <div ref={ref} className="icon-emoji">
                    <Picker
                        onSelect={addEmoji}
                        style={{ display: isVisibleEmojiPicker ? 'block' : 'none' }}
                        showPreview={false}
                        showSkinTones={false}
                        set={'facebook'}
                    />
                    <IconSmileCircle className="icon-svg--hover" onClick={() => setVisibleEmojiPicker(true)} />
                </div>

                <div className="img-32 cursor-pointer flex-center" onClick={sendChat}>
                    <IconSendMessage className="icon-svg--hover" ></IconSendMessage>
                </div>
            </div>
        </div>
    )
}

export default ChatInputScreen;


