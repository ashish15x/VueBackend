const pool = require("../config/database");

module.exports = {
  create: async (data, callback) => {
    try {
      await pool.query('BEGIN');

      const insertResults = await pool.query(
        `INSERT INTO company (c_name, c_email, c_phone, c_address, max_emp)
         VALUES ($1, $2, $3, $4, $5) RETURNING c_id`,
        [data.c_name, data.c_email, data.c_phone, data.c_address, data.max_emp]
      );

      const companyId = insertResults.rows[0].c_id;

      const updateResults = await pool.query(
        `UPDATE users SET c_id = $1 WHERE id = $2`,
        [companyId, data.user_id]
      );

      await pool.query('COMMIT');
      callback(null, { companyId, updateResults });

    } catch (error) {
      await pool.query('ROLLBACK');
      callback(error);
    }
  },

  getCompany: (callback)=>{
     pool.query(
        'SELECT c_id,c_name,c_email,c_phone,c_address,max_emp from company',
       [],
       (error,results) =>{
        if(error){
            return callback(error);
        }
        return callback(null,results.rows);
       }
    
    )
  
  },

  getCompanyById: (id, callback) => {
    pool.query(
      `SELECT * FROM company WHERE c_id = $1`,
      [id],
      (error, results) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results.rows[0]);
      }
    );
  },

  getPermissionsById: (id, callback) => {
    pool.query(
      `SELECT permissions FROM company WHERE c_id = $1`,
      [id],
      (error, results) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results.rows[0]);
      }
    );
  },
   updatePermissions:(id, permissions, callback) => {
    pool.query(
        `UPDATE company SET permissions = $1 WHERE c_id = $2`,
        [permissions, id],
        (error, results) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results.rowCount > 0);
        }
    );
}
};
