package com.mingeso.grupo5.market;
import org.springframework.web.bind.annotation.ResponseStatus;
import java.sql.Date;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RequestBody;
import com.mingeso.grupo5.market.Product;
import com.mingeso.grupo5.market.ProductRepository;
import org.springframework.http.HttpStatus;

@Controller    // Indica que la clase es controlador
@CrossOrigin(origins = "http://104.236.68.75:8080/frontendGrupo5")
@RequestMapping(path="/api") // app path de la URL, api es un buen nombre ya que el frontend debera leer de aquí
public class ProductController {
	@Autowired // para crear bean productrepository
	           // automatico por spring, ayuda a manejar los datos
	private ProductRepository productRepository;

	@RequestMapping(value = "/delete/{id}")
    public @ResponseBody String delete(@PathVariable("id") Integer id) {
		
        productRepository.deleteById(id);
		return "Producto eliminado";
	}
	
	@GetMapping(path="/buscar") // mapeo para casos de agregar productos
	public @ResponseBody Product findOne(Integer id) {
		// @ResponseBody Se pone cuando el string retornado es la respuesta de un request
		// @RequestParam Se pone para identificar parametros que necesita un post o get
		Product product = productRepository.findById(id).get();
		if (product != null) {
			return product;
		}
		else {
			return null;
		}
		
		
	}
	
	@GetMapping(path="/add") // mapeo para casos de agregar productos
	public @ResponseBody String addNewProduct (
            @RequestParam String codigo,
            @RequestParam String nombre,
            @RequestParam Date fecha,
            @RequestParam Integer categoria,
            @RequestParam Integer precio) {
		// @ResponseBody Se pone cuando el string retornado es la respuesta de un request
		// @RequestParam Se pone para identificar parametros que necesita un post o get

		Product n = new Product();
        n.setCodigo(codigo);
        n.setNombre(nombre);
        n.setFecha(fecha);
        n.setCategoria(categoria);
        n.setPrecio(precio);
		
		productRepository.save(n);
		return "Producto guardado.";
	}

	

	//Metodo para actualizar el producto
	@GetMapping(path="/update") 
	public @ResponseBody String setProduct (
			@RequestParam Integer id,
            @RequestParam String codigo,
            @RequestParam String nombre,
            @RequestParam Date fecha,
            @RequestParam Integer categoria,
            @RequestParam Integer precio) {

		Product n = new Product();
		n.setId(id);
        n.setCodigo(codigo);
        n.setNombre(nombre);
        n.setFecha(fecha);
        n.setCategoria(categoria);
        n.setPrecio(precio);
		
		productRepository.save(n); //Se ocupa este metodo como update cuando se pasa la id
		return "Producto actualizado.";
	}

	public ProductController(ProductRepository repository) {
        this.productRepository = repository;
    }


	@GetMapping(path="/all")
	
	public @ResponseBody Iterable<Product> getAllProducts() {
		// esto retorna un JSON con los productos (o XML).
		Iterable<Product> findAll = productRepository.findAll();
		return findAll;
	}


	@RequestMapping(method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	@ResponseBody
	public Product create(@RequestBody Product resource) {
	     return productRepository.save(resource);
	}
	
/* 	@GetMapping("/all")
    @CrossOrigin(origins = "http://localhost:3000")
    public Collection<Product> getAllProducts() {
        return ((Collection<Product>) productRepository.findAll()).stream()
                .collect(Collectors.toList());
    } */
}