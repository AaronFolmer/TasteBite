# Taste Bite

TasteBite is a restaurant review website! I made this project with the purpose to learn more about ReactJS, CSS Frameworks and Firebase Database.

## Homepage

![homepage](https://github.com/AaronFolmer/TasteBite/assets/53709330/ae5b29fe-38ee-4c5d-a843-37b910a8025f)

## How to run locally

 - First clone the repository;
     ```
     git clone https://github.com/AaronFolmer/TasteBite.git
     ```
 - Then install all the dependecies;
     ```
     npm install
     ```
 - Create an account in Firebase and create a project with storage and database;
 - Create a .env file inside the root folder and set the firebase project secret key like this:
     ```
     REACT_APP_apiKey="YOUR_FIREBASE_SECRET_KEY"
     ```
 - Create a firebase.js file and set the code like this (changing the values to the keys and ids of your firebase app):
     ```
      import { initializeApp } from "firebase/app";
      import { getFirestore } from "@firebase/firestore"
      
      const firebaseConfig = {
        apiKey: REACT_APP_apiKey,
        authDomain: REACT_APP_authDomain,
        projectId: REACT_APP_projectId,
        storageBucket: REACT_APP_storageBucket,
        messagingSenderId: .REACT_APP_messagingSenderId,
        appId: REACT_APP_appId,
        measurementId: REACT_APP_measurementId
      };
      
      const app = initializeApp(firebaseConfig);
      export const firestore = getFirestore(app)
     ```
 - Then finally run ``` npm run dev ```

## Notes

The project itself, it is very simple, and have a lot of things that i would change and update, but however, i've ended learning a lot of things and im happy with that.
