
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../config/firebase'
import { useForm } from 'react-hook-form'
import { uuidv4 } from '@firebase/util'
import Spinner from './Spinner'
import './Chatbox.scss'

import { addMessage, useMessagesByTicker } from '../utils/db'
import { selectedTickerContext } from '../contexts/SelectedTickerProvider'
import ChatMessage from './ChatMessage'
import './ChatMessage.scss'

function Chat({ roomId }) {

    const { selectedTicker } = useContext(selectedTickerContext)
    const [user] = useAuthState(auth)
    const { register, handleSubmit, reset, formState, submittedData } = useForm()

    const { data, isLoading, error } = useMessagesByTicker(selectedTicker.symbol, user.uid)
    const scrollRef = useRef()

    useEffect(() => {
        if (data && data.length > 0 && !isLoading) {
            scrollRef.current.scrollIntoView({ behaviour: 'smooth' })
        }
    })



    const onSubmit = (d) => {
        if (d.chatInput.length === 0) return
        const { uid, photoURL } = user
        addMessage(d.chatInput, selectedTicker.symbol, uid, photoURL)
    }

    React.useEffect(() => {
        if (formState.isSubmitSuccessful) {
            reset({ chatInput: '' });
        }
    }, [formState, submittedData, reset]);


    const renderChatbox = () => {
        if (data && data.length !== 0 && !isLoading) {
            return data.map((msg, i) => {
                return (
                    <>
                        <ChatMessage key={i} msg={msg} />
                        {data.length - 1 === i &&
                            <div ref={scrollRef}></div>
                        }
                    </>
                )
            }
            )
        }
        return (
            <h4>Start the conversation!</h4>
        )
    }

    return (
        <div className='chat-ctn'>
            {data
                ? <>
                    <div className='messages-ctn'>
                        {renderChatbox()}
                    </div>
                    <form className='chat-input' onSubmit={handleSubmit(onSubmit)}>
                        <input autoComplete='off' {...register("chatInput")} type='text' />
                        <button
                        >Send</button>
                        <div></div>
                    </form>
                </>
                : <Spinner size='6x' />
            }
        </div>
    )
}

export default Chat