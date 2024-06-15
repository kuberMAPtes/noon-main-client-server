//name=sessionId


export const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    //value = "; username=JohnDoe; sessionId=abc123; token=xyz789"
    console.log("Full cookie string with prefix: ", value);
    const partArray = value.split(`; ${name}=`);
    console.log(`Parts after splitting by "; ${name}=": `, partArray);
    //["; username=JohnDoe", "abc123; token=xyz789"]
    //pop으로 "abc123; token=xyz789"를 반환
    //split으로 ["abc123", "token=xyz789"]를 반환
    //shift로 `abc123`을 반환
    if (partArray.length === 2) return partArray.pop().split(';').shift();
    return null;
  };