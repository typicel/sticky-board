import React from "react";
import { Textarea, Button, createStyles, MantineTheme } from "@mantine/core";

const useStyles = createStyles((theme: MantineTheme) => ({
  textarea: {
    borderRadius: "0px",
    width: "20rem",
  },
  button: {
    borderRadius: "0px",
    height: "2rem",
  },
}));

const Sticky = ({
  note,
  index,
  changeText,
  removeSticky,
  onDragStart,
  onDragEnd,
}) => {
  const { classes } = useStyles();

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, index)}
      onDragEnd={onDragEnd}
    >
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
  );
};

export default Sticky;
