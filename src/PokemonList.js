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

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    overflow: 'hidden',
    justifyContent: 'space-around',
  },
  gridList: {
    width: 972,
    justifyContent: 'space-around',
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
})

class PokemonList extends React.Component {
  state = {
    first: 30,
    open: false,
    pokemon: {},
    pokemons: [],
    isLoading: false,
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
          }
        }
      `,
    })
    this.setState({ pokemons, first: first + 30 })
  }

  renderLoader = () => {
    const { isLoading } = this.state
    const { classes } = this.props
    if (isLoading) return <CircularProgress className={classes.progress} />
  }

  render() {
    const { open, pokemon, pokemons } = this.state
    const { classes } = this.props
    return (
      <div>
        <div className={classes.root}>
          <PokemonDetail
            open={open}
            pokemon={pokemon}
            onClose={() => {
              this.setState({ open: false })
            }}
          />
          <GridList className={classes.gridList} cols={3}>
            {pokemons.map(pokemon => (
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
