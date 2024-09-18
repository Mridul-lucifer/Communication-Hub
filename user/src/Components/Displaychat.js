import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Style.css';

export default function DisplayChat() {
  const [array, setArray] = useState([]);
  const [myName, setMyName] = useState("");
  const [groupName, setGroupName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const displayChatBackend = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const groupNo = localStorage.getItem('GroupNo');

        const response = await axios.post('https://chatgroup-server.vercel.app/getChat', {
          GroupNo: groupNo,
          token: token
        });

        console.log(response.data);
        setArray(response.data.array);
        setMyName(response.data.Name);
        setGroupName(response.data.GroupName);
        setError(null); // Clear any previous error
      } catch (error) {
        setError("Failed to load messages. Please try again later.");
        console.error(error);
      } finally {
        setLoading(false); // Set loading to false after the fetch attempt
      }
    };

    displayChatBackend();
    const intervalId = setInterval(displayChatBackend, 1000); // Fetch every 5 seconds

    // Clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

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
