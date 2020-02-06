import React from "react";
import { Container, Form, Header, TextArea, Button } from "semantic-ui-react";
import { connect } from "react-redux";
import { addNote } from "../reducer/noteReducer";

const AddCard = props => {
  const add = event => {
    event.preventDefault();

    const deckName = event.target.deckName.value;
    const modelName = event.target.modelName.value;
    const front = event.target.front.value;
    const back = event.target.back.value;
    const tags = event.target.tags.value.trim().split(",");

    props.addNote({
      deckName: deckName,
      modelName: modelName,
      front: front,
      back: back,
      tags: tags
    });

    event.target.front.value = "";
    event.target.back.value = "";
  };

  return (
    <Container className="add-card">
      <Form onSubmit={add}>
        <Container className="select-deck" style={{ paddingTop: 20 + "px" }}>
          <Form.Field label="Current Deck" control="select" name="deckName">
            {props.deckNames.map(name => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </Form.Field>
          <Form.Field label="Note Type" name="modelName" control="select">
            {props.modelNames.map(name => (
              <option key={name}>{name}</option>
            ))}
          </Form.Field>
        </Container>
        <Container className="add-card-form" style={{ paddingTop: 20 + "px" }}>
          <Header size="medium">Add Card</Header>
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
        </Container>
      </Form>
    </Container>
  );
};

export default connect(null, { addNote })(AddCard);
