var Backbone = require('backbone');
module.exports = Backbone.Model.extend({
    defaults: {
      username: '',
      password: null,
      images:{}
    },
    rootUrl: 'http://tiyfe.herokuapp.com/collections/void',
    idAttribute: '_id'
})
