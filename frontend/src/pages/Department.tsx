import { ChangeEvent, useRef, useState } from "react";
import LabeledInput from "../components/LabeledInput"
import RegisterDepartment from "../components/RegisterDepartment"
import Table from "../components/Table"
import useFetchDepartments from "../hooks/useFetchDepartments";

function Department() {
  const [query, setQuery] = useState("");
  const {data} = useFetchDepartments(query)

  const timeoutRef = useRef<number | null>(null); 

  const searchHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = window.setTimeout(() => {
      setQuery(e.target.value); 
    }, 300);
  }


  return (
    <div className="p-5">
      <RegisterDepartment/>
      <div className=" my-4 border p-2">
        <LabeledInput label="" placeholder="search" handler={searchHandler} />
        <Table titels={["Department Name", "Code"]} rows={data.map((row) => {return {name:row.name, code:row.code}})} />
      </div>
    </div>
  )
}

export default Department