import { useScheduleContext } from "../../context/ScheduleContext";
import useScheduleStudents from "../../hooks/schedule Hooks/useScheduleStudents"
import useFetchStudentGroup, { StudentGroupType } from "../../hooks/useFetchStudentGroup"
import Table from "../Table"

function ManageStudents() {   
  const schedule = useScheduleContext()
  const newdata = useScheduleStudents(schedule.id);
  // const clickHandler = async (id: string) => {

  // }

return (
    <>
      <Table <StudentGroupType> fetchHandler={newdata} titles={['Name', 'Section', 'Department']}  keysToDisplay={['name', 'section', 'departmentCode']}/>
      <Table <StudentGroupType> fetchHandler={useFetchStudentGroup} titles={['Name', 'Section', 'Department']}  keysToDisplay={['name', 'section', 'departmentCode']} />
    </>
)
}

export default ManageStudents