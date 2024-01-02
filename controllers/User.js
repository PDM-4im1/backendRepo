

import User from "../models/user.js";
import bcrypt from 'bcrypt';

//backend ready


//signin function

export function signin(req, res) {
  const { email, password } = req.body;

  User
    .findOne({ "email": req.body.email })
    .then(async doc => {
      if (!doc) {
        return res.status(404).json({ error: "User not found" });
      }

      const isValidPassword = await bcrypt.compare(password, doc.password);
      if (!isValidPassword) {
        return res.status(401).json({ error: "Invalid password" });
      }

      res.status(200).json(doc);
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
}

//signup function 
export async function signup(req, res) {
  const { email, password, Phone_number, role, name, first_name, age } = req.body;

  try {
    // Check if the email already exists in the database
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      // Email already exists
      return res.status(400).json({ message: "Email already exists" });
    }

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

    if (role === 'driver') {
      // If the user's role is a driver, create an instance in the Conducteur entity
      const newConducteur = new Conducteur({
        id_user: newUser._id, // Assuming _id is the identifier for the user in the User entity
        pointDepart: 'defaultPointDepart', // You may replace with actual data
        pointArrivee: 'defaultPointArrivee', // You may replace with actual data
        localisation: 'defaultLocalisation', // You may replace with actual data
      });

      await newConducteur.save();
    }

    res.status(201).json({
      success: true,
      email: newUser.email,
      Phone_number: newUser.Phone_number,
      role: newUser.role,
      name: newUser.name,
      first_name: newUser.first_name,
      age: newUser.age,
    });
  } catch (err) {
    // Log the error to the console
    console.error('Error occurred during signup:', err);

    // Send an error response to the client
    res.status(500).json({ error: err });
  }
}



//getOnce 
export async function getOnce(req, res) {
  const { email } = req.params;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.status(200).json(user);
}

//getAll 
export async function getAll(req, res) {
  const users = await User.find();
  res.status(200).json(users);
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

  
