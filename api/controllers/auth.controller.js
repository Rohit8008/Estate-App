import bcrypt from 'bcrypt';
import prisma from '../lib/prisma.js';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    const { username, email, password } = req.body;
    try {

        //HASH THE PASSWORD
        const hashedPass = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPass
            }
        })

        console.log(newUser);
        res.status(200).json({ message: "User created Successfully" });
    }
    catch (err) {
        console.log(err.message);
        res.status(500).json({ message: "Failed to create user" });
    }
}


export const login = async (req, res) => {

    const { username, password } = req.body;
    try {
        const user = await prisma.user.findUnique({
            where: { username }
        });

        if (!user) return res.status(401).json({ message: "Invalid Credentials" });

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(401).json({ message: "Invalid Credentials" });

        //WITHOUT COOKIE PARSER 
        //res.setHeader("Set-Cookie","test="+"myvalue").json("success");

        //1day
        const age = 1000 * 60 * 60 * 24 * 1;

        const token = jwt.sign({
            id: user.id,
            isAdmin:false,
        }, process.env.JWT_SECRET_KEY,
            { expiresIn: age }
        )

        const {password:userPassword, ...userInfo} = user;

        res.cookie("token", token, {
            httpOnly: true,
            // secure:true,
            maxAge: age
        }).status(200).json(userInfo);

    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to login" });
    }
}


export const logout = (req, res) => {
    res.clearCookie("token").status(200).json({message:"Logout Successfull"});
}