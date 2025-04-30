import { useState } from "react";
import FormWrapper from "../../Wrappers/FormWrapper";
import { CourseType } from "../../../hooks/useFetchCourse";
import useFetchFaculties from "../../../hooks/useFetchFaculty";
import SelectInput from "../../Inputs/SelectInput";
import useFetchRoom from "../../../hooks/useFetchRoom";
import { useParams } from "react-router-dom";
import axios from "axios";
import config from "../../../../config.json";
import useFetchClasses, { ClassxType } from "../../../hooks/useFetchClasses";
import Table from "../../Table";
import {

  StudentGroupType,
  useFetchStudentGroup} from "../../../hooks/useFetchStudentGroups";
import useFetchElectiveBasket, { ElectiveBasketFetchType } from "../../../hooks/useFetchElectiveBasket";
import Spinner from "../../Spinner";

export type Class = {
  courseId: string
  facultyId: string
  roomId: string
  studentGroupId: string
  batches: Array<{id: string}>
  scheduleId: string,
  courseType: CourseType
  electiveBasketId?: string
};

type ElectiveCourse = {
  id: string,
  name: string,
  code: string
}


export type BatchBinding = Record<string, {
	facultyId: string ,
	roomId: string ,
	courseId: string
}>

function ElectiveClassFormPractical() {
  const { scheduleId, studentGroupId } = useParams();
  const [electiveBasket, setElectiveBasket] = useState<ElectiveBasketFetchType>();
	const electiveBaskets = useFetchElectiveBasket('', "PRACTICAL") 
  const [refresh, setRefresh] = useState(false);
  const triggerRefresh = () => setRefresh((prev) => !prev);
  const studentGroup = useFetchStudentGroup(studentGroupId || "");
  const faculties = useFetchFaculties("");
  const rooms = useFetchRoom("", scheduleId);
  const [courses, setCourses] = useState<Array<ElectiveCourse>>(); 


  const [batchBinding, setBatchBinding] = useState<BatchBinding>({});

  


  

  const handler = async () => {

    const body:Array<Class>  = Object.entries(batchBinding).map(([batchId, {facultyId, courseId, roomId}]) => ({
      courseId: courseId,
      roomId: roomId,
      scheduleId: scheduleId || "",
      studentGroupId: studentGroupId || "",
      courseType: "PRACTICAL",
      facultyId: facultyId,
      batches: [{id: batchId}],
      electiveBasketId: electiveBasket?.id || "",
    }));

   

    try {
      await axios.post(
        `${config.BACKEND_URl}/schedule/class/multiple`,
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

  const initializeBindings = (studentGroup:StudentGroupType) => {
      const initData: BatchBinding = {};
      studentGroup.batches.forEach(batch => {
        initData[batch.id] = {
          facultyId: "",
          roomId: "",
          courseId: "",
        }
      })
      setBatchBinding(initData)
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
                const selectedElectiveBasket:ElectiveBasketFetchType = JSON.parse(e.target.value);
                setElectiveBasket(selectedElectiveBasket)
                setCourses(selectedElectiveBasket.courses)
                if(studentGroup.data) initializeBindings(studentGroup.data)
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
          studentGroup.data && courses ?
          <div className="flex flex-col w-full">
            {studentGroup.data.batches.map(batch => 
              <div key={batch.id} className="grid grid-cols-3 gap-x-8 gap-y-3 items-center p-5 mb-3 rounded border-2 border-border-divider">
                <div className="col-span-full text-primary-text text-lg font-semibold">Batch {batch.name}:</div>

                <SelectInput
                // className="col-span-3"
                  label="Course"
                  handler={e => {
                    setBatchBinding((data) => {
                      const updatedBatch = data[batch.id] 
                      updatedBatch.courseId = e.target.value
                      return {
                        ...data,
                        [batch.id]: updatedBatch
                      }
                    })
                  }}
                  values={courses.map((course) => ({
                    displayValue: `${course.name} ${course.code}`,
                    targetValue: course.id,
                  }))}
                />

                <SelectInput
                // className="col-span-3"

                  label="Preferred Room"
                  handler={e => {
                    setBatchBinding((data) => {
                      const updatedBatch = data[batch.id] 
                      updatedBatch.roomId = e.target.value
                      return {
                        ...data,
                        [batch.id]: updatedBatch
                      }
                    })
                  }}
                  values={rooms.data
                    .filter((room) => room.isLab)
                    .map((room) => ({
                      displayValue: `${room.blockCode}-${room.code}`,
                      targetValue: room.id,
                    }))}
                />


                <SelectInput
                // className="col-span-3"

                  key={batch.id}
                  label={`Faculty`}
                  handler={e => {
                    setBatchBinding((data) => {
                      const updatedBatch = data[batch.id] 
                      updatedBatch.facultyId = e.target.value
                      return {
                        ...data,
                        [batch.id]: updatedBatch
                      }
                    })
                  }}
                  values={faculties.data.map((faculty) => ({
                    displayValue: faculty.name,
                    targetValue: faculty.id,
                  }))}
                />
                
              </div>
            )}
          </div>:
          <Spinner/>:
          null
        }
      </FormWrapper>
  		<Table <ClassxType> fetchHandler={(query) => useFetchClasses(scheduleId as string, query, studentGroupId as string, 'PRACTICAL', 'elective')} titles={['Batch', 'Course Code', 'Course Name', 'Faculty', 'Preferred Room']} keysToDisplay={['batchName', 'courseCode', 'courseName', 'facultyName', 'roomCode']} refresh={refresh}/>

    </div>
  );
}

export default ElectiveClassFormPractical;
