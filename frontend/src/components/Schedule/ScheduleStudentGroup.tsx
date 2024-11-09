import { useParams } from "react-router-dom"

function ScheduleStudentGroup() {
    const {scheduleId, studentGroupId} = useParams();
  return (
    <div>{scheduleId}{studentGroupId}</div>
  )
}

export default ScheduleStudentGroup