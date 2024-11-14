import { Dispatch, SetStateAction, useState } from "react"
import Wrapper from "../Wrapper"
import Button from "../Button"

type AvailabilityTablePropsType = {
    days: number,
    slots: number,
    occupiedSlots: Set<Number>,
    setOccupiedSlots: Dispatch<SetStateAction<Set<Number>>>
    submitHandler: () => void,
    loading: boolean
}

export function AvailabilityTable ({days, slots, occupiedSlots, setOccupiedSlots, loading, submitHandler} : AvailabilityTablePropsType) {
  
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
      {loading ? <AvailabilityTableSkeleton days={days} slots={slots}/>:
        <Wrapper>
          <div className='grid gap-x-1 gap-y-2' style={{gridTemplateColumns: `repeat(${slots+1}, minmax(0, 1fr))`}}>
            {Array.from({length: days+1}, (_, day) => 
              Array.from({length: slots+1}, (_, slot) =>  {
                const position = (day-1)*(slots)+slot-1
                if(day==0 || slot==0) return <div key={position} className='p-1 text-sm text-center overflow-hidden text-gray-700 font-semibold bg-yellow-light/10 border-2 border-yellow rounded-sm text-primary-text'>{day==0 ? slot: ds[day-1]}</div>
                return <AvailabilityBlock key={position} position={position} handler={handler} isOccupied={isOccupied(position)}/>
              }))}
          </div>
        </Wrapper>}
        <div className='flex justify-center'>
              <Button handler={submitHandler} isDisabled={loading} value={'Submit'} addCSS='w-1/5 border border-primary-purple bg-transparent text-primary-purple  hover:bg-primary-purple/70 hover:text-primary-text '/>
        </div>
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
      <div className={`p-1 border-2 ${occupied ? 'border-red bg-red/20': 'border-green-light bg-green/20'}  hover:border-white hover:border-dashed rounded-sm `}
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
                return <div key={position} className='p-1 text-sm text-center font-medium text overflow-hidden bg-primary-purple text-primary-purple border-2 border-primary-purple rounded-sm'>thus</div>
              }
          )
            )}
          </div>
        </Wrapper>
      </>
    )
  
  }