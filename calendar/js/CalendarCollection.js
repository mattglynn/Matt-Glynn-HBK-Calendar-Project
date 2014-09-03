var Message = Backbone.Model.extend({
	initialize: function(){
		
	},
	default: {
		date: undefined,
		text: "Add your message here."	
	}
});
var Messages = Backbone.Collection.extend({
        localStorage: new Backbone.LocalStorage("calendar-backbone"),
	initialize: function(){
		var objString = localStorage.getItem("calendarMessages");
		if(objString!=null&&objString!="") {
			var objArray = JSON.parse(objString);
			for(var i=0;i<objArray.length;i++) this.add(objArray[i]);
		}
	},	
	model: Message,
	saveAll: function() {
		localStorage.setItem("calendarMessages", JSON.stringify(this.toJSON()));	
		
	},
	getId: function(){  return this.length + 1; }
});
var messages = new Messages([],{});
//loads messages from local storage
messages.initialize();
