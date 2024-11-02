import { ChangeEvent, useRef, useState } from "react";
import LabeledInput from "../components/LabeledInput"
import Table from "../components/Table"
import useFetchMe from "../hooks/useFetchMe";
import PageWrapper from "../components/PageWrapper";
import axios from 'axios'
import config from '../../config.json'
import Wrapper from "../components/Wrapper";
import useFetchStudentGroup from "../hooks/useFetchStudentGroup";
import StudentGroupForm from "../components/Forms/StudentGroupForm";

function StudentGroup() {
  useFetchMe();
  const [query, setQuery] = useState("");
  const {loading, data} = useFetchStudentGroup(query)
  console.log(data);
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
      await axios.delete(`${config.BACKEND_URl}/studentGroup/${id}`, {headers});
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
      <StudentGroupForm/>
        <Wrapper>
          <LabeledInput label="" placeholder="search" handler={searchHandler} />
          <Table deleteHandler={deleteHandler} isLoading={loading} titles={["Name", "Department", "Passing Year", "Section", "No. Batches"]} rows={data.map((row) => ({display: {name:row.name, code:row.department.code ,passingYear:row.passingYear, section:row.section, batchCount:row.batchCount}, id:row.id}))} />
        </Wrapper>  
    </PageWrapper>
  )
}

export default StudentGroup