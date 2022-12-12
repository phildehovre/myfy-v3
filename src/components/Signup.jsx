import React from 'react'
import Section from './Section'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { auth } from '../config/firebase'
import {
    useCreateUserWithEmailAndPassword,
    // useAuthState
} from 'react-firebase-hooks/auth'

const schema = yup.object().shape({
    firstName: yup.string().required('Your first name is required'),
    lastName: yup.string().required('Your last name is required'),
    email: yup.string().required('Your email is required'),
    password: yup.string().min(8).required('You must enter a valid password'),
    confirmPassword: yup.string().oneOf([yup.ref("password")], 'The passwords must be matching')
})


function Signup() {

    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) })
    const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(auth)

    const onSubmit = (data) => {
        createUserWithEmailAndPassword(data.email, data.password)
    }

    return (
        <Section height='100vh'>
            <div className='signup_form-ctn'>
                <h1>Sign up</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label className='form-error'>{errors.firstName?.message}</label>
                    <input
                        {...register('firstName')}
                        type='text'
                        name='firstName'
                        placeholder='Enter your first name...' />
                    <label className='form-error'>{errors.lastName?.message}</label>
                    <input
                        {...register('lastName')}
                        type='text'
                        name='lastName'
                        placeholder='Enter your ast name...' />
                    <label className='form-error'>{errors.email?.message}</label>
                    <input
                        {...register('email')}
                        type='text'
                        name='email'
                        placeholder='Enter your e-mail address...' />
                    <label className='form-error'>{errors.password?.message}</label>
                    <input
                        {...register('password')}
                        type='password'
                        name='password'
                        placeholder='Enter your password...' />
                    <label className='form-error'>{errors.confirmPassword?.message}</label>
                    <input
                        {...register('confirmPassword')}
                        type='password'
                        name='confirmPassword'
                        placeholder='confirm your password...' />
                    <label>{error ? error : null}</label>
                    <button type='submit'>{loading ? 'loading' : 'Join!'}</button>
                </form>
            </div>
        </Section>
    )
}

export default Signup