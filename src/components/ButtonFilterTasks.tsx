import React, {useCallback} from 'react';
import {Button} from "@material-ui/core";
import {FilterValuesType} from "../state/todolist_reducer/todolists-reducer";




export type FilterChangeTasksType = {
	 todoListId: string
	 changeFilterTask: (todoListId: string, value: FilterValuesType) => void
	 filter: FilterValuesType
}

export const ButtonFilterTasks: React.FC<FilterChangeTasksType> = React.memo(({
																																								 changeFilterTask,
																																								 filter,
																																								 todoListId
																																							}) => {
	 // console.log('ButtonFilterTasks is called')

	 const onAllButton = useCallback(() => {
			changeFilterTask(todoListId, 'All')
	 }, [changeFilterTask, todoListId])

	 const onActiveButton = useCallback(() => {
			changeFilterTask(todoListId, 'Active')
	 }, [changeFilterTask, todoListId])

	 const onCompletedButton = useCallback(() => {
			changeFilterTask(todoListId, 'Completed')
	 }, [changeFilterTask, todoListId])

	 // const styleButtonAll = filter === 'All' ? 'active-filter' : ''
	 // const styleButtonActive = filter === 'Active' ? 'active-filter' : ''
	 // const styleButtonCompleted = filter === 'Completed' ? 'active-filter' : ''


	 return (
		 <div>
				<Button
					onClick={onAllButton}
					variant={filter === 'All' ? "contained" : undefined}
					color={'primary'}>All</Button>
				<Button
					onClick={onActiveButton}
					variant={filter === 'Active' ? "contained" : undefined}
					color={'primary'}>Active</Button>
				<Button
					onClick={onCompletedButton}
					variant={filter === 'Completed' ? "contained" : undefined}
					color={'primary'}>Completed</Button>
		 </div>
	 );
});

