import React from 'react';
import CollaborativeBoard from './CollaborativeBoard';
import ActiveUsersList from './ActiveUsersList';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <h1>Real-Time Collaborative Whiteboard</h1>
      <div className="board-container">
        <CollaborativeBoard />
        <ActiveUsersList />
      </div>
    </div>
  );
};

export default App;
