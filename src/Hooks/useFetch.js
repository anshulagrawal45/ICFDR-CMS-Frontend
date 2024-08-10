import axios from "axios";
import { useState, useEffect } from "react";

const useFetch = (link, setState) => {
    let [data, setData] = useState([]);
    let [isLoading, setIsLoading] = useState(true);
    let [isError, setIsError] = useState(false);
    useEffect(() => {
        (async () => {
            try {
                let { data: res } = await axios.get(link);
                console.log(res)
                setData(res);
                setState(res)
                setIsLoading(false)
            }
            catch (error) {
                setIsError(true)
            }
        })()
    },[])
    return { data, isLoading, isError }
}

export default useFetch