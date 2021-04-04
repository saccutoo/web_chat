import React from 'react';
import { ENUM_KIND_OF_ATTACHMENT } from '../../../../../../../../libraries/Enum/attachment';
import checkAttachment from '../../../../../../../../libraries/Functions/check-attachment';
import isFileImage from '../../../../../../../../libraries/Functions/is-file-image';
import niceBytes from '../../../../../../../../libraries/Functions/nice-bytes';
import { IconDeleteDisabled, IconExcel, IconGimFile, IconPdf, IconPowepoint, IconWord } from '../../../../../../../../libraries/Icons/icon.screen';
import './upload-file.scss';

function UploadFileScreen(props: any) {
  const { file, removeFile } = props;

  const isFileImg = isFileImage(file);

  let styles = {};

  const getIcon = (name: string) =>{
    const type = checkAttachment(name);

    switch(type){
        case ENUM_KIND_OF_ATTACHMENT.DOC:
            return <IconWord></IconWord>
        case ENUM_KIND_OF_ATTACHMENT.EXCEL:
            return <IconExcel></IconExcel>
        case ENUM_KIND_OF_ATTACHMENT.PDF:
            return <IconPdf></IconPdf>
        case ENUM_KIND_OF_ATTACHMENT.POWERPOINT:
            return <IconPowepoint></IconPowepoint>
        
        default:
            return <IconGimFile></IconGimFile>
    }
  }

  if (isFileImg) {
    styles = {
      backgroundImage: `url(${file.pathFile})`,
      width: props.width,
      height: props.height
    }
  } 

  return (
    <div
      className={"uploadfile-container " + (isFileImg ? "" : " file")}
      style={styles}
    >

      {
        !isFileImg && (
          <div className="uploadfile-main">
            {
              getIcon(file.name)
            }
            <div className="body-semibold">
              <p>
                { file.name.split('.').shift() }
              </p>
              <span>
                 .
                 { file.name.split('.').pop() }
               </span>
            </div>
            <span className="subtitle-regular-2">
              {niceBytes(file.size)}
            </span>
          </div>
        )
      }

      <div
        className="uploadfile-icon-delete-panel flex-center cursor-pointer"
        onClick={() => { removeFile(file.name) }}
      >
        <IconDeleteDisabled className="img-16"></IconDeleteDisabled>
      </div>
    </div>
  );

}

export default UploadFileScreen;
