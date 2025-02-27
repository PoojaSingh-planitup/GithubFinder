import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const [searchUsername, setSearchUsername] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSignup, setIsSignup] = useState(false);

  // GitHub Personal Access Token 
  const GITHUB_TOKEN = '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';

  // Fetch initial users 
  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://api.github.com/users', {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
        },
      });
      setUsers(response.data.slice(0, 30));
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSearch = async () => {
    if (searchUsername) {
      try {
        const response = await axios.get(`https://api.github.com/search/users?q=${searchUsername}`, {
          headers: {
            Authorization: `token ${GITHUB_TOKEN}`,
          },
        });
        setUsers(response.data.items);
        [{name,}]
      } catch (error) {
        console.error('Error searching user:', error);
        setUsers([]);
      }
    }
  };

  const clearInput = () => {
    setSearchUsername('');
    fetchUsers();
    setRepos([]);
  };

  const handleUserSelect = async (user) => {
    try {
      const userDetails = await axios.get(`https://api.github.com/users/${user.login}`, {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
        },
      });
      setSelectedUser(userDetails.data);
      const reposResponse = await axios.get(`https://api.github.com/users/${user.login}/repos`, {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
        },
      });
      setRepos(reposResponse.data);
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  const handleBackToSearch = () => {
    setSelectedUser(null);
    setRepos([]);
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchUsers();
    }
  }, [isLoggedIn]);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setIsSignup(false); 
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setSelectedUser(null);
    setRepos([]);
  };

  const switchToSignup = () => {
    setIsSignup(true);
  };

  const switchToLogin = () => {
    setIsSignup(false);
  };

  return (
    <div className="bg-gray-100 p-6">
      {isLoggedIn ? (
        <>
          <div className="bg-red-500 py-4 margin-right-5 fixed w-full top-0 z-10">
            <div className="flex items-center">
              <h1 className="text-4xl text-white font-bold">Github Finder</h1>
              <div className="ml-auto flex items-center">
                <a href="#" className="text-black hover:underline mx-4" onClick={handleLogout}>Logout</a>
                <a href="#" className="text-black hover:underline mx-4">Home</a>
                <a href="#" className="text-black hover:underline">About</a>
              </div>
            </div>
          </div>

          {!selectedUser && (
            <div className="flex justify-center mb-4 mt-20">
              <input
                type="text"
                placeholder="Enter userName here..."
                value={searchUsername}
                onChange={e => setSearchUsername(e.target.value)}
                className="border rounded-l p-2"
              />
              <button onClick={handleSearch} className="bg-black text-white p-2 rounded-r">
                Search
              </button>
              <button onClick={clearInput} className="bg-gray-300 text-black p-2 rounded ml-2">
                Clear
              </button>
            </div>
          )}

          {selectedUser ? (
            <div className="flex flex-col items-center mt-10 bg-white shadow-lg p-4 rounded-lg">
              {/* Profile Details Section */}
              <img src={selectedUser.avatar_url} alt={selectedUser.login} className="rounded-full w-40 h-40 mb-4" />
              <h2 className="font-bold text-2xl">{selectedUser.name || selectedUser.login}</h2>
              <p>Location: {selectedUser.location || 'N/A'}</p>
              <p>Bio: {selectedUser.bio || 'N/A'}</p>
              <button 
                onClick={() => window.open(selectedUser.html_url, '_blank')}
                className="bg-gray-600 text-white px-4 py-2 mt-4 mb-4"
              >
                Visit Github Profile
              </button>

              {/* Followers, Following, Public Repos, Public Gists Section */}
              <div className="flex space-x-4 mb-4">
                <span className="bg-red-500 text-white px-3 py-1 rounded">Followers: {selectedUser.followers || 0}</span>
                <span className="bg-green-500 text-white px-3 py-1 rounded">Following: {selectedUser.following || 0}</span>
                <span className="bg-gray-300 text-black px-3 py-1 rounded">Public Repos: {selectedUser.public_repos || 0}</span>
                <span className="bg-gray-300 text-black px-3 py-1 rounded">Public Gists: {selectedUser.public_gists || 0}</span>
              </div>

              {/* Back to Search and Hireable Status */}
              <div className="flex items-center">
                <button onClick={handleBackToSearch} className="bg-black text-white p-2 mr-4">Back to Search</button>
                <span className="text-black">Hireable: {selectedUser.hireable ? 'Yes' : 'No'}</span>
              </div>

              {/* Repositories Section */}
              <div className="w-full mt-4">
                <h3 className="text-lg font-bold">Repositories</h3>
                {repos.length > 0 ? (
                  <ul className="list-disc pl-4">
                    {repos.map(repo => (
                      <li key={repo.id}>
                        <a 
                          href={repo.html_url} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-blue-500 hover:underline"
                        >
                          {repo.name}
                        </a> - Language: {repo.language || 'N/A'}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No repositories found.</p>
                )}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
              {users.map(user => (
                <div key={user.id} className="bg-white shadow-lg p-4 rounded-lg text-center">
                  <img src={user.avatar_url} alt={user.login} className="rounded-full w-24 h-24 mx-auto mb-2" />
                  <h2 className="font-bold text-xl">{user.login}</h2>
                  <button 
                    onClick={() => handleUserSelect(user)} 
                    className="bg-black text-white p-2 rounded mt-2"
                  >
                    More
                  </button>
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <div>
          {isSignup ? (
          <Signup 
            onSignup={handleLogin} 
            onSwitchToLogin={switchToLogin} 
            registeredUsers={registeredUsers} 
            setRegisteredUsers={setRegisteredUsers} 
          />
        ) : (
          <Login 
            onLogin={handleLogin} 
            onSwitchToSignup={switchToSignup} 
            registeredUsers={registeredUsers} 
          />
        )}
        </div>
      )}
    </div>
  );
}

export default App;
