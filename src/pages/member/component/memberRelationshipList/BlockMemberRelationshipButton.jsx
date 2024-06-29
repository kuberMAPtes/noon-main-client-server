import React, { useCallback, useEffect, useState } from 'react';
import { Button, Col } from 'react-bootstrap';
import module from '../css/getMemberRelationshipList.module.css';
import { handleBlockCancelClickSimple, handleBlockClickSimple} from '../../function/MemberRelationshipUtil';
import { getBlockMemberRelationship } from '../../function/memberAxios';
import NormalButton from '../NormalButton';
import { MdOutlineReportGmailerrorred } from "react-icons/md";
<MdOutlineReportGmailerrorred />
const BlockMemberRelationshipButton = ({
  fromId,
  toId
}) => {
  const [relationshipFourType, setrelationshipFourType] = useState("");
  
  const fetchMemberRelationship = useCallback(async() => {
    const result = await getBlockMemberRelationship(fromId, toId);
    // alert("result : " + result);
    // result가 NONE FOLLOWER FOLLOWING MUTUAL
    if(result==="NONE"){
      setrelationshipFourType("NONE");
    }else if(result==="BLOCKER"){
      setrelationshipFourType("BLOCKER");
    }else if(result==="BLOCKING"){
      setrelationshipFourType("BLOCKING");
    }else if(result==="MUTUAL"){
      setrelationshipFourType("MUTUAL");
    }
  },[fromId,toId]);

  useEffect(()=>{
    fetchMemberRelationship();
  },[fromId, toId, fetchMemberRelationship]);

  const memoHandleBlockClickSimple = useCallback(
    async (otherId) => {
      await handleBlockClickSimple(fromId, otherId);
      fetchMemberRelationship(); // 상태를 업데이트하여 즉시 반영
    },
    [fromId,fetchMemberRelationship]
  );

  const memoHandleBlockCancelClickSimple = useCallback(
    async (otherId) => {
      await handleBlockCancelClickSimple(fromId, otherId);
      fetchMemberRelationship(); // 상태를 업데이트하여 즉시 반영
    },
    [fromId,fetchMemberRelationship]
  );

  

  let blockMemberRelationshipButton = null;

  if (relationshipFourType === "MUTUAL" || relationshipFourType === "BLOCKING") {
    blockMemberRelationshipButton = (
        <NormalButton
          size="sm"
          className={module.buttonColorMutual}
          style={{ width: "100%",margin:"20px 0px 20px 0px",padding:"0px",textAlign:"left" }}
          onClick={()=>memoHandleBlockCancelClickSimple(toId)}
        >
          <span style={{paddingRight:"20%"}}></span><MdOutlineReportGmailerrorred/><span style={{paddingLeft:"20%"}}>차단해제</span>
        </NormalButton>
    );
  } else if (relationshipFourType === "NONE" || relationshipFourType === "BLOCKER") {
    blockMemberRelationshipButton = (
        <NormalButton
          size="sm"
          style={{ width: "100%",margin:"20px 0px 20px 0px",padding:"0px", textAlign:"left" }}
          onClick={()=>memoHandleBlockClickSimple(toId)}
        >
          <span style={{paddingRight:"20%"}}></span><MdOutlineReportGmailerrorred/><span style={{paddingLeft:"20%"}}>차단하기</span>
        </NormalButton>
    );
  }

  return <>{blockMemberRelationshipButton}</>;
};

export default BlockMemberRelationshipButton;
