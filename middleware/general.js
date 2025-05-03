const {
  JoiValidationError,
  AlreadyCreatedObjectError,
  UnauthorizedError,
} = require("../utilities");

const validateData = modelValidator => {
  return (req, _, next) => {
    const { value, error } = modelValidator.validate(req.body);

    if (error) {
      throw new JoiValidationError(error.message, 500);
    }

    req.validatedBody = value;
    next();
  };
};

const findData = (Model, queryStrings) => {
  return async (req, _, next) => {
    // Creates a query object from queryStrings
    const query = {};
    for (let i of queryStrings) {
      query[i] = req.validatedBody[i];
    }

    // Checks if document exists
    const doc = await Model.findOne(query);
    if (doc) {
      req.foundDoc = doc;
    }

    next();
  };
};

const createData = Model => {
  return async (req, _, next) => {
    if (req.foundDoc) {
      throw new AlreadyCreatedObjectError(
        `Material with type '${req.validatedBody.type}' and color '${req.validatedBody.color}' already exists.`
      );
    }

    req.createdDoc = await Model.create(req.validatedBody);

    next();
  };
};

const updateData = () => {
  return async (req, _, next) => {
    if (!req.foundDoc) {
      throw new AlreadyCreatedObjectError(`Material was not found.`);
    }

    for (let key of Object.keys(req.validatedBody)) {
      req.foundDoc[key] = req.validatedBody[key];
    }
    await req.foundDoc.save();

    next();
  };
};

const updateOrCreateData = Model => {
  return async (req, _, next) => {
    if (!req.foundDoc) {
      Model.create(req.validatedBody);
      next();
    }

    for (let key of Object.keys(req.validatedBody)) {
      req.foundDoc[key] = req.validatedBody[key];
    }
    await req.foundDoc.save();

    next();
  };
};

const deleteData = () => {
  return async (req, _, next) => {
    if (!req.foundDoc) {
      throw new AlreadyCreatedObjectError(`Material was not found.`);
    }

    const doc = await req.foundDoc.deleteOne();
    req.deletedDoc = doc;

    next();
  };
};

// Must have req.createdDoc - use createData
const createUserCredentials = (req, res, next) => {
  if (!req.createdDoc) return next(new Error("No createdDoc found"));

  const { password, hash, ...safeUser } = req.createdDoc;
  req.session.user = safeUser;
  next();
};

const checkSession = (req, res, next) => {
  console.log(req.session);
  next();
};

const isAuthorized = (req, res, next) => {
  if (req.session.user) {
    return next();
  }
  throw new UnauthorizedError();
};

const hasBeenAuthorized = (req, res, next) => {
  if (req.session.user) {
    return res.status(200).json({ success: true });
  }
  throw new UnauthorizedError();
};

module.exports = {
  validateData,
  findData,
  createData,
  updateData,
  updateOrCreateData,
  deleteData,
  isAuthorized,
  checkSession,
  createUserCredentials,
  hasBeenAuthorized,
};
