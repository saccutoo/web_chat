import { ChangeEvent, useRef } from "react";

export default function useDebounce(setQuery: any   ) {
    const typingTimeoutRef = useRef<any>(null);

    const onChange = (e: ChangeEvent<HTMLInputElement>) =>{
        if(typingTimeoutRef.current){
            clearTimeout(typingTimeoutRef.current);
        }

        typingTimeoutRef.current = setTimeout(() =>{
            typingTimeoutRef.current = null;
            setQuery(e.target.value);
        },6e2);
    }

    return onChange
}