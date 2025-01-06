import { ChangeEvent, useState } from 'react'
import FormWrapper from '../../Wrappers/FormWrapper'
import useFetchFaculties, { FacultyType } from '../../../hooks/useFetchFaculty';
import SelectInput from '../../Inputs/SelectInput';
import useFetchRoom, { RoomType } from '../../../hooks/useFetchRoom';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import config from '../../../../config.json'
import useFetchClasses, { ClassxType } from '../../../hooks/useFetchClasses';
import Table from '../../Table';
import { StudentGroupType, useFetchStudentGroup } from '../../../hooks/useFetchStudentGroups';
import Spinner from '../../Spinner';
import useFetchElectiveBasket, { ElectiveBasketFetchType } from '../../../hooks/useFetchElectiveBasket';
import CheckBox from '../../Inputs/Checkbox';
import Switch from '../../Inputs/Switch';
import { CourseFetchType, CourseType } from '../../../hooks/useFetchCourse';
import { Class } from './RegularPracticalClassForm ';

export type ElectiveClassType = {
	courseId: string,
	facultyId: string,
	roomId: string,
	batchId: string,
} 
export type courseBinding = Record<string, {
	facultyId: string ,
	roomId: string ,
	batches: Set<string>,
	include: boolean
}>


function ElectiveClassFormTheory() {
	const {scheduleId, studentGroupId} = useParams();
	const [binding, setBinding] = useState<courseBinding>({});

	const studentGroup = useFetchStudentGroup(studentGroupId as string);
	const faculties = useFetchFaculties('');
	const rooms = useFetchRoom('', scheduleId)
	const electiveBaskets = useFetchElectiveBasket('', 'THEORY') 

	const [electiveBasket, setElectiveBasket] = useState<ElectiveBasketFetchType>();

	const [refresh, setRefresh] = useState(false);
    const triggerRefresh = () => setRefresh(prev => !prev);

	const handler = async () => {
	
		
		const body:Array<Class> = Object.entries(binding)
									.filter(([, {include}]) => include)
									.map(([courseId, {batches, facultyId, roomId}]) => ({
										courseId: courseId,
										roomId: roomId ,
										scheduleId: scheduleId || "",
										studentGroupId: studentGroupId || "",
										courseType: "THEORY",
										facultyId: facultyId ,
										electiveBasketId: electiveBasket?.id || "",
										batches: Array.from(batches, (batchId) => ({id: batchId}))
									}))

		try {
		  await axios.post(
			`${config.BACKEND_URl}/schedule/class/concurrent`,
			body,
			{ headers: { Authorization: localStorage.getItem("token") } }
		  );
		} catch (e: any) {
		  console.log(e);
		  return {
			success: false,
			message: e.response.data.message
			  ? e.response.data.message
			  : "Something Went Wrong",
		  };
		}

		return {
		  success: true,
		  message: "New Theory Class Added",
		};
	  };

	
	const initializeBindings = (courses: Array<Pick<CourseFetchType, "name" | "code" | "id">>) => {
		const initData: courseBinding = {};
		courses.forEach(course => {
			initData[course.id] = {
				facultyId: "",
				roomId: "",
				batches: new Set<string>(),
				include: false,
			}
		})
		setBinding(initData)
	}
	
	return (
	<div>
		<FormWrapper handler={handler} triggerRefresh={triggerRefresh}>	
			<div className='grid grid-cols-2 w-full'>
				<SelectInput 
					label='Elective Basket'
					handler={(e) => {
						if(!e.target.value) setElectiveBasket(undefined)
						else {
							setElectiveBasket(JSON.parse(e.target.value))
							initializeBindings(JSON.parse(e.target.value).courses)
						}
					}} 
					values={electiveBaskets.data.map((electiveBasket) => ({
						displayValue: `${electiveBasket.name}-${electiveBasket.code}`,
						targetValue: JSON.stringify(electiveBasket)
					}))} 
				/>
			</div>

			{
				electiveBasket ? 
				<div className='flex flex-col w-full'>
					{electiveBasket.courses.map(course => {
						return (
							<ElectiveCourseForm 
								key={course.id}
								faculties={faculties.data}
								course={course}
								studentGroup={studentGroup.data}
								rooms={rooms.data}
								setBinding={setBinding}
							/>)
					} 

					)}
				</div> :
				"No elective basket"
			}
		</FormWrapper>
		<Table <ClassxType> fetchHandler={(query) => useFetchClasses(scheduleId as string, query, studentGroupId as string, 'THEORY', 'elective')} titles={['Batch', 'Course Code', 'Course Name', 'Faculty', 'Preferred Room']} keysToDisplay={['batchName', 'courseCode', 'courseName', 'facultyName', 'roomCode']} refresh={refresh}/>
	</div>
	)
}


