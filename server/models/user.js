'use strict';

module.exports = function(User) {
    User.afterRemote( 'create', function( ctx, modelInstance, next) {
        User.app.models.SMTPMail.send({
            to: modelInstance.email,
            from: 'Tushar Nikam <tushar.nikam@globant.com>',
            subject: 'Thanks for signing up !!',
            text: 'my text',
            html: 'my <em>html</em>'
          }, function(err, mail) {
            if(err) console.error(err, "Error in sending email")
            console.log('email sent successfully!');
          });
        //...
        next();
    });
    
};
