# serverless-challenge


# Como rodar a api 
* Dê um git clone do projeto para a máquina que deseja rodar
* Rode o comando `npm install`
* Em seguida o comando `npm run up`, este comando ficará responsável por rodar o docker do projeto e colocar a api pra rodar localmente(no docker)
* Caso não seja definida uma porta para api no config env.ts a porta padrão será a 5050
* Após isso é possível fazer os testes dos endpoints da api no postman

### SE NÃO QUISER USAR O DOCKER
Caso não se queira usar o docker, tem como rodar a api local, só que para isso é necessário que tenha o MongoDB Atlas instalado na máquina
Os passos mudam um pouco, tornando-se necessário rodar um comando a mais, sendo assim os comandos ficam: 
* `npm install`
* `npm run dev`
* Caso não seja definida uma porta para api no config env.ts a porta padrão será a 5050
* Após alguns segundos, enquanto o docker instala as depêndencias e etc, é possível fazer os testes dos endpoints da api no postman


# Funcionalidades da API
## Criar usuário
#### POST para `http://localhost/API_PORT/api/user`
Caso de sucesso
* ✅ Recebe uma requisição do tipo POST na rota /api/user, que recebe os parâmetros (no body) : nome, idade e cargo
* ✅ Cria um usuário com os dados fornecidos
* ✅ Retorna 201, com os dados de cadastro + o id do registro inserido

## Editar usuário
Caso de sucesso
#### PUT para `http://localhost/API_PORT/api/user/:id`
* ✅ Recebe uma requisição do tipo PUT na rota /api/user/:id, com as informações para serem editadas no body
* ✅ Edita o usuário ,cuja o id está nos params ,com os dados fornecidos no body 
* ✅ Retorna 201, com os dados de cadastro + o id do registro inserido

## Listar usuários
Caso de sucesso
#### GET para `http://localhost/API_PORT/api/user`
* ✅ Recebe uma requisição do tipo GET na rota /api/user
* ✅ Retorna os usuários
* ✅ Retorna 201, com a listagem dos usuários em forma de array

## Remover usuário
Caso de sucesso
#### DELETE para `http://localhost/API_PORT/api/user/:id`
* ✅ Recebe uma requisição do tipo DELETE na rota /api/user/:id 
* ✅ Remove o usuário pelo id passado nos params
* ✅ Retorna 201, com os dados de cadastro + o id do registro inserido
