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
      <div style={{
        display: "flex",
        flexDirection: "row"}}>
        <div style={{width: "40vw"}}>
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
        <div style={{
          width: "60vw",
          justifyContent: "center"}}>
        <AddrStack style={{marginTop: 100}}>
          <AddrRecord
            style={addrRecordStyle}
            base="0x1000"          
            range={passwordLen}>
            {stack.slice(passwordOffset, passwordOffset + passwordLen).map((v, _) => {
              return <ByteBlock value={v} />
            })}
          </AddrRecord>
          <AddrRecord 
            style={addrRecordStyle}
            base="0x1000" 
            range={usernameLen}>
            {stack.slice(usernameOffset, usernameOffset + usernameLen).map((v, _) => {
              return <ByteBlock value={v} />
            })}
          </AddrRecord>
          <AddrRecord
            base="0x1000"
            style={addrRecordStyle} 
            range={4}
            value={stack[40]} />
          <AddrRecord 
            base="0x1000"
            style={addrRecordStyle}
            value={stack[41]} />
          <AddrRecord
            base="0x1000"
            style={addrRecordStyle} 
            value={stack[42]} />
        </AddrStack>
        </div>
      </div>
    );
};

const addrRecordStyle = {
  width: 700,
  border: "2pt solid black",
  marginTop: -2,
  backgroundColor: "#c0c0c0"
}

export default LoginForm;
