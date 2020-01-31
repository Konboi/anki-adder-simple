import React from "react";
import { Container, Form, Header, TextArea, Button } from "semantic-ui-react";

const AddCard = ({ deckNames, modelNames }) => {
  return (
    <Container className="add-card">
      <Container className="select-deck" style={{ paddingTop: 20 + "px" }}>
        <Form>
          <Form.Field label="Current Deck" control="select" name="current-deck">
            {deckNames.map(name => (
              <option key={name}>{name}</option>
            ))}
          </Form.Field>
          <Form.Field label="Note Type" name="note-type" control="select">
            {modelNames.map(name => (
              <option key={name}>{name}</option>
            ))}
          </Form.Field>
        </Form>
      </Container>
      <Container className="add-card-form" style={{ paddingTop: 20 + "px" }}>
        <Header size="medium">Add Card</Header>
        <Form>
          <Form.Field inline>
            <label>Front:</label>
          </Form.Field>
          <TextArea name="front" rows={2} />
          <label>Back:</label>
          <TextArea label="Back:" name="back" rows={2} />
          <Form.Field label="Tags:" name="tags" control="input" />
          <Form.Field inline>
            <label style={{ paddingTop: 10 + "px" }}>
              Connection Refused and no cached data.
            </label>
            <Button type="submit" positive floated="right">
              Add Note
            </Button>
          </Form.Field>
        </Form>
      </Container>
    </Container>
  );
};

export default AddCard;
