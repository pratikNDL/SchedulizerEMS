import MenuCard from "../components/MenuCard"

function Home() {
  return (
    <div className="p-10">
        <div className="grid grid-cols-1  sm:grid-cols-2
        lg:grid-cols-3">
            <MenuCard title="Department" to="/department"/>
            <MenuCard title="Faculties" to="/faculty"/>
            <MenuCard title="Courses" to="/course"/>
            <MenuCard title="Infrastructure" to="/infrastucture"/>
                        
        </div>
    </div>
  )
}

export default Home