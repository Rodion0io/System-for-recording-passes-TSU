import "./styles/App.css"

import { Route, Routes } from 'react-router-dom'

import Layout from "./components/layout/Layout"
import AuthorizePage from "./components/pages/authorizePage/AuthorizePage"
import RegistrationPage from "./components/pages/registrationPage/RegistrationPage"

import { ROUTES } from "./utils/routes"
import { store } from "./utils/store/store"

import { Provider,  } from "react-redux"

function App() {

  return (
    <>
    <Provider store={store}>
        <Routes>
          <Route path={ROUTES.MAINPAGE} element={<Layout/>}>
            <Route path={ROUTES.AUTHORIZE} element={<AuthorizePage/>}/>
            <Route path={ROUTES.REGISTRATION} element={<RegistrationPage/>}/>
          </Route>
        </Routes> 
      </Provider>
    </>
  )
}

export default App
