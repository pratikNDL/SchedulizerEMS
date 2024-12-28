import { useState } from 'react'
import FormWrapper from '../../Wrappers/FormWrapper'
import useFetchCourses from '../../../hooks/useFetchCourse'
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

export type ElectiveClassType = {
	courseId: string,
	facultyId: string,
	roomId: string,
	batchId: string,
} 


function ProgramElectiveTheoryClassForm() {
	const {scheduleId, studentGroupId} = useParams();
	const [data, setData] = useState<ElectiveClassType | {}>({});

	const studentGroup = useFetchStudentGroup(studentGroupId as string);
	const courses = useFetchCourses('', "PROGRAM_ELECTIVE_THEORY");
	const faculties = useFetchFaculties('');
	const rooms = useFetchRoom('', scheduleId)

	const [refresh, setRefresh] = useState(false);
    const triggerRefresh = () => setRefresh(prev => !prev);

	const handler = async () => {
		const body = {
			...data,
			scheduleId,
			studentGroupId,
			courseType: "PROGRAM_ELECTIVE_THEORY"
		}
	
		try {
			await axios.post(`${config.BACKEND_URl}/schedule/class/add`, body, {headers: {Authorization: localStorage.getItem('token')}})
		} catch(e: any) {
			console.log(e);
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
		return	useFetchClasses(scheduleId as string, query, studentGroupId as string, "PROGRAM_ELECTIVE_THEORY") 
	};
	
	return (
	<div>
		<FormWrapper handler={handler} triggerRefresh={triggerRefresh}>	
			{studentGroup.data ?
			
				<div className='grid md:grid-cols-4 gap-8 w-full'>
					<SelectInput label='Batch' handler={(e) => setData({...data, batchId:e.target.value})} values={studentGroup.data.batches.map((batch) => ({displayValue: `${batch.name}`, targetValue: batch.id}))} />
					<SelectInput label='Course' handler={(e) => setData({...data, courseId:e.target.value})} values={courses.data.map((course) => ({displayValue: `${course.name} ${course.code}`, targetValue: course.id}))} />
					<SelectInput label='Faculty' handler={(e) => setData({...data, facultyId:e.target.value})} values={faculties.data.map((faculty) => ({displayValue: faculty.name, targetValue: faculty.id}))} />
					<SelectInput label='Preferred Room' handler={(e) => setData({...data, roomId:e.target.value})} values={rooms.data.filter((room) => !room.isLab).map((room) => ({displayValue: `${room.blockCode}-${room.code}`, targetValue: room.id}))} />
				</div> 
			:
				<Spinner/>
			}
		</FormWrapper>
		<Table <ClassxType> fetchHandler={fetchHandler} titles={['Batch', 'Course Code', 'Course Name', 'Faculty', 'Preferred Room']} keysToDisplay={['batchName', 'courseCode', 'courseName', 'facultyName', 'roomCode']} refresh={refresh}/>
	</div>
	)
}



export default ProgramElectiveTheoryClassForm