import React from "react";
import { Typography, AppBar, Tabs, Tab } from "@material-ui/core";
import firebase from "firebase";
import { useCollectionData } from 'react-firebase-hooks/firestore';
import "tailwindcss/tailwind.css";

function App() {
  var firebaseConfig = {
    apiKey: "AIzaSyD3wYGfzzoMtt2AAfbCr2ubYsoqvfrT75g",
    authDomain: "book-site-6b76c.firebaseapp.com",
    databaseURL: "https://book-site-6b76c-default-rtdb.firebaseio.com",
    projectId: "book-site-6b76c",
    storageBucket: "book-site-6b76c.appspot.com",
    messagingSenderId: "701453654538",
    appId: "1:701453654538:web:214986cbf7f8ccc7a85df3",
    measurementId: "G-XZ28S34HXP",
  };
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app(); // if already initialized, use that one
  }
  const db = firebase.firestore();

  const booksRef = db.collection("books");
  const query = booksRef.orderBy("author");

  const [books] = useCollectionData(query, {idField: 'id'});

  console.log("books: " + books);

  return (
    <div>
      <AppBar position="static">
        <Tabs variant="fullWidth">
          <Tab label="Page One" />
          <Tab label="Page Two" />
          <Tab label="Page Three" />
        </Tabs>
      </AppBar>
      <div className="flex">
        <Typography variant="h6">
          Welcome to my book tracking website
        </Typography>
        <Typography vairant="subtitle1">By: Brendan Murphy</Typography>
      </div>
      <div>
        {books ? (books.map((book) => <Typography>{book.name}</Typography>)) : (null)}
        
      </div>
    </div>
  );
}

export default App;
