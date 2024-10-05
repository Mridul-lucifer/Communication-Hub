import React from 'react';
import { Link } from 'react-router-dom';
import './Style.css'; 

export default function Home() {
  return (
    <div className="Home-Container">
      <header className="Home-Header">
        <h1>Welcome to the Communication Hub</h1>
        <p className="Home-Description">
          This platform provides a comprehensive suite of tools designed to facilitate seamless communication and collaboration within groups and teams.
        </p>
      </header>

      <section className="Information-Features">
        <h2>Key Features</h2>
        <div className="Feature-List">
          <div className="Feature-Item">
            <h3>Create Group</h3>
            <p>
              Create and manage groups for different teams or projects. Just needed a unique name and a four digit passcode. To create just <Link to="/CreateGroup">click here</Link>.
            </p>
          </div>
          <div className="Feature-Item">
            <h3>Join Group</h3>
            <p>
              Once create a gruop you share the Group Name and Passcode to other team members . To join a group <Link to="/AddGroup">click here</Link>
            </p>
          </div>
          <div className="Feature-Item">
            <h3>Delete Group</h3>
            <p>
              After successful usage of the group for team or project , you can easily delete a group chat premently from system by <Link to="/DeleteGroup">clicking here</Link>
            </p>
          </div>
          <div className="Feature-Item">
            <h3>Delete Account</h3>
            <p>
              Deletion of account is also provided by us to completly remove your identity for you privacy . To delete account <Link to="/DeleteAccount">click here </Link>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
