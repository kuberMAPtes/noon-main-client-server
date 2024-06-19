import React, { useState } from "react";
import {
  sendAuthentificationNumber,
  confirmAuthentificationNumber,
  checkMemberId,
  checkNickname,
  checkPhoneNumber,
  checkPassword,
  refreshToken,
  logout,
  addMember,
  updatePwd,
  updateProfilePhoto,
  updateProfileIntro,
  updateDajungScore,
  getMember,
  getMemberProfile,
  deleteMember,
  addMemberRelationship,
  listMembers,
  getMemberRelationshipList,
  deleteMemberRelationship,
} from "../../../member/function/memberAxios";

const TestComponent = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [authNumber, setAuthNumber] = useState("");
  const [memberId, setMemberId] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [profilePhotoDto, setProfilePhotoDto] = useState({});
  const [profileIntroDto, setProfileIntroDto] = useState({});
  const [dajungScoreDto, setDajungScoreDto] = useState({});
  const [addMemberDto, setAddMemberDto] = useState({});
  const [relationshipDto, setRelationshipDto] = useState({});
  const [criteria, setCriteria] = useState({});
  const [fromId, setFromId] = useState("");
  const [toId, setToId] = useState("");

  const handleTest = async (testFunction, ...args) => {
    try {
      const result = await testFunction(...args);
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>API Test</h1>

      <div>
        <h2>Phone Number</h2>
        <input
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Phone Number"
        />
        <button
          onClick={() => handleTest(sendAuthentificationNumber, phoneNumber)}
        >
          Send Authentification Number
        </button>
        <input
          type="text"
          value={authNumber}
          onChange={(e) => setAuthNumber(e.target.value)}
          placeholder="Auth Number"
        />
        <button
          onClick={() =>
            handleTest(confirmAuthentificationNumber, phoneNumber, authNumber)
          }
        >
          Confirm Authentification Number
        </button>
        <button onClick={() => handleTest(checkPhoneNumber, phoneNumber)}>
          Check Phone Number
        </button>
      </div>

      <div>
        <h2>Member ID</h2>
        <input
          type="text"
          value={memberId}
          onChange={(e) => setMemberId(e.target.value)}
          placeholder="Member ID"
        />
        <button onClick={() => handleTest(checkMemberId, memberId)}>
          Check Member ID
        </button>
        <button onClick={() => handleTest(deleteMember, memberId)}>
          Delete Member
        </button>
        <button onClick={() => handleTest(getMember, { memberId })}>
          Get Member
        </button>
        <button onClick={() => handleTest(updatePwd, memberId, password)}>
          Update Password
        </button>
      </div>

      <div>
        <h2>NickName</h2>
        <input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="NickName"
        />
        <button onClick={() => handleTest(checkNickname, nickname)}>
          Check NickName
        </button>
      </div>

      <div>
        <h2>Password</h2>
        <input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button onClick={() => handleTest(checkPassword, memberId, password)}>
          Check Password
        </button>
      </div>

      <div>
        <h2>Profile Photo</h2>
        <input
          type="text"
          value={profilePhotoDto.url}
          onChange={(e) => setProfilePhotoDto({ url: e.target.value })}
          placeholder="Profile Photo URL"
        />
        <button onClick={() => handleTest(updateProfilePhoto, profilePhotoDto)}>
          Update Profile Photo
        </button>
      </div>

      <div>
        <h2>Profile Intro</h2>
        <input
          type="text"
          value={profileIntroDto.intro}
          onChange={(e) => setProfileIntroDto({ intro: e.target.value })}
          placeholder="Profile Intro"
        />
        <button onClick={() => handleTest(updateProfileIntro, profileIntroDto)}>
          Update Profile Intro
        </button>
      </div>

      <div>
        <h2>Dajung Score</h2>
        <input
          type="text"
          value={dajungScoreDto.score}
          onChange={(e) => setDajungScoreDto({ score: e.target.value })}
          placeholder="Dajung Score"
        />
        <button onClick={() => handleTest(updateDajungScore, dajungScoreDto)}>
          Update Dajung Score
        </button>
      </div>

      <div>
        <h2>Add Member</h2>
        <input
          type="text"
          value={addMemberDto.memberId}
          onChange={(e) =>
            setAddMemberDto({ ...addMemberDto, memberId: e.target.value })
          }
          placeholder="Member ID"
        />
        {/* Add more fields as needed */}
        <button onClick={() => handleTest(addMember, addMemberDto)}>
          Add Member
        </button>
      </div>

      <div>
        <h2>Member Profile</h2>
        <input
          type="text"
          value={fromId}
          onChange={(e) => setFromId(e.target.value)}
          placeholder="From ID"
        />
        <input
          type="text"
          value={toId}
          onChange={(e) => setToId(e.target.value)}
          placeholder="To ID"
        />
        <button onClick={() => handleTest(getMemberProfile, fromId, toId)}>
          Get Member Profile
        </button>
      </div>

      <div>
        <h2>Member Relationship</h2>
        <input
          type="text"
          value={fromId}
          onChange={(e) => setFromId(e.target.value)}
          placeholder="From ID"
        />
        <input
          type="text"
          value={toId}
          onChange={(e) => setToId(e.target.value)}
          placeholder="To ID"
        />
        <input
          type="text"
          value={relationshipDto.relationshipType}
          onChange={(e) =>
            setRelationshipDto({
              ...relationshipDto,
              relationshipType: e.target.value,
            })
          }
          placeholder="Relationship Type"
        />
        <button
          onClick={() =>
            handleTest(
              addMemberRelationship,
              fromId,
              toId,
              relationshipDto.relationshipType,
              true
            )
          }
        >
          Add Member Relationship
        </button>
        <button
          onClick={() => handleTest(deleteMemberRelationship, fromId, toId)}
        >
          Delete Member Relationship
        </button>
      </div>

      <div>
        <h2>Members List</h2>
        <button onClick={() => handleTest(listMembers, criteria, 0, 10)}>
          List Members
        </button>
      </div>

      <div>
        <h2>Member Relationship List</h2>
        <button
          onClick={() => handleTest(getMemberRelationshipList, criteria, 0, 10)}
        >
          Get Member Relationship List
        </button>
      </div>

      <div>
        <h2>Token & Logout</h2>
        <button onClick={() => handleTest(refreshToken)}>Refresh Token</button>
        <button onClick={() => handleTest(logout)}>Logout</button>
      </div>
    </div>
  );
};

export default TestComponent;
