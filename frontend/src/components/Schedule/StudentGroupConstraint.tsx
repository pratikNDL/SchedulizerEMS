import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import config from '../../../config.json'
import { AvailabilityTable, AvailabilityTableSkeleton } from "./AvailabilityTable";
import Button from "../Button";
import { useScheduleContext } from "../../context/ScheduleContext";


type StudentGroupConstraintType = {
    id: String,
    constraints: Array<Number>
}
export default function StudentGroupConstraint() {
    const {studentGroupId} = useParams();
    const schedule = useScheduleContext();
    
    const [occupiedSlots, setOccupiedSlots] = useState<Set<Number>>(new Set());
    const [constraintId, setConstraintId] = useState<String>("");
    const [loading, setLoading] = useState(true);
    
  
    useEffect(() => {
      const headers = {'Authorization': localStorage.getItem('token')}
      const sendRequest = async () => {
        try {
            const url = `${config.BACKEND_URl}/schedule/studentGroupConstraint?studentGroupId=${studentGroupId}&scheduleId=${schedule.id}`
            const response = await axios.get(url, { headers })
            let studentGroupConstraint:StudentGroupConstraintType = response.data.studentGroupConstraint
            if(!studentGroupConstraint) {
                const body = {studentGroupId, scheduleId: schedule.id, constraints: []}
                const response = await axios.post(url ,body, { headers })
                studentGroupConstraint = response.data.studentGroupConstraint
          }
          const constraints = new Set(studentGroupConstraint.constraints)
          setConstraintId(studentGroupConstraint.id)
          setOccupiedSlots(constraints)
          setLoading(false);
        } catch(e) {
          console.log(e)
        }
      }
      sendRequest()
      
    }, []);
  
    const handler = async () => {
      setLoading(true)
      const constraints = Array.from(occupiedSlots)
      const headers = {'Authorization': localStorage.getItem('token')}
      const data = {id: constraintId, constraints: constraints}
  
  
      try {
        await axios.put(`${config.BACKEND_URl}/schedule/studentGroupConstraint?studentGroupId=${studentGroupId}&scheduleId=${schedule.id}`, data, { headers })
        setOccupiedSlots(occupiedSlots)
      } catch (e) {
        console.log(e)
      }
  
      setLoading(false)
    }
  
    return (
      <>
        <div>
          {loading ? 
            <AvailabilityTableSkeleton days={schedule.days} slots={schedule.slots} /> :
            <AvailabilityTable days={schedule.days} slots={schedule.slots} occupiedSlots={occupiedSlots} setOccupiedSlots={setOccupiedSlots}/>
          }
          <div className='flex justify-center'>
              <Button handler={handler} isDisabled={loading} value={'Submit'} addCSS='bg-blue-400 '/>
            </div>
        </div>
      </>
    )
  }