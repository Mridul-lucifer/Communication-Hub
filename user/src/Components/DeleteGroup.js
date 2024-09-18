import React,{useState} from 'react'
import axios from 'axios'
import { useNavigate} from 'react-router-dom'
import './Style.css'
export default function DeleteGroup() {
    let [GroupName , setGroupName] = useState()
    let [Passcode , setPasscode ] = useState()
    const navigate = useNavigate();
    const CreateGroupBackend = async function (event) {
      event.preventDefault();
      try{
        const token = localStorage.getItem('authToken');
        const response = await axios.post('https://chatgroup-server.vercel.app/DeleteGroup',{
          GroupName :GroupName,
          Passcode : Passcode,
          token : token
        })
        alert("->" + response.data.msg);
        navigate('/Home');
      }catch(exception){
        alert(exception);
      }
      
    }
    return (
      <div>
        <div className='CreateGroup-Container'>
              <h2 className='CreateGroup-Header'> Create Group </h2>
              <form className='CreateGroup-form-box' onSubmit={CreateGroupBackend}>
                  <div className='CreateGroup-Name'>
                      <label>Group Name : </label>
                      <input type='text' onChange={(event)=>setGroupName(event.target.value)} ></input>
                  </div>
                  <div className='CreateGroup-Password'>
                      <label>Passcode : </label>
                      <input type='' onChange={(event)=>setPasscode(event.target.value)}></input>
                  </div>
                  {/* <Link to= "/" className='CreateGroup-to-SignIn'>Back to Sign Up Page</Link> */}
                  <button>Submit</button>
              </form>
          </div>
      </div>
    )
  }
  
