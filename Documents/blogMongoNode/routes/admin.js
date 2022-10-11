//Passo 5 criação de rotas
const express = require('express')
const admin = express()
//Passo 19-1
const mongoose = require('mongoose')
//const { ERRORS } = require('socks/typings/common/constants')
//chama o arquivo Categotia.js da pasta mopdels
require("../models/Categoria")
//categorias é a mesma mongoose.model("categoria", Categoria) que está no arquivo Categorias.js
const Categorias = mongoose.model("categorias")

//Passo 27-28 
require('../models/Postagens')
const Postagem = mongoose.model("postagens")





admin.get('/', (req, res) =>{
   // res.send("Página principla do painel Adm")
   //irá reiderizar uma view que está dentro da pasta admin chamada index.handlebars. Cirar a pasta admin dentro views
   res.render("admin/index")
})

admin.get('/posts', (req, res) =>{
    res.send("páginas de posts")
})

admin.get('/categorias', (req, res)=>{
    //passo 22 listar categorias
    //sorte ordena pela ultima a entrar, ordem decrescente
    Categorias.find().lean().sort({date:'desc'}).then((categorias)=>{
        res.render("admin/Categorias", {categorias: categorias})
    }).catch((err)=>{
        //flash mostra um caixa de diálo que não se repete, não trava a app
        //por um each em categorias
        res.flash("error_msg " , "Erro ao listar as categorias" , err)
        res.redirect("/admin")

    })

    
})
//Passo 14
admin.get('/categorias/add', (req, res) =>{
    res.render("admin/addcategorias")
})

//Passo 19
admin.post('/categorias/nova', (req,res)=>{
    //Passo 21-20 validação, depois tentar por um tipo number na validação. Substituir if por switch case
    var erros = []

    if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null) {
        erros.push({texto: "Nome inválido"})
    }

    //validação do slug
    if(!req.body.slug || typeof req.body.slug == undefined || req.body.slug == null ) {
        erros.push({texto: "slug inválido"})
    }

    //se o tamanho for menor
    if(
        length < 2) {
        erros.push({texto: "O nome muito pequeno"})
    }

    if(erros.length > 0) {
        //passando os erros para a views
        res.render("admin/addcategorias", {erros: erros})
    } else {
     //receberá os dados do formulário
        const novaCategoria = {
            nome:req.body.nome,
            slug:req.body.slug
        }

        new Categorias(novaCategoria).save().then(()=>{
        //console.log("Nova categoria criada!")
        req.flash("success_msg", "Categoria criada com sucesso!")
        res.redirect("/admin/categorias")
        }).catch((err)=>{
            req.flash("error_msg","Erro ao salvar acategoria." )
            res.redirect('/admin')
        }) 
    }


})

admin.get("/categorias/edit/:id", (req, res)=>{
    //Passo 23
     
    Categorias.findOne({_id:req.params.id}).lean().then((categoria)=>{
            res.render("admin/editcategoria", {categoria:categoria})
}).catch((err)=>{
    req.flash("erro")
    res.redirect('/admin/categorias')
  })
})

//adicionar sistema de validação
admin.post("/categorias/edit", (req, res) =>{
    //pesquisa um id específico dentro do formulário
    Categorias.findOne({_id: req.body.id}).then((categoria)=>{
        //vai receber o nome que vem da edição
        categoria.nome = req.body.nome
        categoria.slug = req.body.slug

        categoria.save().then(()=>{
            req.flash("success_msg", "Categoria editada com sucesso!")
            res.redirect("/admin/categorias")
        }).catch((err)=>{
            req.flash("error_msg", "Ocorreu um erro ao add a categoria!")
            res.redirect("/admin/categorias")
        })

    }).catch((err)=>{
        req.flash("error_msg", "Ocorreu um erro ao editar a categoria")
        res.redirect("/admin/categorias")
    })
})

admin.post("/categorias/deletar", (req, res)=> {
    //body é o que vem do formulário
    Categorias.remove({_id: req.body.id}).then((categorias)=>{
        req.flash("success_msg", "categoria deletada com sucesso!")
        res.redirect("/admin/categorias")
    }).catch((err)=>{
        req.flash("error_msg", "Não foi possível remover a categoria!")
        res.redirect("/admin/categorias")
    })
})
// /postagens é a rota, uri
admin.get("/postagens", (req, res)=>{
    //admin/postagens é o arquivo que será reenderizado, carregado e está dentro da pasta views/ admin
    res.render("admin/postagens")
})

admin.get("/postagens/add", (req, res)=> {
    //passa todas as categorias para a view de postagens
    Categorias.find().lean().then((categorias)=>{
       res.render("admin/addpostagem", {categorias: categorias}) 
    }).catch((err)=>{
        req.flash("error_msg", "Não foi possível add a post")
        res.redirect("/admin")
    })
   
})

//essa rota está em addpostagem.handlebars
admin.post("/postagens/nova", (req, res) =>{

    var erros =[]
    
    if(req.body.categoria == "0") {
        erros.push({texto: "Categoria inválida, registre uma categoria."})
    if(erros.length > 0) {
        //retorna os erros
        res.render("admin/addpostagem", {erros: erros})
    }else {

        const novaPostagem = {
            titulo: req.body.titulo,
            descricao: req.body.descricao,
            conteudo: req.body.conteudo,
            categoria: req.body.categoria,
            slug: req.body.slug
        }

        new Postagem(novaPostagem).save().then(()=>{
            //se a postagem foi criada com sucesso
            req.flash("success_msg", "Postagem criada com sucesso!")
            res.redirect("/admin/postagens")

        }).catch((err)=>{
            req.flash("error_msg", "Houve um erro durante o salvamento da postagem")
            res.redirect("/admin/postagens")
        })

    }

    }

})


module.exports = admin