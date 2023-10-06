import React from 'react'
import Login from './components/login/login'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Sidebar from './components/sidebar/sidebar'
import { useSelector } from 'react-redux';
import Chat from './components/chat/chat';
import "./App.css"


function App() {
  const user = useSelector(state => state.userdata.user);
 
  return (!user ?
    <div>
      <Login />
    </div>
    :
    <div className='app'>
       <div className='sidebar_body'>

      <BrowserRouter>
        <Sidebar />
        <Routes>
          <Route exact path='/' element={<Chat />} ></Route>
          <Route path='/rooms/:id' element={<Chat/>} ></Route>
        </Routes>
      </BrowserRouter>
    </div>
    </div>
  )

}

export default App