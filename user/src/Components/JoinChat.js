import React, { useState } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import './Style.css'

export default function JoinChat() {
  let [GroupName,setGroupName] = useState()
  let [Passcode,setPasscode] = useState()
  const navigate = useNavigate();
  const JoinChatBackend = async function (event) {
    event.preventDefault()

    try{
      const token = localStorage.getItem('authToken')
      const response = await axios.post('https://chatgroup-server.vercel.app/joinChat',{
        GroupName :GroupName,
        Passcode:Passcode,
        token : token
      })
      alert(response.data.msg+" " +response.data.msg);
      if(response.data.GroupNo>=0){
        localStorage.setItem("GroupNo" , response.data.GroupNo)
        navigate('/ChatingGroup')
      }
    }catch(error){
      console.log(error)
    }
  }
  return (
    <div>
      <div className='Join-Chat-Container'>
            <h2 className='Join-Chat-Header'> Join Group </h2>
            <form className='Join-Chat-form-box' onSubmit={JoinChatBackend}>
                <div className='Join-Chat-Name'>
                    <label>Group Name : </label>
                    <input type='text' onChange={(event)=>setGroupName(event.target.value)} ></input>
                </div>
                <div className='Join-Chat-Password'>
                    <label>Passcode : </label>
                    <input type="number" id="numericInput" min="1000" max="9999" step="1" placeholder="0000" onChange={(event)=>setPasscode(event.target.value)}></input>
                </div>
                {/* <Link to= "/" className='Join-Chat-to-SignIn'>Back to Sign Up Page</Link> */}
                <button>Submit</button>
            </form>
        </div>
    </div>
  )
}
