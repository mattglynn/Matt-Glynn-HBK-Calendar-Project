var messageCollection = Backbone.Collection.extend({
        localStorage: new Backbone.LocalStorage("calendar-backbone"),
});
var messages = new messageCollection([],{})
