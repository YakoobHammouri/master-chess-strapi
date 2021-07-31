"use strict";

module.exports = async () => {
  const actions = [
    {
      section: "plugins",
      displayName: "Read",
      uid: "read",
      pluginName: "master-chess",
    },
  ];

  await strapi.admin.services.permission.actionProvider.registerMany(actions);
};






