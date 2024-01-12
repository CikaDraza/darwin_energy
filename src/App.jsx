import { RouterProvider } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss'
import route from './route'

function App() {

  return (
    <RouterProvider router={route} />
  )
}

export default App
