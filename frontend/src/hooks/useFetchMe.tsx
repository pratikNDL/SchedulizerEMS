import { useEffect, useState } from "react";
import axios from 'axios'
import config from '../../config.json'
import {  useNavigate } from "react-router-dom";

export default function useFetchMe() {
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState({})
    const navigate = useNavigate();
    
    useEffect(() => {

        const headers = {
          Authorization: localStorage.getItem('token') || ''
        }

        try {

          axios.get(config.BACKEND_URl+`/me`, { headers})
          .then((res) => {
            if(res.status==201) {
              localStorage.clear();
              navigate('/signin')
            }

            setLoading(false);
            setUser(res.data);
          })


      }
      catch{
          localStorage.clear();
          navigate('/signin')
      }

      setLoading(false);
      }, [])

      return [loading, user];
}