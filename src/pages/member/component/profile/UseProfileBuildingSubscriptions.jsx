import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const UseProfileBuildingSubscriptions = ({toId}) => {

    const fromId = useSelector((state) => state.auth.member.memberId);
    
    const [buildingSubscriptionCount,setBuildingSubscriptionCount] = useState(0);
    
    useEffect(()=>{
        const fetchBuildingSubscriptions = async () => {
            console.log("Fetching building subscriptions","From ID:",fromId,"To ID:",toId);
            // const response = await getBuildingSubscriptionList(fromId, toId);
            // console.log("Building subscriptions:", response);
            // const receivedBuildingSubscriptionCount = response.length;
            const receivedBuildingSubscriptionCount = 100;
            setBuildingSubscriptionCount(receivedBuildingSubscriptionCount);
        }   
        fetchBuildingSubscriptions();

    },[buildingSubscriptionCount, fromId, toId])

    return {buildingSubscriptionCount};
};

export default UseProfileBuildingSubscriptions;