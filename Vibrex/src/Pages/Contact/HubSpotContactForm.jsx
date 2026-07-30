import { useEffect } from 'react';

function HubSpotContactForm() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://js-na2.hsforms.net/forms/embed/246889719.js';
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      // cleanup jab component unmount ho
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div
      className="hs-form-frame"
      data-region="na2"
      data-form-id="c0a470a4-15d6-4f6c-ac3a-603c478e490b"
      data-portal-id="246889719"
    ></div>
  );
}

export default HubSpotContactForm;