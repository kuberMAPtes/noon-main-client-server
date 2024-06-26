import React, { useEffect, useState } from 'react';
import CustomerSupportHeader from './components/CustomerSupportHeader';
import ImageGrid from './components/OneImage';
import '../CustomerSupport/css/image-grid.css';
import axiosInstance from '../../lib/axiosInstance';
import Footer from '../../components/common/Footer';
import LoadingModal from './components/LoadingModal';
import '../building/css/tab-navigation.css';

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
  const [gridClass, setGridClass] = useState('grid-2-columns'); // 기본 2열 그리드
  const [endOfImages, setEndOfImages] = useState(false);

  const handleTabChange = (tab) => {
    setFilterTab(tab);
  };

  const handleGridChange = (gridType) => {
    setGridClass(gridType);
  };

  const handleGoUp = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScroll = () => {
    const bottom = Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight;
    setEndOfImages(bottom);
  };

  useEffect(() => {
    getImageList(currentPage, filterTab, setAttachmentList, setLoading);
  }, [filterTab]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div>
      <CustomerSupportHeader title={filterTab === "all" ? '모든 피드 사진 목록' : '유해 피드 사진 목록'} />
      <div style={styles.tabs}>
        <button
          style={{ ...styles.tabButton, ...(filterTab === "all" ? styles.activeTab : {}) }}
          onClick={() => handleTabChange("all")}
        >
          <span role="img" aria-label="all"><i style={{ color: "#9BAAF8" }} className="fa-solid fa-images"></i>&nbsp;ALL</span>
        </button>
        <button
          style={{ ...styles.tabButton, ...(filterTab === "bad" ? styles.activeTab : {}) }}
          onClick={() => handleTabChange("bad")}
        >
          <span role="img" aria-label="bad"><i style={{ color: "#9BAAF8" }} className="fa-solid fa-triangle-exclamation"></i>&nbsp;BAD</span>
        </button>
      </div>
      <div style={styles.grid}>
        {loading ? (
          <LoadingModal show={loading} />
        ) : (
          <div className={`image-grid-container ${gridClass}`}>
            <ImageGrid attachmentList={attachmentList} />
          </div>
        )}
      </div>
      {endOfImages && (
        <div style={styles.endMessage}>End of images</div>
      )}

      <button className="create-button" onClick={handleGoUp}>
        <i className="fa fa-arrow-up"></i>
      </button>
      <Footer />
    </div>
  );
};

const styles = {
  tabs: {
    display: 'flex',
    justifyContent: 'space-around',
    width: '100%',
  },
  tabButton: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#030722',
    fontSize: '20px',
  },
  activeTab: {
    borderBottom: '3px solid #D9D9D9',
    width: '35%', 
  },
  grid: {
    width: '92%',
    margin: '0 auto', 
    marginBottom: '120px', 
  },
  loading: {
    color: '#D9D9D9',
    fontSize: '20px',
    textAlign: 'center',
  },
  endMessage: {
    textAlign: 'center',
    color: '#030722',
    fontSize: '18px',
    padding: '10px',
    marginBottom: '20px'
  }
};

export default ListImages;
