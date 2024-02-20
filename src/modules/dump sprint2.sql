create table produtos(
  id serial primary key,
 	descricao text not null,
   quantidade_estoque int not null,
   valor int not null,
   categoria_id int references categorias(id)
 );
 
 create table clientes(
 	id serial primary key,
   nome text not null,
   email text not null unique,
   cpf varchar(11) not null unique,
   cep text,
   rua text,
   numero text,
   cidade text,
   bairro text,
   estado text
 );
