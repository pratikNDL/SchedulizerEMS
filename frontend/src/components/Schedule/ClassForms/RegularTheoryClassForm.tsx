import { useState } from 'react'
import FormWrapper from '../../Wrappers/FormWrapper'
import useFetchCourses, { CourseFetchType } from '../../../hooks/useFetchCourse'
import useFetchFaculties, { FacultyType } from '../../../hooks/useFetchFaculty';
import SelectInput from '../../Inputs/SelectInput';
import useFetchRoom, { RoomType } from '../../../hooks/useFetchRoom';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import config from '../../../../config.json'
import useFetchClasses, { ClassxType } from '../../../hooks/useFetchClasses';
import Table from '../../Table';

export type TheoryClassType = {
	courseId: Pick<CourseFetchType, 'id'>,
	facultyId: Pick<FacultyType, 'id'>,
	roomId: Pick<RoomType, 'id'>
} 

function RegularTheoryClassForm() {
	const {scheduleId, studentGroupId} = useParams();

	const courses = useFetchCourses('', "REGULAR_THEORY");
	const faculties = useFetchFaculties('');
	const rooms = useFetchRoom('', scheduleId)

	const [data, setData] = useState<TheoryClassType | {}>({});
	const [refresh, setRefresh] = useState(false);
    const triggerRefresh = () => setRefresh(prev => !prev);

	const handler = async () => {
		const body = {
			...data,
			scheduleId: scheduleId,
			studentGroupId:studentGroupId, 
			courseType:"REGULAR_THEORY"
		}
		try {
			await axios.post(`${config.BACKEND_URl}/schedule/class/add`, body, {headers: {Authorization: localStorage.getItem('token')}})
		} catch(e: any) {
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
		return	useFetchClasses(scheduleId as string, query, studentGroupId as string, "REGULAR_THEORY") 
	};
	
	
	return (
	<div>
		<FormWrapper handler={handler} triggerRefresh={triggerRefresh}>
			<div className='grid md:grid-cols-3 gap-8 w-full'>
				<SelectInput label='Course' handler={(e) => setData({...data, courseId:e.target.value})} values={courses.data.map((course) => ({displayValue: `${course.name} ${course.code}`, targetValue: course.id}))} />
				<SelectInput label='Faculty' handler={(e) => setData({...data, facultyId:e.target.value})} values={faculties.data.map((faculty) => ({displayValue: faculty.name, targetValue: faculty.id}))} />
				<SelectInput label='Preferred Room' handler={(e) => setData({...data, roomId:e.target.value})} values={rooms.data.filter((room) => !room.isLab).map((room) => ({displayValue: `${room.blockCode}-${room.code}`, targetValue: room.id}))} />
			</div>
		</FormWrapper>
		<Table <ClassxType> fetchHandler={fetchHandler} titles={['Course Code', 'Course Name', 'Faculty', 'Preferred Room']} keysToDisplay={['courseCode', 'courseName', 'facultyName', 'roomCode']} refresh={refresh}/>
	</div>
	)
}

export default RegularTheoryClassForm