import React from "react";
import { Container, Table, Icon, Button } from "semantic-ui-react";

const SavedNote = () => {
  return (
    <Container className="saved-notes" style={{ paddingTop: 20 + "px" }}>
      <Container className="saved-card-list">
        <Table unstackable selectable>
          <Table.Header>
            <Table.Row textAlign="center">
              <Table.HeaderCell>Deck</Table.HeaderCell>
              <Table.HeaderCell>Front</Table.HeaderCell>
              <Table.HeaderCell>Back</Table.HeaderCell>
              <Table.HeaderCell></Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell>金のフレーズ</Table.Cell>
              <Table.Cell>unfortunately</Table.Cell>
              <Table.Cell>残念なことに</Table.Cell>
              <Table.Cell>
                <Icon name="delete" />
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </Container>
      <Container
        className="saved-card-action"
        style={{ paddingTop: 20 + "px", textAlign: "center" }}
      >
        <Button content="Delete All Notes" color="red" />
        <Button content="Send Notes to Anki" color="green" />
        <Button content="Export Notes (CSV)" color="orange" />
      </Container>
    </Container>
  );
};

export default SavedNote;
