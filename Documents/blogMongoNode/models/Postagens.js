const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const Postagem = new Schema({
    titulo: {
        type: String, 
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    descricao: {
        type: String,
        required: true
    },
    conteudo: {
        type: String,
        required: true
    },
    categoria: {
        //irá armazenar um objeto do tipo id, é necessário passar uma refencia ref , o nome que vc deu para seu model que está em categorias.js o nome entre aspas
        type: Schema.Types.ObjectId,
        ref:"categorias",
        required: true
    },
    data: {
        type: Date,
        default: Date.now()
    }

})

//definição do modulo

mongoose.model("postagens", Postagem)