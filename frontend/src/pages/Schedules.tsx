import { Outlet } from "react-router-dom"
import PageWrapper from "../components/PageWrapper"

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