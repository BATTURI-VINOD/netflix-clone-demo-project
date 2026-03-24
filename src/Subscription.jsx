import React, { useState } from "react";

const Subscription = () => {
  const [showComingSoon, setShowComingSoon] = useState(false);

  const handleSubscribeClick = () => {
    setShowComingSoon(true);
  };

  return (
    <div className="subscription">
      <div className="subscription__header">
        <h1>Choose the plan that's right for you</h1>
        <p>Watch all you want. Ad-free. Cancel anytime.</p>
      </div>

      <div className="subscription__plans">
        <div className="plan">
          <h3>Basic</h3>
          <p className="price">$8.99/month</p>
          <ul>
            <li>Watch on 1 screen at a time</li>
            <li>HD available</li>
            <li>Unlimited movies and TV shows</li>
          </ul>
          <button className="plan-button" onClick={handleSubscribeClick}>
            Subscribe
          </button>
        </div>

        <div className="plan featured">
          <h3>Standard</h3>
          <p className="price">$13.49/month</p>
          <ul>
            <li>Watch on 2 screens at a time</li>
            <li>HD and Ultra HD available</li>
            <li>Unlimited movies and TV shows</li>
          </ul>
          <button className="plan-button" onClick={handleSubscribeClick}>
            Subscribe
          </button>
        </div>

        <div className="plan">
          <h3>Premium</h3>
          <p className="price">$17.99/month</p>
          <ul>
            <li>Watch on 4 screens at a time</li>
            <li>HD, Ultra HD and HDR available</li>
            <li>Unlimited movies and TV shows</li>
          </ul>
          <button className="plan-button" onClick={handleSubscribeClick}>
            Subscribe
          </button>
        </div>
      </div>

      {showComingSoon && (
        <div className="coming-soon-modal">
          <div className="coming-soon-content">
            <h3>This feature will be available soon</h3>
            <button
              className="coming-soon-close"
              onClick={() => setShowComingSoon(false)}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Subscription;
