import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
import styles from "./gd.module.css";



export default function DenseTable(props) {

  const handelClick = (e, type) => {
    let id = e.target.parentElement.cells[0].innerHTML
    let temp = String(id).split(' ')
    id = type === 'vertex' ? [Number(temp[0])] : [Number(temp[0]), Number(temp[2])]
    let label, weight;

    if (type === 'vertex') {
      label = window.prompt('Enter label ');
    } else {
      weight = window.prompt('Enter weight ')
      while (weight === '' || !Number(weight)) {
        if (weight === '0') break
        if (weight === null) return
        weight = window.prompt('Enter weight\nWeight must be a number ')
      }
    }

    props.update(props.data.map(item => {
      if (type === 'vertex') {
        if (item.id === id[0]) {
          item.label = label;
        }
      } else {
        if (item.id1 === id[0] && item.id2 === id[1])
          item.label = Number(weight);
      }
      return item;
    }))
  }

  return (
    <TableContainer component={Paper} className={styles.table}>
      <Table aria-label="a dense table">
        <TableHead>
          <TableRow>
            {props.tableTitle.map((name) => (
              <TableCell key={name} className={styles.text} align="left">
                {name}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.type === 'vertex' ?
            props.data.map((row) => (
              <TableRow key={row.id} onClick={(e) => handelClick(e, props.type)}>
                <TableCell className={styles.text} align="left">{row.id}</TableCell>
                <TableCell className={styles.text, styles.label} align="left">
                  {row.label == null ? 'No Label' : row.label}
                </TableCell>
                <TableCell className={styles.text}>{row.x}</TableCell>
                <TableCell className={styles.text} align="right">{row.y}</TableCell>
                <TableCell className={styles.text} align="right">{row.color}</TableCell>
              </TableRow>
            ))
            :
            props.data.map((row) => (
              <TableRow key={row.id1 * 10 + row.id2} onClick={(e) => handelClick(e, props.type)}>
                <TableCell className={styles.text} align="left">{row.id1} {'<->'} {row.id2}</TableCell>
                <TableCell className={styles.text, styles.label} component="th" scope="row" >
                  {row.label === null ? 'No Label' : row.label}
                </TableCell>
                <TableCell className={styles.text}>{row.thick}</TableCell>
                <TableCell className={styles.text} align="right">{row.colorCode}</TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
}
