import config_dev from './development';
import config_prod from './production';

export default process.env.NODE_ENV === 'development' ? config_dev : config_prod;