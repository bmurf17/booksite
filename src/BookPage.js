import React, { useState } from "react";
import { Typography, Drawer, TextField, Button, Box } from "@material-ui/core";
import firebase from "firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import "tailwindcss/tailwind.css";

export function BookPage() {
  //set up db
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

  const [drawer, toggleDrawer] = useState(false);
  const [bookNameValue, setBookNameValue] = useState("");
  const [authorNameValue, setAuthorNameValue] = useState("");

  const db = firebase.firestore();

  const booksRef = db.collection("books");
  const bookQuery = booksRef.orderBy("author");

  const [books] = useCollectionData(bookQuery, { idField: "id" });

  return (
    <>
      <div>
        {books
          ? books.map((book) => (
              <Typography>{book.name + " by: " + book.author} </Typography>
            ))
          : null}
      </div>
      <form>
        <TextField
          label="name"
          value={bookNameValue}
          onChange={(e) => setBookNameValue(e.target.value)}
        />
        <TextField
          label="author"
          value={authorNameValue}
          onChange={(e) => setAuthorNameValue(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            booksRef.add(
              {
                name: bookNameValue,
                author: authorNameValue,
              },
              setBookNameValue(""),
              setAuthorNameValue("")
            );
          }}
        >
          Add
        </Button>
      </form>
    </>
  );
}

export default BookPage;
