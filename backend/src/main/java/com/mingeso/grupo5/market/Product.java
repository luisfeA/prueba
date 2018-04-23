package com.mingeso.grupo5.market;

import java.util.Date;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;
import org.springframework.format.annotation.DateTimeFormat;



@Entity // Para generar tabla por hibernate
public class Product {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer id;

	@NotNull
    private String codigo;

	@NotNull
    private String nombre;

	@NotNull
	@DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date fecha;

	@NotNull
    private Integer categoria;

	@NotNull
    private Integer precio;


	public Integer getId() {
		return id;
	}

	
	public void setId(Integer id) {
		this.id = id;
	}
	

	public String getCodigo() {
		return codigo;
	}


	public void setCodigo(String codigo) {
		this.codigo = codigo;
	}


	public String getNombre() {
		return nombre;
	}


	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	
	public Date getFecha() {
		return fecha;
	}


	public void setFecha(Date fecha) {
		this.fecha = fecha;
	}


	public String getCategoria() {
		if(categoria==0) return "Importado";
		else{ return "Nacional";}
	}


	public void setCategoria(Integer categoria) {
		this.categoria = categoria;
	}


	public Integer getPrecio() {
		return precio;
	}


	public void setPrecio(Integer precio) {
		this.precio = precio;
	}



}