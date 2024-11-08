import React, { useState } from 'react';

const InsecureComponent = () => {
  const [username, setUsername] = useState('');

  const handleButtonClick = () => {
    const code = `fetch('https://api.example.com/user?username=' + ${username})`;
    const user = eval(code);
    alert(`Fetched user: ${user.name}`);
  };

  return (
    <div>
      <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
      <button onClick={handleButtonClick}>Fetch User</button>
    </div>
  );
};

export default InsecureComponent;
