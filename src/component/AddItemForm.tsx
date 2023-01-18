import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type AddItemFormType = {
	 addItem: (title: string) => void
}
export const AddItemForm: React.FC<AddItemFormType> = ({addItem}) => {
	 const [error, setError] = useState<null | string>(null)
	 const [newTaskTitle, setNewTaskTitle] = useState<string>('')

	 const onChangeHundler = (event: ChangeEvent<HTMLInputElement>) => {
			setNewTaskTitle(event.currentTarget.value)
	 }

	 const addNewItem = () => {
			if (newTaskTitle.trim() !== '') {
				 addItem(newTaskTitle)
				 setNewTaskTitle('')
			} else {
				 setError('Title is required!')
			}
	 }

	 const onKeyPressHundler = (event: KeyboardEvent<HTMLInputElement>) => {
			setError(null)
			return event.key === 'Enter' && addNewItem()
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
					onClick={addNewItem}>+
				</button>
				{error && <div className='error-message'>{error}</div>}
		 </div>
	 )
}