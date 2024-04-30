import { useState, useEffect } from 'react';
import axios from 'axios';

const AuthApi = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY;
                const response = await axios.get(import.meta.env.VITE_API_URL, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': `application/json`,

                    }
                });
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    console.log(data)

    return (
        <div>
            <h1>Auth Table Data</h1>
        </div>
    );
};

export default AuthApi;
