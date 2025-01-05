import { useState } from "react";
import FormWrapper from "../../Wrappers/FormWrapper";
import useFetchCourses, { CourseType } from "../../../hooks/useFetchCourse";
import useFetchFaculties from "../../../hooks/useFetchFaculty";
import SelectInput from "../../Inputs/SelectInput";
import useFetchRoom from "../../../hooks/useFetchRoom";
import { useParams } from "react-router-dom";
import axios from "axios";
import config from "../../../../config.json";
import useFetchClasses, { ClassxType } from "../../../hooks/useFetchClasses";
import Table from "../../Table";
import {

  useFetchStudentGroup} from "../../../hooks/useFetchStudentGroups";

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

export type BatchBindingType = Record<string, string>;

function RegularPracticalClassForm() {
  const { scheduleId, studentGroupId } = useParams();

  const [data, setData] = useState<Pick<Class, "courseId" | "roomId"> | {}>({});
  const [batchBinding, setBatchBinding] = useState<BatchBindingType>({});

  const studentGroup = useFetchStudentGroup(studentGroupId || "");
  const courses = useFetchCourses("", 'PRACTICAL', 'regular');
  const faculties = useFetchFaculties("");
  const rooms = useFetchRoom("", scheduleId);

  const [refresh, setRefresh] = useState(false);
  const triggerRefresh = () => setRefresh((prev) => !prev);

  const handler = async () => {
    if (!("courseId" in data))
      return {
        success: false,
        message: "Invalid Input",
      };
    const transformedData:Array<Class> = Object.keys(batchBinding).map((batchId) => ({
      courseId: data.courseId,
      roomId: data.roomId,
      scheduleId: scheduleId || "",
      studentGroupId: studentGroupId || "",
      courseType: "PRACTICAL",
      facultyId: batchBinding[batchId],
      batches: [{id: batchId}]
      
    }));

    try {
      await axios.post(
        `${config.BACKEND_URl}/schedule/class/concurrent`,
        transformedData,
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

  const fetchHandler = (query: string) =>
    useFetchClasses(
      scheduleId as string,
      query,
      studentGroupId as string,
      'PRACTICAL',
      'regular'
    );

  return (
    <div>
      <FormWrapper handler={handler} triggerRefresh={triggerRefresh}>
        <div className="grid md:grid-cols-2 gap-8 w-full">
          <SelectInput
            label="Course"
            handler={(e) => setData({ ...data, courseId: e.target.value })}
            values={courses.data.map((course) => ({
              displayValue: `${course.name} ${course.code}`,
              targetValue: course.id,
            }))}
          />
          <SelectInput
            label="Preferred Room"
            handler={(e) => setData({ ...data, roomId: e.target.value })}
            values={rooms.data
              .filter((room) => room.isLab)
              .map((room) => ({
                displayValue: `${room.blockCode}-${room.code}`,
                targetValue: room.id,
              }))}
          />
        </div>

        <div className="border border-border-divider w-full" />

        {studentGroup ? (
          <div className="grid md:grid-cols-4  gap-8 w-full">
            {studentGroup.data?.batches.map((batch) => (
              <SelectInput
                key={batch.id}
                label={`Faculty: ${batch.name}`}
                handler={(e) =>
                  setBatchBinding({
                    ...batchBinding,
                    [batch.id]: e.target.value,
                  })
                }
                values={faculties.data.map((faculty) => ({
                  displayValue: faculty.name,
                  targetValue: faculty.id,
                }))}
              />
            ))}
          </div>
        ) : null}
      </FormWrapper>
      <Table<ClassxType>
        fetchHandler={fetchHandler}
        titles={[
          "Batch",
          "Course Code",
          "Course Name",
          "Faculty",
          "Preferred Room",
        ]}
        keysToDisplay={[
          "batchName",
          "courseCode",
          "courseName",
          "facultyName",
          "roomCode",
        ]}
        refresh={refresh}
      />
    </div>
  );
}

export default RegularPracticalClassForm;
