import React from "react";
import { Container, Table, Icon, Button } from "semantic-ui-react";
import ankiConnect from "../api/AnkiConnect";
import { CSVLink } from "react-csv";
import { useDispatch, useSelector } from "react-redux";
import { deleteNote, resetNotes, setCurrentNote } from "../reducer/noteReducer";
import { Link } from "react-router-dom";
import Note from "../model/Note";
import { RootState } from "../store/store";

const SavedNote = (props: any) => {
  const dispatch = useDispatch();
  const notes = useSelector((state: RootState) => state.notes);

  const saveToAnki = async () => {
    try {
      await ankiConnect.addNotes(notes);
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
                          dispatch(
                            setCurrentNote(
                              new Note("", "", note.front, note.back, [])
                            )
                          )
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
                          dispatch(deleteNote(note.front));
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
          onClick={() => dispatch(resetNotes())}
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

export default SavedNote;
