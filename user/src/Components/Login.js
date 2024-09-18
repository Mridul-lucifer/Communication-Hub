import React,{useState} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import './Style.css'
export default function Login() {
  let [name,setname] = useState("Enter Name");
  let [password,setpassword] = useState("Enter Password")
  const navigate = useNavigate();

    const LoginBackend = async function(event){
      event.preventDefault(); 
        try{
            const response = await axios.post('http://localhost:5000/Login',{
                Name : name,
                Password : password
            });
            alert("->" + response.data.msg);
            if(response.data.token){
              const tokenKey = 'authToken'; 
              const tokenValue = response.data.token;
              localStorage.setItem(tokenKey, tokenValue);
              navigate('/Home'); 
            }
            
        }catch(exception){
            alert(exception)
        }
    }
   return (
    <div>
        <div className='Login-Container'>
            <h2 className='Login-Header'> Login </h2>
            <form className='Login-form-box' onSubmit={LoginBackend}>
                <div className='Login-Name'>
                    <label>Name : </label>
                    <input type='text' onChange={(event)=>setname(event.target.value)} ></input>
                </div>
                <div className='Login-Password'>
                    <label>Password : </label>
                    <input type='password' onChange={(event)=>setpassword(event.target.value)}></input>
                </div>
                <Link to= "/" className='Login-to-SignIn'>Back to Sign Up Page</Link>
                <button>Submit</button>
            </form>
        </div>
    </div>
  )
}
