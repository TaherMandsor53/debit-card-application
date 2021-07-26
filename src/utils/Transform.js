export const validateOnlyNumbers = (numVal, type) => {
  let numPattern = /^[0-9]+/;
  if (type === 'withdraw') {
    if (numVal && numVal.length > 0) {
      let isNumValid = numPattern.test(numVal);
      return isNumValid;
    } else {
      return false;
    }
  } else {
    if (numVal && numVal.length === 12) {
      let isNumValid = numPattern.test(numVal);
      return isNumValid;
    } else {
      return false;
    }
  }
};
