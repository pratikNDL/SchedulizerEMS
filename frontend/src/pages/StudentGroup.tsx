import Table from "../components/Table"
import useFetchMe from "../hooks/useFetchMe";
import PageWrapper from "../components/PageWrapper";
import axios from 'axios'
import config from '../../config.json'
import useFetchStudentGroup from "../hooks/useFetchStudentGroup";
import StudentGroupForm from "../components/Forms/StudentGroupForm";
import { useState } from "react";

function StudentGroup() {
  useFetchMe();
  const [refresh, setRefresh] = useState(false);
  const triggerRefresh = () => setRefresh(prev => !prev);

  const deleteHandler = async (id: string) => {
    const headers = {
      Authorization: localStorage.getItem('token')
    }
    try {
      await axios.delete(`${config.BACKEND_URl}/studentGroup/${id}`, {headers});
    }
    catch {

    }
  }


  return (
    <PageWrapper>
      <StudentGroupForm triggerRefresh={triggerRefresh}/>
          <Table deleteHandler={deleteHandler} fetchHandler={useFetchStudentGroup} titles={["Name", "Department", "Passing Year", "Section", "No. Batches"]} keysToDisplay={['name', 'departmentCode' ,'passingYear', 'section', 'batchCount']} refresh={refresh}/>
    </PageWrapper>
  )
}

export default StudentGroup