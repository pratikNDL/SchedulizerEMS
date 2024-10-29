import { ChangeEvent, useRef, useState } from "react";
import LabeledInput from "../components/LabeledInput"
import PageWrapper from "../components/PageWrapper"
import ScheduleForm from "../components/ScheduleForm"
import useFetchMe from "../hooks/useFetchMe";
import useFetchSchedule from "../hooks/useFetchSchedule";
import Spinner from "../components/Spinner";
import Card from "../components/Card";


function ScheduleMenu() {
    useFetchMe();
    const [query, setQuery] = useState("");
    const {loading, data} = useFetchSchedule(query)

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
    <>
        <PageWrapper>
            <ScheduleForm/>
            <div className=" my-4 p-5 bg-white shadow-xl rounded-md flex flex-col gap-4">
                <LabeledInput label="" placeholder="Search A Schedule" handler={searchHandler} />
                {loading ? 
                    <Spinner/> :
                    <div className="flex flex-col gap-2">
                        {data.map((schedule) => (
                            <Card key={schedule.id} title={schedule.name} id={schedule.id}/>
                        ))}
                
                    </div>               
                }
            </div>
        </PageWrapper>
    </>
  )
}

export default ScheduleMenu