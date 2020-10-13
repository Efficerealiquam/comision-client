import React from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import { Container } from "semantic-ui-react";

import "semantic-ui-css/semantic.min.css";
import "./App.css";
import Home from "./pages/Home";
import MenuBar from "./components/MenuBar";
import AddProducto from "./pages/AddProducto";
import Productos from "./pages/Productos";
import EditProducto from "./pages/EditProducto";

function App() {
  return (
    <Router>
      <Container>
        <MenuBar />
        <Route exact path="/" component={Home} />
        <Route exact path="/new-producto" component={AddProducto} />
        <Route exact path="/productos" component={Productos} />
        <Route exact path="/edit-producto/:id" component={EditProducto} />
      </Container>
    </Router>
  );
}

export default App;
