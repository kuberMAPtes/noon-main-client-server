import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axiosInstance from '../../../lib/axiosInstance';
import { CardBody, CardFooter, CardTitle } from 'reactstrap';
import {
    Button,
    Card
  } from "reactstrap";

const BuildingChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: []
  });

  const [reqType, setReqType] = useState("SUBSCRIBER");

  const fetchChartData = async () => {
    try {
      const response = await axiosInstance.get(`/buildingProfile/getChart`, {
        params: { reqType: reqType }
      });

      if (response === null || response.data.length === 0) {
        setChartData({
          labels: [],
          datasets: []
        });
        return;
      }

      const labels = response.data.map(item => item.buildingId);
      const data = response.data.map(item => item.cnt);

      setChartData({
        labels: labels,
        datasets: [
          {
            label: '구독자 수',
            data: data,
            fill: false,
            backgroundColor: '#f3f0ff',
            borderColor: '#9BAAF8 ',
            borderWidth: 2,
            barThickness: 40, 
            maxBarThickness: 50 
          }
        ]
      });
    } catch (error) {
      console.error('Error fetching chart data:', error);
    }
  };

  useEffect(() => {
    fetchChartData();
  }, [reqType]);

  return (
    
    <div>


        <Card style={{width: '88%', margin: '0 auto'}}>

            <CardTitle>
                건물 정보 차트
            </CardTitle> 

            <CardBody>
                <div style={{ overflowX: 'scroll', width: '100%', margin: '0 auto'  }}>
                    <div style={{ width: `${chartData.labels.length * 60}px`, height: '300px' }}>
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
            </CardBody>

            <CardFooter>
                <Button>구독자수</Button>
                <Button>피드개수</Button>
                <Button>채팅방수</Button>
            </CardFooter>

        </Card>

    </div>
  );
};

export default BuildingChart;
