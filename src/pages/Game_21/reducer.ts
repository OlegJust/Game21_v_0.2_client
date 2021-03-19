// interface reducerI {
//   type: string
//   payload: any
// }
// interface stateI {
//   joined: boolean
//   roomId: string | null
//   userName: string | null
//   users: any
//   messages: any
// }

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'ROOM:SET_USERS':
      return {
        ...state,
        users: action.payload
      }
    case 'CONNECTION':
      return {
        ...state,
				joined: true,
        users: action.payload.users,
				messages: action.payload.messages
      }

    case 'NEW_MESSAGE':
      return {
        ...state,
        messages: [...state.messages, action.payload],
      }

    default:
      return state
  }
}

export default reducer
