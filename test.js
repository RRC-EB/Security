const crypto = require('crypto');
const axios = require('axios');

// Hardcoded API key (CWE-259)
const apiKey = 'mysecretkey';

// Insecure password hashing (CWE-301)
function hashPassword(password) {
  const hash = crypto.createHash('md5').update(password).digest('hex');
  return hash;
}

// Insecure use of external resources (CWE-200)
async function getUserData() {
  try {
    const response = await axios.get(`https://api.example.com/user?key=${apiKey}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

// Lack of access control (CWE-284)
async function sendDataToThirdParty(data) {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    await axios.post('https://third-party.com/receive-data', data, config);
  } catch (error) {
    console.log(error);
  }
}

// Insecure password storage (CWE-259)
const users = [
  { id: 1, username: 'user1', password: hashPassword('password1') },
  { id: 2, username: 'user2', password: hashPassword('password2') }
];

function getUserByUsername(username) {
  return users.find(user => user.username === username);
}

async function authenticateUser(username, password) {
  const user = getUserByUsername(username);
  if (user && user.password === hashPassword(password)) {
    return user;
  }
  return null;
}

// Example usage
const userData = await getUserData();
console.log('Retrieved user data:', userData);
const user = await authenticateUser('user1', 'password1');
if (user) {
  console.log('Authenticated as:', user.username);
  sendDataToThirdParty(userData);
} else {
  console.log('Authentication failed');
}
