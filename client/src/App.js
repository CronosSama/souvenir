import React from "react"
import { Container } from "@material-ui/core"
import Main from "./components/Main/Main"
import { BrowserRouter as Router,Routes, Route } from "react-router-dom"
import Auth from "./components/Auth/Auth"
import Navbar from "./components/NavBar/Navbar"
const App = () => {
  
  return (

      <Router>
        <Container maxwidth="lg">
        <Navbar/>

        <Routes>
          <Route path="/" exact element={<Main />} />
          <Route path="/auth" exact element={<Auth />} />
          
        </Routes>
        </Container>

      </Router>
      

  )


}


export default App;

