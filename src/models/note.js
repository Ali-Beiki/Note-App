// models/Note.js
module.exports = (sequelize, DataTypes) => {
    const Note = sequelize.define(
        "Note",
        {
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            content: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            date: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
            owner: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: "Users",
                    key: "id",
                },
                onDelete: "CASCADE", // حذف یادداشت در صورت حذف کاربر
            },
        },
        {
            timestamps: true,
        }
    );

    return Note;
};
