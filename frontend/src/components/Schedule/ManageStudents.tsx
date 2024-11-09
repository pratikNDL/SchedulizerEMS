import axios from "axios";
import config from '../../../config.json'
import { useScheduleContext } from "../../context/ScheduleContext";
import useScheduleStudents from "../../hooks/schedule Hooks/useScheduleStudents"
import useFetchStudentGroup, { StudentGroupType } from "../../hooks/useFetchStudentGroup"
import Table from "../Table"
import { useState } from "react";


function ManageStudents() {   
  const schedule = useScheduleContext()
  const [refresh, setRefresh] = useState(false);
  const triggerRefresh = () => setRefresh(prev => !prev);

  const fetchData = (query: string) => {
    return useScheduleStudents(schedule.id, query);
  }
  
  const clickHandler = async (id: string) => {
    try {
      await axios.put(config.BACKEND_URl+`/schedule/studentGroup/${schedule.id}/${id}`,{} ,{headers: {Authorization: localStorage.getItem('token')}});
      triggerRefresh()
    }
    catch(e) {
      console.log(e)
    }
  }
  const deleteHandler = async (id: string) => {
    try {
      await axios.delete(config.BACKEND_URl+`/schedule/studentGroup/${schedule.id}/${id}`,{headers: {Authorization: localStorage.getItem('token')}});
    }
    catch(e) {
      console.log(e)
    }
  }

return (
    <>
      <Table <StudentGroupType> fetchHandler={fetchData} titles={['Name', 'Section', 'Department']}  keysToDisplay={['name', 'section', 'departmentCode']} deleteHandler={deleteHandler} refresh={refresh} />
      <Table <StudentGroupType> fetchHandler={useFetchStudentGroup} titles={['Name', 'Section', 'Department']}  keysToDisplay={['name', 'section', 'departmentCode']} clickHandler={clickHandler}/>
      
    </>
)
}

export default ManageStudents