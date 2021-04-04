import { useRef , useEffect } from 'react';

const MainPopupAdapter = () =>{ 
    const ref = useRef<any>(null);

    // const closeTooltip = () => ref.current.close();

    function ClosePopupWhenScroll(ref: any) {
        useEffect(() => {
            document.addEventListener("wheel", () =>ref.current && ref.current.close());
            return () => {
                document.removeEventListener("wheel", () =>ref.current && ref.current.close());
            };
        }, [ref]);
    }

    ClosePopupWhenScroll(ref);

    const closePopup = () => ref.current.close();
    
    return {
        ref,
        closePopup
    };
}

export default MainPopupAdapter;