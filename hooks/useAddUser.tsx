import { useState, useEffect } from 'react';
import axios from 'axios';

axios.defaults.headers.get['Content-Type'] = 'application/json';

const useAddUser = () => {
    const [response, setResponse] = useState<string>("");
    const [error, setError] = useState('');
    const [loading, setloading] = useState(true);
    const PostData = () => {
        axios
            .post("https://dotdbelgium.azurewebsites.net/api/adduser?code=aDP8asy54NRArcxqbbDDYGaUpsTOUhB6jt9W1EpqozyFJqj5yinw0Q==",{})
            .then((res) => {
                setResponse(res.data);
            })
            .catch((err) => {
                setError(err);
            })
            .finally(() => {
                setloading(false);
            });
    };

    useEffect(() => {
        PostData();
    }, []);

    // custom hook returns value
    return { response, error, loading, PostData };
};

export default useAddUser;