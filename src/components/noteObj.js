import React from 'react';
import Marked from 'marked';
import Draggable from 'react-draggable';
import Textarea from 'react-textarea-autosize';

class NoteObj extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markup: this.props.note.text,
      editMode: false,
    };
    this.onDrag = this.onDrag.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
    this.changeModeToEdit = this.changeModeToEdit.bind(this);
    this.changeModeToSaved = this.changeModeToSaved.bind(this);
    this.createTextareaText = this.createTextareaText.bind(this);
  }
  // function to move the noteObj, parameters given
  onDrag(e, ui) {
    this.props.moveId(this.props.id, ui.x, ui.y);
  }
  // function to call passed prop function to delete note
  deleteNote() {
    this.props.deleteId(this.props.id);
  }
  // function to switch state to edit mode
  changeModeToEdit() {
    this.setState({
      editMode: true,
    });
  }
  // function to switch state to saved mode
  changeModeToSaved() {
    this.setState({
      editMode: false,
    });
    this.props.updateId(this.props.id, this.state.markup);
  }
  // function to make textarea into driven component
  createTextareaText(event) {
    this.setState({
      markup: event.target.value,
    });
  }
  render() {
    // checks and renders if note is in edit mode, else renders saved mode
    if (this.state.editMode === true) {
      // most of draggable given
      return (
        <Draggable
          handle=".note-mover"
          grid={[25, 25]}
          defaultPosition={{ x: 20, y: 20 }}
          position={null}
          onStart={this.onStartDrag}
          onDrag={this.onDrag}
          onStop={this.onStopDrag}
        >
          <div className="noteCard">
            <div className="titleDisplay">{this.props.note.title}</div>
            <div className="buttonBar">
              <button onClick={this.deleteNote}>Delete</button>
              <button onClick={this.changeModeToSaved}>Save</button>
              <button className="note-mover">Move</button>
            </div>
            <Textarea className="textInput" value={this.state.markup} onChange={this.createTextareaText} />
          </div>
        </Draggable>
      );
    } else {
      // dangerouslySetInnerHTML function given
      // most of draggable given
      // position code taken from https://github.com/mzabriskie/react-draggable
      return (
        <Draggable
          handle=".note-mover"
          grid={[25, 25]}
          defaultPosition={{ x: 0, y: 0 }}
          position={null}
          onStart={this.onStartDrag}
          onDrag={this.onDrag}
          onStop={this.onStopDrag}
        >
          <div className="noteCard">
            <div className="titleDisplay">{this.props.note.title}</div>
            <div className="buttonBar">
              <button onClick={this.deleteNote}>Delete</button>
              <button onClick={this.changeModeToEdit}>Edit</button>
              <button className="note-mover">Move</button>
            </div>
            <div className="noteBody" dangerouslySetInnerHTML={{ __html: Marked(this.props.note.text || '') }} />
          </div>
        </Draggable>
      );
    }
  }
}
export default NoteObj;
