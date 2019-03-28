module.exports = function(app) {
    var Role = app.models.Role;
    const BoardMember = app.models.BoardMember;
  
    Role.registerResolver('BoardMember', function(role, context, cb) {
      if (context.modelName !== 'board') {
        return cb(new Error('Operation allowed for only board model.'));
      }
      
      var userId = context.accessToken.userId;
      if (!userId) {
        return cb(new Error("Missing user id. Please login to perform operation!!"));
      } 

      BoardMember.find({userId: userId, boardId: context.modelId}, function(err, boardMember){
        if(err) return cb(err)
        if(!boardMember.length) return cb('User is not the board member or admin.')
        cb(null, boardMember);
      })

    });
  };
  