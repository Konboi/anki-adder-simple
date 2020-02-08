import React from "react";
import {
  Container,
  Form,
  Header,
  TextArea,
  Button,
  Select
} from "semantic-ui-react";
import { connect } from "react-redux";
import { addNote } from "../reducer/noteReducer";
import { setCurrentDeck } from "../reducer/currentDeck";
import { setCurrentModel } from "../reducer/currentModel";

const AddCard = props => {
  const deck = props.currentDeck;
  const model = props.currentModel;
  const deckNames = props.decks;
  const modelNames = props.models;

  const add = async event => {
    event.preventDefault();

    const front = event.target.front.value;
    const back = event.target.back.value;
    const tags = event.target.tags.value.trim().split(",");

    const set = async () => {
      props.addNote({
        deckName: deck,
        modelName: model,
        front: front,
        back: back,
        tags: tags
      });

      event.target.front.value = "";
      event.target.back.value = "";
    };
    await set();
  };

  const handleDeck = async (event, data) => {
    const deck = data.value;
    await props.setCurrentDeck(deck);
  };

  const handleModel = async (event, data) => {
    const model = data.value;
    await props.setCurrentModel(model);
  };

  return (
    <Container className="add-card">
      <Form onSubmit={add}>
        <Container className="select-deck" style={{ paddingTop: 20 + "px" }}>
          <Form.Field
            label="Current Deck"
            control={Select}
            name="deckName"
            options={deckNames.map(name => ({
              key: name,
              text: name,
              value: name
            }))}
            value={deck}
            onChange={handleDeck}
          ></Form.Field>
          <Form.Field
            label="Note Type"
            name="modelName"
            control={Select}
            options={modelNames.map(name => ({
              key: name,
              value: name,
              text: name
            }))}
            value={model}
            onChange={handleModel}
          ></Form.Field>
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

const mapToProps = state => {
  return {
    decks: state.decks,
    models: state.models,
    currentDeck: state.currentDeck,
    currentModel: state.currentModel
  };
};

export default connect(mapToProps, {
  addNote,
  setCurrentDeck,
  setCurrentModel
})(AddCard);
