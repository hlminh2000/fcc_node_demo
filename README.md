# Dragon master
This is a node.js demo project for FCC Toronto

## Getting the project started

### Installing Node.js
If you do not have node.js installed already please make sure to install it.  
The easiest way is to download it from https://nodejs.org.  
If you are on a Mac and have HomeBrew installed, `brew install node` will do the trick.  
If you are on linux, `apt-get install node` should work as well.

### Starting the project
#### 1. Install dependencies
After you have downloaded the project, either by downloading the zip or
by cloning it, follow these steps:
 1. Navigate to where you have downloaded the project on the terminal.
 This is done by:
  - open up your terminal (command prompt if you are on window)
  - run `cd <path-to-project-folder>` where `<path-to-project-folder>` is the path
  to where you have the project downloaded.
 2. Installing all the node dependencies
  - run `npm install` from the terminal in the project folder.

#### 2. Start the server:
  - run `npm start` or `node index.js` in the project folder
  - open your favorite browser and navigate to http://localhost:4000

#### 3. Login
The login credential that comes out of the box is as bellow:
- account: `techilla`
- password: `fcc`

### Database configuration (optional)
Out of the box, the project is set up to work with two .json files as its "database".  
You can see these two files in the `fcc_node_demo/data/fsDatabase` directory.

If you wish to use a real database, the project is also set up to work with Firebase.  
To make the project switch to a firebase database, do the following:
1. Set up a firebase project at https://firebase.google.com/.  
Disclaimer: I have no association with Firebase and am not promoting the product, it is simply the most convenient way I know of to migrate this project onto a real database.
2. Get your firebase project's Service Account json file and place it under the file `fcc_node_demo/data/fbAccountService.json`. Google is your friend if you need help finding your service account file ;)
3. Comment out `line 6` of `index.js` and put `line 7` back in.

# Happy noding!!!
