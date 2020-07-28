import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import {Paper, Grid} from '@material-ui/core';
import {Tools,Canvas} from './component';

class App extends React.Component {

  darkTheme = createMuiTheme({
    palette: {
      type: 'dark',
    },
  });

  render() {
    return (
      <ThemeProvider theme={this.darkTheme}>
        <Paper style={{height: '100vh',width: '100vw', borderRadius:'0', overflow: 'hidden'}}>
          <Grid container>
            <Grid item xs={2}><Tools /></Grid>
            <Grid item xs={8} ><Canvas /></Grid>
            <Grid item xs={2}><p style={{padding:'10rem 2rem',color:'grey',opacity:'0.7'}}>-- confi area --<br /> Update soon......</p></Grid>
          </Grid>
        </Paper>
      </ThemeProvider>
    )
  }
}



export default App;
