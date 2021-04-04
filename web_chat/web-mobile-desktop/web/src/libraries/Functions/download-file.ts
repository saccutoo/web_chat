import axios from "axios";

const downloadFile = (url: string) => {
    if(!url){
        return
    }
    
    axios.get(url,
        {
            responseType: 'blob',
        })
        .then(response => response.data)
        .then(blob => {
            const type = blob.type;
            let typefile="";
            const index = type.lastIndexOf("/");
            if (index !== -1) {
                 typefile = type.substr(index + 1);
            } 
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', "file." + typefile); //or any other extension
            document.body.appendChild(link);
            link.click();
        }
    );
        //.catch((error) => console.log(error));
}

export default downloadFile