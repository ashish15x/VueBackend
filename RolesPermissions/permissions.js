module.exports = {
     Admin: {
         can: ['getUsers', 'createUser', 'getUserByUserId', 'updateUser', 'deleteUser']
          },

     User: {
          can: ['getUsers','getUserByUserId','createUser']
      },

     Guest:{ 
         can:['getUsers']
     } 
};
