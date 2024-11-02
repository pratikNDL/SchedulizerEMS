import { createContext, useContext } from "react";
import { ScheduleType } from "../hooks/useFetchSchedule";

export const ScheduleContext = createContext<ScheduleType | undefined>(undefined)

export const useScheduleContext = () => {
    const schedule = useContext(ScheduleContext);

    if(schedule === undefined) {
        throw new Error("ScheduleContext not found")
    }

    return schedule
}