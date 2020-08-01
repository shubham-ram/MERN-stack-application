import React, { useState, useEffect} from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import axios from "axios";

function App() {
  const [notes, setNotes] = useState({
    post:[]
  });

  function addNote() {
    axios.get("/name")
      .then(response => {
        const data = response.data;
        console.log(data);
        setNotes({post: data});
       
      })
      .catch(() => {
        console.log("error")
      }); 
    console.log(notes);
  };

  useEffect(() => {
    addNote();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);
  
  function deleteNote(id) {
    axios.delete("/name",{data: {id}});
    
    addNote();
  }

    return (
      <div>
        <Header />
        <CreateArea addNoteDB = {addNote} />
        {notes.post.map((noteItem, index) => {
          return (
            <Note
              key={index}
              id={noteItem._id}
              title={noteItem.title}
              content={noteItem.content}
              onDelete={deleteNote}
            />
          );
        })}
        <Footer />
      </div>
    );

}

export default App;
