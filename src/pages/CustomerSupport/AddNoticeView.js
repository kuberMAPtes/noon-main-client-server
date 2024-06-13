import React, { useState } from 'react';
import { Editor, EditorProvider } from 'react-simple-wysiwyg';

const AddNoticeView = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //서버로 보내는 로직 추가
    console.log('Title:', title);
    console.log('Content:', content);
  };

  return (
    <EditorProvider>
        <div>
        <h2>공지사항 작성</h2>
        <form onSubmit={handleSubmit}>
            <div>
            <label htmlFor="title">제목:</label>
            <input
                type="text"
                id="title"
                value={title}
                onChange={handleTitleChange}
            />
            </div>
            <div>
            <label htmlFor="content">내용:</label>
            <Editor
                id="content"
                value={content}
                onChange={handleContentChange}
            />
            </div>
            <button type="submit">제출</button>
        </form>
        </div>
    </EditorProvider>
    
  );
};

export default AddNoticeView;
