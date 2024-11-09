import Table from "../components/Table"
import useFetchMe from "../hooks/useFetchMe";
import PageWrapper from "../components/PageWrapper";
import axios from 'axios'
import config from '../../config.json'
import useFetchStudentGroup from "../hooks/useFetchStudentGroup";
import StudentGroupForm from "../components/Forms/StudentGroupForm";

function StudentGroup() {
  useFetchMe();
  

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
      <StudentGroupForm/>
          <Table deleteHandler={deleteHandler} fetchHandler={useFetchStudentGroup} titles={["Name", "Department", "Passing Year", "Section", "No. Batches"]} keysToDisplay={['name', 'departmentCode' ,'passingYear', 'section', 'batchCount']} />
    </PageWrapper>
  )
}

export default StudentGroup