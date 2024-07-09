import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axiosInstance from '../../../lib/axiosInstance';
import { CardBody, CardTitle, Button, Card, Spinner } from 'reactstrap';
import '../css/building-chart.css';

const BuildingChart = () => {
  const [cSelected, setCSelected] = useState([1]);
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: []
  });

  const fetchChartData = async (type) => {
    try {
      const response = await axiosInstance.get(`/buildingProfile/getChart`, {
        params: { reqType: type }
      });

      if (response === null || response.data.length === 0) {
        return [];
      }

      return response.data;
    } catch (error) {
      console.error('Error fetching chart data:', error);
      return [];
    }
  };

  const updateChartData = async () => {
    setLoading(true);
    const subscriberResponse = cSelected.includes(1) ? await fetchChartData("SUBSCRIBER") : [];
    const feedResponse = cSelected.includes(2) ? await fetchChartData("FEED") : [];
    const chatResponse = cSelected.includes(3) ? await fetchChartData("CHAT") : [];


    const newLabels = subscriberResponse.length ? subscriberResponse.map(item => item.buildingName.substring(0, 15)) :
                      feedResponse.length ? feedResponse.map(item => item.buildingName.substring(0,15)) :
                      chatResponse.length ? chatResponse.map(item => item.buildingName.substring(0, 15)) : [];
    setChartData({
      labels: newLabels,
      datasets: [
        {
          label: '구독자 수',
          data: subscriberResponse.map(item => item.cnt),
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderWidth: 2,
          barThickness: 10,
          maxBarThickness: 50
        },
        {
          label: '피드 수',
          data: feedResponse.map(item => item.cnt),
          backgroundColor: 'rgba(153,102,255,0.4)',
          borderColor: 'rgba(153,102,255,1)',
          borderWidth: 2,
          barThickness: 10,
          maxBarThickness: 50
        },
        {
          label: '채팅방 수',
          data: chatResponse.map(item => item.cnt),
          backgroundColor: 'rgba(255,159,64,0.4)',
          borderColor: 'rgba(255,159,64,1)',
          borderWidth: 2,
          barThickness: 10,
          maxBarThickness: 50
        }
      ]
    });

    setLoading(false);
  };


  useEffect(() => {
    if (cSelected.length === 0) {
      setCSelected([1]);
    }
    updateChartData();
  }, [cSelected]);

  useEffect(() => {
    updateChartData();
  }, []);

  const toggleSelected = async(index) => {
    setCSelected(prevSelected =>
      prevSelected.includes(index) ? prevSelected.filter(i => i !== index) : [...prevSelected, index]
    );
  };

  return (
    <div>
      <Card style={{ width: '88%', margin: '0 auto' }}>
        <CardTitle>건물 정보 차트</CardTitle>
        <CardBody>
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
              <Spinner style={{ width: '3rem', height: '3rem' }} color="primary" />
            </div>
          ) : (
            <div style={{ overflowX: 'scroll', width: '100%', margin: '0 auto' }}>
              <div style={{ width: `${chartData.labels.length * 60}px`, height: '200px' }}>
                <Bar
                  data={chartData}
                  options={{
                    maintainAspectRatio: false,
                    scales: {
                      x: {
                        display: true,
                        title: {
                          display: true,
                          text: 'Building ID'
                        },
                        barPercentage: 1,
                        categoryPercentage: 1,
                      },
                      y: {
                        display: true,
                        title: {
                          display: true,
                          text: 'Count'
                        }
                      }
                    }
                  }}
                />
              </div>
            </div>
          )}
        </CardBody>
        <div className="button-group">
          <div
            className={`toggle-button ${cSelected.includes(1) ? 'active' : ''}`}
            onClick={() => toggleSelected(1)}
          >
            구독자 수
          </div>
          <div
            className={`toggle-button ${cSelected.includes(2) ? 'active' : ''}`}
            onClick={() => toggleSelected(2)}
          >
            피드 수
          </div>
          <div
            className={`toggle-button ${cSelected.includes(3) ? 'active' : ''}`}
            onClick={() => toggleSelected(3)}
          >
            채팅방 수
          </div>
        </div>
      </Card>
    </div>
  );
};

export default BuildingChart;