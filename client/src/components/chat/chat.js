import React, { useEffect, useState } from 'react'
import "./chat.css"
import { Avatar, IconButton } from '@mui/material'
import { useParams } from 'react-router-dom'
import { AttachFile, InsertEmoticon, Mic, MoreVert, SearchOutlined, SendSharp, } from '@mui/icons-material'
import axios from 'axios'
import { useSelector } from 'react-redux';
// import pusher from "pusher-js";
import Pusher from 'pusher-js'



function Chat() {
  const [message, setmessage] = useState("");
  const [msg, setmsg] = useState([])
  const { id } = useParams();
  const [roomname, setroomname] = useState({});
  const cd = new Date()


  const user = useSelector(state => state.userdata.user)

  useEffect(() => {
    if (id) {

      axios.get(`http://localhost:5000/rooms/${id}`)
        .then((res) => setroomname(res.data[0]));
      axios.get(`http://localhost:5000/message/${id}`)
        .then((res) => { setmsg(res.data) })
    }

  }, [id]);


  const sent = async () => {

    if (message) {
      await axios.post("http://localhost:5000/message", {
        name: user.displayName,
        message: message,
        roomid: id,
        uid: user.uid,
        time: `${cd.getHours() > 12 ?
          `0${cd.getHours() - 12}:${cd.getMinutes()}pm` :
          `${cd.getHours()}:${cd.getMinutes()}am`}`
      })
      setmessage("")
    }
    else {
      return
    };
  };

  useEffect(() => {

    const pusher = new Pusher('a7b390e6f30e7fb81d2d', {
      cluster: 'ap2'
    });
    const channel = pusher.subscribe('messages');
    channel.bind('insert', function (message) {
      setmsg((prevmsg) => [...prevmsg, message]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    }
  }, [])


  return (
    id &&
    <div className='chat'>
      
        <div className='chat_heading'>
          <Avatar></Avatar>
          <div className='chat_heading_info'>
            <h3>{roomname.name} </h3>
            <p>  {cd.getHours() > 12 ? `0${cd.getHours() - 12}` : cd.getHours()}:{cd.getMinutes()}</p>
          </div>
          <div className='chat_header_right'>
            <IconButton>
              <SearchOutlined />
            </IconButton>
            <IconButton>
              <AttachFile />
            </IconButton>
            <IconButton>
              <MoreVert />
            </IconButton>
          </div>
        </div>

      <div className='chat_body'>
        {msg.map((msg) => (

          <div >
            { msg.uid === user.uid ?
                <div key={msg._id} className='chat_message '>
                  <div className='nxt'>
                  </div>
                  <div className='chat_message_box sender'>
                    <span className='chat_message_box_msg'> {msg.message}</span>
                    {/* <span className='chat_message_box_time'>{msg.time}</span> */}
                  </div>
                </div>
                :
                <div className='chat_message_1'>
                  <div className='nxt_1'>
                    <Avatar></Avatar>
                  </div>
                  <div className='chat_message_box'>
                    <span className='chat_message_box_name_1'>{msg.name}</span>
                    <span className='chat_message_box_msg'> {msg.message}</span>
                    <span className='chat_message_box_time'>{msg.time}</span>
                  </div>
                </div>
            }
          </div>

        ))}
      </div> 
      <div className='chat_input'>
        <InsertEmoticon />
        <from className='form'>
          <input type='text' value={message} onChange={e => setmessage(e.target.value)} className='chat_input_msg'></input>
          <button onClick={sent} className='chat_input_btn'>
            <Avatar>
              <SendSharp />
            </Avatar>
          </button>
        </from>
        <Mic />
      </div> 
    </div> 
  )
}

export default Chat