import React from 'react'
import socket from '../../../core/socket';

export const ChatRooms = (props: any) => {
	const [messageValue, setMessageValue] = React.useState('');
	const messagesRef = React.useRef(null);
	const {users, messages, userName, roomId, onAddMessage} = props

	const onSendMessage = () => {
			socket.emit('ROOM:NEW_MESSAGE', {
					userName,
					roomId,
					text: messageValue,
			});
			onAddMessage({userName, text: messageValue});
			setMessageValue('');
	};
	console.log(props)
	React.useEffect(() => {
		//@ts-ignore
			messagesRef.current.scrollTo(0, 99999);
	}, [messages]);
  return (
		<div className="chat">
				<div className="chat-users">
						Комната: <b>{roomId}</b>
						<hr/>
						<b>Онлайн ({users.length}):</b>
						<ul>
								{users.map((name:any, index:any) => (
										<li key={name + index}>{name}</li>
								))}
						</ul>
				</div>
				<div className="chat-messages">
						<div ref={messagesRef} className="messages">
								{messages.map((message:any,index:any) => (
										<div className="message" key={index}>
												<p>{message.text}</p>
												<div>
														<span>{message.userName}</span>
												</div>
										</div>
								))}
						</div>
						<form>
			<textarea
					value={messageValue}
					onChange={(e) => setMessageValue(e.target.value)}
					className="form-control"
					//@ts-ignore
					rows="3"/>
								<button onClick={onSendMessage} type="button" className="btn btn-primary">
										Отправить
								</button>
						</form>
				</div>
		</div>
);
}
