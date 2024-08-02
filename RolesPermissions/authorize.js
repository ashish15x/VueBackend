const Permissions = require('./permissions');

module.exports = (action) => {
    return (req, res, next) => {

        const role = req.user.role;
        
         if (Permissions[role] && Permissions[role].can.includes(action)) {
            return next();
          }
           else {
            
            return res.status(403).json({
              success: 0,
              message: 'Permission not granted' 
            });
        }
};
};
