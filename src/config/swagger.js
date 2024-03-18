import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Nombre de tu API',
      version: '1.0.0',
      description: 'Descripción de tu API',
    },
    servers: [
      {
        url: 'http://localhost:3000', // Reemplaza con la URL de tu servidor
      },
    ],
  },
  apis: ['path/to/routes/*.js'], // Ruta a tus archivos de definición de ruta
};

const specs = swaggerJsdoc(options);

export default (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};
