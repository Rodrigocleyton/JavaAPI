
//Passo 18
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

//module.exports=mongoose.model("categorias", Categoria)

const Categoria = new Schema({
    nome: {
      type: String,
      require: true
    },
    slug: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        default: Date.now()
    }

})

mongoose.model("categorias", Categoria)