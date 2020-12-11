module.exports = options=>{
   return async (req,res,next)=>{
        // cnpm install inflection --save
        const modelName = require('inflection').classify(req.params.resource)
        console.log(modelName);
        req.Model = require(`../modies/${modelName}`)
        next()
           }
}