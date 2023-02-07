import React from 'react'
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from 'yup';
import s from './Login.module.css'
import {useAppDispatch} from "../../app/store";
import {loginTC} from "./LoginReducer";


export const Login = () => {

    const dispatch = useAppDispatch()

    return <Grid container justifyContent={'center'}>
        <Grid item justifyContent={'center'}>
            <Formik
                initialValues={{email: '', password: '', rememberMe: false}}
                validationSchema={Yup.object({
                    email: Yup.string().email('Invalid email address').required('Required'),
                    password: Yup.string().required('Required')
                })}
                onSubmit={(values) => {
                    dispatch(loginTC(values))
                }}
            >
                <Form>
                    <FormControl>
                        <FormLabel>
                            <p>To log in get registered
                                <a href={'https://social-network.samuraijs.com/'}
                                   target={'_blank'}> here
                                </a>
                            </p>
                            <p>or use common test account credentials:</p>
                            <p>Email: free@samuraijs.com</p>
                            <p>Password: free</p>
                        </FormLabel>
                        <FormGroup>
                            <div className={s.fieldEmail}>
                                <label htmlFor="email" className={s.title}>Email</label>
                                <Field name="email" type="email" className={s.fieldInput}/>
                                <ErrorMessage name="email"/>
                            </div>

                            <div className={s.fieldPassword}>
                                <label htmlFor="password" className={s.title}>Password</label>
                                <Field name="password" type="password" className={s.fieldInput}/>
                                <ErrorMessage name="password"/>
                            </div>

                            <FormControlLabel label={'Remember me'} control={<Checkbox/>}/>
                            <Button type='submit' variant={'contained'} color={'primary'}>
                                Login
                            </Button>
                        </FormGroup>
                    </FormControl>
                </Form>
            </Formik>
        </Grid>
    </Grid>
}