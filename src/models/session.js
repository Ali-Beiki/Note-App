// models/Session.js
module.exports = (sequelize, DataTypes) => {
    const Session = sequelize.define(
        "Session",
        {
            sid: {
                type: DataTypes.STRING(255),
                primaryKey: true,
                allowNull: false,
            },
            sess: {
                type: DataTypes.JSON,
                allowNull: false,
            },
            expire: {
                type: DataTypes.DATE,
                allowNull: false,
            },
        },
        {
            tableName: "session",
            timestamps: false,
        }
    );

    return Session;
};
