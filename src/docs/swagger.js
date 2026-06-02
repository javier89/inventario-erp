import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

const options = {
    definition: {
        openapi: "3.0.0",
            info:{title:"Api inventario", version:"1.0.0"},
        },
        apis:["./src/routes/*.js"],
};

const swaggerSpec=swaggerJsdoc(options);

export default(app)=>{
    app.use("/api/docs", swaggerUi.server, swaggerUi.setup(swaggerSpec));
}
