import TableRow from "./TableRow"

function SkeletonTable() {
  return (
    <tbody className="animate-pulse  ">
          {[1, 2, 3, 4, 5,].map((row, index) => <TableRow key={index} name={""} code={""} isDark={index%2 ? true: false} isSkeleton={true}/>)} 
        
      
    </tbody>
  )
}

export default SkeletonTable