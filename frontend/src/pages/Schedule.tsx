import { useParams } from "react-router-dom"
import PageWrapper from "../components/PageWrapper"
import Rooms from "../components/Rooms"

function Schedule() {
  const {id} = useParams();
  
  return (
    <>
        <PageWrapper>
            <Rooms id={id || ""}/>
        </PageWrapper>
    </>
  )
}

export default Schedule