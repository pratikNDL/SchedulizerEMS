import axios from "axios";
import config from '../../../config.json'
import { useScheduleContext } from "../../context/ScheduleContext";
import {useFetchStudentGroups, StudentGroupType} from "../../hooks/useFetchStudentGroups"
import Table from "../Table"
import { useState } from "react";
import { useNavigate } from "react-router-dom";



function ManageStudents() {   
  const schedule = useScheduleContext()
  const [refresh, setRefresh] = useState(false);
  const triggerRefresh = () => setRefresh(prev => !prev);
  const navigate = useNavigate();
  const fetchData = (query: string) => {
    return useFetchStudentGroups(query, schedule.id)
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
      <Table <StudentGroupType> fetchHandler={fetchData} titles={['Name', 'Section', 'Department']}  keysToDisplay={['name', 'section', 'departmentCode']} deleteHandler={deleteHandler} refresh={refresh} clickHandler={(id) => { navigate(id)}}/>
      <Table <StudentGroupType> fetchHandler={useFetchStudentGroups} titles={['Name', 'Section', 'Department']}  keysToDisplay={['name', 'section', 'departmentCode']} clickHandler={clickHandler}/>
    </>
)
}

export default ManageStudents