import { useState, useEffect } from "react";
import axios from "axios";

const PrivateScreen = ({history}) => {
    const [error, setError] = useState("")
    const [privateData, setPrivateData] = useState("")

    useEffect(()=> {
        if(!localStorage.getItem("authToken")){
            history.push('/login')
        }

        const fetchPrivateData = async()=> {
            const config = {
                header: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`
                }
            }

            try{
                const {data} = await axios.get('/api/private', config)
                setPrivateData(data.data)
            }
            catch(e){
                localStorage.removeItem("authToken")
                setError("You are not authorized please login")
            }
        }

        fetchPrivateData()
    }, [history])
    return(
        error ? <span className="error-message">{error}</span> : <>
            
        </>
    )
}


export default PrivateScreen