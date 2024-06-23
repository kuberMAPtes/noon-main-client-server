import React, { useEffect, useState } from "react";
import { getBuildingSubscriptionCount } from "../../function/memberAxios";

const UseProfileBuildingSubscriptions = ({ toId }) => {

  const [buildingSubscriptionCount, setBuildingSubscriptionCount] = useState(0);

  useEffect(() => {
    
    if(toId){
      const fetchBuildingSubscriptions = async () => {
        const response = await getBuildingSubscriptionCount(toId);
        setBuildingSubscriptionCount(response);
      };
      fetchBuildingSubscriptions();
    }
  }, [buildingSubscriptionCount, toId]);

  return { buildingSubscriptionCount };
};

export default UseProfileBuildingSubscriptions;
