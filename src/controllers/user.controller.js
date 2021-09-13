import { formatResponse } from '../utils/format-response.js';
import { statusCode } from '../utils/status.js';
import db from '../db/connection.js';
import logger from '../utils/logger.js';

export default {
  findAll: async (req, res) => {
    try {
      const result = await db.query('SELECT * FROM users;');
      res
        .status(statusCode.success)
        .json(
          formatResponse(
            statusCode.success,
            result,
            'Successfully get all user data',
          ),
        );
    } catch (err) {
      logger.error(err);
    }
  },
  create: async (req, res) => {
    const body = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
    };

    try {
      const result = await db.query(
        'INSERT INTO users(first_name, last_name, email) VALUES($1, $2, $3) RETURNING *',
        [body.first_name, body.last_name, body.email],
      );
      res
        .status(statusCode.created)
        .json(
          formatResponse(
            statusCode.created,
            result[0],
            'User created successfully',
          ),
        );
    } catch (err) {
      let code = statusCode.error;
      if (err.routine == '_bt_check_unique') {
        code = statusCode.conflict;
      }
      res.status(code).json(formatResponse(code, {}, err.detail));
    }
  },
};
