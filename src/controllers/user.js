const userJoin = async (req, res, next) => {
  try {
    throw Error("error");
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export { userJoin };
