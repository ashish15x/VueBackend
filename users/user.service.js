const pool = require("../config/database")

module.exports = {
    create: (data,callback)=>{
        pool.query(
            `INSERT INTO users(name, email, age, role, exp, password,c_id) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
            [data.name, data.email, data.age, data.role, data.exp, data.password,data.c_id],
            (error, results) => {
                if (error) {
                    callback(error);
                } else {
                    callback(null, results);
                }
            }
        );
    },
    getUsers : (callback) => {
        pool.query(
            'SELECT id,name, email, age, role, exp, password FROM users',
            [],
            (error, results) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results.rows);
            }
        );
    },
    

    getUserByUserId:(id,callback) =>{
        pool.query(
            `select id,name,email,age,role,exp,password from users where id = $1`,
            [id],
            (error,results,fields)=>{
                if(error){
                    return callback(error);
                }
                return callback(null,results.rows[0]); 
            }
        )
    },
     updateUser: (data, callback) => {
        pool.query(
            `UPDATE users SET name = $1, email = $2, age = $3, role = $4, exp = $5, password = $6 WHERE id = $7`,
            [data.name, data.email, data.age, data.role, data.exp, data.password, data.id],
            (error, results) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results.rowCount > 0);
            }
        );
    },

    deleteUser:(id,callback)=>{
        pool.query(
            `delete from users where id=$1`,
            [id],
            (error,results,fields)=>{
                if(error){
                    return callback(error);
                }
                return callback(null,results[0])
            }

        )
    },
     getUserByUserEmail: (email, callback) => {
        pool.query(
            'SELECT * FROM users WHERE email = $1',
            [email],
            (error, results) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results.rows[0]);
            }
        );
    },
    signup: (data,callback)=>{
        pool.query(
            `INSERT INTO users(name, email, phone, password) VALUES ($1, $2, $3, $4)`,
            [data.name, data.email, data.phone, data.password],
            (error, results) => {
                if (error) {
                    callback(error);
                } else {
                    callback(null, results);
                }
            }
        );
    },
    checkEmailExists: (email, callback) => {
        pool.query(
            'SELECT email FROM users WHERE email = $1',
            [email],
            (error, results) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results.rows.length > 0);
            }
        );
    },
    getUserByCId: (id,callback)=>{
        pool.query(
            `SELECT * FROM users WHERE c_id= $1`,
            [id],
            (error,results)=>{
                if(error){
                    return callback(error)
                }
                return callback(null,results.rows)
            }
        )
    } 
}