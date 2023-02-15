module.exports.home = (req , res) =>{
    return res.render('home' , {
        title: "HOME | CSV UPLOADER"
    });
}