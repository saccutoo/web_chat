import isFileImage from "./is-file-image";

export default function buildFileSelector(isMultiple: boolean , checkFileImage: boolean = false , cb :any , cb2:any = null ){
    const fileSelector = document.createElement('input');
    fileSelector.setAttribute('type', 'file');
    
    if(isMultiple){
        fileSelector.setAttribute('multiple', 'multiple');
    }

    if(checkFileImage){
        fileSelector.setAttribute('accept', 'image/*');
    }
    
    fileSelector.addEventListener("change", function fileDialogChanged (e: any){
        const fileList = e.path[0].files;

        if(fileList.length > 0){
            let pathFileListTemp: string[] = [];
            let fileListTemp: any[] = [];

            for (let index = 0; index < fileList.length; index++) {
                const file = fileList[index];

                if(checkFileImage && !isFileImage(file)){
                    return
                }
                const pathFile = URL.createObjectURL(file); 
                pathFileListTemp.push(pathFile);

                file["pathFile"] = pathFile
                fileListTemp.push(file)
            }

            cb(pathFileListTemp);

            if(cb2){
                isMultiple ? cb2(fileListTemp) : cb2(fileListTemp[0])
            }
        }   
    });
    
    return fileSelector;
}