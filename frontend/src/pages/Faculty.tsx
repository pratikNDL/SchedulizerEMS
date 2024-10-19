import { ChangeEvent, useRef, useState } from "react";
import LabeledInput from "../components/LabeledInput"
import Table from "../components/Table"
import useFetchFaculties from "../hooks/useFetchFaculty";
import RegisterFaculty from "../components/RegisterFaculty";
import useFetchMe from "../hooks/useFetchMe";
import PageWrapper from "../components/PageWrapper";

function Faculty() {
  useFetchMe();
  const [query, setQuery] = useState("");
  const {loading, data} = useFetchFaculties(query)

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
      <RegisterFaculty/>
      <div className=" my-4 bg-white shadow-xl p-5 rounded flex flex-col gap-4">
        <LabeledInput label="" placeholder="search" handler={searchHandler} />
        <Table isLoading={loading} titels={["Name", "Designation", "code"]} rows={data.map((row) => {return {Nmae:row.firstName+ " " + row.lastName, rank:row.rank, code:row.department.code}})} />
      </div>
    </PageWrapper>
  )
}

export default Faculty