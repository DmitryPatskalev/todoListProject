import React from "react";
import {AddItemForm} from "../components/AddItemForm/AddItemForm";
import {action} from "@storybook/addon-actions";


export default {
	 title: 'TodoList/AddItemForm',
	 component: AddItemForm,

}

const callBack = action('Button inside from clicked')


export const AddItemFormExample = (props:any) => {
	 return <AddItemForm addItem={callBack}/>
}