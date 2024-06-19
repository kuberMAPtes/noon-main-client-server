import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

const UseProfileBuildingSubscriptions = ({toId}) => {

    const fromId = useSelector((state) => state.auth.member.memberId);
    
    
    useEffect(()=>{
        const fetchBuildingSubscriptions = async () => {
            console.log("Fetching building subscriptions","From ID:",fromId,"To ID:",toId);
            // const response = await getBuildingSubscriptionList(fromId, toId);
            // console.log("Building subscriptions:", response);
            // const buildingSubscriptionCount = response.length;
            const buildingSubscriptionCount = 0;
        }   
    })

    return {buildingSubscriptionCount};
};

export default UseProfileBuildingSubscriptions;