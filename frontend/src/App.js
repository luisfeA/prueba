import React, { Component } from 'react';
import logo from './logo5uper.png';
import './App.css';
import ProductList from './ProductList';
import Delete from './Eliminar';
import Add from './Agregar';
import Modificar from './Modificar';
import { Button } from 'react-bootstrap';






class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
        action: 0,
      };
    }
  actualizarVista(id){
      this.setState({action: id});
      this.render();
  }

  render() {
    const {action} = this.state;
    if(action===0){
      return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo"/>
            <h1 className="App-title">Supermercado "El 5uper!"</h1>
          </header>
          <Button bsStyle="danger"onClick={(e) => this.actualizarVista(1)}>Añadir nuevo producto</Button>
          <Button bsStyle="primary" onClick={(e) => this.actualizarVista(2)}>Eliminar producto</Button>
          <Button bsStyle="success" onClick={(e) => this.actualizarVista(3)}>Ver todos los productos </Button>
          <Button bsStyle="warning" onClick={(e) => this.actualizarVista(4)}>Modificar Productos </Button>
        </div>
      );
    }
    if(action ===3){
      return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo"/>
            <h1 className="App-title">Supermercado</h1>
          </header>
          <ProductList/>

          <Button bsStyle="danger"onClick={(e) => this.actualizarVista(1)}>Añadir nuevo producto</Button>
          <Button bsStyle="primary" onClick={(e) => this.actualizarVista(2)}>Eliminar producto</Button>
          <Button bsStyle="warning" onClick={(e) => this.actualizarVista(4)}>Modificar Productos </Button>
        </div>
      );

    }
    if(action===2){
      return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo"/>
            <h1 className="App-title">Supermercado</h1>
          </header>

          <Delete/>

          <Button bsStyle="danger"onClick={(e) => this.actualizarVista(1)}>Añadir nuevo producto</Button>
          <Button bsStyle="success" onClick={(e) => this.actualizarVista(3)}>Ver todos los productos </Button>
          <Button bsStyle="warning" onClick={(e) => this.actualizarVista(4)}>Modificar Productos </Button>
        </div>
      );
      

    }
    if(action===1){
      return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo"/>
            <h1 className="App-title">Supermercado</h1>
          </header>
     
          <Add/>

          <Button bsStyle="primary"onClick={(e) => this.actualizarVista(2)}>Eliminar producto</Button>
          <Button bsStyle="success" onClick={(e) => this.actualizarVista(3)}>Ver todos los productos </Button>
          <Button bsStyle="warning" onClick={(e) => this.actualizarVista(4)}>Modificar Productos </Button>
        </div>
      );
       
    }
    if(action===4){
      return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo"/>
            <h1 className="App-title">Supermercado</h1>
          </header>
          <Modificar/>
          <Button bsStyle="danger"onClick={(e) => this.actualizarVista(1)}>Añadir nuevo producto</Button>
          <Button bsStyle="primary"onClick={(e) => this.actualizarVista(2)}>Eliminar producto</Button>
          <Button bsStyle="success" onClick={(e) => this.actualizarVista(3)}>Ver todos los productos </Button>
        </div>
      );
    }
  }

}

export default App;