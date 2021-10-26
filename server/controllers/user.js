import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import AWS from 'aws-sdk';
import UserModal from '../models/user.js';

const secret = 'test';

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const oldUser = await UserModal.findOne({ email });

    if (!oldUser)
      return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect)
      return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
      expiresIn: '1h',
    });

    res.status(200).json({ result: oldUser, token });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const ses = new AWS.SES({ apiVersion: '2010-12-01' });

export const signup = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  try {
    const oldUser = await UserModal.findOne({ email });

    if (oldUser)
      return res.status(400).json({ message: 'User already exists' });
    const params = {
      Source: process.env.EMAIL_FROM,
      Destination: {
        ToAddresses: [email],
      },
      ReplyToAddresses: [process.env.EMAIL_FROM],
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: `<html><body><h1>Hello ${firstName}</h1 style="color:red;"><p>Test email</p></body></html>`,
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: 'Complete your registration',
        },
      },
    };
    const sendEmailOnRegister = ses.sendEmail(params).promise();

    sendEmailOnRegister
      .then((data) => {
        console.log('email submitted to SES', data);
        res.send('email sent');
      })
      .catch((error) => {
        console.log('ses email on register', error);
        res.send('email failed');
      });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await UserModal.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });

    const token = jwt.sign({ email: result.email, id: result._id }, secret, {
      expiresIn: '1h',
    });

    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });

    console.log(error);
  }
};
