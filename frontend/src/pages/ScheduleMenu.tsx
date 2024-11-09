
import PageWrapper from "../components/PageWrapper"
import ScheduleForm from "../components/Forms/ScheduleForm"
import useFetchMe from "../hooks/useFetchMe";
import useFetchSchedule, { ScheduleType } from "../hooks/useFetchSchedule";
import Table from "../components/Table";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import config from '../../config.json'
import { useState } from "react";


function ScheduleMenu() {
    useFetchMe();
    const [refresh, setRefresh] = useState(false);
    const triggerRefresh = () => setRefresh(prev => !prev);
    const navigate = useNavigate();

    const clickHandler = (id: string) => {
        navigate(id)
    }

    const deleteHandler = async (id: string) => {
        try {
          await axios.delete(`${config.BACKEND_URl}/schedule/${id}`, {headers:{Authorization: localStorage.getItem('token')}});
        }
        catch (e) {
          console.log(e)
        }

      }

  return (
    <>
        <PageWrapper>
            <ScheduleForm triggerRefresh={triggerRefresh}/>
            <Table <ScheduleType> titles={['Name']} keysToDisplay={['name']} fetchHandler={useFetchSchedule} clickHandler={clickHandler} deleteHandler={deleteHandler} refresh={refresh}/>
            
        </PageWrapper>
    </>
  )
}

export default ScheduleMenu