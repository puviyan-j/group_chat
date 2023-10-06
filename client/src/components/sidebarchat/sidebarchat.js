import { Avatar, Button } from '@mui/material'
import React, { useState } from 'react'
import "./sidebarchat.css"
import axios from "axios"
import { Link } from "react-router-dom"

function Sidebarchat({ addnewchat, name, id }) {

  const [newroom, setnewroom] = useState(false);
  const[newroomname,setnewroomname]=useState("")
  const creatgroup = async () => {
   
    if (newroomname) {
      await axios.post("http://localhost:5000/post", { roomname: newroomname });
      setnewroom(!newroom);
      setnewroomname("")

    }
  }
  return (
    !addnewchat ?

      <div className='sidebarchat addnewroom'>
        <h2 onClick={()=>setnewroom(!newroom)}>Add New Chat</h2>
        {newroom && <div className=''>
          <input value={newroomname} onChange={e=>setnewroomname(e.target.value)}  className="roominput" type='text'></input>
          <button onClick={creatgroup}><Button>+</Button></button>
        </div>}

      </div>
      :
      <Link to={`/rooms/${id}`}>
        <div key={id} className='sidebarchat'>
          <Avatar></Avatar>
          <div className='sidebarchat_info'>
            <h2>{name}</h2>
          </div>
        </div>
      </Link>


  )
}

export default Sidebarchat