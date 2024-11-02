import { useParams } from "react-router-dom"
import PageWrapper from "../components/PageWrapper"
// import ManageRooms from "../components/ManageRooms";
import ManageFaculties from "../components/ManageFaculties";
import { useEffect, useState } from "react";
import { ScheduleType } from "../hooks/useFetchSchedule";
import axios from "axios";
import config from '../../config.json'
import { ScheduleContext } from "../context/ScheduleContext";
import Spinner from "../components/Spinner";

function Schedule() {
  const {id} = useParams();
  const [schedule, setSchedule] = useState<ScheduleType | undefined>(undefined);

  useEffect(() => {
    axios.get(`${config.BACKEND_URl}/schedule/${id}`, {headers: {'Authorization': localStorage.getItem('token')}})
    .then((response) => { setSchedule(response.data.schedule)})
    .catch((e) => console.log(e))
  }, [])

  
  return (
    <>
        <PageWrapper>
          {schedule ? 
          <ScheduleContext.Provider value={schedule}>
            <ManageFaculties/>
          </ScheduleContext.Provider>: <Spinner/>
          }
        </PageWrapper>
    </>
  )
}

export default Schedule