import React from 'react'
import './Login.scss'
import Section from './Section'

import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { auth, provider } from '../config/firebase'
import { signInWithPopup } from 'firebase/auth'
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import Spinner from './Spinner'

const schema = yup.object().shape({
    email: yup.string().required('Your email is required'),
    password: yup.string().min(8).required('You must enter a valid password'),
})

function Login() {

    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);

    const navigate = useNavigate();

    const onSubmit = (data) => {
        signInWithEmailAndPassword(data.email, data.password)
        navigate('/')
    };

    const handleSignupWithGoogle = async () => {
        const res = await signInWithPopup(auth, provider)
        navigate('/')
    };

    return (
        <Section height='100vh'>
            <div className='login_form-ctn'>
                <h1>Log in</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label className='form-error'>{errors.email?.message}</label>
                    <input
                        {...register('email')}
                        placeholder='Enter your email'
                        name='email'
                        type='text'></input>
                    <label className='form-error'>{errors.password?.message}</label>
                    <input
                        {...register('password')}
                        placeholder='Enter your password'
                        name='password'
                        type='password'></input>
                    <button className='login-btn' type='submit'>{loading ?
                        <Spinner /> : 'Log in'}</button>
                    <button className='login-btn' onClick={e => { handleSignupWithGoogle() }}>
                        Log in with
                        <FontAwesomeIcon icon={faGoogle} size='xl' />
                    </button>
                </form>
                <div>
                    <span>Not a member yet? </span><Link to='/signup'>Sign up</Link>
                </div>
            </div>
        </Section>
    )
};

export default Login;