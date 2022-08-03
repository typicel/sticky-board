import React from "react";
import { useEffect, useState } from "react";
import {
  Button,
  MantineProvider,
  Global,
  ColorSchemeProvider,
  ColorScheme,
  AppShell,
} from "@mantine/core";
import "./Styles/App.css";
import { FiSun, FiMoon } from "react-icons/fi";
import { useHotkeys, useLocalStorage } from "@mantine/hooks";
import Sticky from "./Components/Sticky";

interface StickyType {
  text: string;
  id: number;
  left: number;
  top: number;
}

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
  // const [dragged, setDragged] = useState<StickyType>();

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
      left: Math.floor(Math.random() * 100),
      top: Math.floor(Math.random() * 100),
    };
    copy.push(newSticky);
    setNotes(copy);
  };

  const removeSticky = (id: number) => {
    console.log("in removeSticky: passedin ID was: " + id);
    let copy: StickyType[] = [...notes];
    let index = copy.findIndex((note) => note.id === id);

    console.log("in removeSticky: id found was: " + copy[index]!.id);

    copy.splice(index, 1);
    setNotes(copy);
  };

  const setPosition = (x: number, y: number, id: number) => {
    let copy = [...notes];
    let index = copy.findIndex((note) => note.id === id);
    let note = copy[index];

    let newNote = { ...note, top: y, left: x };
    copy[index] = newNote;
    setNotes(copy);
  };

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
          styles={() => ({
            body: {
              margin: "1rem",
            },
          })}
        />
        <AppShell
          className="App"
          header={
            <div style={{ zIndex: 1000 }}>
              <Button
                variant="subtle"
                color={colorScheme === "dark" ? "" : "dark"}
                onClick={toggleTheme}
              >
                {colorScheme === "dark" ? <FiSun /> : <FiMoon />}
              </Button>
              <Button
                color={colorScheme === "dark" ? "" : "dark"}
                onClick={addSticky}
                style={{ position: "absolute" }}
              >
                Add Sticky
              </Button>
            </div>
          }
        >
          {notes.map((note, idx) => {
            return (
              <Sticky
                note={note}
                index={idx}
                changeText={changeText}
                removeSticky={removeSticky}
                setPosition={setPosition}
              />
            );
          })}
        </AppShell>
      </MantineProvider>
    </ColorSchemeProvider>
  );
};

export default App;
