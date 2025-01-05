import { Dispatch, SetStateAction, useState } from "react"
import Wrapper from "../../Wrappers/Wrapper"
import Button from "../../Inputs/Button"

type AvailabilityTablePropsType = {
    days: number,
    slots: number,
    occupiedSlots: Set<number>,
    setOccupiedSlots: Dispatch<SetStateAction<Set<number>>>
    submitHandler: () => void,
    loading: boolean
}

export function AvailabilityTable ({days, slots, occupiedSlots, setOccupiedSlots, loading, submitHandler} : AvailabilityTablePropsType) {
  
    const isOccupied = (position: number) => {
      return occupiedSlots.has(position)
    }
    const toggleHandler = (position: number) => {
      const newOccupiedSlots = new Set(occupiedSlots)
      if(isOccupied(position)) newOccupiedSlots.delete(position)
      else newOccupiedSlots.add(position)
      setOccupiedSlots(newOccupiedSlots)
    }
  
    const ds = ['Mon', 'Tue', 'Wed', 'Thus', 'Fri', 'Sat', 'Sun']
    return (
      <>
        <Wrapper heading="Availability Table" subHeading="">
          <div className="leading-none mt-5 text-lg font-medium text-primary-text/90">
            Highlight all slots where faculty is <span className="font-semibold text-primary-blue"> unavailable or on a break</span> in <span className="text-red font-semibold">RED</span>. Only the <span className="text-green font-semibold">GREEN</span> slots will be considered for scheduling
          </div>  
          {loading ? 
            <AvailabilityTableSkeleton days={days} slots={slots}/>
            :
            <div className='grid gap-1' style={{gridTemplateColumns: `repeat(${slots+1}, minmax(0, 1fr))`}}>
              {Array.from({length: days+1}, (_, day) => 
                Array.from({length: slots+1}, (_, slot) =>  {
                  const position = (day-1)*(slots)+slot-1
                  if(day==0 || slot==0) return <div key={position} className='p-1 text-sm text-center overflow-hidden font-semibold  border-2 border-primary-blue/60 bg-primary-blue/70 rounded-sm text-primary-text'>{day==0 ? slot: ds[day-1]}</div>
                  return <AvailabilityBlock key={position} position={position} toggleHandler={toggleHandler} isOccupied={isOccupied(position)}/>
                }))}
            </div>
          }
        </Wrapper>

        <div className='flex justify-center'>
              <Button handler={submitHandler} isDisabled={loading} className='w-1/5 border border-primary-purple bg-transparent text-primary-purple  hover:bg-primary-purple/70 hover:text-primary-text '>
                Submit
              </Button>
        </div>
      </>
    )
  
  }
  
  
  
type AvailabilityBlockPropsType = {
    position: number
    toggleHandler: (position:number) => void
    isOccupied: boolean
}
  
function AvailabilityBlock({position, toggleHandler, isOccupied}: AvailabilityBlockPropsType ) {
    const [occupied, setOccupied] = useState(isOccupied);
    return(
      <div className={`p-1 border-2 ${occupied ? 'border-red/80 bg-red/20': 'border-primary-green/80 bg-green/20'}  hover:border-white hover:border-dashed rounded-sm `} 
            onClick={() => {
                setOccupied(!occupied);
                toggleHandler(position)
            }
        }/>
    )
}  
  
  
  
  
export function AvailabilityTableSkeleton ({days, slots} : Pick<AvailabilityTablePropsType, 'days' | 'slots'>) {
    return (
      <>
          <div className='grid gap-1 animate-fast-pulse cursor-not-allowed' style={{gridTemplateColumns: `repeat(${slots+1}, minmax(0, 1fr))`}}>
            {Array.from({length: days+1}, (_, day) => 
              Array.from({length: slots+1}, (_, slot) =>  {
                const position = (day-1)*(slots)+slot-1
                return <div key={position} className='p-1 text-sm  font-medium text overflow-hidden text-white/0 border-2 border-primary-purple rounded-sm'>thus</div>
              }
          )
            )}
          </div>
      </>
    )
  
  }