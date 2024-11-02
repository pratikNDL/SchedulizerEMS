import PageWrapper from '../components/PageWrapper'
import CourseForm from '../components/Forms/CourseForm'
import LabeledInput from '../components/LabeledInput'
import Table from '../components/Table'
import useFetchMe from '../hooks/useFetchMe';
import { ChangeEvent, useRef, useState } from 'react';
import useFetchCourses from '../hooks/useFetchCourse';
import config from '../../config.json'
import axios from 'axios'
import Wrapper from '../components/Wrapper';


function Course() {
    useFetchMe();
    const [query, setQuery] = useState("");
    const {loading, data} = useFetchCourses(query)

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
        await axios.delete(`${config.BACKEND_URl}/course/${id}`, {headers});
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
        <CourseForm/>
        <Wrapper>
          <LabeledInput label="" placeholder="Search A Course" handler={searchHandler} />
          <Table deleteHandler={deleteHandler} isLoading={loading} titles={["Course Name", "Course Code", "Credits", "T/P"]} rows={data.map((row) => ({display:{name:row.name, code:row.code, credits:row.credits, type:`${row.isLab ? 'P': 'T'}`}, id:row.id}))} />
        </Wrapper>        
    </PageWrapper>
  )
}

export default Course