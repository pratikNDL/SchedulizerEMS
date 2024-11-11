
type OptionType = {
    displayValue: string,
    targetValue: string
}
type SelectInputType = {
    handler: (e: React.ChangeEvent<HTMLSelectElement>) => void,
    values: Array<OptionType>,
    label: string,
}


function SelectInput({ handler , values, label}: SelectInputType) {
  return (
    <div className="flex flex-col" >
        <label  className="text-sm font-medium text-gray-700 "> {label}</label>
        <select onChange={(e) => handler(e)} className="outline-none mt-0.5 font-medium  bg-transparent text-sm text-gray-700 border-b-2 border-blue-300">
            <option  value={undefined}>Select {label}</option>
        {values.map((data) => <option  key={data.targetValue} value={data.targetValue}>{data.displayValue}</option>)}
        
      </select>
    </div>
  )
}

export default SelectInput