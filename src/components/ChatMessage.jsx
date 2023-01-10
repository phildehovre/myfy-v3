import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../config/firebase'

function ChatMessage(props) {

    const [user] = useAuthState(auth)
    const { key } = props


    const { value, owner, photoURL } = props.msg


    const isOwner = user.uid === owner ? 'owner' : ''

    const avatarStyle = {
        backgroundImage: `url('${photoURL}')`
    }

    return (
        <div className={`chatmessage-ctn ${isOwner}`} key={key}>
            <span className={`reverse-ctn ${isOwner}`}>
                <div className='avatar' style={avatarStyle} />
                <p>{value}</p>
            </span>
        </div>
    )
}

export default ChatMessage