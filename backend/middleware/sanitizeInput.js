const { AppError } = require('../utils/errors');

const opaqueFields = new Set(['password', 'currentPassword', 'newPassword', 'confirmPassword']);
const markupStart = /<(?:[a-z!?]|\/[a-z])/i;

function sanitizeValue(value, field) {
  if (typeof value === 'string') {
    if (opaqueFields.has(field)) return value;

    const text = value.replace(/\0/g, '');
    if (markupStart.test(text)) {
      throw new AppError('Enter plain text without HTML markup.', 400);
    }
    return text;
  }

  if (Array.isArray(value)) {
    return value.map((item) => sanitizeValue(item, field));
  }

  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, sanitizeValue(item, key)])
    );
  }

  return value;
}

function sanitizeInput(req, res, next) {
  try {
    req.body = sanitizeValue(req.body);
    // Express 5 exposes req.query as a getter. Validate it without replacing it.
    sanitizeValue(req.query);
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = sanitizeInput;
