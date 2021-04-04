const debounce = (func?: any, wait?: any, immediate?: any) => {
    var timeout: any;
  
    return (...args: any) => {
        var context = this;
        var later = () => {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout); 
        timeout = setTimeout(later, wait); 
        if (callNow) func.apply(context, args);
    };
}


export default debounce;
