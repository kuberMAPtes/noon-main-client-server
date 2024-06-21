import React, { useEffect, useState } from 'react';
import CustomerSupportHeader from './components/CustomerSupportHeader';
import ImageGrid from './components/OneImage';
import '../CustomerSupport/css/image-grid.css';
import axiosInstance from '../../lib/axiosInstance';
import Footer from '../../components/common/Footer';




const getImageList = async (currentPage, filterTab, setAttachmentList, setLoading) => {

  setLoading(true);
  try {
    
    const response = await axiosInstance.get(`/customersupport/${filterTab === "bad" ? 'getFilteredListByAI' : 'getImageList'}`, {
      params: { currentPage: currentPage }  
    });
    
    console.log("attachmentList : " + JSON.stringify(response.data));
    setAttachmentList(response.data);
  } catch (error) {
    console.error("Error fetching image list:", error);
  } finally {
    setLoading(false);
  }
}



const ListImages = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [filterTab, setFilterTab] = useState("all");
    const [attachmentList, setAttachmentList] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleTabChange = (tab) => {
      setFilterTab(tab);
    };

  useEffect(() => {
    getImageList(currentPage, filterTab, setAttachmentList, setLoading);
  }, [filterTab]);

  return (
    <div>
      <CustomerSupportHeader title={filterTab === "all" ? '모든 피드 사진 목록' : '유해 피드 사진 목록'} />
      <div style={styles.tabs}>
        <button
          style={{ ...styles.tabButton, ...(filterTab === "all" ? styles.activeTab : {}) }}
          onClick={() => handleTabChange("all")}
        >
          <span role="img" aria-label="all">📸</span>
        </button>
        <button
          style={{ ...styles.tabButton, ...(filterTab === "bad" ? styles.activeTab : {}) }}
          onClick={() => handleTabChange("bad")}
        >
          <span role="img" aria-label="bad">⚠️</span>
        </button>
      </div>
      <div style={styles.grid}>
        {loading ? (
          <div style={styles.loading}>이미지 로딩 중...</div> 
        ) : (
          <ImageGrid attachmentList={attachmentList} />
        )}
      </div>
    
      <Footer/>
    </div>

    
  );
};

const styles = {
  tabs: {
    display: 'flex',
    justifyContent: 'space-around',
    width: '100%',
    /*marginBottom: '10px',*/
  },
  tabButton: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#fff',
    fontSize: '20px',
  },
  activeTab: {
    borderBottom: '2.5px solid #030722',
    width: '25%', 
  },
  grid: {
    width: '100%',
  },
  loading: {
    color: '#111',
    fontSize: '20px',
    textAlign: 'center',
  },
};

export default ListImages;
