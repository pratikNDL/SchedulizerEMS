import { useEffect, useState } from "react";
import axios from "axios";
import config from '../../config.json'

export type StudentGroupFetchType = {
	id: string,
	name: string,
	passingYear: number,
	section: string,
	batchCount: number
	department: {
		code: string
	}
	batches: Array<BatchFetchType>
}

export type BatchFetchType = {
	id: string
	name: string,
	studentGroupId: string
}

export type StudentGroupType = Exclude<StudentGroupFetchType, 'department'> & {
	departmentCode: string
}

export function useFetchStudentGroups(query: string, scheduleId?: string) {
	const [data, setData] = useState<Array<StudentGroupType>>([]);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		const url = scheduleId ? `${config.BACKEND_URl}/schedule/studentGroup/${scheduleId}?name=${query}`: `${config.BACKEND_URl}/studentGroup?name=${query}`;
		axios.get(url, {headers:{Authorization: localStorage.getItem('token')}})
		.then((res) => {
			setData(res.data.studentGroups.map((group: StudentGroupFetchType) => ({...group, departmentCode:group.department.code})));
			setLoading(false)
		})
		.catch((e) => {console.log(e)}) 
	}, [query])
	return {loading, data}
}

export function useFetchStudentGroup(studentGroupId: string) {
	const [data, setData] = useState<StudentGroupType>();
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		const url =  `${config.BACKEND_URl}/studentGroup/${studentGroupId}`;
		axios.get(url, {headers:{Authorization: localStorage.getItem('token')}})
		.then((res) => {
			const studentGroup:StudentGroupFetchType = res.data.studentGroup
			setData( {...studentGroup, departmentCode: studentGroup.department.code} );
			setLoading(false)
		})
		.catch((e) => {console.log(e)}) 
	}, [])
	return {loading, data}
}


