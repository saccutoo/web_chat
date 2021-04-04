import { useEffect, useRef, useState } from 'react';
import useIdInPath from '../../Hooks/useIdInPath';
import { ICustomInput } from './custom-input.props';

function CustomInputAdapter(props: ICustomInput) {
    const inputRef = useRef<any>(null);

    const { value, setIsFocused, setValue, isTextArea, isMultiline, setIsMultiline, onChange, isFocused, isSendChat, ListMemberTag } = props;
    const [isDisplayList, setIsDisplayList] = useState<boolean>(false);
    const [listMemberTag, setListMemberTag] = useState<any[]>([]);
    let roomId = useIdInPath(2);
    useEffect(() => {
        if (isSendChat) {
            setListMemberTag([]);
        }
    }, [roomId]);
    useEffect(() => {
        setListMemberTag([]);
    }, [isSendChat]);

    useEffect(() => {
        setListMemberTag([]);
    }, [roomId]);

    useEffect(() => {
        setIsDisplayList(false);
    }, [roomId]);

    useEffect(() => {
        if (inputRef.current && isTextArea) {
            const ele = inputRef.current;
            ele.addEventListener("keypress", (event: KeyboardEvent) => {
                if (event.keyCode === 13 && !event.shiftKey) {
                    event.preventDefault();
                    inputRef.current.rows = 1;
                }
            })

            return () => {
                ele.removeEventListener("keypress", (event: KeyboardEvent) => {
                    if (event.keyCode === 13 && !event.shiftKey) {
                        event.preventDefault();
                        inputRef.current.rows = 1;
                    }
                })
            }
        }
    });

    useEffect(() => {
        if (inputRef.current) {
            const ele = inputRef.current;
            ele.addEventListener("keypress", (event: KeyboardEvent) => {
                if (event.keyCode === 64 && event.shiftKey) {
                    setIsDisplayList(true);
                }
                else {
                    setIsDisplayList(false);
                }
            })

            return () => {
                ele.removeEventListener("keypress", (event: KeyboardEvent) => {
                    if (event.keyCode === 64 && event.shiftKey) {
                        setIsDisplayList(false);
                    }
                })
            }
        }
    });

    useEffect(() => {
        if (inputRef.current) {
            const ele = inputRef.current;
            ele.addEventListener("keyup", (event: KeyboardEvent) => {
                if (event.key === 'Escape' || event.key === 'Backspace') {
                    setIsDisplayList(false);
                }
            })

            return () => {
                ele.removeEventListener("keyup", (event: KeyboardEvent) => {
                    if (event.key === 'Escape' || event.key === 'Backspace') {
                        setIsDisplayList(false);
                    }
                })
            }
        }
    });

    useEffect(() => {
        if (isFocused) {
            inputRef.current.focus()
        }
    }, [isFocused])

    const changeValue = (e: any) => {
        const value = e.target.value;
        setValue && setValue(value);

        const line = value.split("\n");

        if (isMultiline) {
            const lineNum = line.length;
            if (inputRef.current) {
                if (lineNum > 1) {
                    inputRef.current.rows = 3;
                    setIsMultiline(true);
                } else {
                    inputRef.current.rows = 1;
                    setIsMultiline(false);
                }
            }
        }
    }

    const changeValue2 = (e: any) => {
        onChange && onChange(e);
        const value = e.target.value;
        setValue && setValue(value);
    }

    const clearText = (e: any) => {
        onChange && onChange(e);
        setValue && setValue("");
    }

    const changeDislayList = () => {
        setIsDisplayList(prev => !prev);
    }

    const chooseMemberTag = (item: any) => {
        if (listMemberTag) {
            if (!listMemberTag.includes(item)) {
                listMemberTag.push(item);
            }
        }
        ListMemberTag(listMemberTag);
        setListMemberTag(listMemberTag);

        // Xử lý xét text input
        // tìm xem vị trí @
        let index = value?.indexOf("@");
        if (index !== -1) {
            let newValue = value?.replace("@", "@" + item.lastName + " ");
            setValue(newValue);
        }

        setIsDisplayList(false);
    }

    return {
        value,
        changeValue,
        changeValue2,
        clearText,
        inputRef,
        setIsFocused,
        isDisplayList, setIsDisplayList,
        chooseMemberTag
    }
}

export default CustomInputAdapter;
