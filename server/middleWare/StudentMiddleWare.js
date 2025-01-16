const middleWare = (req,res,next)=>{
    if(req.session.student){
        next()
    }else{
        res.redirect('/')
    }
}
module.exports = {middleWare}