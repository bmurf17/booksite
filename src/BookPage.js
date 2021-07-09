import React, { useState } from "react";
import { Typography, Drawer, TextField, Button, Box } from "@material-ui/core";
import firebase from "firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import "tailwindcss/tailwind.css";
import request from "superagent";
import { Bookmark } from "@material-ui/icons";

export function BookPage() {
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
  const [pageCountValue, setPageCount] = useState(0);
  const [genresValue, setGenres] = useState([]);
  const [bookImage, setBookImage] = useState("");

  const db = firebase.firestore();

  const booksRef = db.collection("books");
  const bookQuery = booksRef.orderBy("author");

  const [books] = useCollectionData(bookQuery, { idField: "id" });

  return (
    <div>
      <form>
        <Box display="flex" align-items="center" m={1}>
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
            size="small"
            onClick={(e) => {
              e.preventDefault();
              if (bookNameValue !== "" && authorNameValue !== "") {
                request
                  .get("https://www.googleapis.com/books/v1/volumes")
                  .query({
                    q: bookNameValue,
                    inauthor: authorNameValue,
                    intitle: bookNameValue,
                  })
                  .then((data) => {
                    setGenres(data.body.items[1].volumeInfo.categories);
                    setPageCount(data.body.items[1].volumeInfo.pageCount);
                    setBookImage(
                      data.body.items[1].volumeInfo.imageLinks.smallThumbnail
                    );
                  });

                booksRef.add(
                  {
                    name: bookNameValue,
                    author: authorNameValue,
                    genres: genresValue,
                    pageCount: pageCountValue,
                    picture: bookImage,
                  },
                  setBookNameValue(""),
                  setAuthorNameValue("")
                );
              }
            }}
          >
            Add
          </Button>
        </Box>
      </form>

      <div>
        {books
          ? books.map((book) => (
              <Box style={{ paddingBottom: 6 }} key={book.name}>
                <img src={book.picture} />
                <Typography>
                  {"Title: " + book.name + " by: " + book.author}
                </Typography>
                <Typography style={{ paddingLeft: 12 }}>
                  Info
                  {" Page Count: " +
                    book.pageCount +
                    " Genre: " +
                    book.genres[0]}
                </Typography>
              </Box>
            ))
          : null}
      </div>
    </div>
  );
}

export default BookPage;
