import { Snackbar } from 'burgos-snackbar'
import './App.css'
import { Providers } from './Providers'
import { Routes } from './Routes'

function App() {

  return (
      <Providers>
          <Routes />
          <Snackbar />
    </Providers>
  )
}

export default App
