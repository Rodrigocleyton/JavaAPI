package br.com.itau.apirest.entity;

import javax.annotation.Generated;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import org.hibernate.annotations.CollectionId;

@Entity
@Table(name="tb_funcionario")
public class Funcionario {
	
	@Id
	@GeneratedValue(strategy= GenerationType.IDENTITY)
	private Long id;
	
	@NotBlank//não pode ser null
	@Size(min=3, message = "Nome deve conter no mínimo 3 caracteres")
	@Size(max = 50, message = "nome deve conter no máximo 50 caracteres")
	private String nome;
	
	@NotBlank
	@Size(min = 11, message = "O cpf precisa ter no mínimo 11 caracteres")
	@Size(max =11, message = " O cpf precisa ter no máximo 11 caracteres ")
	@Column(unique=true)
	private String cpf;
	
	@NotBlank
	@Column(unique=true)
	@Email
	private String email;
	
	@NotBlank
	@Column(unique=true)
	private String senha;

}
