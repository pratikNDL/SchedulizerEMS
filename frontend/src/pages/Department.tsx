import Table from "../components/Table"
import useFetchDepartments, { DepartmentType } from "../hooks/useFetchDepartments";
import useFetchMe from "../hooks/useFetchMe";
import PageWrapper from "../components/PageWrapper";
import DepartmentForm from "../components/Forms/DepartmentForm"
import axios from "axios";
import config from '../../config.json'
import { useState } from "react";

function Department() {
  useFetchMe();
  const [refresh, setRefresh] = useState(false);
  const triggerRefresh = () => setRefresh(prev => !prev);
  
  const deleteHandler = async (id: string) => {
    try {
      await axios.delete(`${config.BACKEND_URl}/department/${id}`, {headers: {Authorization: localStorage.getItem('token')}});
    } catch (e){
      console.log(e)
    }
  }

  return (
    <PageWrapper>
      <DepartmentForm triggerRefresh={triggerRefresh}/>
      <Table <DepartmentType> refresh={refresh} fetchHandler={useFetchDepartments} keysToDisplay={['name', 'code']} titles={['Name', 'Code']} deleteHandler={deleteHandler}/>
      </PageWrapper>
  )
}

export default Department