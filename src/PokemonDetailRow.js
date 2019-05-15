import React from 'react'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  rowWrapper: {
    marginBottom: 12,
    display: 'flex',
  },
  rowAttribute: {
    width: 150,
    fontWeight: 'bold',
  },
  rowValue: {},
})

function PokemonDetailRow(props) {
  const { classes, attribute, value } = props
  return (
    <div className={classes.rowWrapper}>
      <div className={classes.rowAttribute}>{attribute}</div>
      <div className={classes.rowValue}>{value}</div>
    </div>
  )
}

export default withStyles(styles)(PokemonDetailRow)
