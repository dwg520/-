


module.exports = (app)=>{
    const express = require('express');
    const jwt = require('jsonwebtoken')
    const AdminUser = require('../../modies/AdminUser')
    const assert = require('http-assert')
    const router = express.Router({
        mergeParams:true
    });
    router.post('/',async(req,res)=>{
        const model=await req.Model.create(req.body)
        res.send(model)
        // console.log(req.body);
    });
// 登录授权校验中间件
const authmiddleware = require('../../middleware/auth')


    router.get('/',async(req,res)=>{
    //    console.log(req.params);
    // return res.send({modelName})
    const queryOptions={}
    if(req.Model.modelName==='Category') {
        queryOptions.populate='parent'
    }
        const items=await req.Model.find().setOptions(queryOptions).limit(100)
        // console.log(items)
        res.send(items)
    }),
    router.get('/:id',async(req,res)=>{
        // console.log(req.params);
        const model=await req.Model.findById(req.params.id)
        res.send(model)
    }),
    router.put('/:id',async(req,res)=>{
        const model=await req.Model.findByIdAndUpdate(req.params.id,req.body)
        res.send(model)
    });
    router.delete('/:id',async(req,res)=>{
       await req.Model.findByIdAndDelete(req.params.id,req.body)
        res.send({
            success:true
        })
    });
    // 
    const resourcemiddle = require('../../middleware/resource')

    app.use('/admin/api/rest/:resource',authmiddleware(),resourcemiddle(),router);



    //  cnpm install multer --save 上传文件使用的中间件
    const multer = require('multer');
    const upload = multer({dest:__dirname + '/../../uploads'})
    app.post('/admin/api/upload',authmiddleware(),upload.single('file'),(req,res)=>{
     const file = req.file;
    //  console.log(req.file);
     file.url = `http://localhost:3000/uploads/${file.filename}`
     res.send(file)
    //  console.log(file);
    })


    app.post('/admin/api/login',async (req,res)=>{
       const {username,password} = req.body;

      

    // 1.根据用户名找用户
 
    const user =await AdminUser.findOne({username}).select('+password');
    //  cnpm install http-assert --save
     assert(user,422,'用户不存在')
    // if(!user){
    //     return res.status(422).send(
    //         {message:'用户不存在'}
    //     )
    // }


    // 2.校验密码
    const isValid = require('bcrypt').compareSync(password,user.password)
    assert(isValid,422,'密码错误')
    // if(!isValid) {
    //     return res.status(422).send({
    //         message:'密码错误'
    //     })
    // }


       
    // 3.返回token
    // cnpm install jsonwebtoken --save
     const jwt = require('jsonwebtoken')

    const token =  jwt.sign({
         id:user._id
        //  _id:user._id
        //  username:username
     },app.get('secret'));

     res.send({token})
    })


    // 错误处理函数
    app.use(async (err,req,res,next)=>{
        res.status(err.statusCode || 500).send({
            message:err.message
        })
    })
    
}