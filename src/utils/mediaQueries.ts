import { useState, useEffect } from 'react';

const useMediaQuery = (screen: string): boolean => {
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    const query = `(min-width: ${screen})`;
    const media = window.matchMedia(query);

    const handleMediaChange = (event: MediaQueryListEvent): void => {
      setMatches(event.matches);
    };

    const initialEvent = new MediaQueryListEvent('change', { matches: media.matches });

    handleMediaChange(initialEvent); 

    const listener = (event: MediaQueryListEvent): void => handleMediaChange(event);
    media.addEventListener('change', listener);
    return () => {
      media.removeEventListener('change', listener);
    };
  }, [screen]);

  return matches;
};

export default useMediaQuery;