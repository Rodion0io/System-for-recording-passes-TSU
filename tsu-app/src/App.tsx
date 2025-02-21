import "./styles/App.css"

import { Route, Routes } from 'react-router-dom'

import Layout from "./components/layout/Layout"
import AuthorizePage from "./components/pages/authorizePage/AuthorizePage"

import { ROUTES } from "./utils/routes"

function App() {

  return (
    <>
      <Routes>
        <Route path={ROUTES.MAINPAGE} element={<Layout/>}>
          <Route path={ROUTES.AUTHORIZE} element={<AuthorizePage/>}/>
          <Route path={ROUTES.REGISTRATION} element={<AuthorizePage/>}/>
        </Route>
      </Routes> 
    </>
  )
}

export default App
