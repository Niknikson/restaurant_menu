const getCorrectParams = (params) => {
   if (req.query.search) {
        params = { where: { name: { [Op.iLike]: '%' + req.query.search + '%' } } }
      } else if (req.query.dish) {
        params = { where: { categoryId: null } }
      } else {
        params = { where: { ...req.query } }
      }
  return params;
};

