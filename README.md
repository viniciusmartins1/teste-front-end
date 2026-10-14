
### Catálogo de Conteúdos


Esse website tem o intuito de renderizar uma listagem de produtos, possibilidade de navegar para um produto específico e favoritar e desfavoritar um produto. O projeto foi desenvolvido utilizando React.js, Tailwind e React Router.


#### Preparando o ambiente

> Para rodar o projeto localmente é necessário fazer o clone do repositório ou fazer o download aqui pelo GitHub

#### 🌐 Instalação

É necessário ter o Node.js (a versão utilizada no projeto foi a 22) instalado para rodar o projeto, além de alguma IDE como o Visual Studio Code
```bash
git  clone  https://github.com/viniciusmartins1/teste-front-end
cd  teste-front-end
```
Após isso, instale as dependências necessárias com o seguinte comando:
```bash
npm  install
```
#### 🌐 Variáveis de Ambiente

Nesse projeto foi utilizada uma API local com os dados necessários para o desenvolvimento do projeto, porém não irei disponibilizá-la aqui. Entretanto, se você possui acesso a essa API local, será necessário adicionar a variável de ambiente com a API_URL.

  

Para isso, altere o nome do arquivo `.env.example` apenas para `.env` e altere o valor da variável `VITE_API_BASE_URL`

```text
teste-front-end/
├── src/
├── .env.example
```

> Obs: Para o projeto funcionar corretamente a API precisa estar rodando;


#### 🌐 Executando o projeto

Com a variável do endereço da API local configurada, o próximo passo é rodar o projeto. 
Para isso, rode o seguinte comando:

  
```bash
npm  run  dev
```


Após esse comando, o próprio Vite (CLI Tool) irá disponibilizar a rota de acesso local. 