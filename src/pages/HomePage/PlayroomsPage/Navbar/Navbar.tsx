import React, { useContext } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { AuthContext } from '../../../../context/AuthContext'
import classes from './Navbar.module.css'
import socket from '../../../../core/socket'




export const Navbar = (props: any) => {
  const { playrooms } = props
  const history = useHistory()
  const { logout, name } = useContext(AuthContext)
	const [rooms, setRooms] = React.useState(["error"]) 

	React.useEffect(()=>{
		setRooms(Object.keys(playrooms))
	}, [playrooms])
	
  


  const logoutHandler = () => {
    logout()
    history.push('/')
  }
  const joinUser = (nameRoom: any) => {
    socket.emit('add loadingUser', { roomId: nameRoom, name: name })
  }
	
  if (!rooms) {
    return <p className="center">Комнат нету</p>
  }
  return (
    <nav>
      <div style={{ padding: '0 2rem' }}>
        <span>Комнаты в онлайне:</span>
        <div className={classes.grid}>
          {rooms.map((room:string) => {
            return (
              <div className={classes.room} key={room}>
                <NavLink
                  className={classes.navLink}
                  to={`/game21=${room}`}
                  onClick={() => {
                    joinUser(room)
                  }}
                >
                  {'комната: ' + room}
                  {'Игроков: ' + playrooms[room]}
                </NavLink>
              </div>
            )
          })}
        </div>
        <a href="/" onClick={logoutHandler}>
          Выйти
        </a>
      </div>
    </nav>
  )
}
