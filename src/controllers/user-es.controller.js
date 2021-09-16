import elasticClient from '../utils/elasticsearch.js';
import { formatResponse } from '../utils/format-response.js';
import logger from '../utils/logger.js';
import { statusCode } from '../utils/status.js';

export default {
  create: (req, res) => {
    const body = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
    };
    elasticClient
      .index({
        index: 'users',
        body: body,
      })
      .then((result) => {
        res
          .status(statusCode.created)
          .json(
            formatResponse(
              statusCode.created,
              result,
              'User data indexed successfully',
            ),
          );
      })
      .catch((err) => {
        res
          .status(err.statusCode)
          .json(formatResponse(err.statusCode, {}, err.message));
      });
  },
  findWithQuery: (req, res) => {
    let query = {
      index: 'users',
    };

    if (req.query.query) query.q = `*${req.query.query}*`;

    elasticClient
      .search(query)
      .then((result) => {
        res
          .status(statusCode.success)
          .json(
            formatResponse(
              statusCode.success,
              result.hits.hits,
              'Successfully get user data',
            ),
          );
      })
      .catch((err) => {
        res
          .status(err.statusCode)
          .json(formatResponse(err.statusCode, {}, err.message));
      });
  },
  findOne: (req, res) => {
    const query = {
      index: 'users',
      id: req.params.id,
    };

    elasticClient
      .get(query)
      .then((result) => {
        res
          .status(statusCode.success)
          .json(
            formatResponse(
              statusCode.success,
              result,
              'Successfully get a user data',
            ),
          );
      })
      .catch((err) => {
        res
          .status(err.statusCode)
          .json(formatResponse(err.statusCode, {}, err.message));
      });
  },
  update: (req, res) => {
    elasticClient
      .update({
        index: 'users',
        id: req.params.id,
        body: {
          doc: req.body,
        },
      })
      .then((result) => {
        res
          .status(statusCode.success)
          .json(
            formatResponse(
              statusCode.success,
              result,
              'User data updated successfully',
            ),
          );
      })
      .catch((err) => {
        res
          .status(err.statusCode)
          .json(formatResponse(err.statusCode, {}, err.message));
      });
  },
  remove: (req, res) => {
    elasticClient
      .delete({
        index: 'users',
        id: req.params.id,
      })
      .then((result) => {
        res
          .status(statusCode.success)
          .json(
            formatResponse(
              statusCode.success,
              result,
              'User data removed successfully',
            ),
          );
      })
      .catch((err) => {
        res
          .status(err.statusCode)
          .json(formatResponse(err.statusCode, {}, err.message));
      });
  },
};
