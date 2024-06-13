import React, { useState } from 'react';

import CustomerSupportHeader from './components/CustomerSupportHeader';
import Footer from '../../components/common/Footer';

const allImages = [
    'https://search.pstatic.net/sunny/?src=https%3A%2F%2Fimg.animalplanet.co.kr%2Fnews%2F2020%2F09%2F11%2F700%2F79xnbi9913943r06p737.jpg&type=a340',
    'https://search.pstatic.net/common/?src=http%3A%2F%2Fimgnews.naver.net%2Fimage%2F081%2F2023%2F12%2F07%2F0003414786_001_20231207160603024.jpg&type=a340',
    'https://search.pstatic.net/sunny/?src=https%3A%2F%2Fimg.animalplanet.co.kr%2Fnews%2F2020%2F08%2F26%2F700%2F504prt495cw1c2v0s3e6.jpg&type=a340',
    'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2F20130430_126%2Fafterplus1_1367307217299tpQ4v_JPEG%2F%25BE%25C6%25B1%25E2%25C8%25A3%25B6%25FB%25C0%25CC.jpg&type=a340',
    'https://search.pstatic.net/common/?src=http%3A%2F%2Fshop1.phinf.naver.net%2F20220314_237%2F1647223078623EEsyf_JPEG%2F48358858287485271_1030332177.jpg&type=a340',
    'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzExMTZfNTQg%2FMDAxNzAwMTI1Mzk2Njk2.eUd4RBVPoPemqYLyL36VnjChZNGm86ChkWTUMkqoGAEg.ZrYaAoVXdwVaO6Nr1f9dooNga4HijDWV6nj0utKUIccg.PNG.2dwb0103%2FScreenshot_20231116-175919.png&type=a340',
    'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNDA1MTFfMTM2%2FMDAxNzE1Mzg0OTE0ODI3.GU7wYrHltzp6EG9svhNbLi7cZU-yTm_VdCR5n_0p_aIg.2_Mp61o2j0idzoKCOeSNcC0OsV9M-mTKd4oxplFvUzwg.PNG%2F%25C1%25A6%25B8%25F1%25C0%25BB_%25C0%25D4%25B7%25C2%25C7%25D8%25C1%25D6%25BC%25BC%25BF%25E4_-001_-_2024-05-11T084153.722.png&type=a340',
    'https://search.pstatic.net/sunny/?src=https%3A%2F%2Fupload3.inven.co.kr%2Fupload%2F2021%2F08%2F29%2Fbbs%2Fi16234365567.png%3FMW%3D800&type=a340',
    'https://search.pstatic.net/sunny/?src=https%3A%2F%2Fi.pinimg.com%2Foriginals%2Ff9%2F7d%2F29%2Ff97d29b1ecad9d89ee9c6208c8d6a404.jpg&type=a340',
    'https://search.pstatic.net/sunny/?src=http%3A%2F%2Ffile3.instiz.net%2Fdata%2Ffile3%2F2021%2F11%2F23%2F1%2Fb%2F8%2F1b86e0ac3099983d751361e165af6d46.gif&type=ofullfill340_600_png',
    'https://search.pstatic.net/sunny/?src=https%3A%2F%2Fimg4.tmon.kr%2Fcdn4%2Fdeals%2F2022%2F12%2F30%2F16447776498%2Ffront_6d755_jurkm.jpg&type=a340',
    'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzEwMTdfNDkg%2FMDAxNjk3NTI2NzU4MjAz.kzX9Mhp-lZYWsFDLPHC962fnAWpfTBVoGUUxJMlkTe0g.kCQdOA4kznre8S5XPYfXw1LXoOaJkwzua7nPU1SaUwMg.PNG.lhspdb8%2Fimage.png&type=a340',
    'https://search.pstatic.net/common/?src=http%3A%2F%2Fcafefiles.naver.net%2FMjAyMDAxMjJfMjY5%2FMDAxNTc5NjY3Njg2Nzkz.udmu0ceoRcANX19EOMPfac0-QesmKd6oxSBs8TtsEIAg.kwkFjd-he0kpszPAsg_h8RuMxRCv5ww4OQzOuWv6GCgg.JPEG%2FexternalFile.jpg&type=a340',
    
    
  ];

const badImages = [
    'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNDA1MTFfMTM2%2FMDAxNzE1Mzg0OTE0ODI3.GU7wYrHltzp6EG9svhNbLi7cZU-yTm_VdCR5n_0p_aIg.2_Mp61o2j0idzoKCOeSNcC0OsV9M-mTKd4oxplFvUzwg.PNG%2F%25C1%25A6%25B8%25F1%25C0%25BB_%25C0%25D4%25B7%25C2%25C7%25D8%25C1%25D6%25BC%25BC%25BF%25E4_-001_-_2024-05-11T084153.722.png&type=a340',
    'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzExMTZfNTQg%2FMDAxNzAwMTI1Mzk2Njk2.eUd4RBVPoPemqYLyL36VnjChZNGm86ChkWTUMkqoGAEg.ZrYaAoVXdwVaO6Nr1f9dooNga4HijDWV6nj0utKUIccg.PNG.2dwb0103%2FScreenshot_20231116-175919.png&type=a340',
    'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzEwMTdfNDkg%2FMDAxNjk3NTI2NzU4MjAz.kzX9Mhp-lZYWsFDLPHC962fnAWpfTBVoGUUxJMlkTe0g.kCQdOA4kznre8S5XPYfXw1LXoOaJkwzua7nPU1SaUwMg.PNG.lhspdb8%2Fimage.png&type=a340',
    'https://search.pstatic.net/common/?src=http%3A%2F%2Fimgnews.naver.net%2Fimage%2F081%2F2023%2F12%2F07%2F0003414786_001_20231207160603024.jpg&type=a340'
  
];

const ListImages = () => {
  const [activeTab, setActiveTab] = useState('all');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const images = activeTab === 'all' ? allImages : badImages;

  return (

  

    <div style={styles.container}>
      <CustomerSupportHeader title={activeTab === 'all' ? '모든 피드 사진 목록' : '유해 피드 사진 목록'} />
      <div style={styles.tabs}>
        <button
          style={{ ...styles.tabButton, ...(activeTab === 'all' ? styles.activeTab : {}) }}
          onClick={() => handleTabChange('all')}
        >
          <span role="img" aria-label="all">📸</span>
        </button>
        <button
          style={{ ...styles.tabButton, ...(activeTab === 'popular' ? styles.activeTab : {}) }}
          onClick={() => handleTabChange('popular')}
        >
          <span role="img" aria-label="popular">🌟</span>
        </button>
      </div>
      <div style={styles.grid}>
        {images.map((url, index) => (
          <img key={index} src={url} alt={`Feed ${index}`} style={styles.image} />
        ))}
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
  tabs: {
    display: 'flex',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: '10px',
  },
  tabButton: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#fff',
    fontSize: '20px',
  },
  activeTab: {
    borderBottom: '2px solid #fff',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
    gap: '10px',
    width: '100%',
  },
  image: {
    width: '100%',
    height: 'auto',
    borderRadius: '10px',
  },
};

export default ListImages;
