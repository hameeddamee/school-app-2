import axios from 'axios'
import io from 'socket.io-client'
// 由于跨域了所以要写上端口
const socket = io("ws://localhost:9999")
// 获取聊天列表
const MSG_LIST = 'MSG_LIST '
// 读取信息
const MSG_RECV = 'MSG_RECV'
// 标志已读 
const MSG_READ = 'MSG_READ'

const initState = {
  chatmsg: [],
  unread: 0,
  users: {}
}
export function chat(state = initState, action) {
  switch (action.type) {
    case MSG_LIST:
      // unread :flase和是发送给我的unread,我发送的不算
      return { ...state, users: action.payload.users, chatmsg: action.payload.msgs, unread: action.payload.msgs.filter(v => !v.unread && v.to === action.payload.userid).length }
    case MSG_RECV:
      // 发给我的才要+1
      const n = action.payload.data.to === action.payload.userid ? 1 : 0;
      return { ...state, chatmsg: [...state.chatmsg, action.payload.data], unread: state.unread + n }
    default:
      return state;
  }
}

function msglist(msgs, users, userid) {
  return { type: MSG_LIST, payload: { msgs, users, userid } }
}
function msgrecv(data, userid) {
  return { type: MSG_RECV, payload: { data, userid } }
}

// action creater 返回的得是一个object或者函数
export function sendMsg({ from, to, msg }) {
  return dispatch => {
    // 发送给后端，事件名字是sendmsg
    socket.emit('sendmsg', { from, to, msg })
  }
}

// 
export function recvMsg() {
  return (dispatch, getState) => {
    socket.on('recvmsg', function (data) {
      console.log(data)
      const userid = getState().user._id;
      dispatch(msgrecv(data, userid))
    })
  }
}

export function getMessageList() {
  return (dispatch, getState) => {
    axios.get('/user/getmsglist')
      .then(res => {
        if (res.status === 200 && res.data.code === 0) {
          const userid = getState().user._id;
          dispatch(msglist(res.data.msgs, res.data.users, userid))
        }
      })
  }
}