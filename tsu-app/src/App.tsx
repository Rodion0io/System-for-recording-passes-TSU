import "./styles/App.css"

import { Route, Routes } from 'react-router-dom'

import { Provider } from "react-redux"

import Layout from "./components/layout/Layout"
import AuthorizePage from "./components/pages/authorizePage/AuthorizePage"
import RegistrationPage from "./components/pages/registrationPage/RegistrationPage"
import ProfilePage from "./components/pages/profilePage/ProfilePage"
import MainPage from "./components/pages/mainPage/MainPage"
import NewRequestPage from "./components/pages/newRequestPage/newRequestPage"
import ConcreteRequestPage from "./components/pages/concreteRequestPage/ConcreteRequestPage"

import { ROUTES } from "./utils/routes"
import { store } from "./utils/store/store"


function App() {

  return (
    <>
    <Provider store={store}>
        <Routes>
          <Route path={ROUTES.MAINPAGE} element={<Layout/>}>
            <Route index element={<MainPage/>}/>
            <Route path={ROUTES.AUTHORIZE} element={<AuthorizePage/>}/>
            <Route path={ROUTES.REGISTRATION} element={<RegistrationPage/>}/>
            <Route path={ROUTES.PROFILE} element={<ProfilePage/>}/>
            <Route path={ROUTES.NEW_REQUEST} element={<NewRequestPage/>}/>
            <Route path={ROUTES.CONCRETE_REQUEST} element={<ConcreteRequestPage/>}/>
            <Route path="*" element={<h1>Not found</h1>}/>
          </Route>
        </Routes> 
      </Provider>
    </>
  )
}

export default App
