import {login} from "../services/auth.service.js";

export const loginController = async (req, res)=>{
    
    const {username, password } = req.body;
    
    const result = await login(username, password);

    if(!result)
        return res.status(400).json({ error:"credenciales invalaidas"});
    
    res.json(result)
};