import { ChangeEvent, useRef, useState } from "react";
import LabeledInput from "../components/LabeledInput"
import Table from "../components/Table"
import useFetchDepartments from "../hooks/useFetchDepartments";
import useFetchMe from "../hooks/useFetchMe";
import PageWrapper from "../components/PageWrapper";
import DepartmentForm from "../components/DepartmentForm"
import axios from 'axios'
import config from '../../config.json'
import Wrapper from "../components/Wrapper";

function Department() {
  useFetchMe();
  const [query, setQuery] = useState("");
  const {loading, data} = useFetchDepartments(query)

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
      await axios.delete(`${config.BACKEND_URl}/department/${id}`, {headers});
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
      <DepartmentForm/>
      <Wrapper>
        <LabeledInput label="" placeholder="Search A Department" handler={searchHandler} />
        <Table deleteHandler={deleteHandler} isLoading={loading} titles={["Department Name", "Code"]}  rows={data.map((department) => {return {display:{name:department.name, code:department.code}, id:department.id}})} />
      </Wrapper>
    </PageWrapper>
  )
}

export default Department