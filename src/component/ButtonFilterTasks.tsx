import React from 'react';


export type FilterValueType = 'All' | 'Active' | 'Completed'

export type FilterChangeTasksType = {
	 todoListId: string
	 changeFilterTask: (todoListId: string, value: FilterValueType) => void
	 filter: FilterValueType
}

export const ButtonFilterTasks: React.FC<FilterChangeTasksType> = ({changeFilterTask, filter, todoListId}) => {

	 const onAllButton = () => {
			changeFilterTask(todoListId, 'All')
	 }
	 const onActiveButton = () => {
			changeFilterTask(todoListId, 'Active')
	 }
	 const onCompletedButton = () => {
			changeFilterTask(todoListId, 'Completed')
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

