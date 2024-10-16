
type OptionType = {
    displayValue: string,
    targetValue: string
}
type SelectInputType = {
    handler: (e: React.ChangeEvent<HTMLSelectElement>) => void,
    values: Array<OptionType>,
    label: string,
    addCSS?: string
}


function SelectInput({ handler , values, label, addCSS}: SelectInputType) {
  return (
    <div className={`flex flex-col mb-5 ${addCSS}`}>
        <label  className="text-md font-medium text-gray-700 "> {label}</label>
        <select onChange={(e) => handler(e)} className="p-2 rounded  text-gray-900 border border-gray-300">
            <option >Select {label}</option>
        {values.map((data) => <option key={data.targetValue} value={data.targetValue}>{data.displayValue}</option>)}
      </select>
    </div>
  )
}

export default SelectInput