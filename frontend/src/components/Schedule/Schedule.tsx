import { Outlet, useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import { ScheduleType } from "../../hooks/useFetchSchedule";
import axios from "axios";
import config from '../../../config.json'
import { ScheduleContext } from "../../context/ScheduleContext";


function Schedule() {
  const {scheduleId} = useParams();
  const [schedule, setSchedule] = useState<ScheduleType | undefined>(undefined);
  const [show , setShow] = useState<'room'|'faculty'|'studentGroup'>('room');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${config.BACKEND_URl}/schedule/${scheduleId}`, {headers: {'Authorization': localStorage.getItem('token')}})
    .then((response) => { setSchedule(response.data.schedule)})
    .catch((e) => console.log(e))
  }, [])

  useEffect(() => {
    navigate(show);
  }, [show])

  
  return (
    <>
      <div>
      
        <div className='mb-5 flex bg-gray-400 w-fit rounded-md text-sm text-gray-600 font-medium cursor-pointer '>
          <div className={`py-1 px-3 rounded-md rounded-r-none border-2 border-gray-400 ${show=='room' ? 'bg-blue-400 text-white' : 'bg-white'}`} onClick={() => {setShow('room')}}>Rooms</div>
          <div className={`py-1 px-3   border-2 border-gray-400 border-l-0 ${show=='faculty' ? 'bg-blue-400 text-white' : 'bg-white'}`} onClick={() => {setShow('faculty')}}>Faculties</div>
          <div className={`py-1 px-3  rounded-md rounded-l-none border-2 border-gray-400 border-l-0 ${show=='studentGroup' ? 'bg-blue-400 text-white': 'bg-white'}`} onClick={() => {setShow('studentGroup')}}>Students</div>
        </div>
        

        {
          schedule ? 
            <ScheduleContext.Provider value={schedule}>
              <Outlet/>
            </ScheduleContext.Provider> 
            :
            null
        }
        </div>
    </>
  )
}

export default Schedule