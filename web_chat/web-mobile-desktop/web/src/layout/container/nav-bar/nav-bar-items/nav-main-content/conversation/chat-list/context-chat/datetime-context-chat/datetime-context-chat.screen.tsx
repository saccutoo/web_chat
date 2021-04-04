import React from 'react';
import './datetime-context-chat.scss';

function DatetimeContextChatScreen(props: any) {

    const { datetime, text, day } = props;

    return (
        <div className="datetime-container">
            <div className="datetime-line"></div>
            <span>
                {text} {datetime} {day}
            </span>
            <div className="datetime-line"></div>
        </div>
    )
}

export default DatetimeContextChatScreen;