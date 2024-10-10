import React, { useState } from 'react'
import axios from 'axios'
// import {useNavigate} from 'react-router-dom'
import './Style.css'
export default function SendChat() {
  let [chat , setChat] = useState("");
  
  const SendChatBackend = async function (event) {
    event.preventDefault();
    const token = localStorage.getItem('authToken')
    const GroupNo = localStorage.getItem('GroupNo')
    // const navigate = useNavigate();
    try{
      let msg = chat;
      setChat("");
      msg = msg.trim();
      if(msg.length===0){
        return ;
      }
      await axios.post('https://chatgroup-server.vercel.app/AddChat',{
        token:token,
        GroupNo:GroupNo,
        Chat:msg
      })
      // alert(response.data.msg);
      // navigate('/ChatingGroup');
      // window.location.reload();
    }catch(error){
      alert(error)
    }
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth' 
    });    
  }
  return (
    <div>
      <div className='SendChat-Container'>
        <form className='SendChat-form-box' onSubmit={SendChatBackend}>
          <input type='text' className='SendChat-input' value={chat} placeholder='Enter Message' onChange={(event)=>setChat(event.target.value)} ></input>
          <button className='SendChat-Button'>Send</button>
        </form>
      </div>
    </div>
  )
}
