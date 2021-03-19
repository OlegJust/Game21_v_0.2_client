import React from 'react'
import classes from './SettingNewRoom.module.css'
import { useHttp } from '../../../../hooks/http.hook'
import { AuthContext } from '../../../../context/AuthContext'
import socket from '../../../../core/socket'

export const SettingNewRoom = (props: any) => {
  const { request, error, clearError } = useHttp()
  const { token,name } = React.useContext(AuthContext)
  const [form, setForm] = React.useState({
    acePoints: '1/11',
    playerBalance: 100,
  })
  const [roomId, setRoomId] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)
  //const [nameRoom, setName] = useState(name + String(+new Date()))

  React.useEffect(() => {
    console.log(error)
    clearError()
  }, [error, clearError])

  const roomСreation = async () => {
    setIsLoading(true)
    if (!roomId) {
			setIsLoading(false)
      return alert('Неверные данные')
			
    }

    const data = await request(
      '/api/playrooms/generate',
      'POST',
      { roomId },
      {
        Authorization: `Bearer ${token}`,
      }
    )
		console.log(data.CreateRoom)
    if (!data.CreateRoom) {
      setIsLoading(false)
      return alert('такая комната есть уже')
      
    } else {
			socket.emit('NEW__ROOM', {roomId,name})
      document.location.href = `/game21=${roomId}`
    }
  }

  if (props.vkl === 'off') {
    return <div />
  }

  return (
    <div className={classes.setting}>
      <div className={classes.setting_block}>
        <input
          type="text"
          placeholder="Room ID"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
        />
        <div className={classes.points}>
          Player Баланс:
          <input
            id="PlayerBalans"
            name="playerBalance"
            type="number"
            value={form.playerBalance}
            onChange={(event) => {
              setForm({ ...form, [event.target.name]: event.target.value })
            }}
          />
        </div>
        <div className={classes.ace}>
          <p>
            <input
              id="r3"
              type="radio"
              name="acePoints"
              value="lager"
              onChange={(event) => {
                setForm({ ...form, [event.target.name]: '11' })
              }}
            />
            Туз равен = 11
          </p>
          <p>
            <input
              id="r2"
              type="radio"
              name="acePoints"
              value="darge"
              onChange={(event) => {
                setForm({ ...form, [event.target.name]: '1' })
              }}
            />
            Туз равен = 1
          </p>
          <p>
            <input
              id="r1"
              defaultChecked={true}
              type="radio"
              name="acePoints"
              value="darge"
              onChange={(event) => {
                setForm({ ...form, [event.target.name]: '1/11' })
              }}
            />
            Туз равен = 1 / 11
          </p>
        </div>
        <div className={classes.settingBu}>
          <button onClick={roomСreation}>
            {isLoading ? 'СОЗДАНИЕ...' : 'СОЗДАТЬ'}
          </button>
        </div>
      </div>
    </div>
  )
}
