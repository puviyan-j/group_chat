import React, { useEffect, useState } from 'react'
import "./sidebar.css"
import { Avatar, IconButton } from "@mui/material"
import { useSelector } from 'react-redux'
import { DonutLarge, Chat, MoreVert, SearchOutlined } from "@mui/icons-material"
import Sidebarchat from '../sidebarchat/sidebarchat'
import axios from "axios"
import { Link } from 'react-router-dom';
import Pusher from 'pusher-js'





function Sidebar() {

  const [rooms, setrooms] = useState([])

  const user = useSelector(state => state.userdata.user)

  useEffect(() => {
    axios.get("http://localhost:5000/room")
      .then((res) => {
        setrooms(res.data)
      });
  }, []);

  useEffect(()=>{
    const pusher = new Pusher('a7b390e6f30e7fb81d2d', {
      cluster: 'ap2'
    });
    const channel = pusher.subscribe('rooms');

    channel.bind('insert', function(data) {
     setrooms((prevrooms)=>[...prevrooms,data])
    });
    return()=>{
    channel.unbind_all();
    channel.unsubscribe();}

  },[])

  return (

    <div className='sidebar'>
      <div className='sidebar_header'>
        <Avatar src={user.photoURL}></Avatar>
        <div className='siderbar_header_right'>
          <Link to="/">
            <IconButton>
              <DonutLarge />
            </IconButton>
          </Link>
          <IconButton>
            <Chat />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className='sidebar_search'>
        <div className='sidebar_search_container'>
          <SearchOutlined />
          <input type='text' ></input>
        </div>
      </div>
      <div className='sidebar_chat'>
        <Sidebarchat addnewchat={false} />


        {
          rooms.map((room) => (
            <Sidebarchat addnewchat={true} key={room._id} name={room.name} id={room._id} />
          ))

        }

      </div>
    </div>


  )
}

export default Sidebar