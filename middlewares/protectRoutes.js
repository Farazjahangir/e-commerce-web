module.exports = (request,response,next)=>{
    if(request.session.userId){
        console.log("req" , request);
        next();
    }else{
        response.redirect('/auth/signin');
    }
}