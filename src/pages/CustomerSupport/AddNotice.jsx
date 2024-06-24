import React, { useState, useRef, useMemo } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../CustomerSupport/css/text-editor.css';
import axiosInstance from '../../lib/axiosInstance';
import { useSelector } from 'react-redux';

import CustomerSupportHeader from './components/CustomerSupportHeader';
import Footer from '../../components/common/Footer';
import { useNavigate } from 'react-router-dom';

const AddNotice = () => {
  const member = useSelector((state) => state.auth.member);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const quillRef = useRef(null);
  const navigate = useNavigate();

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleTextChange = (value) => {
    setContent(value);
  };

  const handleAttachmentUpload = async (file) => {
    const formData = new FormData();
    formData.append('attachment', file);

    try {
      const response = await axiosInstance.post('/customersupport/uploadAttachment', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data; //오브젝트 스토리지에 저장된 이미지/동영상 url
    } catch (error) {
      console.error('Error uploading attachment:', error);
      return null;
    }
  };



  const insertImage = async () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      if (file) {
        const imageUrl = await handleAttachmentUpload(file);
        if (imageUrl) {
          const quill = quillRef.current.getEditor();
          const range = quill.getSelection();
          quill.insertEmbed(range.index, 'image', imageUrl);
        }
      }
    };
  };

  const insertVideo = async () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'video/*');
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      if (file) {
        const videoUrl = await handleAttachmentUpload(file);
        if (videoUrl) {
          const quill = quillRef.current.getEditor();
          const range = quill.getSelection();
          quill.insertEmbed(range.index, 'video', videoUrl);
        }
      }
    };
  };

  const handleAddNotice = async () => {
    const editorContent = quillRef.current.getEditor().root.innerHTML;
    const formData = new FormData();
    formData.append('writerId', member.memberId);
    formData.append('title', title);
    formData.append('feedText', editorContent);

    try {
      const response = await axiosInstance.post('/customersupport/addNotice', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      navigate('../getNotice/'+response.data.feedId);
    } catch (error) {
      console.error('Error adding notice:', error);
    }
  };

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          ['image', 'video'],
          [{ header: [1, 2, 3, false] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        ],
        handlers: {
          image: insertImage,
          video: insertVideo,
        },
      },
    };
  }, []);

  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video'
  ];

  return (
    <div>
      <CustomerSupportHeader title="공지사항 작성" />
      <div>
        <input 
          type="text" 
          placeholder="제목을 입력하세요" 
          value={title} 
          onChange={handleTitleChange} 
          style={{ width: '100%', padding: '10px', marginTop: '20px', marginBottom: '20px' }} 
        />
      </div>
      <div>
        <ReactQuill 
          ref={quillRef}
          value={content} 
          onChange={handleTextChange} 
          modules={modules} 
          formats={formats} 
          style={{ height: '550px', marginBottom: '50px' }}
        />
      </div>
      <button onClick={handleAddNotice} style={{ padding: '10px 20px', fontSize: '16px', marginBottom: '100px', backgroundColor: '#030722', color: '#FFFFFF' }}>
        등록
      </button>
      <Footer/>
    </div>
  );
};

export default AddNotice;
