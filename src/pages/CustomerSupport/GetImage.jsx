import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation  } from 'react-router-dom';
import axios from 'axios';
import CustomerSupportHeader from './components/CustomerSupportHeader';
import Footer from '../../components/common/Footer';
import UpdateUnlockTimeModal from '../CustomerSupport/components/UpdateUnlockTimeModal'
import MessageModal from './components/MessageModal';
import axiosInstance from '../../lib/axiosInstance';

import messages from './metadata/messages';

const handleBlur = async(attachment,setLoading,setAttachmentList) => {

  console.log('블러 처리하기'+JSON.stringify(attachment));

  setLoading(true);
  try {

    const response = await axiosInstance.post(`/customersupport/addBlurFile`, {
      attachmentId : attachment.attachmentId
    });
    
    console.log("블러 결과 : " + JSON.stringify(response.data));
    setAttachmentList(response.data);

  } catch (error) {
    console.error("Error fetching attachment:", error);
  } finally {
    setLoading(false);
  }

};/// end of handleBlur




const handleDelete = async(attachment, unlockDuration) => {

  console.log('피드 삭제 및 계정 잠금'+JSON.stringify(attachment));

  try {

    const response = await axiosInstance.post(`/customersupport/deleteBadFeed`, {
      feedId: attachment.feedId
    }, {
      params: {
        reqUnlockDuration: unlockDuration
      }
    });
    
    console.log("피드 삭제 및 계정 잠금 결과 : " + JSON.stringify(response.data));

  } catch (error) {
    console.error("Error fetching attachment:", error);
  } finally {
  }

};/// end of handleDelete



const GetImage = () => {

  const location = useLocation();
  const { attachment } = location.state || {};
  const [loading, setLoading] = useState(false);
  const [attachmentList, setAttachmentList] = useState([]);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [blurModalOpen, setBlurModalOpen] = useState(false);

  const toggleDeleteModal = () => {
    setDeleteModalOpen(!deleteModalOpen);
  };

  const toggleBlurModal = () => {
    handleBlur(attachment,setLoading,setAttachmentList)
    setBlurModalOpen(!blurModalOpen);
  };

  const handleUnlockSubmit = (unlockDuration) => {
    handleDelete(attachment, unlockDuration);
  };
  

  console.log("첨부파일 정보: "+JSON.stringify(attachment));


  return (
    <div>

      <CustomerSupportHeader title="사진 상세보기" />

      <div style={styles.imageContainer}>
        <img src={attachment.fileUrl} alt="피드 사진" style={styles.image} />
      </div>
      <div style={styles.buttonContainer}>
        <button onClick={toggleBlurModal} style={styles.button}>블러 처리</button>
        <MessageModal isOpen={blurModalOpen} toggle={toggleBlurModal} message={messages.blur}/>

        <button onClick={toggleDeleteModal} style={styles.button}>
          피드 삭제
        </button>
        <UpdateUnlockTimeModal isOpen={deleteModalOpen} toggle={toggleDeleteModal}  onSubmit={handleUnlockSubmit} />


      </div>

      <Footer/>

    </div>
  );
};/// end of GetImage









const styles = {


  imageContainer: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginBottom: '25px',
    marginTop: '30px',
  },
  image: {
    maxWidth: '80%',
    maxHeight: '60vh',
    borderRadius: '5px',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    width: '100%',
    height: '30%',
  },
  button: {
    backgroundColor: '#030722',
    border: 'none',
    color: '#fff',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    width: '30%',
    height: '30%',
  },
};

export default GetImage;
