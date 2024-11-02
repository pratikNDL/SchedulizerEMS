import { ChangeEvent, useRef, useState } from "react";
import LabeledInput from "../components/LabeledInput"
import PageWrapper from "../components/PageWrapper"
import ScheduleForm from "../components/ScheduleForm"
import useFetchMe from "../hooks/useFetchMe";
import useFetchSchedule from "../hooks/useFetchSchedule";
import Table from "../components/Table";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import config from '../../config.json'


function ScheduleMenu() {
    useFetchMe();
    const [query, setQuery] = useState("");
    const {loading, data} = useFetchSchedule(query)
    const navigate = useNavigate()
    const timeoutRef = useRef<number | null>(null); 

    const searchHandler = (e: ChangeEvent<HTMLInputElement>): void => {
        if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = window.setTimeout(() => {
        setQuery(e.target.value);   
        }, 300);
    }

    const clickHandler = (id: string) => {
        navigate(id)
    }

    const deleteHandler = async (id: string) => {
        const headers = {
          Authorization: localStorage.getItem('token')
        }
        try {
          await axios.delete(`${config.BACKEND_URl}/schedule/${id}`, {headers});
        }
        catch {
    
        }
        setQuery(" ")
        setTimeout(() => {
          setQuery("");
        }, 0);
      }

  return (
    <>
        <PageWrapper>
            <ScheduleForm/>
            <div className=" my-4 p-5 bg-white shadow-xl rounded-md flex flex-col gap-4">
                <LabeledInput label="" placeholder="Search A Schedule" handler={searchHandler} />
                <Table isLoading={loading} titles={['Name']} rows={data.map((row) => ({display:{name: row.name,}, id:row.id}))} clickHandler={clickHandler} deleteHandler={deleteHandler}/>
            </div>
        </PageWrapper>
    </>
  )
}

export default ScheduleMenu