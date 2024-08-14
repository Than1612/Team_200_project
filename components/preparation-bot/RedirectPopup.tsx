import React, { useEffect } from 'react';

interface RedirectPopupProps {
  url: string;
}

const RedirectPopup: React.FC<RedirectPopupProps> = ({ url }) => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  }, [url]);

  return null; // No UI, just side effect
};

export default RedirectPopup;

