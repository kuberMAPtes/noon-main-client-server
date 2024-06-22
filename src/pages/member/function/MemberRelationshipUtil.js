import { addMemberRelationship, deleteMemberRelationship } from "./memberAxios";

export const handleFollowClick = async (fromId,toId,refetchData) => {
  // alert("팔로우 클릭"+ JSON.stringify(fromId) + " " + JSON.stringify(toId) + " " + refetchData);
  const relationshipType = "FOLLOW";
  const activated = true;
  const isDone = await addMemberRelationship(fromId,toId,relationshipType,activated);
  if(isDone!==true){
    alert("팔로우 성공");
    refetchData();
  }
};

export const handleFollowCancelClick = async (fromId,toId,refetchData) => {
  // alert("팔로우 해제  클릭"+ fromId + " " + toId + " " + refetchData);
  const relationshipType = "FOLLOW";
  const activated = false;
  const isDone = await deleteMemberRelationship(fromId,toId,relationshipType,activated);
  if(isDone!==true){
    alert("팔로우 취소 성공");
    refetchData();
  }
};

export const handleBlockCancelClick = async (fromId,toId,refetchData) => {
  // alert("차단 해제 클릭"+ fromId + " " + toId + " " + refetchData);
  const relationshipType = "BLOCK";
  const activated = false;
  const isDone = await deleteMemberRelationship(fromId,toId,relationshipType,activated);
  if(isDone!==true){
    alert("차단 취소 성공");
    refetchData();
  }
};