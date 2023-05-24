import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SetupRouter from './routes/SetupRouter'
import { ApolloProvider } from '@apollo/client'
import client from './graphql'
import { Provider } from 'react-redux'
import { store } from './stores'

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <Provider store={store}>
          <SetupRouter/>
        </Provider>
      </ApolloProvider>
    </>
  )
}

export default App
