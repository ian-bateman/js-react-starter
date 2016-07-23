import React, { Component } from 'react';
import Immutable from 'immutable';
import NoteInput from './noteInput.js';
import NoteObj from './noteObj.js';

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
    this.setState({
      // mostly given
      notes: this.state.notes.set(this.state.id, note),
      // increment the id
      id: this.state.id + 1,
    });
  }
  // function to delete a noteObj
  deleteId(id) {
    this.setState({
      // given
      notes: this.state.notes.delete(id),
    });
  }
  // function to update a noteObj
  updateId(id, text) {
    this.setState({
      // mostly given
      notes: this.state.notes.update(id, (n) => { return Object.assign({}, n, { text }); }),
    });
  }
  // function to move a noteObj
  moveId(id, xCoord, yCoord) {
    // mostly given
    this.setState({
      notes: this.state.notes.update(id, (n) => { return Object.assign({}, n, { x: xCoord, y: yCoord }); }),
    });
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
