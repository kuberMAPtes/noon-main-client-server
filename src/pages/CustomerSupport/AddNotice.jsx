import React, { useState, useRef, useMemo } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../CustomerSupport/css/text-editor.css';
import axiosInstance from '../../lib/axiosInstance';
import { useSelector } from 'react-redux';

import CustomerSupportHeader from './components/CustomerSupportHeader';
import Footer from '../../components/common/Footer';

const AddNotice = () => {
  const member = useSelector((state) => state.auth.member);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const quillRef = useRef(null);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleTextChange = (value) => {
    setContent(value);
  };

  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append('attachment', file);

    try {
      const response = await axiosInstance.post('/customersupport/uploadImage', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(JSON.stringify(response.data));

      return response.data; // 서버에서 반환한 이미지 URL
    } catch (error) {
      console.error('Error uploading attachment:', error);
      return null;
    }
  };

  const insertImage = async () => {

    console.log("insertImage");

    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files[0];

      if (file) {
        const imageUrl = await handleImageUpload(file);
        console.log(imageUrl);

        if (imageUrl) {
          const quill = quillRef.current.getEditor();
          const range = quill.getSelection();
          quill.insertEmbed(range.index, 'image', imageUrl);
          console.log(`Inserted image URL: ${imageUrl}`);
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
      console.log('Notice added:', response.data);
    } catch (error) {
      console.error('Error adding notice:', error);
    }
  };

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          ['image'],
          [{ header: [1, 2, 3, false] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        ],
        handlers: {
          image: insertImage,
        },
      },
    };
  }, []);

  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
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
          style={{ height: '300px', marginBottom: '50px' }}
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
