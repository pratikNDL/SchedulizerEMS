import PageWrapper from '../components/Wrappers/PageWrapper'
import RegularCourseForm from '../components/Forms/RegularCourseForm'
import Table from '../components/Table'
import useFetchCourses, { CourseFetchType } from '../hooks/useFetchCourse';
import config from '../../config.json'
import axios from 'axios'
import { useEffect, useState } from 'react';
import useFetchElectiveBasket, { ElectiveBasketFetchType } from '../hooks/useFetchElectiveBasket';
import { Outlet, useNavigate } from 'react-router-dom';
import ElectiveForm from '../components/Forms/ElectiveForm';

function Course() {
    const [subPage, setSubPage] = useState<'REGULAR'|'ELECTIVE'>('REGULAR')
    const navigate = useNavigate()
    useEffect(() => {
      navigate(subPage.toLowerCase())
    }, [subPage])

  return (
    <PageWrapper>

      <div className='mb-5 flex bg-background-secondary w-fit rounded-md cursor-pointer text-white'>
          <div className={`py-1 px-3 rounded-md rounded-r-none border-2 border-primary-purple/75 ${subPage=='REGULAR' ? 'bg-primary-purple/75 ' : 'bg-transparent'}`} onClick={() => setSubPage('REGULAR')}>Regular</div>
          <div className={`py-1 px-3  rounded-md rounded-l-none border-2 border-primary-purple/75 border-l-0 ${subPage=='ELECTIVE'  ? 'bg-primary-purple/75 ': 'bg-transparent'}`} onClick={() => setSubPage('ELECTIVE')}>Elective</div>
      </div>

      <Outlet/>
    </PageWrapper>
  )
}


export function RegularCourse() {
  const [refresh, setRefresh] = useState(false);
  const triggerRefresh = () => setRefresh(prev => !prev);
  const deleteHandler = async (id: string) => {
    const headers = {
      Authorization: localStorage.getItem('token')
    }
    try {
      await axios.delete(`${config.BACKEND_URl}/course/${id}`, {headers});
    }
    catch {

    }
  }
  return (
    <div>
      <RegularCourseForm triggerRefresh={triggerRefresh}/>
      <Table <CourseFetchType> deleteHandler={deleteHandler} fetchHandler={(query) => useFetchCourses(query, undefined, 'regular')} titles={["Course Name", "Course Code", "Credits", "Course Type"]} keysToDisplay={['name', 'code', 'credits', 'courseType']} triggerRefresh={triggerRefresh} refresh={refresh}/>
    </div>
  )
}

export function ElectiveBasket() {
  const [refresh, setRefresh] = useState(false);
  const triggerRefresh = () => setRefresh(prev => !prev);
  const basketDeleteHandler = async (id: string) => {
    const headers = {
      Authorization: localStorage.getItem('token')
    }
    try {
      await axios.delete(`${config.BACKEND_URl}/elective/${id}`, {headers});
    }
    catch {

    }
  }

  const deleteHandler = async (id: string) => {
    const headers = {
      Authorization: localStorage.getItem('token')
    }
    try {
      await axios.delete(`${config.BACKEND_URl}/course/${id}`, {headers});
    }
    catch {

    }
  }

  

  return (
    <div>
      <ElectiveForm triggerRefresh={triggerRefresh}/>
      <Table <ElectiveBasketFetchType> heading={'Elective Baskets'} deleteHandler={basketDeleteHandler} fetchHandler={(query) => useFetchElectiveBasket(query)} titles={["Course Name", "Course Code", "Credits", "Course Count"]} keysToDisplay={['name', 'code', 'credits', 'courseCount']} triggerRefresh={triggerRefresh} refresh={refresh}/>
      <Table <CourseFetchType> heading={'Elective Courses'} deleteHandler={deleteHandler} fetchHandler={(query) => useFetchCourses(query, undefined , 'elective' )} titles={["Course Name", "Course Code", "Credits", "Course Type"]} keysToDisplay={['name', 'code', 'credits', 'courseType']} triggerRefresh={triggerRefresh} refresh={refresh}/>
    </div>
  )
}

export default Course