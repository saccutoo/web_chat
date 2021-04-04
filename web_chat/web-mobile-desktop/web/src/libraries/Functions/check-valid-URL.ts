// const validURL = (str: string) => {
//     var pattern = new RegExp('^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?' + // protocol
//         '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
//         '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
//         '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
//         '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
//         '(\\#[-a-z\\d_]*)?$'
//         , 'i'); // fragment locator
//     return !!pattern.test(str);
// }

const validURL = (str: string) => {
    const urlRegex = /^((http(s?)?):\/\/)?([wW]{3}\.)?[a-zA-Z0-9\-.]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/g;
    const result = str.match(urlRegex);
    return result !== null;
  };

const checkHttp = (str: string) => {
    if (str.indexOf("http://") === 0 || str.indexOf("https://") === 0) {
        return true;
    }
    return false;
}

const checkValidURL = (url : string) =>{
    if(!url){
        return false;
    }
    if(validURL(url) && checkHttp(url)){
        return true;
    }

    return false;
}


export default checkValidURL;

