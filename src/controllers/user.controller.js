import { formatResponse } from '../utils/format-response.js';
import { statusCode } from '../utils/status.js';
import db from '../db/connection.js';

export default {
  findAll: async (req, res) => {
    try {
      const result = await db.query('SELECT * FROM users;');
      res
        .status(statusCode.success)
        .json(formatResponse(statusCode.success, result, 'message'));
    } catch (err) {
      console.log(err);
    }
  },
  create: async (req, res) => {},
};
