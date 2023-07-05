const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id:{
      type:DataTypes.UUID,
      allowNull:false,
      primaryKey:true,
      defaultValue:DataTypes.UUIDV4
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image:{
      type:DataTypes.STRING,
      defaultValue:"https://cdn-icons-png.flaticon.com/256/1830/1830839.png"
      
    },
    summary:{
      type:DataTypes.TEXT,
      allowNull:false      
    },
    healthScore:{
      type:DataTypes.INTEGER,
      allowNull:false
    },
    steps:{
      type:DataTypes.JSON,
      allowNull:false,
    }
  });
};
