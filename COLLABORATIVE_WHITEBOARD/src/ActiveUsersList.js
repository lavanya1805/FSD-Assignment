import React, { useEffect, useState } from 'react';

const ActiveUsersList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8080');

    socket.onmessage = (message) => {
      try {
        const data = JSON.parse(message.data);
        if (data.activeUsers) {
          setUsers(data.activeUsers);
        }
      } catch (e) {
        console.error("Error parsing message data:", e);
      }
    };

    return () => {
      socket.close();
    };
  }, []);

  return (
    <div>
      <h3>Active Users</h3>
      <ul>
        {users.length > 0 ? (
          users.map((user, index) => (
            <li key={index}>{user}</li>
          ))
        ) : (
          <li>No users online</li>
        )}
      </ul>
    </div>
  );
};

export default ActiveUsersList;
