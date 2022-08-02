import React from "react";
import { useEffect, useState } from "react";
import {
  Group,
  Button,
  MantineProvider,
  Global,
  ColorSchemeProvider,
  ColorScheme,
  AppShell,
} from "@mantine/core";
import { FiSun, FiMoon } from "react-icons/fi";
import { useHotkeys, useLocalStorage } from "@mantine/hooks";
import Sticky from "./Components/Sticky";

type StickyType = {
  text: string;
  id: number;
};

const App: React.FC = () => {
  // get notes from local storage or return empty array if no notes stored
  const [notes, setNotes] = useState<StickyType[]>(() => {
    const saved: [StickyType] = JSON.parse(localStorage.getItem("notes")!);
    return saved || [];
  });

  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "mantine-color-scheme",
    defaultValue: "light",
    getInitialValueInEffect: true,
  });

  const toggleTheme = () =>
    setColorScheme(colorScheme === "dark" ? "light" : "dark");
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));
  useHotkeys([["mod+J", () => toggleColorScheme()]]);

  const [dragged, setDragged] = useState<StickyType>();

  // Update local storage when new note is added
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const changeText = (id: number, newText: string) => {
    let copy: StickyType[] = [...notes];
    let index = copy.findIndex((note) => note.id === id);
    copy[index].text = newText;
    setNotes(copy);
  };

  const addSticky = () => {
    let copy: StickyType[] = [...notes];
    let newSticky: StickyType = {
      text: "",
      id: Math.floor(Math.random() * 1000000),
    };
    copy.push(newSticky);
    setNotes(copy);
  };

  const removeSticky = (id: number) => {
    let copy: StickyType[] = [...notes];
    let index = copy.findIndex((note) => note.id === id);

    copy.splice(index, 1);
    setNotes(copy);
  };

  const onDragStart = (e, index) => {
    setDragged(notes[index]);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", e.target.parentNode);
    e.dataTransfer.setDragImage(e.target.parentNode, 20, 20);
  };

  const onDragOver = (index) => {
    const draggedOverItem = notes[index];

    if (draggedOverItem === dragged) return;

    let items: StickyType[] = notes.filter((note) => note !== dragged);
    items.splice(index, 0, dragged!);

    setNotes(items);
  };

  const onDragEnd = () => {};

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        withNormalizeCSS
        withGlobalStyles
        theme={{ colorScheme }}
      >
        <Global
          styles={(theme) => ({
            body: {
              margin: "1rem",
            },
          })}
        />
        <AppShell
          className="App"
          header={
            <Button
              variant="subtle"
              color={colorScheme === "dark" ? "" : "dark"}
              onClick={toggleTheme}
            >
              {colorScheme === "dark" ? <FiSun /> : <FiMoon />}
            </Button>
          }
        >
          <Group position="center">
            {notes.map((note, idx) => {
              return (
                <div key={note.id} onDragOver={() => onDragOver(idx)}>
                  <Sticky
                    note={note}
                    index={idx}
                    changeText={changeText}
                    removeSticky={removeSticky}
                    onDragStart={onDragStart}
                    onDragEnd={onDragEnd}
                  />
                </div>
              );
            })}
          </Group>
          <Group position="center" p="xl">
            <Button
              color={colorScheme === "dark" ? "" : "dark"}
              onClick={addSticky}
            >
              Add Sticky
            </Button>
          </Group>
        </AppShell>
      </MantineProvider>
    </ColorSchemeProvider>
  );
};

export default App;
