import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

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
				<TextField
					variant={'outlined'}
					error={!!error}
					label={'New title'}
					value={newTaskTitle}
					helperText={error}
					onChange={onChangeHundler}
					onKeyPress={onKeyPressHundler}
				/>
				<IconButton color={'primary'} onClick={addNewItem}>
					 <AddBox/>
				</IconButton>
		 </div>
	 )
}