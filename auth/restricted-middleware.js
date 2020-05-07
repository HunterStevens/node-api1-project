module.exports = (req,res,next) =>{
    const {authorize} = req.headers;
    const API_SECRET = process.env.API_SECRET;
    if(authorize === API_SECRET){
        next();
    }else{
        res.status(403).json({dude:'there is nothing to see here. nothing at all, trust me!'});
    }
}