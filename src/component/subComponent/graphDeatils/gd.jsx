import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import styles from './gd.module.css';
import Table from './table';

import { connect } from 'react-redux';
import * as toolActions from '../../../store/action/createAction';
import { bindActionCreators } from 'redux';


const NestedList = props => {

  const [open1, setOpen1] = React.useState(true);
  const [open2, setOpen2] = React.useState(true);
  const handleClick = (id) => {
    if (id === 0)
      setOpen1(!open1)
    else
      setOpen2(!open2)
  };

  return (
    <div>
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        className={styles.list}
      >
        <ListItem className={styles.listitem}>
          {
            open1 ?
              <ExpandLess className={styles.listicon} onClick={() => handleClick(0)} />
              :
              <ExpandMore className={styles.listicon} onClick={() => handleClick(0)} />
          }
          <p className={styles.listitemName}>Vertices</p>
        </ListItem>
        <Collapse in={open1} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <Table update={props.actions.updataVertex} data={props.vertices} type={'vertex'} tableTitle={['Id', 'Label', 'X', 'Y', 'Col']} />
          </List>
        </Collapse>
      </List>
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        className={styles.list}
      >
        <ListItem className={styles.listitem}>
          {
            open2 ?
              <ExpandLess className={styles.listicon} onClick={() => handleClick(1)} />
              :
              <ExpandMore className={styles.listicon} onClick={() => handleClick(1)} />
          }
          <p className={styles.listitemName}>Edges</p>
        </ListItem>
        <Collapse in={open2} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <Table update={props.actions.updataEdge} data={props.edges} type={'edge'} tableTitle={['Edge', 'Weight', 'Thc', 'Col']} />
          </List>
        </Collapse>
      </List>
    </div>
  );
}


const mapStateToProps = state => {
  return {
    vertices: state.vertices,
    edges: state.edges
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(toolActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NestedList);