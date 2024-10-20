import { useEffect, useState } from "react";
import axios from 'axios'
import config from '../../config.json'
import {  useNavigate } from "react-router-dom";

export default function useFetchMe() {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState({})
  const navigate = useNavigate();

  const headers = {
    Authorization: localStorage.getItem('token') || ''
  }
  
  useEffect(() => {
    const fetchReq = async () => {
      try {
        const response = await axios.get(config.BACKEND_URl+`/me`, {headers})
        setUser(response.data.user)
      }
      catch(e) {
        localStorage.clear();
        navigate('/signin')
      }

      setLoading(false);
    }

    fetchReq();
  }, []) 

      

      
    

  return {loading, user};
}