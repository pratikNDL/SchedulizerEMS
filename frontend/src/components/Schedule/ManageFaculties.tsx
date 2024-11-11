import useFetchFaculties from '../../hooks/useFetchFaculty'
import Table from '../Table';
import { useNavigate } from 'react-router-dom';


function ManageFaculties() {
  const navigate = useNavigate()
  const clickHandler = (id: string) => {
    navigate(id)
  }

  return (
  <>
    <Table clickHandler={clickHandler} fetchHandler={useFetchFaculties} titles={["Name", "Designation", "code"]} keysToDisplay={['name', 'rank', 'code']} />         
  </>
  )
}



export default ManageFaculties