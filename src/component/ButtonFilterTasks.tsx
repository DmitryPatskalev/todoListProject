import React from 'react';


export type FilterValueType = 'All' | 'Active' | 'Completed'

export type FilterChangeTasksType = {
	 changeFilterTask: (value: FilterValueType) => void
	 filter: FilterValueType
}

export const ButtonFilterTasks: React.FC<FilterChangeTasksType> = ({changeFilterTask, filter}) => {

	 const onAllButton = () => {
			changeFilterTask('All')
	 }
	 const onActiveButton = () => {
			changeFilterTask('Active')
	 }
	 const onCompletedButton = () => {
			changeFilterTask('Completed')
	 }

	 const styleButtonAll = filter === 'All' ? 'active-filter' : ''
	 const styleButtonActive = filter === 'Active' ? 'active-filter' : ''
	 const styleButtonCompleted = filter === 'Completed' ? 'active-filter' : ''


	 return (
		 <div>
				<button onClick={onAllButton} className={styleButtonAll}>All</button>
				<button onClick={onActiveButton} className={styleButtonActive}>Active</button>
				<button onClick={onCompletedButton} className={styleButtonCompleted}>Completed</button>
		 </div>
	 );
};

