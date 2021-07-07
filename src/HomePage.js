import React, { useState } from "react";
import { Typography, Drawer, TextField, Button, Box } from "@material-ui/core";
import firebase from "firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import "tailwindcss/tailwind.css";
import book from "./book.png";

export function HomePage() {
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

  const db = firebase.firestore();

  return (
    <>
      <div>
        <Box
          display="flex"
          justifyContent="felx-start"
          p={1}
          bgcolor="background.paper"
        >
          <Box paddingLeft={1}>
            <Typography variant="h3">
              Welcome to my book tracking website
            </Typography>
          </Box>
        </Box>

        <img src={book} alt="book" />

        <Box paddingLeft={1} paddingBottom={1}>
          <Typography vairant="body1">By: Brendan Murphy</Typography>
        </Box>

        <Box paddingLeft={1} paddingBottom={5}>
          <Typography variant="body1">
            I have started this website to learn react and firebase. I really
            enjoy reading, so I am putting together this website to track the
            books I am reading. I want to give people the ability to comment on
            what I am reading, and maybe at one point allow them to post their
            own reading lists. Also, I think that it would be cool to keep stats
            on the books I am reading. Things like genre, page count, reading
            time, and other stats could be interesting.
          </Typography>
        </Box>
      </div>
    </>
  );
}

export default HomePage;
