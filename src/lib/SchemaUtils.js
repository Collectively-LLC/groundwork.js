import tv4 from 'tv4';

/**
 * JSON Schema functions
 */
export default class SchemaUtils {
  /**
   * Validate the payment object with JSON-Schema
   *
   * Look at /schema/donation.js to see the required fields for a donation
   * object.
   *
   * @param {Object} target - object to validate
   * @param {Object} [schema] - JSON schema object
   * @return {Array<object>}
   */
  static validateSchema(target, schema) {
    let ret = [];
    const validate = tv4.validateMultiple(target, schema);

    if (!validate.valid) {
      ret = validate.errors;
    }

    return ret;
  }

  /**
   * Find the correct field name of the invalid item based on error
   * codes
   *
   * @param {Object} err - Schema Validation error object
   * @return {String}
   */
  static extractFieldByError(err) {
    switch (err.code) {
      case 0: // type error
        return err.dataPath.replace('/', '');

      case 302: // required missing
        return err.params.key;

      default: // default
        return err.schemaPath;
    }
  }
}
