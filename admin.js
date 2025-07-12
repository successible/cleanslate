const admin = require('firebase-admin');
const readline = require('readline');
const fs = require("fs")
const os = require('os');
const path = require('path');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Directory and file paths
const dirPath = path.join(os.homedir(), '.cleanslate');
const filePath = path.join(dirPath, 'users.json');
if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
}
        
rl.question('Enter your Firebase project ID: ', (projectId) => {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    projectId: projectId.trim()
  });

  const users = []
  async function listAllUsers(nextPageToken) {
    try {
      const result = await admin.auth().listUsers(1000, nextPageToken);
      result.users.forEach((userRecord) => {
        users.push(userRecord)
      });
      if (result.pageToken) {
        await listAllUsers(result.pageToken);
      } else {
        console.log('✅ Finished listing all users.');
        fs.writeFileSync(filePath, JSON.stringify(users, undefined, 2))
        rl.close();
      }
    } catch (error) {
      console.error('❌ Error listing users:', error);
      rl.close();
    }
  }

  listAllUsers();
});