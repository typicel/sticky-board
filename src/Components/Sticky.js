import { Grid, Paper, Textarea, Button, MantineProvider, createStyles, Group, Container } from '@mantine/core';
import { useState } from 'react';
import { appTheme } from '../Styles/theme';


const useStyles = createStyles((theme) => ({
  textarea: {
    borderRadius: '0px',
    width: '20rem',
  },
  button:{ 
    borderRadius: '0px',
    height: '2rem'
  }
}));

export const Sticky = ({ text, index, changeText, removeSticky }) => {
  const { classes } = useStyles();

  return (
    <div>
        <Textarea classNames={{
          input: classes.textarea
        }} 
        placeholder="My idea is..." 
        size="xl" 
        minRows={10} 
        value={text} 
        onChange={e => changeText(index, e.target.value)}
        >

        </Textarea>

        <Button color="red" onClick={removeSticky} styles={{
          root: classes.button
        }}> X </Button>
    </div>
  ); 
};
