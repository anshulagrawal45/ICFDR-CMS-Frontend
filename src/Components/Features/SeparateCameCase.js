export default function separateCamelCase(str) {
    // Use a regular expression to match camelCase words
    // and insert a space before each capital letter
    return str.replace(/([a-z])([A-Z])/g, '$1 $2')
              .replace(/\b\w/g, function(char) {
                return char.toUpperCase();
              });
  }