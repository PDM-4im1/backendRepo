

import User from "../models/user.js";
import bcrypt from 'bcrypt';




//signin function
export function signin(req, res) {
    User
    .findOne({ "email": req.body.email, "password": req.body.password })
    .then(doc => {
        res.status(200).json(doc);
        res.json({messsage: 'successfully signed in'})
    })
    .catch(err => {
        res.status(500).json({ error: err });
    });
}


//signup function 
/*export function signup(req, res) {
    User.create(req.body)
    .then((newUser) => {
        res.status(201).json({
            email:newUser.email,
            password:newUser.password,
            phone_number:newUser.Phone_number,
            role:newUser.role,
            name:newUser.name,
            first_name:newUser.first_name,
            age:newUser.age
        });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}*/
export async function signup(req, res) {
  const { email, password, Phone_number, role, name, first_name, age } = req.body;

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      password: hashedPassword,
      Phone_number,
      role,
      name,
      first_name,
      age,
    });

    await newUser.save();

    res.status(201).json({
      email: newUser.email,
      Phone_number: newUser.Phone_number,
      role: newUser.role,
      name: newUser.name,
      first_name: newUser.first_name,
      age: newUser.age,
    });
  } catch (err) {
    res.status(500).json({ error: err });
  }
}


//update function
export async function putOnce(req, res) {
    const user = await User.findOne({ email: req.params.email });
  
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
  
    user.set(req.body);
    await user.save();
  
    res.status(200).json({ message: 'User successfully updated.' });
  }



//patchOnce function 
export async function patchOnce(req, res) {
    const email = req.params.email;
    const updates = req.body;
  
    const user = await User.findOne({ email });
  
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
  
    Object.assign(user, updates);
    await user.save();
  
    res.status(200).json({ message: 'User successfully updated.' });
  }


//delete function 
export async function deleteOnce(req, res) {
    const email = req.params.email;
  
    const user = await User.findOne({ email });
  
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
  
    await user.deleteOne();
  
    res.status(200).json({ message: 'User successfully deleted.' });
  }

  
