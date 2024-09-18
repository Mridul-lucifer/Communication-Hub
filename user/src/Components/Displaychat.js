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
        const response = await axios.post('http://localhost:5000/getChat',{
          token:token,
          GroupNo:GroupNo
        })
        console.log(response.data);
        setarray(response.data.array)
        setMyName(response.data.Name)
        setGroupName(response.data.GroupName)
      }catch(error){
        alert(error)
      }
    }
    DisplayChatBackend();
    const intervalId = setInterval(DisplayChatBackend, 1000);

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
                <span className='DisplayChat-msg-yourmessage'>{chat.msg}</span>
                {/* <span className='DisplayChat-id-you'>(You)</span> */}
              </div>
            ) : (
              <div className='DisplayChat-otherMessage'>
                <span className='DisplayChat-id'>{chat.Name} </span>
                <span className='DisplayChat-msg'>{chat.msg}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}