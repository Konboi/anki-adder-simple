import React from "react";
import { Container, Table, Icon, Button } from "semantic-ui-react";
import ankiConnect from "../api/AnkiConnect";
import { CSVLink } from "react-csv";
import { connect } from "react-redux";
import { deleteNote, resetNotes, setCurrentNote } from "../reducer/noteReducer";
import { Link } from "react-router-dom";
import Note from "../model/Note";

const SavedNote = (props: any) => {
  const notes = props.notes;

  const saveToAnki = async () => {
    try {
      await ankiConnect.addNotes({ notes: notes });
    } catch (e) {
      console.log("save error:", e.message);
    }
  };

  const csvData = () => {
    return notes.map((note: Note) => [
      note.front,
      note.back,
      note.tags.join(",")
    ]);
  };

  return (
    <Container className="saved-notes" style={{ paddingTop: 20 + "px" }}>
      <Container className="saved-card-list">
        <Table unstackable selectable>
          <Table.Header>
            <Table.Row textAlign="center">
              <Table.HeaderCell>Deck</Table.HeaderCell>
              <Table.HeaderCell>Front</Table.HeaderCell>
              <Table.HeaderCell>Back</Table.HeaderCell>
              <Table.HeaderCell>Tags</Table.HeaderCell>
              <Table.HeaderCell></Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {notes.map((note: Note) => {
              return (
                <Table.Row key={note.front}>
                  <Table.Cell>{note.deckName}</Table.Cell>
                  <Table.Cell>{note.front}</Table.Cell>
                  <Table.Cell>{note.back}</Table.Cell>
                  <Table.Cell>{note.tags.join(",")}</Table.Cell>
                  <Table.Cell>
                    <Link
                      to={{
                        pathname: "/"
                      }}
                    >
                      <Icon
                        name="edit"
                        onClick={() =>
                          props.setCurrentNote({
                            front: note.front,
                            back: note.back
                          })
                        }
                      />
                    </Link>
                    <Icon
                      name="delete"
                      color="red"
                      onClick={() => {
                        if (
                          window.confirm(
                            `Are you sure to delete ${note.front} ?`
                          )
                        ) {
                          props.deleteNote(note.front);
                        }
                      }}
                      style={{ paddingLeft: 10 + "px" }}
                    />
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </Container>
      <Container
        className="saved-card-action"
        style={{ paddingTop: 20 + "px", textAlign: "center" }}
      >
        <Button
          content="Delete All Notes"
          color="red"
          onClick={() => props.resetNotes()}
        />
        <Button
          content="Send Notes to Anki"
          color="green"
          onClick={() => saveToAnki()}
        />
        <Button
          as={CSVLink}
          data={csvData()}
          uFEFF={false}
          filename={"anki-adder-simple-saved-notes.csv"}
          content="Export Notes (CSV)"
          color="orange"
        />
      </Container>
    </Container>
  );
};

// TODO: define state type
const mapToProps = (state: any) => {
  return {
    notes: state.notes
  };
};

export default connect(mapToProps, { deleteNote, resetNotes, setCurrentNote })(
  SavedNote
);
