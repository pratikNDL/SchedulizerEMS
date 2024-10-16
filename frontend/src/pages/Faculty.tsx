import { ChangeEvent, useRef, useState } from "react";
import LabeledInput from "../components/LabeledInput"
import Table from "../components/Table"
import useFetchFaculties from "../hooks/useFetchFaculty";
import RegisterFaculty from "../components/RegisterFaculty";

function Faculty() {
  const [query, setQuery] = useState("");
  const {data} = useFetchFaculties(query)

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
      <RegisterFaculty/>
      <div className=" my-4 border p-2">
        <LabeledInput label="" placeholder="search" handler={searchHandler} />
        <Table titels={["First Name", "Last Name", "Designation", "code"]} rows={data.map((row) => {return {firstName:row.firstName, lastName:row.lastName, rank:row.rank, code:row.department.code}})} />
      </div>
    </div>
  )
}

export default Faculty