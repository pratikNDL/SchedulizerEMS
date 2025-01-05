import { Outlet } from "react-router-dom"
import PageWrapper from "../components/Wrappers/PageWrapper"

function Schedules() {
  return (
    <>
			<PageWrapper>
				<Outlet/>
			</PageWrapper>
    </>
  )
}

export default Schedules