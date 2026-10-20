// The useEffect() hook is needed when we have
// data depedencies that reach "outside" our
// app. (In this case, the backend API server)
import { useEffect, useState } from 'react';

const STORAGE_KEY = 'selectedResource';

export function useSelectedResource() {
  const [selectedResource, setSelectedResource] = useState(() => {
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      if (stored === null) return null;
      const resource = JSON.parse(stored);
      return resource && typeof resource.id === 'string' && typeof resource.title === 'string' ? resource : null;
    } catch {
      return null;
    }
  });

  // I'm putting my session storage updating into the useEffect hook
  useEffect(() => {
    try {
      if (selectedResource === null) {
        sessionStorage.removeItem(STORAGE_KEY);
      } else {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(selectedResource));
      }
    } catch (error) {
      console.warn('Selection could not be saved for this tab.', error);
    }
  }, [selectedResource]);

  // function updateSelectedResource(resource) {
  //   setSelectedResource(resource);

  //   if (resource === null) {
  //     sessionStorage.removeItem(STORAGE_KEY);
  //   } else {
  //     sessionStorage.setItem(STORAGE_KEY, JSON.stringify(resource));
  //   }
  // }

  return [selectedResource, setSelectedResource];
}
