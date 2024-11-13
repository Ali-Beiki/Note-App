module.exports = (sequelize, DataTypes) => {
    const DailyVisit = sequelize.define(
        "DailyVisit",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            visit_date: {
                type: DataTypes.DATEONLY,
                allowNull: false,
            },
            visit_count: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
        },
        {
            tableName: "daily_visits",
            timestamps: false,
        }
    );

    return DailyVisit;
};
