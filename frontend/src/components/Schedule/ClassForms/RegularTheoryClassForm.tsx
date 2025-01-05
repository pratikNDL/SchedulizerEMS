import { useState } from 'react'
import FormWrapper from '../../Wrappers/FormWrapper'
import useFetchCourses, { CourseType } from '../../../hooks/useFetchCourse'
import useFetchFaculties from '../../../hooks/useFetchFaculty';
import SelectInput from '../../Inputs/SelectInput';
import useFetchRoom from '../../../hooks/useFetchRoom';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import config from '../../../../config.json'
import useFetchClasses, { ClassxType } from '../../../hooks/useFetchClasses';
import Table from '../../Table';
import { useFetchStudentGroup } from '../../../hooks/useFetchStudentGroups';
import Spinner from '../../Spinner';

export type Class = {
  courseId: string
  facultyId: string
  roomId: string
  studentGroupId: string
  batches: Array<{id: string}>
  scheduleId: string,
  courseType: CourseType
};

function RegularTheoryClassForm() {
	const {scheduleId, studentGroupId} = useParams();

	const courses = useFetchCourses('', "THEORY", 'regular');
	const faculties = useFetchFaculties('');
	const rooms = useFetchRoom('', scheduleId)
  	const studentGroup = useFetchStudentGroup(studentGroupId || "");

	const [data, setData] = useState<Pick<Class, 'courseId'| 'facultyId' | 'roomId'> | {}>({});
	const [refresh, setRefresh] = useState(false);
    const triggerRefresh = () => setRefresh(prev => !prev);

	const handler = async () => {
		if (!("courseId" in data) || !studentGroup.data)
			return {
				success: false,
				message: "Invalid Input",
			};

		console.log(studentGroup.data)
		const body:Class = {
			...data,
			scheduleId: scheduleId || "",
			studentGroupId:studentGroupId || "", 
			courseType: "THEORY",
			batches: studentGroup.data.batches.map(batch => ({id: batch.id}))
		}
		try {
			await axios.post(`${config.BACKEND_URl}/schedule/class/independent`, body, {headers: {Authorization: localStorage.getItem('token')}})
		} catch(e: any) {
			console.log(e)
			return {
                success: false,
                message: e.response.data.message ? e.response.data.message : 'Something Went Wrong'
            };
		}
		return {
			success: true,
			message: 'New Theory Class Added'
		}
	} 

	const fetchHandler = (query: string) => {
		return	useFetchClasses(scheduleId as string, query, studentGroupId as string, "THEORY", 'regular') 
	};
	
	
	return (
	<div>
		<FormWrapper handler={handler} triggerRefresh={triggerRefresh}>
			{studentGroup.data ? 
			<div className='grid md:grid-cols-3 gap-8 w-full'>
				<SelectInput label='Course' handler={(e) => setData({...data, courseId:e.target.value})} values={courses.data.map((course) => ({displayValue: `${course.name} ${course.code}`, targetValue: course.id}))} />
				<SelectInput label='Faculty' handler={(e) => setData({...data, facultyId:e.target.value})} values={faculties.data.map((faculty) => ({displayValue: faculty.name, targetValue: faculty.id}))} />
				<SelectInput label='Preferred Room' handler={(e) => setData({...data, roomId:e.target.value})} values={rooms.data.filter((room) => !room.isLab).map((room) => ({displayValue: `${room.blockCode}-${room.code}`, targetValue: room.id}))} />
			</div> : <Spinner/>}
		</FormWrapper>
		<Table <ClassxType> fetchHandler={fetchHandler} titles={['Course Code', 'Course Name', 'Faculty', 'Preferred Room']} keysToDisplay={['courseCode', 'courseName', 'facultyName', 'roomCode']} refresh={refresh}/>
	</div>
	)
}

export default RegularTheoryClassForm