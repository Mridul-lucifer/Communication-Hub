import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './Style.css'
export default function Displaychat() {
  let [array ,setarray] = useState([]);
  let [myName , setMyName] = useState("");
  let [GroupName , setGroupName] = useState("");
  useEffect(()=>{
    const DisplayChatBackend = async () => {
      
      try{
        const token = localStorage.getItem('authToken')
        const GroupNo = localStorage.getItem('GroupNo')
        const response = await axios.post('https://chatgroup-server.vercel.app/getChat',{
          token:token,
          GroupNo:GroupNo
        })
        setarray(response.data.array)
        setMyName(response.data.Name)
        setGroupName(response.data.GroupName)
      }catch(error){
        alert(error)
      }
    }
    DisplayChatBackend();
    const intervalId = setInterval(DisplayChatBackend, 100);

    // Clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  },[]);
  return (
    <div>
      <h2 className='DisplayChat-header'>{GroupName}</h2>
      <div className='DisplayChat-container'>
        {array.map(chat => (
          <div 
            key={chat.id}  // Ensure to use a unique key for each element
            className='DisplayChat-box'
          >
            {chat.Name === myName ? (
              <div className='DisplayChat-myMessage'>
                <p className='DisplayChat-msg-yourmessage'>{chat.msg} </p>
                {/* <span className='DisplayChat-id-you'>(You)</span> */}
                <sub class="chat-time-myMessage">{chat.timestamp}</sub>
              </div>
            ) : (
              <div className='DisplayChat-otherMessage'>
                <sup className='DisplayChat-id'>{chat.Name} </sup>
                <p className='DisplayChat-msg'>{chat.msg} </p>
                <sub class="chat-time-otherMessage">{chat.timestamp}</sub>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
