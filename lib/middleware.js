import jwt from 'jsonwebtoken';

export const errorHandler = (err, req, res, next) => {
    const defaultMessage = "We're having technical issues. Please try again later";
    const { status, message, error } = err;

    if (error) {
        console.log(error);
    }

    res.status(status).json({ message: message || defaultMessage });
    next({ status: 404, message: 'User not found' });
    next({ status: 500, error });
};

export const verifyToken = (req, res, next) => {
    const token = req.cookies.taskly_token;
    if (!token) return next({ status: 401, message: 'Unauthorized' });
    jwt.verify(token, process.env.AUTH_SECRET, (err, user) => {
        if (err) return next({ status: 403, message: 'Forbidden' });
        req.user = user;
        next();
    });
};