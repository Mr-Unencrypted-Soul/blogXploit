# BLOG{XPLOIT} #

A blog web application for ethical hacking.

## Fixed Vulnerabilities Features

- **Feature 1**: Broken Function Level Authorization (BFLA) Fix: While looking for improper authorization I bypassed a user to perform a delete function to which I rectified the code to implement proper role authorization, earlier in the backend was having vulnerable code that allowed the role “user” to delete the blog as well, but UI did not had an option to do so, thus adhering to RBAC (Role based Access Control)
- **Feature 2**: Cross Site Scripting Vulnerability Fix :Disabling Script Execution at Blog Description Removed the Script execution part from the blogs Description. Added Additional Security Headers such as CSP, Xss Filter, Strict Transport security as well.
- **Feature 3**: Generic Errors: Fixed the code to give generic errors instead of detailed stack traces as detailed errors may be helpful for attackers to find underlying technology stack and help them to find particular technologies know exploits.
- **Feature 4**: Password Hashing: Passwords are now getting hashed and safely stored in database using a library “bcrypt” that hashes the password and also compares the hashed password upon login functionality

### Prerequisites

- Prerequisite 1 - Should have Mongo DB Compass installed.
- Prerequisite 2 - Should have Node Js installed

### Installation and Getting Started

1. Clone the repo
   ```sh
   git clone https://github.com/YOUR_USERNAME/YOUR_PROJECT_NAME.git
2. Install Packages by "npm install -i"
3. Go to Todo-react - "npm run start"
4. Now Change directory to todo-node - "npm run start:dev"

