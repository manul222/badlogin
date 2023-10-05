import React, { useState } from 'react';
import './App.css';
import {AddrStack, AddrRecord, ByteBlock} from './AddrStack';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [stack, setStack] = useState(Array(43).fill(''));

    const usernameOffset = 20;
    const passwordOffset = 0;
    const usernameLen = 20;
    const passwordLen = 20; 

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Construct the URL with query parameters for the GET request
        const url = new URL('http://localhost:8080/login');
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
            onChange={(e) => {
              const name = e.target.value;
              setUsername(name);
 
              let nameIndex = 0; 
              setStack(stack.map((v, i) => {
                let names = name.split('');
                let value = v; 
                
                if (usernameOffset <= i && i < usernameOffset + username.length) {
                  value = '';
                }

                if (usernameOffset <= i && i < usernameOffset + names.length) {
                  nameIndex++;
                  value = names[nameIndex - 1];
                }
                
                return value; 
              }));
            }} 
          />
          <input 
            placeholder="Password" 
            type="password" 
            value={password} 
            onChange={(e) => {
              const pass = e.target.value; 
              setPassword(pass);
              
              let passIndex = 0;
              setStack(stack.map((v, i) => {
                let passes = pass.split('');
                let value = v; 

                if (passwordOffset <= i && i < passwordOffset + password.length) {
                  value = '';
                }

                if (passwordOffset <= i && i < passwordOffset + passes.length) {
                  passIndex++;
                  value = passes[passIndex - 1];
                }

                return value;
              }));
            }} 
          />
          <button type="submit" className="btn">Log in</button>
        </form>
      </div>
    );
};

export default LoginForm;
