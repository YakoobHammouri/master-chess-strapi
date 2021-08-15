"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#lifecycle-hooks)
 * to customize this model
 */

module.exports = {
  lifecycles: {
    async afterCreate(result, data) {
      console.log("daatrtsat : ", data);
      console.log("result : ", result);
    },
    async afterUpdate(result, data) {
      console.log("daatrtsat afterUpdate : ", data);
      console.log("result  afterUpdate: ", result);
    },
  },
};
