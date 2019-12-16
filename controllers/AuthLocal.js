'use strict';

const _ = require('lodash');
const jwt = require('jsonwebtoken');


/**
 * AuthLocal.js controller
 *
 * @description: A set of functions called "actions" of the `auth-local` plugin.
 */

module.exports = {

  /**
   * Default action.
   *
   * @return {Object}
   */

  index: async (ctx) => {
    // Add your own logic here.

    // Send 200 `ok`
    ctx.send({
      message: 'ok'
    });
  },

  login: async (ctx) => {
    // Add your own logic here.

    let credentials = ctx.request.body;

    let user = await strapi.plugins['users-permissions'].models.user
        .findOne({ email: credentials.email });

    if (!strapi.plugins['users-permissions'].services.user.validatePassword(credentials.password, user['password'])) {
        ctx.send({
          error: 'invalid login'
        });
        console.log('error');
        return;
    }

    ctx.send({
        jwt: strapi.plugins['users-permissions'].services.jwt.issue(_.pick(user, ['_id', 'id'])),
        user: _.omit(user.toJSON ? user.toJSON() : user, ['password', 'resetPasswordToken'])
      });
  }
};
