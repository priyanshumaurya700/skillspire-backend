import jwt from 'jsonwebtoken';

export const protect = (req, res, next)=>{
    try {
        const token = req.headers.authorization.split(" ")[1];
        if(!token){
            res.status(401).json({message: 'Not authorized, no token'})
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.id;
        next();
    }catch (error) {
        res.status(401).json({message: 'Not authorized, token failed'})
    }
}