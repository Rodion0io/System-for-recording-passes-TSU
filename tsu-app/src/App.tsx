import "./styles/App.css"

import { Route, Routes } from 'react-router-dom'

import { Provider } from "react-redux"

import Layout from "./components/layout/Layout"
import ProtectedLayout from "./components/layout/ProtectedLayout"
import AuthorizePage from "./components/pages/authorizePage/AuthorizePage"
import RegistrationPage from "./components/pages/registrationPage/RegistrationPage"
import ProfilePage from "./components/pages/profilePage/ProfilePage"
import MainPage from "./components/pages/mainPage/MainPage"
import NewRequestPage from "./components/pages/newRequestPage/newRequestPage"
import ConcreteRequestPage from "./components/pages/concreteRequestPage/ConcreteRequestPage"
import UsersPage from "./components/pages/usersPage/UsersPage"
import UsersConcretePage from "./components/pages/usersPage/usersConcretePage/UsersConcretePage"

import { ROUTES } from "./utils/routes"
import { store } from "./utils/store/store"


function App() {

  return (
    <>
    <Provider store={store}>
      <ProtectedLayout>
        <Routes>
          <Route path={ROUTES.MAINPAGE} element={<Layout/>}>          
            <Route path={ROUTES.AUTHORIZE} element={<AuthorizePage/>}/>
            <Route path={ROUTES.REGISTRATION} element={<RegistrationPage/>}/>
              <Route path={ROUTES.MAINPAGE} element={<MainPage/>}/>
              <Route path={ROUTES.PROFILE} element={<ProfilePage/>}/>
              <Route path={ROUTES.USER_LIST} element={<UsersPage/>}/>
              <Route path={ROUTES.USER_INFORMATION} element={<UsersConcretePage/>}/>
              <Route path={ROUTES.NEW_REQUEST} element={<NewRequestPage/>}/>
              <Route path={ROUTES.CONCRETE_REQUEST} element={<ConcreteRequestPage/>}/>
            <Route path="*" element={<h1>Not found</h1>}/>
          </Route>
        </Routes> 
        </ProtectedLayout>
      </Provider>
    </>
  )
}

export default App
