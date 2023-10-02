import React, { useState } from 'react';
import './App.css';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Construct the URL with query parameters for the GET request
        const url = new URL('http://backend:8080/login');
        url.searchParams.append('username', username);
        url.searchParams.append('password', password);

        const response = await fetch(url);

        const data = await response.json();
        if (data.success) {
            alert('ログイン成功');
        } else {
            alert('ログイン失敗');
        }
    };

    return (
      <div>
        <form onSubmit={handleSubmit}>
          <h1>?ExploiTable?</h1>
          <input 
            placeholder="Username" 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
          />
          <input 
            placeholder="Password" 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
          <button type="submit" className="btn">Log in</button>
        </form>
      </div>
    );
};

export default LoginForm;
