const isUndefined = (elements) => {
  let valid = true;
  for (const el in elements) {
    elements[el] === undefined && (valid = false);
  }
  return valid;
};

const isNull = (elements) => {
  let valid = true;
  for (const el in elements) {
    elements[el] === undefined && (valid = false);
  }
  return valid;
};

module.exports = isUndefined;