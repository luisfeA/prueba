import * as React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import { Button } from 'react-bootstrap';

class Modificar extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            products: [],
            codigo: "",
            nombre: "",
            fecha: "",
            categoria: "",
            precio: "",
            cambio: false,
            isLoading: false
        };
            this.handleInputChange = this.handleInputChange.bind(this);
        }
        //Cuando se edita los campos del input, se guarda el valor ingresado **
        handleInputChange(event) {
            const target = event.target;
            const value =  target.value;
            const name = target.name;
            //console.log(d.categoria);
            //console.log(document.getElementById(name).defaultValue);
            //console.log("dudu ");
            if(name==='categoria'){
                if(value==='Nacional'){
                    //console.log('en categoria nacional');
                    this.setState({
                        categoria:1
                    });
                }
                else{
                    this.setState({
                        categoria:0
                    });
                }
            }
            else{
                this.setState({
                    [name]: value
                  });
            }



            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth()+1;
            var yyyy = today.getFullYear();
            if(dd<10) {
                dd = '0'+dd
            }
            if(mm<10) {
                mm = '0'+mm
            }
            today = yyyy + '-' + mm + '-' + dd;
            this.setState({
                fecha:today
            });
            //console.log(today);
            
          }
        
          //Evento cuando se presiona el boton editar **Aun no funciona bien :c
        editProduct(d,e) {
            console.log('categoria: '+d.categoria);
            if(this.state.nombre===''){
                this.state.nombre=d.nombre;
            }
            if(this.state.codigo===''){
                this.state.codigo=d.codigo;
            }
            if(this.state.categoria===''){
                if(d.categoria==='Nacional'){
                    this.state.categoria=1;
                }
                else{
                    this.state.categoria=0;
                }
            }
            if(this.state.precio===''){
                this.state.precio=d.precio;
            }
            fetch('http://104.236.68.75:8080/backendGrupo5/api/update?id='+e+'&codigo='+this.state.codigo+'&nombre='+this.state.nombre+'&fecha='+this.state.fecha+'&categoria='+this.state.categoria+'&precio='+this.state.precio)
            .then(response => console.log("Producto actualizado: "+this.state.codigo+" y "+ 'http://localhost:8081/api/update?id='+e+'&codigo='+this.state.codigo+'&nombre='+this.state.nombre+'&fecha='+this.state.fecha+'&categoria='+this.state.categoria+'&precio='+this.state.precio));
            this.setState({products: [], isLoading: false});
            this.componentDidMount();
            this.render();
            
            }
          
    //Carga la lista de productos para que puedan ser modificadas
    componentDidMount() {
        this.setState({isLoading: true});

        fetch('http://104.236.68.75:8080/backendGrupo5/api/all')
            .then(response => response.json())
            .then(data => this.setState({products: data, isLoading: false}));
        }

        
    render() {
        const {isLoading} = this.state;
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
                        <th>Pecio</th>
                        <th>Fecha de Modificación</th>
                        <th>Accion</th>
                      </tr>
                              {this.state.products.map((product) =>
                      <tr key={product.id}>
                        <th><input name="codigo" type="text" defaultValue = {product.codigo} onChange={this.handleInputChange} /></th>
                        <th><input name="nombre" type="text" defaultValue = {product.nombre} onChange={this.handleInputChange} /></th>
                        <th><input name="categoria" type="text" defaultValue = {product.categoria} onChange={(e)=>this.handleInputChange(e)} /></th>
                        <th><input name="precio" type="text" defaultValue = {product.precio} onChange={this.handleInputChange} /></th>
                        <th>{product.fecha}</th>
                        <th> <button onClick={(e) => this.editProduct(product,product.id)}>editar</button></th>
                      </tr> 
                              )}
                    </tbody>
                  </table>
              </div>

                
            );
        }
      }
}

export default Modificar;