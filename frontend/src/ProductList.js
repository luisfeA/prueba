import * as React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';


class ProductList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            products: [],
            isLoading: false
        };
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


        return (
            <div>
                
              <h2>Productos:</h2>
              {products.map((product) =>
                <div key={product.id}>
                    {'Codigo: '}{product.codigo}{' - '}
                    {'Nombre: '}{product.nombre}{' - '}
                    {'Categoría: '}{product.categoria}{' - '}
                    
                </div>
              )}
            </div>
        );
        }
}

export default ProductList;