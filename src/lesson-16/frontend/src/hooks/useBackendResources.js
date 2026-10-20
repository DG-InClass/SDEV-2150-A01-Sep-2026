// frontend/src/hooks/useBackendResources.js
import { useEffect, useState } from "react";

const API_BASE_URL = 'http://localhost:3000';

export function useBackendResources() {
    const [resources, setResources] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [requestVersion, setRequestVersion] = useState(0);

    useEffect(() => {
        // The AbortController allows us to "give up" on a fetch call
        const controller = new AbortController();
        const { signal } = controller;

        async function fetchResources() {
            try {
                const response = await fetch(`${API_BASE_URL}/resources`, { signal });
                if (!response.ok) {
                    throw new Error(`Request failed: ${response.status} ${response.statusText}`);
                }
                const data = await response.json();
                if (!Array.isArray(data)) {
                    throw new Error('Expected an array of resources.');
                }
                if (!signal.aborted) setResources(data);
            } catch (err) {
                if (!signal.aborted) setError(err);
            } finally {
                if (!signal.aborted) setIsLoading(false);
            }
        }

        fetchResources();
        return () => controller.abort();
    }, [requestVersion]);

    function refetch() {
        setIsLoading(true);
        setError(null);
        setRequestVersion((version) => version + 1);
    }

    return { resources, isLoading, error, refetch };
}