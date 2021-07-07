import React, { useState } from "react";
import { Typography, Drawer, TextField, Button, Box } from "@material-ui/core";
import firebase from "firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import "tailwindcss/tailwind.css";
import { firebaseConfig } from "../src/Util/dbConfig";

export function TBRPage() {
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

  //set up db
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app(); // if already initialized, use that one
  }

  const [bookNameValue, setBookNameValue] = useState("");
  const [authorNameValue, setAuthorNameValue] = useState("");

  const db = firebase.firestore();

  const TbrRef = db.collection("tbr");
  const TbrQuery = TbrRef.orderBy("author");

  const [Tbr] = useCollectionData(TbrQuery, { idField: "id" });

  return (
    <>
      <form style={{ alignItems: "flex-end" }}>
        <TextField
          label="Title"
          value={bookNameValue}
          onChange={(e) => setBookNameValue(e.target.value)}
          style={{ paddingRight: 8 }}
        />
        <TextField
          label="Author"
          value={authorNameValue}
          onChange={(e) => setAuthorNameValue(e.target.value)}
          style={{ paddingRight: 8 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            TbrRef.add(
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
      <div>
        {Tbr
          ? Tbr.map((book) => (
              <Typography>{book.name + " by: " + book.author} </Typography>
            ))
          : null}
      </div>
    </>
  );
}

export default TBRPage;
