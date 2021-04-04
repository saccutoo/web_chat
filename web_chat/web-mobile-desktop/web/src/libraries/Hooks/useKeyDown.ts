import { useEffect } from "react";

export default function useKeyDown(cb: any) {

    useEffect(() =>{
        window.addEventListener('keydown', cb );
    
        return() =>{
          window.removeEventListener('keydown', cb );
        }
    })
}