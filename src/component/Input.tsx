import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type InputType = {
	 addTask: (title: string) => void
	 onChangeHundler: (event: ChangeEvent<HTMLInputElement>) => void
	 taskTitle: string
}

export const Input: React.FC<InputType> = ({addTask, onChangeHundler, taskTitle}) => {

	 const [error, setError] = useState<null | string>(null)

	 const addNewTask = () => {
			return taskTitle.trim() !== '' ? addTask(taskTitle) : setError('Title is required!')
	 }

	 const onKeyPressHundler = (event: KeyboardEvent<HTMLInputElement>) => {
			setError(null)
			return event.charCode === 13 && addNewTask()
	 }

	 return (
		 <div>
				<input
					value={taskTitle}
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

