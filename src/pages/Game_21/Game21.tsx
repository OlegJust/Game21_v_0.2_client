import React from 'react'
import { AuthContext } from '../../context/AuthContext'
import socket from '../../core/socket'
import reducer from './reducer'
import { ChatRooms } from './ChatRooms/ChatRooms'
import { Loader } from '../../components/Loader'

export const Game21 = (props: any) => {
  const { roomId } = props.match.params
  const { name } = React.useContext(AuthContext)
  const [state, dispatch] = React.useReducer(reducer, {
    joined: false,
    roomId: roomId.slice(7),
    userName: name,
    users: [],
    messages: [],
  })

  const Connection = React.useCallback(async () => {
    socket.emit('LOADINGUSER', { roomId, name })
  }, [roomId, name])

  const loadingUser = (data: any) => {
    dispatch({
      type: 'CONNECTION',
      payload: data,
      // {users:[OlegPV,andre], messages: [{user:"oleg", message:"hello"},{user:"oleg", message:"hello"}]}
    })
  }

  const addMessage = (message: any) => {
    dispatch({
      type: 'NEW_MESSAGE',
      payload: message, // {user:"dina", message:"hello"}
    })
  }
  const setUsers = (users: any) => {
    dispatch({
      type: 'ROOM:SET_USERS',
      payload: users, // [OlegPV,andre]
    })
  }

  React.useEffect(() => {
    Connection()
  }, [Connection])

  React.useEffect(() => {
    socket.on('USER:LOADINGUSER', loadingUser)
    socket.on('ROOM:SET_USERS', setUsers)
    socket.on('ROOM:NEW_MESSAGE', addMessage)
  }, [])

  return (
    <div>
      {!state.joined ? (
        <Loader/>
      ) : (
        <div>
          <samp>Hello world. Room: {roomId}</samp>
          <ChatRooms {...state} onAddMessage={addMessage} />
        </div>
      )}
    </div>
  )
}
