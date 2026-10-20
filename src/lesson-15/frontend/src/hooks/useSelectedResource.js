// frontend/src/hooks/useSelectedResource.js

// This is going to be our "custom hook" for React
// where we're going to track the NAIT resource
// selected by the user.
import { useState } from 'react';

const STORAGE_KEY = 'selectedResource';
// "Custom hooks" in React need to start with `use`
// in their name.
// This hook will use Session Storage in the browser to
// remember the selected NAIT resource.
export function useSelectedResource() {
    const [selectedResource, setSelectedResource] = useState(() => {
        // We'll try to retrieve the selected resource from Session state
        try {
            const stored = sessionStorage.getItem(STORAGE_KEY);
            if (stored === null) return null;
            const resource = JSON.parse(stored);
            return resource && typeof resource.id === 'string' & typeof resource.title === 'string' ? resource : null;
        } catch {
            return null;
        }
    });

    function updateSelectedResource(resource) {
        setSelectedResource(resource);
        try {
            if (resource === null) {
                sessionStorage.removeItem(STORAGE_KEY);
            } else {
                sessionStorage.setItem(STORAGE_KEY, JSON.stringify(resource));
            }
        } catch (error) {
            console.warn('Selectoin could not be saved for this tab.', error);
        }
    }
    
    return [selectedResource, updateSelectedResource];
}
