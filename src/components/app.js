import React, { Component } from 'react';
import Immutable from 'immutable';
import NoteInput from './noteInput.js';

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
      id: this.state.id++,
    });
  }
  // function to delete the noteObj
  deleteId(id) {
    this.setState({
      // given
      notes: this.state.notes.delete(id),
    });
  }
  // function to update the noteObj
  updateId(id, text) {
    this.setState({
      // mostly given
      notes: this.state.notes.update(id, (n) => { return Object.assign({}, n, { text }); }),
    });
  }

  render() {
    return (
      <div>
        <NoteInput addNote={this.addNote} />
      </div>
    );
  }
}

export default App;
