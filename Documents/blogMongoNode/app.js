//Passo 1 carregando módulos
const express = require('express')
const app = express()

const handlebars= require('express-handlebars')
const bodyParser= require('body-parser')
const mongoose= require('mongoose')
//Passo 6
//recebe a rota de outro arquivo, a passe a configuração em rotas
const admin = require('./routes/admin')

//Passo 7 arquivo para trabalhar com diretorios
const path = require('path')
//Passo 21 chamar
const session= require('express-session')

const flash=require('connect-flash')
const { rejects } = require('assert')




//configurações passo 3
    //Passo 21, sessão, é passado tres atributos. secret é tipo uma chave para gerar uma sessão
    app.use(session({
        secret: "cursodenode",
        resave: true,
        saveUninitialized: true
    }))
    app.use(flash())//config do flash, fica sempre abaixo da seção
//Middleware config
    app.use((req, res, next)=>{
        //locals serve para criar variáveis globais. Não esquecer de passar o next() no fim senão trava a app
        res.locals.success_msg = req.flash("success_msg")
        res.locals.error_msg = req.flash("error_msg")
        next()

    })

//body Parser descontinuado, esse é o novo modo de fazer. Serve para receber dados de formulários
app.use(express.urlencoded({extended:true}))
app.use(express.json())

//hadlebars é um tamplete para trabalhar com html. Muito importante, receita de bolo
app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

//Passo 17 conecção com o mongodb
//mongose depois
mongoose.Promise=global.Promise;
mongoose.connect('mongodb://localhost/blogapp').then(() => {
    console.log("conectado ao mongodb")
}).catch((err)=>{
    console.log("Não conectou!" + err)
})

//Passo 8
//Public, diz para o express que a nossa pasta de arquivos estáticos é a public. Pega o diretório absoluto por meio do __dirname para evitar erros. Receita de bolo
app.use(express.static(path.join(__dirname,"public")))
/*Passo 20 middlewares, não esquecer de ao final por o next(). Podem ser usados para fazer autentificação
app.use((req, res, next) => {
    console.log("eu sou o middleware!")
    next()
})
*/

//Rotas

//chama todas as rotas desse grupo de rotas
//o /admin é o nome da rota, pode ser qualquer nome, admin é a variável criada no import para receber as rotas
app.use('/admin', admin)

//Outros

//Passo 2 configurar o servidor
const PORT = 8080
app.listen(PORT, () => {
    console.log("Servidor Rodando!")
})