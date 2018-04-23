import * as React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import { Button } from 'react-bootstrap';
import './Agregar.css';


class Add extends React.Component {

    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.state = {
            products: [],
            isLoading: false,
            nombre:"",
            fecha:"",
            codigo:"",
            precio:"",
            categoria:1,

        };
        }
    subirFormulario(e) {
        console.log("formulario enviado c:");
        this.product = {nombre: "", codigo: "", categoria: "", precio: "", fecha: ""}
        this.product.nombre = e.nombre;
        this.product.codigo = e.codigo;
        this.product.categoria = e.categoria;
        this.product.fecha = e.fecha;
        this.product.precio = e.precio; 
        if(this.product.codigo ==="" || this.product.nombre==="" || this.product.categoria ==="" ||this.product.precio ==="" ||this.product.fecha ==="" ){
            console.log("Debe llenar todos las casillas");
            return;
        }
        else{
            this.limpiarValores(1);
            if(this.product.categoria==0){

                this.setState({ categoria: 0});
            }
            console.log("Producto: "+ this.product);
            console.log("Datos: "+ this.product.nombre);
            console.log("Datos: "+ this.product.categoria);
            console.log("Datos: "+ this.product.precio);
            console.log("Datos: "+ this.product.codigo);
            console.log("Datos: "+ this.product.fecha);
            fetch('http://104.236.68.75:8080/backendGrupo5/api/add?codigo='+this.product.codigo+'&nombre='+this.product.nombre+'&fecha='+this.product.fecha+'&categoria='+this.product.categoria+'&precio='+this.product.precio)
            .then(response => console.log("Producto Agregado"+response)) 
            }
       
        return;
        }
    limpiarValores(i){
        if(i===1){
            this.setState({isLoading: false, nombre: "", codigo: "", precio: "", fecha: "", categoria: 1});
            this.render();
        }
    }
    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name; 
        this.setState({
            [name]: value
            });
        console.log(name, value, target);
        }
      

    render() {
        const {products, isLoading} = this.state;
        if (isLoading) {
            return <p>Cargando...</p>;
        }
        else{
            return (
                <form>
                <div>
                    <label> Nombre:  </label>
                    <input name= "nombre" type = "text" value={this.state.nombre}
                    onChange = {this.handleInputChange} />
                </div>
                <div>
                    <label> Categoria:  </label>
                    <select name="categoria" component="select" onChange = {this.handleInputChange}>
                    value={this.state.categoria}
                        <option value={1}>Nacional</option>
                        <option value={0}>Importado</option>
                       
                     </select>
                </div>
                <div>
                    <label> Codigo:  </label>
                    <input name= "codigo" type = "text" value={this.state.codigo}
                    onChange = {this.handleInputChange} />
                </div>
                <div>
                    <label> Precio:  </label>
                    <input name= "precio" type = "num" value={this.state.precio} 
                    onChange = {this.handleInputChange} />
                </div>
                <div>
                    <label> Fecha  </label>
                    <input name= "fecha" type = "date" value={this.state.fecha}
                    onChange = {this.handleInputChange} />
                </div>
                <div>
                  <button type="button" onClick={(e) => this.subirFormulario(this.state)}>Agregar Producto</button>
                  <button type="button" onClick={(e) => this.limpiarValores(1)}>Limpiar Casillas</button>
                </div>
              </form>

                
            );
        }
      }
}

export default Add;

