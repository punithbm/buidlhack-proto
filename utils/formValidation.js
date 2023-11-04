// Error Code
/*
0 => No error
1 => Empty field
2 => Minimum length
3 => Maximum length
4 => Pattern not matching
*/

//Validating the form


export const fieldValidation = (data) => {
  // Check for Required Field case:
  if (data.requiredFlag) {
    if (data.fieldval && data.fieldval.toString().trim().length) {
      return checkForValidationPath(data)
    } else {
      return 1
    }
  } else {
    if (data.fieldval && data.fieldval.toString().trim().length) {
      return checkForValidationPath(data)
    } else {
      return 0
    }
  }
}

export const checkForValidationPath = (data) => {
  if (data.minLength) {
    if (checkMinlength(data.fieldval, data.minLength)) {
      return 2
    }
  }
  if (data.maxLength) {
    if (checkMaxlength(data.fieldval, data.maxLength)) {
      return 3
    }
  }
  if (data.regexPattern) {
    if (!checkPatternMatches(data.fieldval, data.regexPattern)) {
      return 4
    }
  }
  return 0;
}


export const checkMinlength = (fieldval, minLength) => {
  return fieldval.trim().length < minLength
}

export const checkMaxlength = (fieldval, maxLength) => {
  return fieldval.trim().length > maxLength
}

export const checkPatternMatches = (fieldval, regexPattern) => {
  const newRegex = new RegExp(regexPattern)
  return newRegex.test(fieldval);
}
