import React, {ChangeEvent,KeyboardEvent} from 'react';

type InputType = {
	 addTask: (title: string) => void
	 onChangeHundler: (event: ChangeEvent<HTMLInputElement>) => void
	 taskTitle: string
}

export const Input: React.FC<InputType> = ({addTask, onChangeHundler, taskTitle}) => {

	 const addNewTask = () => {
			addTask(taskTitle)
	 }

	 const onKeyPressHundler = (event:KeyboardEvent<HTMLInputElement>)=>{
			if(event.charCode === 13){
				 addTask(taskTitle)
			}
	 }
	 return (
		 <div>
				<input
					value={taskTitle}
					onChange={onChangeHundler}
					onKeyPress={onKeyPressHundler}
				/>
				<button
					onClick={addNewTask}>+
				</button>
		 </div>
	 );
};

