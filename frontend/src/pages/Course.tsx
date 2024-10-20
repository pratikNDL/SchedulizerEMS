import PageWrapper from '../components/PageWrapper'
import CourseForm from '../components/CourseForm'
import LabeledInput from '../components/LabeledInput'
import Table from '../components/Table'
import useFetchMe from '../hooks/useFetchMe';
import { ChangeEvent, useRef, useState } from 'react';
import useFetchCourses from '../hooks/useFetchCourse';

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

  return (
    <PageWrapper>
        <CourseForm/>
        <div className=" my-4 p-5 bg-white shadow-xl rounded-md flex flex-col gap-4">
          <LabeledInput label="" placeholder="Search A Course" handler={searchHandler} />
          <Table isLoading={loading} titels={["Course Name", "Course Code", "Credits", "T/P"]} rows={data.map((row) => {return {name:row.name, code:row.code, credits:row.credits, type:`${row.isLab ? 'P': 'T'}`}})} />
        </div>
    </PageWrapper>
  )
}

export default Course