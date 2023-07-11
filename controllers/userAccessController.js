const UserAccess = require('../models/userAccess');

const post_accessshare = (req, res) => {

    var body = req.body;
    //console.log(body);
    // Every request has user attached to the session
    var uac = new UserAccess();
    let r = generate(6); // system generated, you can change logic as needed
    r = r.trim(); // remove spaces
    uac.accesscode = r.toUpperCase(); // we are generating all caps code
    uac.userid = req.user.id;
    uac.fieldlist = body.fieldlist;
    // uac.expirydate = addMinutes(new Date(),body.expirydate); // we will rework
    console.log(uac);

    uac.save()

        .then(result => {
            console.log(result);
            UserAccess.findByIdAndUpdate(result._id,{expirydate: addMinutes(result.createdAt,body.expirydate)})
                .then(result2 =>{
                    res.render('useraccess/details', {ua: result, user: req.user, message: 'Congratulations, you are ready to share your details', messageClass: 'alert-success'})
                })
                .catch(err => {
                    console.log(err);
                })
            
        })
        .catch(err => {
            console.log(err);
        })
    
}

function addMinutes(date, minutes) {
    date.setMinutes(date.getMinutes() + minutes);

    return date;
}

function generate(length) {
    
    const characters = 'abcdefghijklmnopqrstuvwxyz1234567890';
    let result = ' ';
    const charactersLength = characters.length;
    for(let i = 0; i < length; i++) {
        result += 
        characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
const get_accessshare = (req, res) => {
    // Every request has user attached to the session
    console.log('inside get accesshsare');
    res.render('useraccess/create',{user: req.user});
}

const get_index = (req, res) => {
    console.log("inside get_index");
    UserAccess.find({userid: req.user.id})
        .then(result =>{
            res.render('useraccess/index',{user: req.user, ualist: result});
        })
        .catch(err =>{
            console.log('getindex');
            console.log('error');
        })
    
}

const get_detail = (req, res) => {
    
    UserAccess.findById(req.params.id)
        .then(result => {
            res.render('useraccess/details',{user: req.user, ua: result});
        })
        .catch(err =>{
            console.log('getdetail');
            console.log('error');
        })
    
}

module.exports = {
    post_accessshare,
    get_accessshare,
    get_index,
    get_detail
}