import Table from "../components/Table"
import useFetchFaculties, { FacultyType } from "../hooks/useFetchFaculty";
import useFetchMe from "../hooks/useFetchMe";
import PageWrapper from "../components/PageWrapper";
import FacultyForm from "../components/Forms/FacultyForm";
import axios from 'axios'
import config from '../../config.json'

function Faculty() {
  useFetchMe();
  

  const deleteHandler = async (id: string) => {
    try {
      await axios.delete(`${config.BACKEND_URl}/faculty/${id}`, {headers: {Authorization: localStorage.getItem('token')}});
    } catch (e){
      console.log(e)
    }
  }


  return (
    <PageWrapper>
      <FacultyForm/>
      <Table <FacultyType> fetchHandler={useFetchFaculties} keysToDisplay={['name', 'rank', 'code' ]} titles={['Name', 'Designation', 'Department']} deleteHandler={deleteHandler}/>
    </PageWrapper>
  )
}

export default Faculty