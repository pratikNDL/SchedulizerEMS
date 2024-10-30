import { ChangeEvent, useRef, useState } from "react";
import LabeledInput from "../components/LabeledInput"
import Table from "../components/Table"
import useFetchFaculties from "../hooks/useFetchFaculty";
import useFetchMe from "../hooks/useFetchMe";
import PageWrapper from "../components/PageWrapper";
import FacultyForm from "../components/FacultyForm";
import axios from 'axios'
import config from '../../config.json'

function Faculty() {
  useFetchMe();
  const [query, setQuery] = useState("");
  const {loading, data} = useFetchFaculties(query)

  const timeoutRef = useRef<number | null>(null); 

  const searchHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = window.setTimeout(() => {
      setQuery(e.target.value); 
    }, 300);
  }

  const deleteHandler = async (id: string) => {
    const headers = {
      Authorization: localStorage.getItem('token')
    }
    try {
      await axios.delete(`${config.BACKEND_URl}/faculty/${id}`, {headers});
    }
    catch {

    }
    setQuery(" ")
    setTimeout(() => {
      setQuery("");
    }, 0);
  }


  return (
    <PageWrapper>
      <FacultyForm/>
      <div className=" my-4 bg-white shadow-xl p-5 rounded flex flex-col gap-4">
        <LabeledInput label="" placeholder="search" handler={searchHandler} />
        <Table deleteHandler={deleteHandler} isLoading={loading} titles={["Name", "Designation", "code"]} rows={data.map((row) => ({display: {name:row.name, rank:row.rank, code:row.department.code}, id:row.id}))} />
      </div>
    </PageWrapper>
  )
}

export default Faculty