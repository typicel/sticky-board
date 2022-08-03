import React from "react";
import { Textarea, Button, createStyles, MantineTheme } from "@mantine/core";
import Draggable from "react-draggable";

const useStyles = createStyles((theme: MantineTheme) => ({
  textarea: {
    borderRadius: "0px",
    width: "20rem",
  },
  button: {
    borderRadius: "0px",
    height: "2rem",
  },
  sticky: {
    position: "absolute",
  },
}));

const Sticky = ({ note, index, changeText, removeSticky, setPosition }) => {
  const { classes } = useStyles();

  const handleStop = (e, data) => {
    setPosition(data.x, data.y, note.id);
  };

  return (
    <Draggable
      position={{ x: note.left, y: note.top }}
      onStop={handleStop}
      bounds="parent"
    >
      <div className={classes.sticky}>
        <p>{note.id}</p>
        <div id="mydivheader">
          <Button
            color="red"
            onClick={() => removeSticky(note.id)}
            classNames={{
              root: classes.button,
            }}
          >
            {" "}
            X{" "}
          </Button>
        </div>
        <Textarea
          classNames={{
            input: classes.textarea,
          }}
          placeholder="My idea is..."
          size="xl"
          minRows={10}
          value={note.text}
          onChange={(e) => changeText(note.id, e.target.value)}
          spellCheck={false}
        ></Textarea>
      </div>
    </Draggable>
  );
};

export default Sticky;
