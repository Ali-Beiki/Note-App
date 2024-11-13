// models/User.js
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        "User",
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false, 
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true, 
            },
            phone: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            img: {
                type: DataTypes.STRING,
                defaultValue: "/uploads/image/users/image-default.png",
            },
            role: {
                type: DataTypes.STRING,
                defaultValue: "user",
            },
        },
        {
            timestamps: true, //createdAt و updatedAt
        }
    );

    return User;
};
