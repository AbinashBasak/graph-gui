import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Drawer, List, ListItem, ListItemIcon } from '@material-ui/core';
import ViewListIcon from '@material-ui/icons/ViewList';
import EditIcon from '@material-ui/icons/Edit';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';

import { GraphDetailsList, EditTool, AlgoList } from '../subComponent';




class ToolListItems extends React.Component {
  constructor(props) {
    super(props);

    this.handelClick = this.handelClick.bind(this);
  }

  handelClick(value) {
    this.props.setActiveBtn(value)
  }

  render() {
    return (
      <>
        <ListItem button onClick={() => this.handelClick(1)}>
          <ListItemIcon style={{ minWidth: '0' }}  >
            <ViewListIcon style={{ color: this.props.activeButton === 1 ? "white" : "gray" }} />
          </ListItemIcon>
        </ListItem>
        <ListItem button onClick={() => this.handelClick(2)}>
          <ListItemIcon style={{ minWidth: '0' }}>
            <EditIcon style={{ color: this.props.activeButton === 2 ? "white" : "gray" }} />
          </ListItemIcon>
        </ListItem>
        <ListItem button onClick={() => this.handelClick(3)}>
          <ListItemIcon style={{ minWidth: '0' }}>
            <PlayCircleFilledIcon style={{ color: this.props.activeButton === 3 ? "white" : "gray" }} />
          </ListItemIcon>
        </ListItem>
      </>
    )
  }
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  paperAnchorLeft: {
    backgroundColor: "black",
  },
  content: {
    flexGrow: 1,
  },
}));


const ToolsList = props => {
  const classes = useStyles();
  const [activeNav, setActiveNav] = useState(1);

  const handelChange = (id) => {
    // props.updateMode(id);
  }

  return (
    <>
      <div className={classes.root}>
        <div style={{ minWidth: 50 }}>
          <Drawer
            variant="permanent"
            anchor="left"
            classes={{ paperAnchorLeft: classes.paperAnchorLeft }}
          >
            <List className={classes.listarea}>
              <ToolListItems activeButton={activeNav} setActiveBtn={setActiveNav} />
            </List>
          </Drawer>
        </div>
        {
          {
            1: <div className={classes.content}><GraphDetailsList /></div>,
            2: <div className={classes.content}><EditTool /></div>,
            3: <div className={classes.content}><AlgoList setOperation={handelChange} /></div>
          }[activeNav]
        }
      </div>
    </>
  );
}

export default ToolsList