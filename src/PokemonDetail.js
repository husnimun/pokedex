import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import DialogTitle from '@material-ui/core/DialogTitle'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import PokemonDetailRow from './PokemonDetailRow'

const styles = {
  pokemonDetail: {
    width: 500,
  },
  textCentered: {
    textAlign: 'center',
  },
}

class PokemonDetail extends React.Component {
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
        aria-labelledby="pokemon-detail"
        {...other}
      >
        <div className={classes.pokemonDetail}>
          <DialogContent>
            <div className={classes.textCentered}>
              <img src={pokemon.image} alt={pokemon.name} />
            </div>
            <DialogTitle id="pokemon-detail" className={classes.textCentered}>
              #{pokemon.number} {pokemon.name}
            </DialogTitle>
            <div>
              <PokemonDetailRow
                attribute="Type"
                value={pokemon.types && pokemon.types.join(', ')}
              />
              <PokemonDetailRow
                attribute="Resistant"
                value={pokemon.resistant && pokemon.resistant.join(', ')}
              />
              <PokemonDetailRow
                attribute="Weaknesses"
                value={pokemon.weaknesses && pokemon.weaknesses.join(', ')}
              />
              <PokemonDetailRow
                attribute="Classification"
                value={pokemon.classification}
              />
              <PokemonDetailRow attribute="Max HP" value={pokemon.maxHP} />
              <PokemonDetailRow
                attribute="Flee rate"
                value={pokemon.fleeRate}
              />
              <PokemonDetailRow
                attribute="Height"
                value={
                  pokemon.height &&
                  `${pokemon.height.minimum} - ${pokemon.height.maximum}`
                }
              />
              <PokemonDetailRow
                attribute="Weight"
                value={
                  pokemon.weight &&
                  `${pokemon.weight.minimum} - ${pokemon.weight.maximum}`
                }
              />
            </div>
          </DialogContent>
        </div>
      </Dialog>
    )
  }
}

PokemonDetail.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func,
  selectedValue: PropTypes.string,
}

export default withStyles(styles)(PokemonDetail)
