import { addMemberRelationship, deleteMemberRelationship } from "./memberAxios";

export const handleFollowClick = async (fromId,toId,refetchData) => {
  // alert("팔로우 클릭"+ JSON.stringify(fromId) + " " + JSON.stringify(toId) + " " + refetchData);
  const relationshipType = "FOLLOW";
  const activated = true;
  const isDone = await addMemberRelationship(fromId,toId,relationshipType,activated);
  refetchData();
};

export const handleFollowCancelClick = async (fromId,toId,refetchData) => {
  // alert("팔로우 해제  클릭"+ fromId + " " + toId + " " + refetchData);
  const relationshipType = "FOLLOW";
  const activated = false;
  const isDone = await deleteMemberRelationship(fromId,toId,relationshipType,activated);
  refetchData();
};
export const handleBlockCancelClick = async (fromId,toId,refetchData) => {
  // alert("차단 해제 클릭"+ fromId + " " + toId + " " + refetchData);
  const relationshipType = "BLOCK";
  const activated = false;
  const isDone = await deleteMemberRelationship(fromId,toId,relationshipType,activated);
  refetchData();
};
export const handleFollowClickSimple = async (fromId,toId) => {
  // alert("팔로우 클릭"+ JSON.stringify(fromId) + " " + JSON.stringify(toId) + " " + refetchData);
  const relationshipType = "FOLLOW";
  const activated = true;
  const isDone = await addMemberRelationship(fromId,toId,relationshipType,activated);
  return isDone;
};
export const handleFollowCancelClickSimple = async (fromId,toId) => {
  // alert("팔로우 해제  클릭"+ fromId + " " + toId + " " + refetchData);
  const relationshipType = "FOLLOW";
  const activated = false;
  const isDone = await deleteMemberRelationship(fromId,toId,relationshipType,activated);
  
  return isDone;

};

export const handleBlockCancelClickSimple = async (fromId,toId) => {
  const relationshipType = "BLOCK";
  const activated = false;
  const isDone = await deleteMemberRelationship(fromId,toId,relationshipType,activated);
  
  return isDone;

};
export const handleBlockClickSimple = async (fromId,toId) => {
  const relationshipType = "BLOCK";
  const activated = true;
  const isDone = await addMemberRelationship(fromId,toId,relationshipType,activated);

  return isDone;

};
