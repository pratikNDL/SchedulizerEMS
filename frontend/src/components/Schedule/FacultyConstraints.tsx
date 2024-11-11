import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import config from '../../../config.json'
import { AvailabilityTable, AvailabilityTableSkeleton } from "./AvailabilityTable";
import Button from "../Button";
import { useScheduleContext } from "../../context/ScheduleContext";

type FacultyConstraintType = {
    id: String,
    constraints: Array<Number>
  }
export default function FacultyConstraint() {
const { facultyId, scheduleId  } = useParams()
const schedule = useScheduleContext();

const [occupiedSlots, setOccupiedSlots] = useState<Set<Number>>(new Set());
const [constraintId, setConstraintId] = useState<String>("");
const [loading, setLoading] = useState(true);



useEffect(() => {
    const headers = {'Authorization': localStorage.getItem('token')}
    const sendRequest = async () => {
    try {
        const response = await axios.get(`${config.BACKEND_URl}/schedule/faculty?facultyId=${facultyId}&scheduleId=${scheduleId}`, { headers })
        let faculty:FacultyConstraintType = response.data.faculty
        if(!faculty) {
        const body = {facultyId, scheduleId, constraints: []}
        const response = await axios.post(`${config.BACKEND_URl}/schedule/faculty?facultyId=${facultyId}&scheduleId=${scheduleId}`,body, { headers })
        faculty = response.data.faculty
        }
        const constraints = new Set(faculty.constraints)
        setConstraintId(faculty.id)
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
    await axios.put(`${config.BACKEND_URl}/schedule/faculty?facultyId=${facultyId}&scheduleId=${scheduleId}`, data, { headers })
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

