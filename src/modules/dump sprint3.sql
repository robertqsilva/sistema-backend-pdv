
alter table produtos add column produto_imagem text;

create table pedidos(
    id serial primary key,
    cliente_id references clientes(id) not null,
    observacao varchar(100),
    valor_total int not null
);

create table pedido_produtos(
    id serial primary key,
    pedido_id references pedidos(id),
    produto_id references produtos(id),
    quantidade_produto int not null,
    valor_produto int not null
);
