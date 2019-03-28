module.exports = async function(app) {
    let User = app.models.user;
    let Role = app.models.role;
    let RoleMapping = app.models.RoleMapping;

    try {
        
        await User.destroyAll({});
        await RoleMapping.destroyAll();
        await Role.destroyAll();

        let UserDetails = await User.create({username: 'tusharN', email: 'tushar.nikam@globant.com', password: 'tusharN', name: 'Tushar Nikam'});

        let RoleDetails = await Role.create({name: "ADMIN", description: "Admin Role with All permissions"});

        await RoleMapping.create({ principalType: "User", principalId : UserDetails.id, roleId: RoleDetails.id });

        await Role.create({name: "OPERATION", description: "Operation role"});

    } catch (error) {
        console.error(error, 'error while creating default user');
    }
}