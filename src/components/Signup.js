import React, { useState } from 'react';

function Signup({ onSignup, onSwitchToLogin, registeredUsers, setRegisteredUsers }) {  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (registeredUsers && registeredUsers.some(user => user.username === username)) {
      alert("Username already exists!");
      return;
    }

    const newUser = { username, password, email };
    setRegisteredUsers([...registeredUsers, newUser]);
    onSignup(); 
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <div className=" bg-red-500 p-4 fixed w-full top-0 z-10 text-center text-white">
        <h1 className="text-2xl font-bold">Github Finder</h1>
      </div>
      <h2 className="text-3xl font-semibold mt-6 mb-4 text-blue-600">Signup</h2>
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
        <input 
          type="text" 
          placeholder="Username" 
          onChange={(e) => setUsername(e.target.value)} 
          className="w-full p-2 border border-gray-300 rounded" 
        />
        <input 
          type="password" 
          placeholder="Password" 
          onChange={(e) => setPassword(e.target.value)} 
          className="w-full p-2 border border-gray-300 rounded" 
        />
        <input 
          type="password" 
          placeholder="Confirm Password" 
          onChange={(e) => setConfirmPassword(e.target.value)} 
          className="w-full p-2 border border-gray-300 rounded" 
        />
        <input 
          type="email" 
          placeholder="Unique Email Id" 
          onChange={(e) => setEmail(e.target.value)} 
          className="w-full p-2 border border-gray-300 rounded" 
        />
        <button 
          type="submit" 
          className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Sign up
        </button>
      </form>
      <div className="mt-4 text-center">
        <span>Or</span>
      </div>
      <button 
        onClick={onSwitchToLogin} 
        className="mt-2 py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Have an account? Login Here
      </button>
    </div>
  );
}

export default Signup;
