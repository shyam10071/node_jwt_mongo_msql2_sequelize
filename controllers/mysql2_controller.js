var jwt = require('jsonwebtoken');

const privateKey = "qwerty890zxcvghjkl";
const bcrypt = require('bcrypt');
const { loginValidation, registerValidation } = require('../validation/validate');
const conn = require('../db/mysql2_db')
const bcrpt = require('bcrypt')
exports.register = async (req, res) => {
    const { error } = registerValidation(req.body); 
    if (error) {
        return res.send({ data: error, message: "Please enter require field", code: 200 })

    } else {
        let { name, email, password, phone, address } = req.body;
        let salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(req.body.password, salt);

        conn.query("SELECT * FROM users WHERE email = ?", email, (err, result) => {
            if (result.length) {
                return res.send({ data: {}, message: "Email ALready Exist", code: 200 })
            } else {
                conn.query("INSERT INTO users SET ?", { name, email, phone, address, password }, (err, result) => {
                    if (err) {
                        return res.send({ data: error, message: "Please try again after some time", code: 200 })
                    } else {
                        console.log(result);
                        conn.query("SELECT * FROM users WHERE id = ?", result.insertId, (err, result) => {
                            const token = jwt.sign({ id: result.insertId }, privateKey);
                            result[0].token = token;
                            return res.send({ data: result[0], message: "Email ALready Exist", code: 200 })
                        })

                    }
                })
            }
        })
    }
}

exports.login = async (req, res) => {
    const { error } = loginValidation(req.body);

    if (error) {

        return res.send({ data: error, message: "Please enter require field", code: 200 })

    } else {

        conn.query("SELECT * FROM users WHERE email = ?", req.body.email, async (err, result) => {
            if (!result.length) {

                return res.send({ data: {}, message: "Please enter valid email", code: 400 })

            } else {

                const validPassword = await bcrypt.compare(req.body.password, result[0].password)


                if (validPassword) {

                    const token = jwt.sign({ id: result[0].id }, privateKey);
                    result[0].token = token;
                    return res.send({ data: result[0], message: "Email ALready Exist", code: 200 })

                } else {

                    return res.send({ data: {}, message: "Please enter valid password", code: 400 })


                }

            }
        })

    }
}

exports.post = async (req, res) => {

    const { name, title, description } = req.body;
    conn.query("INSERT INTO posts SET ?", { name, title, description }, (err, result) => {
        console.log(result)
        if (result.affectedRows) {
            conn.query("select * from posts", (err, result) => {

                return res.send({ data: result, message: "Post Successfully Created", code: 200 })
            })
        } else {
            return res.send({ data: { err }, message: "Something went wrong", code: 400 })

        }
    });

    // const newPost = new Post(req.body);
    // const user = await newPost.save();

    // const allPost = await Post.find();

}