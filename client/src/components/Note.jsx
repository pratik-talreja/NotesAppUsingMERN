import React,{useState} from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';
import CancelIcon from '@material-ui/icons/Cancel';

function Note(props) {
	
	
	const [note, setNote] = useState({
		id:props.id,
    title: props.title,
    content: props.content
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setNote(prevNote => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }
	
	const [edit,editNote] = useState(false);
	
  function handleClick() {
	   props.onDelete(props.id);
  }
  
  function updateNote(){
	  editNote(true);
	 	  
	}
	
  function submitEdit(){
	 props.onEdit(note);
	 editNote(false);
  }
  
  function cancelEdit(){
	  editNote(false);
  }
	
	function renderEditView(){
		return(
		<div className="note">
		<input className = "editNoteTitle" name="title" placeholder = {props.title} onChange = {handleChange} value = {note.title}></input>
		<textarea className = "editNoteContent" name = "content" placeholder = {props.content} onChange = {handleChange} value = {note.content} />
		<button onClick = {submitEdit}><DoneIcon /></button>
		<button onClick={cancelEdit}><CancelIcon /></button>
		</div>
		)
	}
	
	function renderDefaultView(){
	return <div className="note">
	  <button onClick = {updateNote}><EditIcon /></button>
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button onClick={handleClick}>
        <DeleteIcon />
      </button>
    </div>
	}

  return (
	edit?renderEditView():renderDefaultView()
    
  );
}

export default Note;
