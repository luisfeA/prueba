import * as React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import { Button } from 'react-bootstrap';
import './Eliminar.css';

class Delete extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            products: [],
            isLoading: false
        };
        }
    deleteProduct(e) {
        fetch('http://104.236.68.75:8080/backendGrupo5/api/delete/'+e)
        .then(response => console.log("Producto eliminado c:"));
        this.setState({products: [], isLoading: false});
        this.componentDidMount();
        this.render();
        //return this.forceUpdate(this.componentDidMount());
        }
      

    componentDidMount() {
        this.setState({isLoading: true});

        fetch('http://104.236.68.75:8080/backendGrupo5/api/all')
            .then(response => response.json())
            .then(data => this.setState({products: data, isLoading: false}));
        }

    render() {
        const {products, isLoading} = this.state;
        if (isLoading) {
            return <p>Cargando...</p>;
        }
        else{
            return (
              <div>
                              
                  <table id="t01">
                    <tbody>
                      <tr>
                        <th>Codigo</th>
                        <th>Nombre</th> 
                        <th>Categoria</th>
                        <th>Accion</th>
                      </tr>
                              {products.map((product) =>
                      <tr key={product.id}>
                        <th>{product.codigo}</th>
                        <th>{product.nombre}</th>
                        <th>{product.categoria}</th>
                        <th> <button onClick={(e) => this.deleteProduct(product.id)}>Delete</button></th>
                      </tr> 
                              )}
                    </tbody>
                  </table>
              </div>

                
            );
        }
      }
}

export default Delete;

