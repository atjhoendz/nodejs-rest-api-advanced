import { formatResponse } from '../utils/format-response.js';
import { statusCode } from '../utils/status.js';
import db from '../db/connection.js';
import logger from '../utils/logger.js';

export default {
  findAll: async (req, res) => {
    try {
      const result = await db.manyOrNone(
        'SELECT * FROM users ORDER BY created_at ASC;',
      );
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
  findOne: async (req, res) => {
    const id = req.params.id;
    try {
      const result = await db.one('SELECT * FROM users WHERE id = $1', [id]);
      res
        .status(statusCode.success)
        .json(
          formatResponse(
            statusCode.success,
            result,
            'Successfully get a user data',
          ),
        );
    } catch (err) {
      let code = statusCode.error;
      let msg = err.message;

      if (err.received == 0) {
        code = statusCode.notfound;
        msg = `User with id #${id} doesn't exist`;
      }

      res.status(code).json(formatResponse(code, {}, msg));
    }
  },
  create: async (req, res) => {
    const body = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
    };

    try {
      const result = await db.one(
        'INSERT INTO users(first_name, last_name, email) VALUES($1, $2, $3) RETURNING *',
        [body.first_name, body.last_name, body.email],
      );
      res
        .status(statusCode.created)
        .json(
          formatResponse(
            statusCode.created,
            result,
            'User created successfully',
          ),
        );
    } catch (err) {
      let code = statusCode.error;
      let msg = err.message;

      if (err.routine == '_bt_check_unique') {
        code = statusCode.conflict;
        msg = err.detail;
      }
      res.status(code).json(formatResponse(code, {}, msg));
    }
  },
  update: async (req, res) => {
    const id = req.params.id;
    const body = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
    };

    // handle capability of partial column update
    // remove empty or null value
    for (let el in body) {
      if (body[el] === '' || body[el] === null || body[el] === undefined)
        delete body[el];
    }

    const keys = Object.keys(body);
    const values = Object.values(body);

    // generate query
    let listColumn = '';
    keys.forEach((key, index) => {
      listColumn += `${key} = $${index + 2}`;

      if (index < keys.length - 1) listColumn += ', ';
    });

    const query = `UPDATE users SET ${listColumn} WHERE id = $1 RETURNING *`;

    try {
      const result = await db.one(query, [id, ...values]);
      res
        .status(statusCode.success)
        .json(
          formatResponse(
            statusCode.success,
            result,
            'User data updated successfully',
          ),
        );
    } catch (err) {
      let code = statusCode.error;
      let msg = err.message;

      if (err.received == 0) {
        code = statusCode.notfound;
        msg = `User with id #${id} doesn't exist`;
      }

      if (err.routine == '_bt_check_unique') {
        code = statusCode.conflict;
        msg = err.detail;
      }

      res.status(code).json(formatResponse(code, {}, msg));
    }
  },
  remove: async (req, res) => {
    const id = req.params.id;

    try {
      const result = await db.one(
        'DELETE FROM users WHERE id = $1 RETURNING *',
        [id],
      );

      res
        .status(statusCode.success)
        .json(
          formatResponse(
            statusCode.success,
            result,
            'A user data removed successfully',
          ),
        );
    } catch (err) {
      let code = statusCode.error;
      let msg = err.message;

      if (err.received == 0) {
        code = statusCode.notfound;
        msg = `User with id #${id} doesn't exist`;
      }

      res.status(code).json(formatResponse(code, {}, msg));
    }
  },
};
