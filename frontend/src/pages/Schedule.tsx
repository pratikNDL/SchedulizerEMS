import { useParams } from "react-router-dom"
import PageWrapper from "../components/PageWrapper"
// import ManageRooms from "../components/ManageRooms";
import ManageFaculties from "../components/Schedule/ManageFaculties";
import { useEffect, useState } from "react";
import { ScheduleType } from "../hooks/useFetchSchedule";
import axios from "axios";
import config from '../../config.json'
import { ScheduleContext } from "../context/ScheduleContext";
import ManageRooms from "../components/Schedule/ManageRooms";
import ManageStudents from "../components/Schedule/ManageStudents";

function Schedule() {
  const {id} = useParams();
  const [schedule, setSchedule] = useState<ScheduleType | undefined>(undefined);
  const [show , setShow] = useState<'room'|'faculty'|'studentGroup'>('room');

  useEffect(() => {
    axios.get(`${config.BACKEND_URl}/schedule/${id}`, {headers: {'Authorization': localStorage.getItem('token')}})
    .then((response) => { setSchedule(response.data.schedule)})
    .catch((e) => console.log(e))
  }, [])

  
  return (
    <>
      <PageWrapper>
        <div className='mb-5 flex bg-gray-400 w-fit rounded-md text-sm text-gray-600 font-medium cursor-pointer '>
          <div className={`py-1 px-3 rounded-md rounded-r-none border-2 border-gray-400 ${show=='room' ? 'bg-blue-400 text-white' : 'bg-white'}`} onClick={() => {setShow('room')}}>Rooms</div>
          <div className={`py-1 px-3   border-2 border-gray-400 border-l-0 ${show=='faculty' ? 'bg-blue-400 text-white' : 'bg-white'}`} onClick={() => {setShow('faculty')}}>Faculties</div>
          <div className={`py-1 px-3  rounded-md rounded-l-none border-2 border-gray-400 border-l-0 ${show=='studentGroup' ? 'bg-blue-400 text-white': 'bg-white'}`} onClick={() => {setShow('studentGroup')}}>Students</div>
        </div>
        

        {
          schedule ? 
            <ScheduleContext.Provider value={schedule}>
              {
                show == 'room' ? <ManageRooms/> : show == 'faculty' ? <ManageFaculties/> : <ManageStudents/>
              }
            </ScheduleContext.Provider> 
            :
            null
        }
        </PageWrapper>
    </>
  )
}

export default Schedule