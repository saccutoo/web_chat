import React from 'react';
import { Slide, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './toastify.scss';
import { ReactComponent as IconDeleteDisabledLine } from '../../Icons/delete-disabled-line.svg';

const CloseButton = () => (
    <div className="flex-center cursor-pointer">
        <IconDeleteDisabledLine></IconDeleteDisabledLine>
    </div>
  );

const ToastifyScreen = () =>{

    return (
        <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            transition={ Slide }
            closeButton={CloseButton}
        />
      );
}

export default ToastifyScreen;