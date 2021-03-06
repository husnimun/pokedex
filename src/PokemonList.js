import React from 'react'
import { gql } from 'apollo-boost'
import PokemonCard from './PokemonCard'
import { withStyles } from '@material-ui/core/styles'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import PokemonDetail from './PokemonDetail'
import CircularProgress from '@material-ui/core/CircularProgress'
import Observer from '@researchgate/react-intersection-observer'
import pokedexClient from './api/pokedexClient'
import TextField from '@material-ui/core/TextField'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    overflow: 'hidden',
    justifyContent: 'space-around',
  },
  gridList: {
    width: 936,
    justifyContent: 'space-between',
  },
  gridListTile: {
    height: '400px !important',
    width: '300px !important',
  },
  progress: {
    margin: theme.spacing.unit * 2,
  },
  center: {
    textAlign: 'center',
  },
  typeFilter: {
    width: 936,
    margin: '24px auto',
  },
})

class PokemonList extends React.Component {
  state = {
    first: 30,
    open: false,
    pokemon: {},
    pokemons: [],
    isLoading: false,
    types: '',
  }

  openPokemonDetail = pokemon => {
    this.setState({ pokemon, open: true })
  }

  handleIntersection = async event => {
    const { isLoading } = this.state
    if (isLoading) return
    if (event.isIntersecting) {
      this.setState({ isLoading: true })
      await this.loadPokemon()
      this.setState({ isLoading: false })
    }
  }

  handleTypesFilter = e => {
    this.setState({ types: e.target.value })
  }

  loadPokemon = async () => {
    const { first } = this.state
    const {
      data: { pokemons },
    } = await pokedexClient.query({
      query: gql`
        {
          pokemons(first: ${first}) {
            id
            name
            number
            image
            types
            classification
            resistant
            weaknesses
            fleeRate
            maxHP
            weight {
              minimum
              maximum
            }
            height {
              minimum
              maximum
            }
          }
        }
      `,
    })
    this.setState({ pokemons, first: first + 30 })
  }

  filterPokemonByTypes = () => {
    const { pokemons, types } = this.state
    if (!types) return pokemons
    let typesArr = types.split(',').map(type => type.trim())
    let filteredPokemons = pokemons.filter(pokemon => {
      return pokemon.types
        .map(type => type.toLowerCase())
        .some(type => typesArr.includes(type))
    })
    return filteredPokemons
  }

  renderLoader = () => {
    const { isLoading } = this.state
    const { classes } = this.props
    if (isLoading) return <CircularProgress className={classes.progress} />
  }

  render() {
    const { open, pokemon } = this.state
    const { classes } = this.props
    return (
      <div>
        <Card className={classes.typeFilter}>
          <CardContent>
            <TextField
              id="pokemon-types-filter"
              label="Filter pokemon by types"
              value={this.state.types}
              onChange={this.handleTypesFilter}
              helperText="Filter pokemon by types, separated by coma"
              margin="normal"
            />
          </CardContent>
        </Card>
        <div className={classes.root}>
          <PokemonDetail
            open={open}
            pokemon={pokemon}
            onClose={() => {
              this.setState({ open: false })
            }}
          />
          <GridList className={classes.gridList} cols={3}>
            {this.filterPokemonByTypes().map(pokemon => (
              <GridListTile key={pokemon.id} className={classes.gridListTile}>
                <PokemonCard
                  pokemon={pokemon}
                  openPokemonDetail={this.openPokemonDetail}
                />
              </GridListTile>
            ))}
          </GridList>
        </div>
        <div className={classes.center}>
          <Observer onChange={this.handleIntersection}>
            <div>{this.renderLoader()}</div>
          </Observer>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(PokemonList)
