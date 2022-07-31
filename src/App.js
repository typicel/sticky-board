import { useEffect, useState } from 'react';
import { Grid, Center, Group, Button, MantineProvider, createStyles, Global} from '@mantine/core';
import { Sticky } from './Components/Sticky';
import { appTheme } from './Styles/theme';

function App() {

  // get notes from local storage or return empty array if no notes stored
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem('notes');
    return saved.split(',') || [];
  });

  // Update local storage when new note is added
  useEffect(() => { localStorage.setItem("notes", notes); }, [notes])

  const changeText = (index, newText) => {
    let copy = [...notes];
    copy[index] = newText;
    setNotes(copy);
  }

  const addSticky = () => { setNotes([...notes, ""]); }
  const removeSticky = (index) => { setNotes([...notes].splice(index, 1)); }

  return (
      <MantineProvider withNormalizeCSS withGlobalStyles theme={appTheme}>
          <Global styles={(theme) => ({
            body: {
              margin: '1rem',
            }
          })} />
          <Group position="center">
              {notes.map((text, index) => {
                return <Sticky text={text} index={index} changeText={changeText} removeSticky={removeSticky}/>
              })}
          </Group>
          <Group position="center" p="xl">
            <Button onClick={addSticky}>Add</Button>
          </Group>
      </MantineProvider>
  );
}

export default App;
