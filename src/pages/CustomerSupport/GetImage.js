import React from 'react';
import CustomerSupportHeader from './components/CustomerSupportHeader';
import Footer from '../../components/common/Footer';


const GetImage = () => {
  
  const handleBlur = () => {
    console.log('블러 처리');
    // 블러 처리 로직 추가
  };

  const handleDelete = () => {
    console.log('피드 삭제 및 계정 잠금');
    // 삭제 및 계정 잠금 로직 추가
  };

  return (
    <div style={styles.container}>
        <CustomerSupportHeader title="피드 사진 상세보기" />
      <div style={styles.imageContainer}>
        <img src={ 'https://search.pstatic.net/sunny/?src=https%3A%2F%2Fimg.animalplanet.co.kr%2Fnews%2F2020%2F09%2F11%2F700%2F79xnbi9913943r06p737.jpg&type=a340'
} alt="피드 사진" style={styles.image} />
      </div>
      <div style={styles.buttonContainer}>
        <button onClick={handleBlur} style={styles.button}>블러 처리</button>
        <button onClick={handleDelete} style={styles.button}>피드 삭제 및 계정 잠금</button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '10px',
    backgroundColor: '#000',
    color: '#fff',
    height: '100vh',
    width: '100%',
    boxSizing: 'border-box',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: '10px',
  },
  backButton: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#fff',
    fontSize: '20px',
  },
  title: {
    flexGrow: 1,
    textAlign: 'center',
  },
  iconButton: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#fff',
    fontSize: '20px',
  },
  imageContainer: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginBottom: '10px',
  },
  image: {
    maxWidth: '100%',
    maxHeight: '60vh',
    borderRadius: '10px',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    width: '100%',
  },
  button: {
    backgroundColor: '#444',
    border: 'none',
    color: '#fff',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default GetImage;
