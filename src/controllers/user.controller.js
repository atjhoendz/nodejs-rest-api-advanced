export default {
  findAll: (req, res) => {
    res.status(200).json({
      statusCode: 200,
      data: {
        name: 'atjhoendz',
      },
      message: 'Get user data successfully',
    });
  },
};
