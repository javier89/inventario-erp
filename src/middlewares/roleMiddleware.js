export const requireRole = (role)=>
{
    return (req, res, next)=>{
        if(!req.user.roles.includes(role)){
            return res.status(403).json({ error: "Acceso denegado"});
        }
        next();
    };
};