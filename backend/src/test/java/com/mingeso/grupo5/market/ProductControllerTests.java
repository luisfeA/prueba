package com.mingeso.grupo5.market;


import org.junit.Test;
import java.sql.Date;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;


import com.mingeso.grupo5.market.Product;

import org.junit.Assert;

@RunWith(SpringRunner.class)
@SpringBootTest
public class ProductControllerTests {
    @Test
    public void addNewProduct ()
    {

        String codigo = "SKU1234";
        String nombre = "Producto";
        Date fecha = java.sql.Date.valueOf("2018-01-05");
        Integer categoria = 0;
        Integer precio = 1990;

        Product n = new Product();
        n.setCodigo(codigo);
        n.setNombre(nombre);
        n.setFecha(fecha);
        n.setCategoria(categoria);
        n.setPrecio(precio);
        
        Assert.assertNotNull(n);
    }
}


