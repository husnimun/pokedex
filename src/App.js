import React from 'react'
import { ApolloProvider } from 'react-apollo'
import './App.css'
import PokemonList from './PokemonList'
import client from './api/pokedexClient'

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <PokemonList />
      </div>
    </ApolloProvider>
  )
}

export default App
