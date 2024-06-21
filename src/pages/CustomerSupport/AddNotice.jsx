import React, { useState, useRef, useEffect, useMemo } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../CustomerSupport/css/text-editor.css';
import axiosInstance from '../../lib/axiosInstance';

import CustomerSupportHeader from './components/CustomerSupportHeader';
import Footer from '../../components/common/Footer';




const AddNotice = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const quillRef = useRef(null);


  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleTextChange = (value) => {
    setContent(value);
  };

  const handleAddNotice = async () => {
    try {
      const response = await axiosInstance.post('/customersupport/addNotice', {
        title: title,
        feedText: content,
      });
      console.log('Notice added:', response.data);
    } catch (error) {
      console.error('Error adding notice:', error);
    }
  };

  const handleImageUpload = (file) => {
    const formData = new FormData();
    formData.append('image', file);

    axiosInstance.post('/customersupport/addNotice', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(response => {
        const quill = quillRef.current.getEditor();
        const range = quill.getSelection();
        quill.insertEmbed(range.index, 'image', response.data.imageUrl);
      })
      .catch(error => {
        console.error('Error uploading image:', error);
      });
  };

  useEffect(() => {
    const observer = new MutationObserver(() => {
      // 필요한 로직 추가
    });
    const editor = quillRef.current.getEditor().root;
    observer.observe(editor, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
    };
  }, []);


  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          ['image'],
          [{ header: [1, 2, 3, false] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        ],
        handlers: {
          image: () => {
            const input = document.createElement('input');
            input.setAttribute('type', 'file');
            input.setAttribute('accept', 'image/*');
            input.click();
  
            input.onchange = () => {
              const file = input.files[0];
              if (file) {
                handleImageUpload(file);
              }
            };
          },
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
          style={{ height: '350px', marginBottom: '50px' }}
        />
      </div>
      <button onClick={handleAddNotice} style={{ padding: '10px 20px', fontSize: '16px', marginBottom: '100px',  backgroundColor: '#030722'}}>
        등록
      </button>
      <Footer/>
    </div>
  );
};

export default AddNotice;
