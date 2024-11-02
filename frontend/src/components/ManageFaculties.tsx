import { ChangeEvent, Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import useFetchFaculties from '../hooks/useFetchFaculty'
import Wrapper from './Wrapper'
import LabeledInput from './LabeledInput';
import Table from './Table';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import PageWrapper from './PageWrapper';
import { useScheduleContext } from '../context/ScheduleContext';
import { ScheduleType } from '../hooks/useFetchSchedule';
import Button from './Button';
import axios from 'axios';
import config from '../../config.json'

function ManageFaculties() {

  const [query, setQuery] = useState("");
  const faculties = useFetchFaculties(query);
  const timeoutRef = useRef<number | null>(null); 
  const navigate = useNavigate()
  const schedule = useScheduleContext();



  const searchHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = window.setTimeout(() => {
      setQuery(e.target.value); 
    }, 300);
  }

  const clickHandler = (id: string) => {
    navigate(`/schedule/faculty/${id}?schedule=${JSON.stringify(schedule)}`, {state: {scheduleId: schedule.id}})
  }

  return (
  <>
      <Wrapper>
        <LabeledInput label="" placeholder="search" handler={searchHandler} />
        <Table clickHandler={clickHandler} isLoading={faculties.loading} titles={["Name", "Designation", "code"]} rows={faculties.data.map((row) => ({display: {name:row.name, rank:row.rank, code:row.department.code}, id:row.id}))} />
      </Wrapper> 
  </>
  )
}

type FacultyConstraintType = {
  id: String,
  constraints: Array<Number>
}
export function FacultyConstraint() {
  const { facultyId  } = useParams()
  const [searchParams] = useSearchParams();
  const schedule: ScheduleType = JSON.parse(searchParams.get('schedule') as string)
  const [occupiedSlots, setOccupiedSlots] = useState<Set<Number>>(new Set());
  const [constraintId, setConstraintId] = useState<String>("");
  const [loading, setLoading] = useState(true);
  const tableRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const headers = {'Authorization': localStorage.getItem('token')}
    const sendRequest = async () => {
      try {
        const response = await axios.get(`${config.BACKEND_URl}/schedule/faculty?facultyId=${facultyId}&scheduleId=${schedule.id}`, { headers })
        let faculty:FacultyConstraintType = response.data.faculty
        if(!faculty) {
          const body = {facultyId, scheduleId: schedule.id, constraints: []}
          const response = await axios.post(`${config.BACKEND_URl}/schedule/faculty?facultyId=${facultyId}&scheduleId=${schedule.id}`,body, { headers })
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
      await axios.put(`${config.BACKEND_URl}/schedule/faculty?facultyId=${facultyId}&scheduleId=${schedule.id}`, data, { headers })
      setOccupiedSlots(occupiedSlots)
    } catch (e) {
      console.log(e)
    }

    setLoading(false)
  }

  if(tableRef.current) console.log(tableRef.current.offsetHeight)
  return (
    <>
      <PageWrapper>
        {loading ? 
          <AvailabilityTableSkeleton days={schedule.days} slots={schedule.slots} /> :
          <AvailabilityTable  days={schedule.days} slots={schedule.slots} occupiedSlots={occupiedSlots} setOccupiedSlots={setOccupiedSlots}/>
        }
        <div className='flex justify-center'>
            <Button handler={handler} isDisabled={loading} value={'Submit'} addCSS='bg-blue-400 '/>
          </div>
      </PageWrapper>
    </>
  )
}


type AvailabilityTablePropsType = {
  days: number,
  slots: number,
  occupiedSlots: Set<Number>,
  setOccupiedSlots: Dispatch<SetStateAction<Set<Number>>>
}
function AvailabilityTable ({days, slots, occupiedSlots, setOccupiedSlots} : AvailabilityTablePropsType) {

  const isOccupied = (position: number) => {
    return occupiedSlots.has(position)
  }
  const handler = (position: number) => {
    const newOccupiedSlots = new Set(occupiedSlots)
    if(isOccupied(position)) newOccupiedSlots.delete(position)
    else newOccupiedSlots.add(position)
    setOccupiedSlots(newOccupiedSlots)
  }

  
  const ds = ['Mon', 'Tue', 'Wed', 'Thus', 'Fri', 'Sat', 'Sun']
  return (
    <>
      <Wrapper>
        <div className='grid gap-x-1 gap-y-2' style={{gridTemplateColumns: `repeat(${slots+1}, minmax(0, 1fr))`}}>
          {Array.from({length: days+1}, (_, day) => 
            Array.from({length: slots+1}, (_, slot) =>  {
              const position = (day-1)*(slots)+slot-1
              if(day==0 || slot==0) return <div key={position} className='p-2 text-sm text-center font-medium text overflow-hidden bg-blue-200'>{day==0 ? slot: ds[day-1]}</div>
              return <AvailabilityBlock key={position} position={position} handler={handler} isOccupied={isOccupied(position)}/>
            }
        )
          )}
        </div>
      </Wrapper>
    </>
  )

}



type AvailabilityBlockPropsType = {
  position: number
  handler: (position:number) => void
  isOccupied: boolean
}

function AvailabilityBlock({position, handler, isOccupied}: AvailabilityBlockPropsType ) {
  const [occupied, setOccupied] = useState(isOccupied);
  return(
    <div className={`p-2  ${occupied ? 'bg-red-300': 'bg-green-300'} hover:outline-dashed outline-2 outline-gray-700`}
    onClick={() => {setOccupied(!occupied); handler(position)}}
    
    >

    </div>
  )
}  




function AvailabilityTableSkeleton ({days, slots} : Pick<AvailabilityTablePropsType, 'days' | 'slots'>) {

  return (
    <>
      <Wrapper>
        <div className='grid gap-x-1 gap-y-2 animate-fast-pulse' style={{gridTemplateColumns: `repeat(${slots+1}, minmax(0, 1fr))`}}>
          {Array.from({length: days+1}, (_, day) => 
            Array.from({length: slots+1}, (_, slot) =>  {
              const position = (day-1)*(slots)+slot-1
              return <div key={position} className='p-2 text-sm text-center font-medium text overflow-hidden bg-gray-300 text-gray-300'>thus</div>
            }
        )
          )}
        </div>
      </Wrapper>
    </>
  )

}

export default ManageFaculties