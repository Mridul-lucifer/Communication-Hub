import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import './Style.css'

export default function DeleteAccount() {
    let [name,setname] = useState("Enter Name");
    let [password,setpassword] = useState("Enter Password")
    const navigate = useNavigate();

    const DeleteAccountBackend = async function (event) {
        
        event.preventDefault();
        try{
            const response = await axios.post('https://chatgroup-server.vercel.app/DeleteAccount', {
                Name: name,
                Password: password
            });
            if (response.status === 200) {
                alert("-> " + response.data.msg);
                localStorage.removeItem('authToken');
                navigate('/Home');
            } else {
                alert("Something went wrong: " + response.data.msg);
            }
        }catch(e){
            alert(e);
        }
    }
  return (
    <div>
        <div className='Sign-up-Container'>
            <h2 className='Sign-up-Header'>Delete Account </h2>
            <form className='Sign-up-form-box' onSubmit={DeleteAccountBackend}>
                <div className='Sign-up-Name'>
                    <label>Name : </label>
                    <input type='text' onChange={(event)=>setname(event.target.value)} ></input>
                </div>
                <div className='Sign-up-Password'>
                    <label>Password : </label>
                    <input type='password' onChange={(event)=>setpassword(event.target.value)}></input>
                </div>
                {/* <Link className='Sign-up-to-Login-Link' to="/Login"> Already Account  </Link> */}
                <button >Delete</button>
            </form>
        </div>
    </div>
  )
}
