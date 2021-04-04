import axios from "axios";
import { useState, useEffect } from "react";

export default function useAxios(config : any){
	const [response, setResponse] = useState<any>(null);
	const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    const { method, url, data , headers } = config;
    
    useEffect(() => {
		const fetchData = async () => {
			try {
                axios({
                    method,
                    url,
                    data,
                    headers,
                    timeout:3000     
                })
                .then(function (response) {
                    setResponse(response)
                })
                .catch((err) => {
                    setError(err);
                })
                .finally(() => {
                    setIsLoading(false);
                });
			} catch (err) {
				setError(err);
			}
		};

        fetchData();
        
	}, [method, url, data , headers]);

	return { response, error, isLoading };
}

