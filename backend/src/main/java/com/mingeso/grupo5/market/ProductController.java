package com.mingeso.grupo5.market;

import java.sql.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;


import com.mingeso.grupo5.market.Product;
import com.mingeso.grupo5.market.ProductRepository;

@Controller    // Indica que la clase es controlador
@RequestMapping(path="/api") // app path de la URL, api es un buen nombre ya que el frontend debera leer de aquí
public class ProductController {
	@Autowired // para crear bean productrepository
	           // automatico por spring, ayuda a manejar los datos
	private ProductRepository productRepository;

	@GetMapping("/delete")
    public @ResponseBody String delete(@RequestParam Integer id) {
		
        Product product = productRepository.findById(id).get();
		productRepository.delete(product);
		return "Producto eliminado";
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
	//@CrossOrigin(origins = "http://localhost:8080/frontendGrupo5/")
	public @ResponseBody Iterable<Product> getAllProducts() {
		// esto retorna un JSON con los productos (o XML).
		Iterable<Product> findAll = productRepository.findAll();
		return findAll;
	}
	
/* 	@GetMapping("/all")
    @CrossOrigin(origins = "http://localhost:3000")
    public Collection<Product> getAllProducts() {
        return ((Collection<Product>) productRepository.findAll()).stream()
                .collect(Collectors.toList());
    } */
}