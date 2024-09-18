import React from 'react';
import { Link } from 'react-router-dom';
import './Style.css'; // Import your CSS file if needed

export default function Information() {
  return (
    <div className="Information-Container">
      <header className="Information-Header">
        <h1>Welcome to the Communication Hub</h1>
        <p className="Information-Description">
          This platform provides a comprehensive suite of tools designed to facilitate seamless communication and collaboration within groups and teams.
        </p>
      </header>

      <section className="Information-Features">
        <h2>Key Features</h2>
        <div className="Feature-List">
          <div className="Feature-Item">
            <h3>Group Chat</h3>
            <p>
              Create and manage groups for different teams or projects. Enjoy real-time messaging, file sharing, and integrated video calls to keep your conversations flowing.
            </p>
          </div>
          <div className="Feature-Item">
            <h3>Direct Messaging</h3>
            <p>
              Communicate one-on-one with team members or other users. Easily start conversations and track message histories.
            </p>
          </div>
          <div className="Feature-Item">
            <h3>Customizable Notifications</h3>
            <p>
              Stay updated with configurable notifications for message alerts, mentions, and group activities to ensure you never miss important updates.
            </p>
          </div>
          <div className="Feature-Item">
            <h3>Advanced Search</h3>
            <p>
              Quickly find past conversations, files, and messages with a powerful search feature designed to help you locate relevant information swiftly.
            </p>
          </div>
        </div>
      </section>

      <section className="Information-RecentUpdates">
        <h2>Recent Updates</h2>
        <ul>
          <li>
            <h3>Update 1: Group Video Calls</h3>
            <p>We've introduced group video calling capabilities to enhance remote team meetings and discussions.</p>
            <Link to="/updates/1" className="Information-Link">Read more</Link>
          </li>
          <li>
            <h3>Update 2: Improved Search Functionality</h3>
            <p>Our latest update improves search accuracy and speed, making it easier to find conversations and files.</p>
            <Link to="/updates/2" className="Information-Link">Read more</Link>
          </li>
        </ul>
      </section>

      <section className="Information-Contact">
        <h2>Contact Support</h2>
        <p>
          For any questions, support requests, or feedback, reach out to us at <a href="mailto:support@example.com" className="Information-Link">support@example.com</a>.
        </p>
      </section>

      <nav className="Information-Navigation">
        <ul>
          <li>
            <Link to="/profile" className="Information-Link">Go to Profile</Link>
          </li>
          <li>
            <Link to="/settings" className="Information-Link">Go to Settings</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
