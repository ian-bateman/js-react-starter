import React, { Component } from 'react';
import Immutable from 'immutable';
import NoteInput from './noteInput.js';
import NoteObj from './noteObj.js';
import * as firebasedb from '../firebasedb';

// example class based component (smart component)
class App extends Component {
  constructor(props) {
    super(props);
    // init component state here
    this.state = {
      notes: Immutable.Map(),
      id: 0,
    };
    this.addNote = this.addNote.bind(this);
    this.deleteId = this.deleteId.bind(this);
    this.updateId = this.updateId.bind(this);
    this.moveId = this.moveId.bind(this);
  }

  componentDidMount() {
    firebasedb.fetchNotes((notes) => {
      this.setState({
        notes: Immutable.Map(notes),
      });
    });
  }
  // function to create a noteObj
  addNote(title) {
    // mostly given
    const note = {
      title,
      text: '',
      x: 0,
      y: 0,
      zIndex: 1,
    };
    firebasedb.addNoteDB(note);
  }
  // function to delete a noteObj
  deleteId(id) {
    firebasedb.deleteIdDB(id);
  }
  // function to update a noteObj
  updateId(id, text) {
    firebasedb.updateIdDB(id, text);
  }
  // function to move a noteObj
  moveId(id, x, y) {
    firebasedb.moveIdDB(id, x, y);
  }
  render() {
    // entrySeq function given
    return (
      <div>
        <NoteInput addNote={this.addNote} />
        {this.state.notes.entrySeq().map(([id, note]) => {
          return (
            <NoteObj
              id={id}
              key={id}
              note={note}
              moveId={this.moveId}
              updateId={this.updateId}
              deleteId={this.deleteId}
            />
          );
        })}
      </div>
    );
  }
}
export default App;
