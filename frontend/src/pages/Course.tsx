import PageWrapper from '../components/PageWrapper'
import CourseForm from '../components/Forms/CourseForm'
import Table from '../components/Table'
import useFetchMe from '../hooks/useFetchMe';
import useFetchCourses, { CourseType } from '../hooks/useFetchCourse';
import config from '../../config.json'
import axios from 'axios'
import { useState } from 'react';

function Course() {
    useFetchMe();
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
    <PageWrapper>
        <CourseForm triggerRefresh={triggerRefresh}/>
        <Table <CourseType> deleteHandler={deleteHandler} fetchHandler={useFetchCourses} titles={["Course Name", "Course Code", "Credits", "T/P"]} keysToDisplay={['name', 'code', 'credits', 'type']} refresh={refresh}/>
    </PageWrapper>
  )
}

export default Course