// controller redirects user to postman doc link, the /api/v1/doc/anytext
const docs = async (req, res) => {
  await res.status(302).redirect('https://documenter.getpostman.com/view/9023297/SVtR3WJU');
};

export default { docs };
