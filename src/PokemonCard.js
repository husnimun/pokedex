import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import Chip from '@material-ui/core/Chip'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'

const styles = theme => ({
  card: {
    maxWidth: 300,
    marginBottom: 24,
  },
  media: {
    width: 300,
    height: 250,
    backgroundSize: 200,
  },
  chip: {
    margin: 4,
  },
  cardContent: {
    padding: '8px !important',
  },
})

function PokemonCard(props) {
  const { classes, pokemon, openPokemonDetail } = props
  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={pokemon.image}
        title={pokemon.name}
      />
      <CardContent className={classes.cardContent}>
        <Typography variant="h5" component="h2">
          #{pokemon.number} {pokemon.name}
        </Typography>
        <Typography variant="h5" component="h2">
          {pokemon.types.map((type, index) => (
            <Chip
              key={index}
              label={type}
              variant="outlined"
              className={classes.chip}
            />
          ))}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          color="primary"
          onClick={() => {
            openPokemonDetail(pokemon)
          }}
        >
          View Detail
        </Button>
      </CardActions>
    </Card>
  )
}

PokemonCard.propTypes = {
  pokemon: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(PokemonCard)
