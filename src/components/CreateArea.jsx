import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";
import axios from "axios";

function CreateArea(props) {
  const [note, setNote] = useState({
    title: "",
    content: ""
  });

  const [isExpanded, setExpand] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setNote(prevNote => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  function submitNote(event) {
    // props.onAdd();

    axios({
      url:"/name",
      method: "POST",
      data : note
    });

    setNote({
      title: "",
      content: ""
    });

    props.addNoteDB();
    event.preventDefault();
  }

  function handleClick() {
    setExpand(true);
  } 


  return (
    <div>
      <form  className="create-note">
        {isExpanded === true ? (
          <input
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder="Title"
          />
        ) : null}

        <textarea
          name="content"
          onChange={handleChange}
          onClick={handleClick}
          value={note.content}
          placeholder="Take a note..."
          rows={isExpanded === true ? "3" : "1"}
        />

        <Zoom in={isExpanded}>
          <Fab onClick={submitNote}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
