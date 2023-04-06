const Service = require('./service')
const assert = require('assert')
const BASE_URL_1= "https://swapi.dev/api/planets/1/"
const BASE_URL_2= "https://swapi.dev/api/planets/2"
//const BASE_URL_3 = "https://swapi.dev/api/planets/3/"


const {createSandbox} = require('sinon')
const sinon = createSandbox()




const mocks = {
    tatooine: require('./../mocks/tatooine.json'),
    alderaan: require('./../mocks/alderaan.json')
};



;(async () =>{
    /*
    {   
        //vai para internet
        const service = new Service()
        const dados =  await service.makeRequest(BASE_URL_2)
        console.log('dados', dados)
    }

    {
        const service = new Service()
        const dados =await service.makeRequest(BASE_URL_2)
        console.log('dados', JSON.stringify(dados))

    }
    */


    const service = new Service()
    const stub = sinon.stub (  
        service,
        service.makeRequest.name
        )

    stub
     .withArgs(BASE_URL_1)
     .resolves(mocks.tatooine)


    stub
      .withArgs(BASE_URL_2)
      .resolves(mocks.alderaan)


        {
            const expected = {
             name:"Tatooine",
             orbital_period: "304",
        }


    const results = await service.getPlanets(BASE_URL_1) 
    assert.deepStrictEqual(results, expected)  
    }
    

        {
            const expected = {
                name: "alderaan",
                orbital_period: "364"
            }

            const results = await service.getPlanets(BASE_URL_2)
            assert.deepStrictEqual(results, expected)
        }

})()