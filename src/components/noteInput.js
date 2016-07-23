import React from 'react';

class NoteInput extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
    this.addNote = this.addNote.bind(this);
    this.createInputText = this.createInputText.bind(this);
  }
  // function to add note imported from app.js, uses entered text
  addNote() {
    this.props.addNote(this.state.text);
  }
  // function to enable driven input component to work
  createInputText(event) {
    this.setState({
      text: event.target.value,
    });
  }

  render() {
    return (
      <div>
        <form className="noteInputForm" onSubmit={this.addNote}>
          <input
            className="createInput"
            type="text"
            placeholder="Create a new note..."
            value={this.state.text}
            onChange={this.createInputText}
          />
          <button className="createInputButton" type="submit">Create</button>
        </form>
      </div>
    );
  }
}

export default NoteInput;
