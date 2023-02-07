import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

export type AddItemFormType = {
    addItem: (title: string) => void
    disabled?: boolean
}

export const AddItemForm: React.FC<AddItemFormType> = React.memo(({addItem, disabled}) => {

    // console.log('AddItemForm is called')

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
        if (error !== null) {
            setError(null)
        }
        return event.key === 'Enter' && addNewItem()
    }

    return (
        <div>
            <TextField
                variant={'outlined'}
                error={!!error}
                disabled={disabled}
                label={'New title'}
                value={newTaskTitle}
                helperText={error}
                onChange={onChangeHundler}
                onKeyPress={onKeyPressHundler}
            />
            <IconButton color={'primary'} onClick={addNewItem} disabled={disabled}>
                <AddBox/>
            </IconButton>
        </div>
    )
})