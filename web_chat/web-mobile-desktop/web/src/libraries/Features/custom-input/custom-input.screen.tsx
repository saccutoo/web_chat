import React, { ChangeEvent } from 'react';
import { IconDeleteDisabled } from '../../Icons/icon.screen';
import CustomListMember from '../custom-list-member/custom-list-member.screen';
import CustomInputAdapter from './custom-input.adapter';
import { ICustomInput } from './custom-input.props';
import './custom-input.scss';

function CustomInputScreen(props: ICustomInput) {
  const {
    value,
    inputRef,
    changeValue,
    changeValue2,
    clearText,
    setIsFocused,
    isDisplayList,
    chooseMemberTag
    
  } = CustomInputAdapter(props)

  return (
    <>
      <div className={"custominput-container " + props.class}>
        {
          props.isTextArea ?
            <textarea
              placeholder={props.placeHolder}
              value={value}
              style={props.style}
              ref={inputRef}
              rows={1}
              onFocus={() => { setIsFocused && setIsFocused(true) }}
              onBlur={() => { setIsFocused && setIsFocused(false) }}
              onChange={(e: ChangeEvent<Element>) => changeValue(e)}
            ></textarea>
            :
            <input type="text"
              id={props?.id}
              multiple={props.isMultiline}
              ref={inputRef}
              placeholder={props.placeHolder}
              value={value}
              onClick={props.onClick}
              onChange={(e: ChangeEvent<any>) => changeValue2(e)}
              required={true}
              onFocus={() => { setIsFocused && setIsFocused(true) }}
              onBlur={() => { setIsFocused && setIsFocused(false) }}
              style={props.style}
              onKeyDown={props.onKeyDown}
            />
        }
        {
          (props.hasClearText && value) && (
            <IconDeleteDisabled onClick={(e: any) => { clearText(e) }} className="custominput-icon-cleartext cursor-pointer"></IconDeleteDisabled>
          )
        }
      </div>
      {
        isDisplayList &&
        (
          <CustomListMember onChoose={chooseMemberTag}></CustomListMember>
        )
      }
    </>
  );
}

export default CustomInputScreen;
