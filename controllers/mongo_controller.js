var jwt = require('jsonwebtoken');
const User = require('../models/mongo/user');
const Post = require('../models/mongo/post');
const privateKey = "qwerty890zxcvghjkl";
const bcrypt = require('bcrypt');
const { loginValidation, registerValidation } = require('../validation/validate');
exports.register = async (req, res) => {
    const { error } = registerValidation(req.body);
    if (error) {
        return res.send({ data: error, message: "Please enter require field", code: 200 })

    } else {

        const getUser = await User.findOne({ where:{email: req.body.email} })
        if (getUser) {
            return res.send({ data: {}, message: "Email already exist", code: 200 })
        } else {
            let salt = await bcrypt.genSalt(10);

            const newUser = new User(req.body);
            newUser.password = await bcrypt.hash(newUser.password, salt)
            const user = await newUser.save();
            var userData = {};
            const token = jwt.sign({ _id: user._id }, privateKey);

            userData = JSON.parse(JSON.stringify(user));
            userData.token = token;
            return res.send({ data: userData, message: "Account created successfully", code: 200 })
        }
    }
}

exports.login = async (req, res) => {
    const { error } = loginValidation(req.body);

    if (error) {

        return res.send({ data: error, message: "Please enter require field", code: 200 })

    } else {

        const getUser = await User.findOne({ email: req.body.email })

        if (!getUser) {

            return res.send({ data: {}, message: "User Not Found", code: 200 })

        } else {

            const validPassword = await bcrypt.compare(req.body.password, getUser.password)

            if (validPassword) {

                const token = jwt.sign({ _id: getUser._id }, privateKey);
                return res.send({ data: { 'token': token }, message: "Successfully Logged In", code: 200 })

            } else {

                return res.send({ data: {}, message: "Please Enter Valid EMail and Password", code: 200 })

            }
        }
    }
}

exports.post = async (req,res ) =>{

    const newPost = new Post(req.body);
    const user = await newPost.save();

    const allPost = await Post.find();
    return res.send({ data: allPost, message: "Post Successfully Created", code: 200 })

}