import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import config from '../../../../config.json'
import { AvailabilityTable } from "./AvailabilityTable";
import { useScheduleContext } from "../../../context/ScheduleContext";


export default function FacultyConstraint() {
    const { facultyId, scheduleId  } = useParams()
    const schedule = useScheduleContext();

    const [occupiedSlots, setOccupiedSlots] = useState<Set<number>>(new Set());
    const [loading, setLoading] = useState(true);
    const url = `${config.BACKEND_URl}/schedule/availability/faculty/${scheduleId}/${facultyId}`

    useEffect(() => {
        const headers = {'Authorization': localStorage.getItem('token')}
        axios.get(url, {headers})
            .then(res => {
                setOccupiedSlots(new Set(res.data.availabilityData.availability))
                setLoading(false);
            })
            .catch(e => {
                console.log(e);
                setLoading(false);
            })
    
    }, []);

    const handler = async () => {
        setLoading(true)
        const data = {
            availability: Array.from(occupiedSlots)
        }
        const headers = {'Authorization': localStorage.getItem('token')}

        axios.post(url, data, {headers})
            .then(res => {
                setOccupiedSlots(new Set(res.data.availabilityData.availability))
                setLoading(false);
            })
            .catch(e => {
                console.log(e);
                setLoading(false);
            })
    }

return (
    <>
    <div>
        <AvailabilityTable days={schedule.days} slots={schedule.slots} occupiedSlots={occupiedSlots} setOccupiedSlots={setOccupiedSlots} submitHandler={handler} loading={loading}/>
    </div>
    </>
)
}

