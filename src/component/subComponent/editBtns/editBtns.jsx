import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemIcon, makeStyles } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import TimelineIcon from '@material-ui/icons/Timeline';

import styles from './edit.module.css';
import { clearListner } from '../../canvas/shape';

import { connect } from 'react-redux';
import * as toolActions from '../../../store/action/createAction';
import { bindActionCreators } from 'redux';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '4rem',
    maxWidth: 360,
    height: '100vh',
    backgroundColor: theme.palette.background.paper,
    borderRight: '1px solid rgba(255, 255, 255, 0.16)',
  },
}));

const SimpleList = props => {

  const classes = useStyles();
  const [active, setActive] = useState(0);

  useEffect((id = props.activeBtn) => {
    switch (String(id)) {
      case 'E1': setActive(1); break;
      case '': setActive(2); break;
      default: setActive(0)
    };
    return;
  }, []);

  const handelClick = (id) => {
    if (String(id) !== String(active))
      clearListner();
    setActive(id);
    switch (id) {
      case 1: props.actions.updateCurrentOperations('E1'); break
      case 2: props.actions.updateCurrentOperations(''); break
      default: break
    };
  }

  return (
    <div className={classes.root}>
      <List className={styles.list} component="nav" aria-label="main mailbox folders">
        <ListItem className={active === 1 ? styles.selected : null} onClick={() => handelClick(1)}>
          <ListItemIcon>
            <EditIcon className={active === 1 ? styles.selectedIcon : styles.icon} />
          </ListItemIcon>
        </ListItem>
        <ListItem className={active === 2 ? styles.selected : null} onClick={() => handelClick(2)}>
          <ListItemIcon>
            <TimelineIcon className={active === 2 ? styles.selectedIcon : styles.icon} />
          </ListItemIcon>
        </ListItem>
      </List>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    vertices: state.vertices,
    edges: state.edges,
    activeBtn: state.activeOperations
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(toolActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SimpleList);