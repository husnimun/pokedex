import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import DialogTitle from '@material-ui/core/DialogTitle'
import Dialog from '@material-ui/core/Dialog'
import blue from '@material-ui/core/colors/blue'

const styles = {
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
}

class SimpleDialog extends React.Component {
  handleClose = () => {
    this.props.onClose()
  }

  handleListItemClick = value => {
    this.props.onClose(value)
  }

  render() {
    const { classes, onClose, selectedValue, pokemon, ...other } = this.props

    return (
      <Dialog
        onClose={this.handleClose}
        aria-labelledby="simple-dialog-title"
        {...other}
      >
        <DialogTitle id="simple-dialog-title">{pokemon.name}</DialogTitle>
        <div>Gotta Catch Them All</div>
      </Dialog>
    )
  }
}

SimpleDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func,
  selectedValue: PropTypes.string,
}

export default withStyles(styles)(SimpleDialog)
