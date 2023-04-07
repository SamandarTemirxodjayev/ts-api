import express from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const appswagger = express();

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'My API',
    version: '1.0.0',
    description: 'API documentation using Swagger'
  },
  servers: [
    {
      url: 'http://localhost:3000'
    }
  ]
};

const options = {
  swaggerDefinition,
  apis: ['./routes/*.js']
};

const swaggerSpec = swaggerJSDoc(options);

appswagger.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default appswagger;
