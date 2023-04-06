class Service {
    async makeRequest(url) {

        return (await fetch(url)).json()
        //fetch faz requisição para web
    }

    async getPlanets(url) {
        const data = await this.makeRequest(url)
        console.log(data)
        return {
            name:data.name,
            orbital_period: data.orbital_period
            
         }
         console.log(data)
    }
 
}
   
module.exports = Service