import { ChangeEvent, useRef, useState } from "react";
import LabeledInput from "../components/LabeledInput"
import RegisterDepartment from "../components/RegisterDepartment"
import Table from "../components/Table"
import useFetchDepartments from "../hooks/useFetchDepartments";
import useFetchMe from "../hooks/useFetchMe";

import PageWrapper from "../components/PageWrapper";

function Department() {
  useFetchMe();
  const [query, setQuery] = useState("");
  const {loading, data} = useFetchDepartments(query)

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
    <PageWrapper>
        <RegisterDepartment/>
        <div className=" my-4 p-5 bg-white shadow-xl rounded-md flex flex-col gap-4">
          <LabeledInput label="" placeholder="Search A Department" handler={searchHandler} />
          <Table isLoading={loading} titels={["Department Name", "Code"]} rows={data.map((row) => {return {name:row.name, code:row.code}})} />
        </div>
    </PageWrapper>
  )
}

export default Department