type ElectiveCourseProps = {
	course:  Pick<CourseFetchType, "name" | "code" | "id">
	faculties: Array<FacultyType>,
	rooms: Array<RoomType>,
	studentGroup: StudentGroupType | undefined,
	setBinding: React.Dispatch<React.SetStateAction<courseBinding>>
}

function ElectiveCourseForm({course, studentGroup, faculties, rooms, setBinding}: ElectiveCourseProps) {
	const [include, setInclude] = useState(false);


	const includeCourse = (courseId: string) => {
		setBinding((data) => {
			const updatedCourse = data[courseId] 
			updatedCourse.include = true
			return {
				...data,
				[courseId]: updatedCourse
			}
		})
	}

	const excludeCourse = (courseId: string) => {
		setBinding((data) => {
			const updatedCourse = data[courseId] 
			updatedCourse.include = false
			return {
				...data,
				[courseId]: updatedCourse
			}
		})
	}

	const facultyHandler = (courseId: string, facultyId: string) => {
		
		setBinding((data) => {
			const updatedCourse = data[courseId] 
			updatedCourse.facultyId = facultyId
			return {
				...data,
				[courseId]: updatedCourse
			}
		})
	} 

	const roomHandler = (courseId: string, roomId: string) => {
		
		setBinding((data) => {
			const updatedCourse = data[courseId] 
			updatedCourse.roomId = roomId
			return {
				...data,
				[courseId]: updatedCourse
			}
		})
	} 

	

	const batchHandler = (courseId: string, batchId: string , e:ChangeEvent<HTMLInputElement>) => {
		
		setBinding((data) => {
			const updatedCourse = data[courseId] 
			if(e.target.checked) updatedCourse.batches.add(batchId);
			else updatedCourse.batches.delete(batchId)
			return {
				...data,
				[courseId]: updatedCourse
			}
		})
	}

	const handleToggle = () => {
		if(include) excludeCourse(course.id);
		else includeCourse(course.id)
		setInclude(!include)
	}




	return (
		<div className='border-2  border-border-divider rounded  mb-4 flex flex-col gap-4 p-8'>
			<div className='text-primary-text text-xl font-semibold flex w-fit gap-4 items-center'>
				{course.name}
				<Switch isOn={include} handleToggle={handleToggle}/>
			</div>

			<div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
				<SelectInput
					label='Faculty'
					handler={(e) => facultyHandler(course.id, e.target.value)} 
					values={faculties.map((faculty) => ({displayValue: faculty.name, targetValue: faculty.id}))}
					disabled={!include}
				/>
				<SelectInput
					label='Preferred Room' handler={(e) => roomHandler(course.id,e.target.value)}
					values={rooms.filter((room) => !room.isLab).map((room) => ({displayValue: `${room.blockCode}-${room.code}`, targetValue: room.id}))} 
					disabled={!include}

				/>
				<div className=' flex-col col-span-full w-full mt-4 border-b-2 p-1 border-input-highlight  '>
					<div className='text-primary-text '>Select Batches:</div>
					<div className='grid grid-cols-2 md:grid-cols-4 gap-8 mt-4'>
					{
						studentGroup ?
						studentGroup.batches.map(batch => <CheckBox disabled={!include} label={`${batch.name}`} handler={(e) => batchHandler(course.id, batch.id, e)}/>):
						<Spinner/>
					}
					</div>
				</div>
			</div>
		</div>
	)
}



export default ElectiveClassFormTheory