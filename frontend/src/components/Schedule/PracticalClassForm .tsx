import { useState } from 'react'
import FormWrapper from '../FormWrapper'
import useFetchCourses, { CourseType } from '../../hooks/useFetchCourse'
import useFetchFaculties, { FacultyType } from '../../hooks/useFetchFaculty';
import SelectInput from '../SelectInput';
import useFetchRoom, { RoomType } from '../../hooks/useFetchRoom';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import config from '../../../config.json'
import useFetchClass, { ClassxType } from '../../hooks/useFetchClass';
import Table from '../Table';
import { BatchFetchType, useFetchStudentGroup } from '../../hooks/useFetchStudentGroups';

export type PracticalClassType = {
	courseId: Pick<CourseType, 'id'>,
	facultyId: Pick<FacultyType, 'id'>,
	roomId: Pick<RoomType, 'id'>,
	batchId: Pick<BatchFetchType, 'id'>
	isLab: true,
} 

export type BatchBindingType = Record<string,string>

function PracticalClassForm() {
	const {scheduleId, studentGroupId} = useParams();
	const studentGroup = useFetchStudentGroup(studentGroupId as string);

	const [data, setData] = useState<Pick<PracticalClassType, 'courseId' | 'roomId'> | {}>({});
	const [batchBinding, setBatchBinding] = useState<BatchBindingType>({});

	const courses = useFetchCourses('');
	const faculties = useFetchFaculties('');
	const rooms = useFetchRoom('', scheduleId)

	const [refresh, setRefresh] = useState(false);
    const triggerRefresh = () => setRefresh(prev => !prev);

	const handler = async () => {
		if(!('courseId' in data)) return {
			success: false,
			message: 'Invalid Input'
		} 
		const transformedData = Object.keys(batchBinding).map((batchId) => ({	
			courseId: data.courseId,
			roomId: data.roomId,
			facultyId: batchBinding[batchId],
			batchId: batchId,
			scheduleId: scheduleId,
			studentGroupId: studentGroupId,
			isLab: true,
		}))
	
		try {
			await axios.post(`${config.BACKEND_URl}/schedule/class/practical`, transformedData, {headers: {Authorization: localStorage.getItem('token')}})
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
		return	useFetchClass(scheduleId as string, studentGroupId as string, query, true) 
	};
	
	
	return (
	<div>
		<FormWrapper handler={handler} triggerRefresh={triggerRefresh}>
			<div className='grid md:grid-cols-2 gap-8 w-full'>
				<SelectInput label='Course' handler={(e) => setData({...data, courseId:e.target.value})} values={courses.data.filter((course) => course.isLab).map((course) => ({displayValue: `${course.name} ${course.code}`, targetValue: course.id}))} />
				<SelectInput label='Preferred Room' handler={(e) => setData({...data, roomId:e.target.value})} values={rooms.data.filter((room) => room.isLab).map((room) => ({displayValue: `${room.blockCode}-${room.code}`, targetValue: room.id}))} />
				

			</div>

			<div className='border border-gray-400'/>

				{ 
					studentGroup ?
					<div className='grid md:grid-cols-4  gap-8 w-full'>
						{studentGroup.data?.batches.map((batch) => (
							<SelectInput
							key={batch.id} 
						 	label={`${batch.name}`} 
						 	handler={(e) => (setBatchBinding({...batchBinding, [batch.id]:e.target.value}))}
						 	values={faculties.data.map((faculty) => ({displayValue: faculty.name, targetValue: faculty.id}))} />
						)
						 )}
					</div>
					:
					null
				}
		</FormWrapper>
		<Table <ClassxType> fetchHandler={fetchHandler} titles={['Batch', 'Course Code', 'Course Name', 'Faculty', 'Preferred Room']} keysToDisplay={['batchName', 'courseCode', 'courseName', 'facultyName', 'roomCode']} refresh={refresh}/>
	</div>
	)
}

export default PracticalClassForm