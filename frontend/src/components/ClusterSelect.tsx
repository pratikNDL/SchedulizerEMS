type ClusterSelectProps = {
    displayValues: Array<string>,
    targetValues: Array<string>,
    value: string,
    setValue: (value: string) => void,  
}
function ClusterSelect({displayValues, targetValues, value, setValue}: ClusterSelectProps) {
  return (
    <div className='mb-5 flex bg-gray-400 w-fit rounded-md text-sm text-gray-600 font-medium cursor-pointer '>
        {targetValues.map((val, i) => <div key={i} className={`py-1 px-3 rounded-md rounded-r-none border-2 border-gray-400 ${value==val ? 'bg-blue-400 text-white': 'bg-white'}`} onClick={() => setValue(val)}>{displayValues[i]}</div>)}
    </div>
  )
}

export default ClusterSelect