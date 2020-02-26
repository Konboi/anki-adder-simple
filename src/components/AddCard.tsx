import React, { useEffect } from "react";
import {
  Container,
  Form,
  Header,
  TextArea,
  Button,
  Select,
  DropdownProps
} from "semantic-ui-react";
import { RootState } from "../store/store";
import { useSelector, useDispatch } from "react-redux";
import Note from "../model/Note";
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
  const dispatch = useDispatch();
  const note = useSelector((state: RootState) => state.currentNote);
  const deck = useSelector((state: RootState) => state.currentDeck);
  const model = useSelector((state: RootState) => state.currentModel);
  const tag = useSelector((state: RootState) => state.currentTag);
  const deckNames = useSelector((state: RootState) => state.decks);
  const modelNames = useSelector((state: RootState) => state.models);

  useEffect(() => {
    const inits = async () => {
      dispatch(initDecks());
      dispatch(initModels());
      dispatch(initNotes());
      dispatch(initCurrentNote());
      dispatch(initCurrentDeck());
      dispatch(initCurrentModel());
      dispatch(initCurrentTag());
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
      dispatch(
        addNote({
          deckName: deck,
          modelName: model,
          front: front,
          back: back,
          tags: tags.split(",")
        })
      );
      dispatch(setCurrentTag(tags));

      dispatch(setCurrentNote(new Note()));

      (event.target as HTMLFormElement).front.value = "";
      (event.target as HTMLFormElement).back.value = "";
      props.setCurrentFront("");
    };
    await set();
  };

  const handleDeck = async (event: React.FormEvent, data: DropdownProps) => {
    const deck = data.value as string;
    await dispatch(setCurrentDeck(deck));
  };

  const handleModel = async (event: React.FormEvent, data: DropdownProps) => {
    const model = data.value as string;
    await dispatch(setCurrentModel(model));
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

export default AddCard;
