
type OptionType = {
    displayValue: string,
    targetValue: string
}
type SelectInputType = {
    handler: (e: React.ChangeEvent<HTMLSelectElement>) => void,
    values: Array<OptionType>,
    label: string,
    disabled? : boolean
    className?: string
}


function SelectInput({ handler , values, label, disabled=false, className}: SelectInputType) {
  return (
    <div className={`flex flex-col ${className}`} >
        <label  className="text-primary-text"> {label}</label>
        <select 
          disabled={disabled}
          onChange={(e) => handler(e)}  
          className={`outline-none mt-0.5 bg-transparent text-primary-text border-b-2 border-input-highlight/70  focus:border-input-highlight ${disabled ? 'cursor-not-allowed': ''}`} >
            <option  key={0} value={""}  className="bg-background-secondary">Select {label}</option>
        {values.map((data) => <option className="bg-background-secondary " key={data.targetValue} value={data.targetValue}>{data.displayValue}</option>)}
        
      </select>
    </div>
  )
}

export default SelectInput