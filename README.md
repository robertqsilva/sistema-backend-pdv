
# Desafio Módulo 5 - Backend

Seja bem vindo(a) a documentação da api do nosso pdv.



## **Status Codes**

Abaixo, listamos os possíveis **_status codes_** esperados como resposta da API.

```javascript
// 200 (OK) = requisição bem sucedida
// 201 (Created) = requisição bem sucedida e algo foi criado
// 204 (No Content) = requisição bem sucedida, sem conteúdo no corpo da resposta
// 400 (Bad Request) = o servidor não entendeu a requisição pois está com uma sintaxe/formato inválido
// 401 (Unauthorized) = o usuário não está autenticado (logado)
// 403 (Forbidden) = o usuário não tem permissão de acessar o recurso solicitado
// 404 (Not Found) = o servidor não pode encontrar o recurso solicitado
// 500 (Internal Server Error) = erro inesperado do servidor
```



<details>
    
<summary><b>Listar categorias</b></summary>
    
### `GET` `/categoria`
Essa é a rota que será utilizada para listar as categorias de produtos do sistema.
    
**Exemplo de request:**

```javascript
// Sem nada no body/params/query da request
```
    
**Exemplo de response:**

```javascript
// HTTP Status 200
{
  [
    {
        "id": 1,
        "descricao": "Informática"
    },
    {
        "id": 2,
        "descricao": "Celulares"
    },
    {
        "id": 3,
        "descricao": "Beleza e Perfumaria"
    },
    {
        "id": 4,
        "descricao": "Mercado"
    },
        ...

  ]
}
```
```javascript 
// HTTP Status 400 / 401 / 403 / 404
{
mensagem: // haverá uma  mensagem informando o erro
}
    
```  

</details>

<details>
<summary><b>Cadastrar usuário</b></summary>

#### `POST` `/usuario`

Essa é a rota que será utilizada para cadastrar um novo usuário no sistema.

**Exemplo de request:**

```javascript
// Corpo da requisição para cadastro de usuário (body)
{
    "nome": "José",
    "email": "jose@email.com",
    "senha": "jose"
}   
```
    
**Exemplo de response:**

```javascript
// HTTP Status 201
// Sem conteúdo no corpo (body) da requisição
```
ou

```javascript 
// HTTP Status 400 / 401 / 403 / 404
{
mensagem: // haverá uma  mensagem informando o erro
}
    
```  

</details>


<details>
<summary><b>Login</b></summary>
    
#### POST /login

Essa é a rota que será utilizada para fazer o login de um usuário no sistema.

*Exemplo de request:*

```javascript
// Corpo da requisição para login de usuário (body)
{
    "email": "jose@email.com",
    "senha": "jose"
}   
```
    
*Exemplo de response:*

```javascript
// HTTP Status 200
{
"usuario": {
   "id": 3,
   "nome": "Joao Matos",
   "email": "Joaomatos@gmail.com"
},
"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mywi
aWF0IjoxNjk5NDg0MDA4LCJleHAiOjE2"
}
```
ou
```javascript 
// HTTP Status 400 / 401 / 403 / 404
{
mensagem: // haverá uma  mensagem informando o erro
}
    
``` 

</details>   

    
    
<details>
    
<summary><b>Editar usuário</b></summary>
    
### `PUT` `/usuario`
#### Rota Autenticada - Token
Essa é a rota que será utilizada para editar um usuário no sistema.
    
**Exemplo de request:**

```javascript
// Corpo da requisição para editar um usuário (body)
{
    "nome": "José",
    "email": "jose@email.com",
    "senha": "jose"
}   
```
    
**Exemplo de response:**

```javascript
// HTTP Status 204
// Sem conteúdo no corpo (body) da requisição
```
ou

```javascript 
// HTTP Status 400 / 401 / 403 / 404
{
mensagem: // haverá uma  mensagem informando o erro
}
    
```   
</details>


<details>
    
<summary><b>Detalhar Usuario</b></summary>
    
### `GET` `/usuario`
#### Rota Autenticada - Token
Essa é a rota que será utilizada para detalhar um usuário do sistema.
    
**Exemplo de request:**

```javascript
// Sem nada no body/params/query da request
   
```
    
**Exemplo de response:**

```javascript
// HTTP Status 200 
{
 "id": 4,
 "nome": "Admin",
 "email": "admin@admin.com"
}

```
ou

```javascript
// HTTP Status 400 / 401 / 403 / 404
{
mensagem: // haverá uma  mensagem informando o erro
}
    
```   
</details>

<details>
    
<summary><b>Cadastrar Cliente</b></summary>
    
### `POST` `/cliente`
#### Rota Autenticada - Token
Essa é a rota que será utilizada para cadastrar um cliente do sistema.
    
**Exemplo de request:**

```javascript
// HTTP Status 200 
{
 "nome": "Admin",
 "email": "admin@admin.com",
 "cpf": "12245678901"
}

```
    
**Exemplo de response:**

```javascript
// HTTP Status 201 
{
 "id": 4,
 "nome": "Admin",
 "email": "admin@admin.com"
 "cpf": "12345678901"
}

```
ou

```javascript
// HTTP Status 400 / 401 / 403 / 404
{
mensagem: // haverá uma  mensagem informando o erro
}
    
```   
</details>

<details>
    
<summary><b>Cadastrar Produto</b></summary>
    
### `POST` `/produto`
#### Rota Autenticada - Token
Essa é a rota que será utilizada para cadastrar um produto do sistema.
    
**Exemplo de request:**

```javascript
// HTTP Status 200 
{
 "descricao": "Tomate",
 "quantidade_estoque": 42,
 "valor": 1000
 "categoria_id": 5
}

```
    
**Exemplo de response:**

