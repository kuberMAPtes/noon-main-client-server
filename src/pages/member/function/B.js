import React, { useState, useEffect } from 'react';
import { encryptWithLv,decryptWithIv } from '../../../util/crypto';
const C = () => {
  console.log('C component render');

  useEffect(() => {
    console.log('C component useEffect');
  },[]);

//   useEffect(() => {
//     console.log('C component useEffect2');
//   },[])

  return <div>Component C</div>;
};
///////////////////////////////////////////////////////////////////////////////////////
const B = () => {
  const [count, setCount] = useState(0);

  console.log('B component render');

  useEffect(() => {
    console.log('B component useEffect');
  }, [count]);
//console 먼저 하고 return 안에 있는거 하고 useEffect한다.
  return (
    <div>
      Component B
      <button onClick={() => setCount(count + 1)}>Increment B</button>
      <C />
    </div>
  );
};
////////////////////////////////////////////////////////////////////////////
const A = () => {
    const a = decryptWithIv("8IJUIOQeTJF8VIvZ+l7mYg==","dyj8n7eNe4QSotOSIMki7w==")//데이터 IV 키
    console.log("디코딩 결과"+a);

    const b = "wschoi809@naver.com";
    console.log("인코딩전",b);
    const {encryptedData,ivData} = encryptWithLv(b);
    console.log("인코딩후"+encryptedData, ivData);
    const d = decryptWithIv(encryptedData,ivData);
    console.log("디코딩후",d);



  
  useEffect(() => {
    console.log('A component useEffect');
  });

  return (
    <div>
      Component A
      <B />
    </div>
  );
};

export default A;
