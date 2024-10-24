import PageWrapper from '../components/PageWrapper'
import LabeledInput from '../components/LabeledInput'
import Table from '../components/Table'
import useFetchMe from '../hooks/useFetchMe';
import { ChangeEvent, useRef, useState } from 'react';
import useFetchBlock from '../hooks/useFetchBlock';
import InfrastructureForm from '../components/InfrastructureForm';

function Infrastructure() {
    useFetchMe();
    const [query, setQuery] = useState("");
    const {loading, data} = useFetchBlock(query)

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
        <InfrastructureForm/>
        <div className=" my-4 p-5 bg-white shadow-xl rounded-md flex flex-col gap-4">
          <LabeledInput label="" placeholder="Search A Block" handler={searchHandler} />
          <Table isLoading={loading} titels={["Block Name", "Block Code"]} rows={data.map((row) => {return {name:row.name, blocCode:row.blockCode}})} />
        </div>
    </PageWrapper>
  )
}

export default Infrastructure