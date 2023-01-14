import React from 'react';


export type FilterValueType = 'All' | 'Active' | 'Completed'

export type FilterChangeTasksType = {
	 changeFilterTask: (value: FilterValueType) => void
}

export const ButtonFilterTasks: React.FC<FilterChangeTasksType> = ({changeFilterTask}) => {

	 const showAll = () => {
			changeFilterTask('All')
	 }
	 const showActive = () => {
			changeFilterTask('Active')
	 }
	 const showCompleted = () => {
			changeFilterTask('Completed')
	 }


	 return (
		 <div>
				<button onClick={showAll}>All</button>
				<button onClick={showActive}>Active</button>
				<button onClick={showCompleted}>Completed</button>
		 </div>
	 );
};

