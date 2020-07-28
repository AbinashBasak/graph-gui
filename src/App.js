import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import {Paper, Grid} from '@material-ui/core';
import {Tools,Canvas} from './component';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      activeOperations: 'E1',
      edges: [],
      vertices: []
    }
    this.AddNewData = this.AddNewData.bind(this);
  }

  AddNewData(newData) {
    switch(this.state.activeOperations) 
    {
      case 'E1' : this.setState({vertices : [...this.state.vertices, newData]});break
      case '' : if(newData !== undefined && newData !== null) this.setState({edges : [...this.state.edges, newData]});break
      default : break
    }
    
  }

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
            <Grid item xs={8}><Canvas /></Grid>
            <Grid item xs={2}>hi</Grid>
          </Grid>
        </Paper>
      </ThemeProvider>
    )
  }
}



export default App;
