import React, { useState } from 'react';

function Login({ onLogin, onSwitchToSignup, registeredUsers }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = registeredUsers.find(user => user.username === username && user.password === password);

    if (user) {
      onLogin(); 
    } else {
      alert("User not registered or password incorrect.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      <div className=" bg-red-500 p-4 fixed w-full top-0 z-10 text-center text-white">
        <h1 className="text-2xl font-bold">Github Finder</h1>
      </div>
      <h2 className="text-2xl font-semibold text-purple-700 mb-6">Login</h2>
      <form onSubmit={handleSubmit} className="w-72 space-y-4">
        <input 
          type="text" 
          placeholder="Username" 
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-400" 
          onChange={(e) => setUsername(e.target.value)} 
        />
        <input 
          type="password" 
          placeholder="Password" 
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-400" 
          onChange={(e) => setPassword(e.target.value)} 
        />
        <button 
          type="submit" 
          className="w-full p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          Login
        </button>
      </form>
      <button 
        onClick={onSwitchToSignup} 
        className="mt-4 text-green-600 font-semibold">
        Don't have an account? Sign up here
      </button>
    </div>
  );
}

export default Login;
