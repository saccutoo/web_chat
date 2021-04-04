import { useEffect } from "react";

const useOutsideClick = (ref: any, callback: Function) => {
  const handleClick = (event: any) => {
    if (ref.current && !ref.current.contains(event.target)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  });
};

export default useOutsideClick;

// https://medium.com/@kevinfelisilda/click-outside-element-event-using-react-hooks-2c540814b661