module.exports = function(app) {
    var Role = app.models.Role;
    const BoardMember = app.models.BoardMember;
  
    Role.registerResolver('BoardMember', function(role, context, cb) {
      // Q: Is the current request accessing a Project?
      console.log(context.accessToken, 'context in role resolver');
      console.log(role, 'role in role resolver');

      if (context.modelName !== 'board') {
        // A: No. This role is only for projects: callback with FALSE
        return process.nextTick(() => cb(new Error('Operation allowed for only board model.')));
      }
  
      //Q: Is the user logged in? (there will be an accessToken with an ID if so)
      var userId = context.accessToken.userId;
      if (!userId) {
        //A: No, user is NOT logged in: callback with FALSE
        // return process.nextTick(() => cb(null, false));
        return cb(new Error("Missing user id. Please login to perform operation!!"));
      }      
      
      BoardMember.find({userId: userId, boardId: context.modelId}, function(err, boardMember){
          console.log(err, 'err');
          console.log(boardMember, 'boardMember');
            if(err) return cb(err)
            if(!boardMember.length) return cb('User is not the board member or admin.')
            cb(null, boardMember);
      })
    });
  };
  