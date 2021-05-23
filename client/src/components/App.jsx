import React, { useState, useEffect } from "react";
import axios from 'axios';
import {Link} from 'react-router-dom';
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
	
	const [notes, setNotes] = useState([]);
		
	useEffect(function(){
		async function getNotes(){
			const response = await axios.get("http://localhost:6969/getNotes");
			setNotes(response.data);
					
		}
		getNotes();
	},[]);
	
	
  async function addNote(newNote) {
	 await axios({
			method: "post",
			url: "http://localhost:6969/addNote",
			data:{
				title:newNote.title,
				content:newNote.content
				
			}
		});
	const newNotes = await axios.get("http://localhost:6969/getNotes");
	setNotes(newNotes.data);

	
  }
  async function deleteNote(id) {
	 
	await axios({
		method:"delete",
		url:'http://localhost:6969/deleteNote',
		data:{
			_id:id}
	});
	
   setNotes(prevNotes => {
      return prevNotes.filter((noteItem) => {
        return noteItem._id !== id;
      });
    });
  }
  
  async function editNote(editedNote){
	  console.log("Here");
	  const p = await axios({
		  method:"patch",
		  url:"http://localhost:6969/editNote",
		  data:{
			  _id:editedNote.id,
			  title:editedNote.title,
			  content:editedNote.content
		  }
		  
	  });
	  
	  const newNotes = await axios.get("http://localhost:6969/getNotes");
	setNotes(newNotes.data);

	  
	  
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem) => {
		  
        return (
          <Note
            key={noteItem._id}
            id={noteItem._id}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
			onEdit = {editNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
