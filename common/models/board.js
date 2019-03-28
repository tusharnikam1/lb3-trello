'use strict';

module.exports = function(Board) {
    // Create default lists for board
    Board.afterRemote('create', async (ctx, modelInstance, next)=>{
        try {
            console.log(ctx, 'context after creating board');
            await Board.app.models.List.create([{name : "To Do", boardId: modelInstance.id },{name : "Doing", boardId: modelInstance.id },{name : "Done", boardId: modelInstance.id }]);

            // await Board.app.models.BoardMember.create({})
            next();
        } catch (error) {
            next();
        }
        
    })
};