```javascript
// HTTP Status 201 
{
 "id": 5
 "descricao": "Tomate",
 "quantidade_estoque": 42,
 "valor": 1000
 "categoria_id": 5
}

```
ou

```javascript
// HTTP Status 400 / 401 / 403 / 404
{
mensagem: // haverá uma  mensagem informando o erro
}
    
```   
</details>

<details>
    
<summary><b>Editar Produto</b></summary>
    
### `PUT` `/produto/:id`
#### Rota Autenticada - Token

Essa é a rota que será utilizada para editar ou atualizar um produto do sistema. Um produto é identificado pelo ID nos parâmetros de rota.
    
**Exemplo de request:**

```javascript
// HTTP Status 200 
{
 "descricao": "Cebola",
 "quantidade_estoque": 50,
 "valor": 1500
 "categoria_id": 5
}

```
    
**Exemplo de response:**

```javascript
// HTTP Status 201 
{
 "id": 5
 "descricao": "Cebola",
 "quantidade_estoque": 50,
 "valor": 1500
 "categoria_id": 5
}

```
ou

```javascript
// HTTP Status 400 / 401 / 403 / 404
{
mensagem: // haverá uma  mensagem informando o erro
}
    
```   
</details>

<details>
    
<summary><b>Listar Produtos</b></summary>
    
### `GET` `/produto`
#### Rota Autenticada - Token

Essa é a rota que será utilizada para listar todos os produtos cadastrados no sistema.
    
**Exemplo de request:**

```javascript
// HTTP Status 200 
{
 "descricao": "Cebola",
 "quantidade_estoque": 50,
 "valor": 1500
 "categoria_id": 5
}

```
    
**Exemplo de response:**

```javascript
// HTTP Status 201 
{
 "id": 5
 "descricao": "Cebola",
 "quantidade_estoque": 50,
 "valor": 1500
 "categoria_id": 5
}

```
ou

```javascript
// HTTP Status 400 / 401 / 403 / 404
{
mensagem: // haverá uma  mensagem informando o erro
}
    
```   
</details>
<details>
    <summary><b>Detalhar Produto</b></summary>

### `GET` `/produto/:id`
#### Rota Autenticada - Token

Essa é a rota que será utilizada para listar os detalhes do produto especifico cadastrado no sistema.
       
 **Exemplo de request:**

```javascript
// HTTP Status 200 
// Utilizando a rota /produto/5

```
 **Exemplo de response:**

 ```javascript
 {
 "descricao": "Cebola",
 "quantidade_estoque": "50",
 "valor": "1500"
 "categoria_id": "5"
 } 
```
ou

```javascript
// // HTTP Status 400 / 401 / 403 / 404
{
 mensagem: // haverá uma  mensagem informando o erro
}
```


</details>

<details>
    <summary><b>Excluir Produto</b></summary>

### `DELETE` `/produto/:id`
#### Rota Autenticada - Token

Essa é a rota que será utilizada para excluir um produto especifico cadastrado no sistema. Lembrando que não será possível excluir um produto, no qual, esteja contido em um pedido.
       
 **Exemplo de request:**

```javascript

// UrlBase/produto/5

```
 **Exemplo de response:**

```javascript
// // HTTP Status 200
{
 mensagem:'Produto excluído'
}
```


</details>


<details>
    <summary><b>Detalhar Cliente</b></summary>

### `GET` `/cliente/:id`
#### Rota Autenticada - Token

Essa é a rota que será utilizada para listar os detalhes do cliente especifico cadastrado no sistema.
       
 **Exemplo de request:**

```javascript
// HTTP Status 200 
// Utilizando a rota /produto/4

```
 **Exemplo de response:**

 ```javascript
{
 "nome": "Admin",
 "email": "admin@admin.com",
}
```
ou

```javascript
// // HTTP Status 400 / 401 / 403 / 404
{
 mensagem: // haverá uma  mensagem informando o erro
}
```


</details>

<details>
    <summary><b>Listar Pedidos</b></summary>

### `GET` `/pedido/:id`
### `GET` `/pedido`
#### Rota Autenticada - Token

Essas são as rotas que será usada para listar os pedidos do cliente especifico ou não.
       
 **Exemplo de request passando ID:**

```javascript
// HTTP Status 200 
// Utilizando a rota /pedido/15

```
 **Exemplo de response:**

 ```javascript
{
{
  "pedido": [
    {
      "id": 4,
      "pedido_id": 3,
      "valor_total": 100,
      "observacao": "Pedido 1 - Observação",
      "cliente_id": 15
    }
  ],
  "produtos": [
    {
      "id": 4,
      "pedido_id": 3,
      "produto_id": 1,
      "quantidade_estoque": 10,
      "valor": 50
    }
  ]
}
}
```
 **Exemplo de request sem passar ID:**
```javascript
// HTTP Status 200 
// Utilizando a rota /pedido

```

 ```javascript
{
  "pedido": [
    {
      "id": 4,
      "pedido_id": 3,
      "valor_total": 100,
      "observacao": "Pedido 1 - Observação",
      "cliente_id": 15
    },
    {
      "id": 5,
      "pedido_id": 4,
      "valor_total": 150,
      "observacao": "Pedido 2 - Observação",
      "cliente_id": 16
    }
  ],
  "produtos": [
    {
      "pedido_id": 3,
      "produto_id": 1,
      "quantidade_estoque": 10,
      "valor": 50
    },
    {
      "pedido_id": 4,
      "produto_id": 2,
      "quantidade_estoque": 20,
      "valor": 75
    }
  ]
}
```
ou

```javascript
// // HTTP Status 400 / 401 / 403 / 404
{
 mensagem: // haverá uma  mensagem informando o erro
}
```


</details>

