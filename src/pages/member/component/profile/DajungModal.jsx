import React, { useEffect } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import styles from '../css/DajungModal.module.css';

const DajungModal = ({ show, handleClose, handleYes }) => {
  const MySwal = withReactContent(Swal);

  useEffect(() => {
    if (show) {
      MySwal.fire({
        toast: true,
        position: 'top', 
        icon: 'question',
        title: '이 회원의 다정온도를 올리시는 거죠?',
        showCancelButton: true,
        confirmButtonText: '&nbsp;&nbsp;예&nbsp;&nbsp;',
        cancelButtonText: '아니오',
        reverseButtons: true,
        customClass: {
          container: styles.container,
          popup: styles.popup,
          icon: styles.icon,
          htmlContainer: styles.swal2HtmlContainer,
          actions: styles.swal2Actions,
          confirmButton: styles.swal2ConfirmButton,
          cancelButton: styles.swal2CancelButton,
        },
      }).then((result) => {
        if (result.isConfirmed) {
          handleYes();
          MySwal.fire({
            toast: true,
            position: 'top',
            icon: 'success',
            title: '다정온도가 성공적으로 올랐습니다!',
            showConfirmButton: false,
            timer: 500,
            timerProgressBar: true,
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          handleClose();
          MySwal.fire({
            toast: true,
            position: 'top',
            icon: 'info',
            title: '취소되었습니다.',
            showConfirmButton: false,
            timer: 500,
            timerProgressBar: true,
          });
        }
      });
    }
  }, [show, handleClose, handleYes, MySwal]);

  return null; // 이 컴포넌트는 자체적으로 아무것도 렌더링하지 않습니다.
};

export default DajungModal;
