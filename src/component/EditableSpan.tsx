import React, {ChangeEvent, useState} from 'react';
import {TextField} from "@material-ui/core";

type EditableSpanType = {
	 title: string
	 onChange: (title: string) => void
}

export const EditableSpan: React.FC<EditableSpanType> = ({title, onChange}) => {
	 const [edit, setEdit] = useState(false)
	 const [newValue, setNewValue] = useState('')

	 const activateEditMode = () => {
			setEdit(true)
			setNewValue(title)
	 }

	 const activateViewMode = () => {
			setEdit(false)
			onChange(newValue)
	 }

	 const onChangeHundler = (e: ChangeEvent<HTMLInputElement>) => {
			setNewValue(e.currentTarget.value)
	 }
	 
	 return (
		 <>
				{edit ?
					<TextField
						value={newValue}
						onChange={onChangeHundler}
						onBlur={activateViewMode}
						autoFocus
						type="text"/> :
					<span
						onDoubleClick={activateEditMode}
					>{title}</span>
				}
		 </>
	 );
};

