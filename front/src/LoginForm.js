import React, { useState } from 'react';
import './App.css';
import {AddrStack, AddrRecord, ByteBlock} from './AddrStack';
import CustomModal from './CustomModal';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [open, setOpen] = useState(false);
    const [success, setSuccess] = useState(false);
    const [stack, setStack] = useState(Array(80).fill(''));

    const usernameOffset = 32;
    const passwordOffset = 0;
    const usernameLen = 32;
    const passwordLen = 32; 

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Construct the URL with query parameters for the GET request
        const url = new URL('http://localhost:8080/login');
        url.searchParams.append('username', username);
        url.searchParams.append('password', password);

        const response = await fetch(url);

        const data = await response.json();
        if (data.result) {
            setSuccess(true);
        } else {
          setSuccess(false);
        }
        setOpen(true);
    };

    const modalTitle = () => {
      if (!success) return "Login fail 😭"; 

      return "Login succeed 🎉"
    }

    const modalDesc = () => {
      if (!success) return "try harder !!!!";

      if (username.length >= 45 || password.length >= 77) {
        return "congratulation 🎉"
      }

      return "but try harder !!!!"
    }

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
        <h1 style={{color: "#000", marginTop: 100}}>Stack Viewer</h1>    
        <AddrStack>
          <AddrRecord
            style={addrRecordStyle}
            addr="[rbp - 0x50] ~ [rbp - 0x30]">
            {stack.slice(passwordOffset, passwordOffset + passwordLen).map((v, _) => {
              return <ByteBlock value={v} />
            })}
          </AddrRecord>
          <AddrRecord 
            style={addrRecordStyle}
            addr="[rbp - 0x30] ~ [rbp - 0x10]">
            {stack.slice(usernameOffset, usernameOffset + usernameLen).map((v, _) => {
              return <ByteBlock value={v} />
            })}
          </AddrRecord>
          <AddrRecord 
            style={addrRecordStyle}
            addr="[rbp - 0x10] ~ [rbp - 0x04]"
            value="未使用領域" />
          <AddrRecord
            style={addrRecordStyle} 
            addr="[rbp - 0x04] ~ [rbp - 0x00]"
            value={`ok = ${username.length >= 45 || password.length >= 77 ? 1 : 0}`} />
        </AddrStack>
        </div>
        <CustomModal 
          open={open} 
          onClose={() => setOpen(!open)}
          title={modalTitle()}
          desc={modalDesc()}
          showLink={username.length >= 45 || password.length >= 77} />
      </div>
    );
};

const addrRecordStyle = {
  width: 700,
  border: "2pt solid black",
  marginTop: -2,
  backgroundColor: "#c0c0c0",
}

export default LoginForm;
