import path from 'path';
import YAML from 'yamljs';
import swaggerUi from 'swagger-ui-express';

export default (url = '/docs', express) => {
  const swaggerDocument = YAML.load(path.join(__dirname, '../../swagger.yaml'));
  express.use(
    url,
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument),
  );
};
