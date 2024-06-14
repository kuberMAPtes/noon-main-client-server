import React, { useState } from 'react';

const Subscription = () => {
  const [subscribed, setSubscribed] = useState(false);

  return (
    <div className="subscription">
      <span>3680 구독자 수</span>
      <button onClick={() => setSubscribed(!subscribed)}>
        {subscribed ? '구독중' : '구독'}
      </button>
    </div>
  );
};

export default Subscription;