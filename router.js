const express = require('express');
const router = express.Router();
const User = require('./models/user.js');
const md5 = require('blueimp-md5');

//首页
router.get('/',(req, res) => {


        res.render('index.html',{
            user:req.session.user
        });


});
//登录
router.get('/login',(req,res)=>{
    res.render('login.html');
})

router.post('/login',(req,res)=>{
    let body = req.body;
    User.findOne({
        email:body.email,
        password:md5(md5(body.password))
    }).then(value=>{

        if (!value){
            return res.status(200).json({
                err_code:1,
                message:'Email or password is invalid.'
            })
        }
        //用户存在 记录登录状态
        req.session.user = value;
        res.status(200).json({
            err_code:0,
            message:'ok'
        }),err=>{
            return res.status(500).json({
                err_code:500,
                message:err.message
            })
        }
    })
})


//注册
router.get('/register',(req,res)=>{
    res.render('register.html');

})

router.post('/register',async (req,res)=>{

    let body = req.body;
    try {
        if (await User.findOne({email:body.email})){
            return res.status(200).json({
                err_code:1,
                message:'email already exits.'
            })
        }
        if (await User.findOne({nickname:body.nickname})){
            return res.status(200).json({
                err_code:2,
                message:'nickname already exits.'
            })
        }


        body.password = md5(md5(body.password));
        req.session.user = body;

        await new User(body).save().then(value => {


            res.status(200).json({
                err_code:0,
                message:'ok'
            })
        });




    }catch(err){
        res.status(500).json({
            err_code:500,
            message:err.message
        })
    }
})

//个人主页
router.get('/settings/profile',(req,res)=>{
    res.render('profile.html',{
        user:req.session.user
    })
})
router.post('/settings/profile',async(req,res)=>{
    let body = req.body;
    console.log(body);
    try{
        //判断昵称
        if(await User.findOne({nickname:body.nickname}).then(value=> value.email != body.id)){

            return res.status(200).json({
                err_code:1,
                message:'nickname is exits.'
            })
        }

   //更新
        await User.findOneAndUpdate({email:body.id},{nickname:body.nickname,birthday:body.birthday,bio:body.bio})
            .then(value=>{
                User.findOne({email:value.email}).then(value=>{
                    req.session.user = value;


                    res.status(200).json({
                        err_code:0,
                        message:'ok'
                    })
                })

            });
    }catch(err){

        res.status(500).json({
            err_code:500,
            message:err.message
        })
    }




})

//修改密码
router.get('/settings/admin',(req,res)=>{
    res.render('admin.html',{
        user:req.session.user
    });
})

router.post('/settings/admin',async (req, res) => {
    let body = req.body;

    try {
        if (md5(md5(body.oldPass)) != req.session.user.password) {
            return res.status(200).json({
                err_code: 1,
                message: 'password isnt common'
            })
        }
        if (await body.newPass != body.rnewPass) {
            return res.status(200).json({
                err_code: 2,
                message: 'pass'
            })
        }
        await User.updateOne({email:req.session.user.email},{password:md5(md5(body.newPass))}).then(value=>{

            req.session.user = null;
            res.status(200).json({
                err_code:0,
                message:'ok'
            })

        })

    }catch(err){
        res.status(500).json({
            err_code:500,
            message:err.message
        })
    }


})
//退出
router.get('/logout',(req, res) => {

    //清除登录 重定向到登录页
    req.session.user = null;

    res.redirect('/login');

})

//注销账号
router.post('/delete',(req,res)=>{

   let body = req.session.user;

   User.deleteOne({email:body.email}).then(value=>{

       req.session.user = null;
       res.status(200).json({
           err_code:0,
           message:'ok'
       })
   })
})

//论坛
router.get('/forum',(req, res) => {

    res.render('forum.html')
})



module.exports = router;