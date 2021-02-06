import React, { useState, useEffect } from 'react';

import { get } from '../api/baseApi';

const useFetch = (url, param = {}, initialData = []) => {
    const [data, setData] = useState(initialData);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(async () => {
        setError("");
        setIsLoading(true);

        try {
            const result = await get(url, param);

            setData(result.data);
        } catch (error) {
            setError(error || "Error occurred");
        }

        setIsLoading(false);
    }, []);

    return [data, setData, isLoading, error];
};


export default useFetch;