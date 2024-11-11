import { Dispatch, SetStateAction, useState } from "react"
import Wrapper from "../Wrapper"

type AvailabilityTablePropsType = {
    days: number,
    slots: number,
    occupiedSlots: Set<Number>,
    setOccupiedSlots: Dispatch<SetStateAction<Set<Number>>>
}

export function AvailabilityTable ({days, slots, occupiedSlots, setOccupiedSlots} : AvailabilityTablePropsType) {
  
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
                if(day==0 || slot==0) return <div key={position} className='p-2 text-sm text-center  text overflow-hidden text-gray-700 font-semibold bg-blue-200'>{day==0 ? slot: ds[day-1]}</div>
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
  
  
  
  
export function AvailabilityTableSkeleton ({days, slots} : Pick<AvailabilityTablePropsType, 'days' | 'slots'>) {
  
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