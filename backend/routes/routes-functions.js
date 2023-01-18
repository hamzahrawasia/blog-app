import User from"../models/Users";

export const getUsers = async(req, res, next) => {
    let users;
    try {
        users = await User.find()
    } catch (err) {
        console.log(err)
    }
    if (!users) {
        return res.status(404).json({ message: "No Users Found"});
    }
    return res.status(200).json({ users });
}

export const signup = async(req, res, next) => {
    const { name, email, password } = req.body;

    let userExists;

    try {
        userExists = await User.findOne({ email })
    }
    catch (err) {
        console.log(err)
    }
    if (userExists){
        return res.status(400).json({ message: "User Already Exists"});
    }
    const user = new User({
        name,
        email,
        password,
        blogs:[]
    });

    try{
        await user.save();
    }
    catch (err) {
        console.log(err);
    }
    return res.status(201).json({user});
}

export const login = async(req, res, next) => {
    const { email, password } = req.body;

    let userExists;

    try {
        userExists = await User.findOne({ email })
    }
    catch (err) {
        console.log(err)
    }
    if (!userExists){
        return res.status(404).json({ message: "User Does not Exist. Signup instead"});
    }
    
    if (password != userExists.password){
        return res.status(400).json({message:"Incorrect Password"})
    }
    return res.status(200).json({message:"Login Successful", user: userExists})

}