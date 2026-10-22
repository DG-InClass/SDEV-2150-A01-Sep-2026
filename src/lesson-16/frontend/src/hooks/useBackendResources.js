// frontend/src/hooks/useBackendResources.js
import { useEffect, useState } from "react";

const API_BASE_URL = 'http://localhost:3000';
const API_GET_RESOURCES = `${API_BASE_URL}/resources`;

export function useBackendResources() {
    const [resources, setResources] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    // const [requestVersion, setRequestVersion] = useState(0);

    useEffect(() => {
        // The controller lets our cleanup function cancel the request (e.g. on unmount)
        const controller = new AbortController();
        // Cancel if WE abrot it, OR if the server takes too long
        const signal = AbortSignal.any([controller.signal, AbortSignal.timeout(5000)]);
        console.log('Begin fetch');
        fetch(API_GET_RESOURCES, { signal })
            .catch((err) => {
                // fetch() only rejects when no response arrived at all
                if (err.name === 'TimeoutError') {
                    throw new Error('The server took too long to respond', { cause: err});
                }
                throw new Error('Could not reach the server. Is the backend running?', { cause: err });
            })
            .then((response) => {
                if(!response.ok) {
                    throw new Error(`Request faild: ${response.status} ${response.statusText}`);
                }
                const contentType = response.headers.get('content-type');
                if (!contentType || !contentType.includes('application/json')) {
                    throw new Error(`Server did not respond with JSON ${contentType}`);
                }
                return response.json();
            })
            .then((data) => {
                if(!Array.isArray(data)) {
                    throw new Error('Expected an array of NAIT resources');
                }
                console.log('Use the data from the fetch');
                setResources(data);
                setIsLoading(false); // we got the data!
            })
            .catch((err)=> {
                setError(err.message);
                setIsLoading(false);
                console.error(err); // echo the error to the browser console
            });
        console.log('Exit effect');
        return () => {
            console.log('Cleanup after the effect');
        };
    }, []); // The empty array means that this callback is executed only once

    // function refetch() {
    //     setIsLoading(true);
    //     setError(null);
    //     setRequestVersion((version) => version + 1);
    // }

    return { resources, isLoading, error };
}