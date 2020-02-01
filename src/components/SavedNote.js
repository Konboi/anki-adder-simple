import React from "react";
import { Container, Table, Icon, Button } from "semantic-ui-react";
import ankiConnect from "../api/AnkiConnect";

const SavedNote = ({ notes, deleteCard, resetCard }) => {
  const saveToAnki = async () => {
    try {
      await ankiConnect.addNotes({ notes: notes });
      resetCard();
    } catch (e) {
      console.log("save error:", e.message);
    }
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
            {notes.map(note => {
              return (
                <Table.Row key={note.front}>
                  <Table.Cell>{note.deckName}</Table.Cell>
                  <Table.Cell>{note.front}</Table.Cell>
                  <Table.Cell>{note.back}</Table.Cell>
                  <Table.Cell>{note.tags.join(",")}</Table.Cell>
                  <Table.Cell>
                    <Icon
                      name="delete"
                      onClick={() => deleteCard(note.front)}
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
          onClick={() => resetCard()}
        />
        <Button
          content="Send Notes to Anki"
          color="green"
          onClick={() => saveToAnki()}
        />
        <Button content="Export Notes (CSV)" color="orange" />
      </Container>
    </Container>
  );
};

export default SavedNote;
