import React, { useEffect, FormEvent } from "react";
import {
  Container,
  Form,
  Header,
  TextArea,
  Button,
  Select,
  DropdownProps
} from "semantic-ui-react";
import { connect } from "react-redux";
import { initDecks } from "../reducer/deckReducer";
import { initModels } from "../reducer/modelReducer";
import {
  addNote,
  initNotes,
  initCurrentNote,
  setCurrentNote
} from "../reducer/noteReducer";
import { setCurrentDeck, initCurrentDeck } from "../reducer/currentDeckReducer";
import {
  setCurrentModel,
  initCurrentModel
} from "../reducer/currentModelReducer";
import { setCurrentTag, initCurrentTag } from "../reducer/currentTagReducer";

const AddCard = (props: any) => {
  const note = props.currentNote;
  const deck = props.currentDeck;
  const model = props.currentModel;
  const tag = props.currentTag;
  const deckNames = props.decks;
  const modelNames = props.models;

  useEffect(() => {
    const inits = async () => {
      props.initDecks();
      props.initModels();
      props.initNotes();
      props.initCurrentNote();
      props.initCurrentDeck();
      props.initCurrentModel();
      props.initCurrentTag();
    };
    inits();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const add = async (event: React.FormEvent) => {
    event.preventDefault();

    const front = (event.target as HTMLFormElement).front.value;
    const back = (event.target as HTMLFormElement).back.value;
    const tags = (event.target as HTMLFormElement).tags.value.trim();

    const set = async () => {
      props.addNote({
        deckName: deck,
        modelName: model,
        front: front,
        back: back,
        tags: tags.split(",")
      });
      props.setCurrentTag(tags);
      props.setCurrentNote({ front: "", back: "" });

      (event.target as HTMLFormElement).front.value = "";
      (event.target as HTMLFormElement).back.value = "";
      props.setCurrentFront("");
    };
    await set();
  };

  const handleDeck = async (event: React.FormEvent, data: DropdownProps) => {
    const deck = data.value;
    await props.setCurrentDeck(deck);
  };

  const handleModel = async (event: React.FormEvent, data: DropdownProps) => {
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
            options={deckNames.map((name: String) => ({
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
            options={modelNames.map((name: String) => ({
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
          <TextArea name="front" rows={2} defaultValue={note.front} />
          <label>Back:</label>
          <TextArea
            label="Back:"
            name="back"
            rows={2}
            defaultValue={note.back}
          />
          <Form.Field
            label="Tags:"
            name="tags"
            control="input"
            defaultValue={tag}
          />
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

// TODO: state type
const mapToProps = (state: any) => {
  return {
    decks: state.decks,
    models: state.models,
    currentNote: state.currentNote,
    currentDeck: state.currentDeck,
    currentModel: state.currentModel,
    currentFront: state.currentFront,
    currentTag: state.currentTag
  };
};

export default connect(mapToProps, {
  initNotes,
  initDecks,
  initModels,
  initCurrentNote,
  initCurrentDeck,
  initCurrentModel,
  initCurrentTag,
  addNote,
  setCurrentNote,
  setCurrentDeck,
  setCurrentModel,
  setCurrentTag
})(AddCard);
