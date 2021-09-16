import elasticsearch from 'elasticsearch';
import config from './config.js';

const elasticClient = elasticsearch.Client({
  host: config.elasticsearchConnURL(),
});

export default elasticClient;
