import React,{useState} from 'react'
import {Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import './Style.css'
export default function Signup() {
    let [name,setname] = useState("Enter Name");
    let [password,setpassword] = useState("Enter Password")
    const navigate = useNavigate();

    const SignUpBackend = async function(event){
        event.preventDefault(); 
        try {
            const response = await axios.post('http://localhost:5000/SignUp', {
                Name: name,
                Password: password
            });
    
            if (response.status === 200) {
                alert("-> " + response.data.msg);
    
                if (response.data.token) {
                    localStorage.setItem('authToken', response.data.token);
                }
    
                navigate('/Home');
            } else {
                alert("Something went wrong: " + response.data.msg);
            }
        } catch (error) {
            if (error.response) {
                alert("Error: " + error.response.data.msg || "Something went wrong.");
            } else if (error.request) {
                alert("Network error: Please check your connection.");
            } else {
                alert("Error: " + error.message);
            }
        }
    }
    
   return (
    <div>
        <div className='Sign-up-Container'>
            <h2 className='Sign-up-Header'>Sign Up </h2>
            <form className='Sign-up-form-box' onSubmit={SignUpBackend}>
                <div className='Sign-up-Name'>
                    <label>Name : </label>
                    <input type='text' onChange={(event)=>setname(event.target.value)} ></input>
                </div>
                <div className='Sign-up-Password'>
                    <label>Password : </label>
                    <input type='password' onChange={(event)=>setpassword(event.target.value)}></input>
                </div>
                <Link className='Sign-up-to-Login-Link' to="/Login"> Already Account  </Link>
                <button>Submit</button>
            </form>
        </div>
    </div>
  )
}
