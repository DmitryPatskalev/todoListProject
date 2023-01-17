import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type InputType = {
	 todoListId: string
	 addTask: (todoListId: string, title: string) => void
}

export const Input: React.FC<InputType> = ({addTask, todoListId}) => {

	 const [error, setError] = useState<null | string>(null)
	 const [newTaskTitle, setNewTaskTitle] = useState<string>('')

	 const onChangeHundler = (event: ChangeEvent<HTMLInputElement>) => {
			setNewTaskTitle(event.currentTarget.value)
	 }

	 const addNewTask = () => {
			if (newTaskTitle.trim() !== '') {
				 addTask(todoListId, newTaskTitle)
				 setNewTaskTitle('')
			} else {
				 setError('Title is required!')
			}
	 }

	 const onKeyPressHundler = (event: KeyboardEvent<HTMLInputElement>) => {
			setError(null)
			return event.key === 'Enter' && addNewTask()
	 }

	 return (
		 <div>
				<input
					value={newTaskTitle}
					onChange={onChangeHundler}
					onKeyPress={onKeyPressHundler}
					className={error ? 'error' : ''}
				/>
				<button
					onClick={addNewTask}>+
				</button>
				{error && <div className='error-message'>{error}</div>}
		 </div>
	 );
};

