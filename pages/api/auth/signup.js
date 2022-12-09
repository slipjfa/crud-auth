import connnectMongo from '../../../database/conn';
import Auth from '../../../model/Schema';
import { hash } from 'bcryptjs';

export default async function handler(req, res){
  connnectMongo().catch(error => res.json({ error: "Connection Failed..."}))

  if(req.method === 'POST'){
    if(!req.body) return res.status(404).json({ error: "No form data...!"});
    const { username, email, password } = req.body;

    const checkexisting = await Auth.findOne({ email });

    if(checkexisting) return res.status(422).json({ message: "User Already Exists...!"});

    const auth = await Auth.create({ username, email, password : await hash(password, 12)}, function(error, data){
      if(error) {
        return res.status(404).json({ error });
      } else {
        return res.status(201).json({ status: true, user: data });
      }
    })
  } else {
    return res.status(500).json({ message: "HTTP method not valid only POST Accepted"})
  }
}