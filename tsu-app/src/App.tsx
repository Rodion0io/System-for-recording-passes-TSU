import "./styles/App.css"

import { Route, Routes } from 'react-router-dom'

import Layout from "./components/layout/Layout"

function App() {

  return (
    <>
      <Routes>
        <Route path="/login" element={<h1>siuhdiushfdih</h1>}/>
        <Route path="/" element={<Layout/>}></Route>
      </Routes> 
    </>
  )
}

export default App
