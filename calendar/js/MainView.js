//routing part
var Routes = Backbone.Router.extend({

  routes: {
    "":				"defaultAction",
    "year/:year/month/:month": "gotomonth",
    "weekview/:date": "gotoweek"   
  },


  gotomonth: function(year, month) {
	loadMonthCalendar(year, month);
  },
  defaultAction: function(){
	var now = new Date();
  	loadMonthCalendar(now.getFullYear(), now.getMonth()+1);
  },
  gotoweek: function(date) {
  	loadWeekCalendar(date);
  }
});

var routes = new Routes();
Backbone.history.start();

//view for the previous-now-next navigation on the top of the calendar
var TopNav = Backbone.View.extend({
	el: $(".navigation"),
	events: {
		"click .nav-month .next-month": "loadNextMonth",
		"click .nav-month .prev-month": "loadPrevMonth",
		"click .nav-month .now-month":	"loadNowMonth",
		"click .nav-week .next-week": "loadNextWeek",
		"click .nav-week .prev-week": "loadPrevWeek",
		"click .nav-week .now-week":	"loadNowWeek"
	},
	loadNextMonth: function() {
		var year = currentDate.getFullYear();
		var month = currentDate.getMonth();
		if(month==11) { month = 1; year++; }
		else month +=2;
		routes.navigate("year/"+year+"/month/"+month, { trigger: true });
	},
	loadPrevMonth: function() {
		var year = currentDate.getFullYear();
		var month = currentDate.getMonth();
		if(month==0) { month = 12; year--; }
		routes.navigate("year/"+year+"/month/"+month, { trigger: true });
	},
	loadNowMonth:	function() {
		var now = new moment();
		routes.navigate("year/"+now.format("YYYY")+"/month/"+now.format("MM"), { trigger: true });	
	},

	loadNextWeek: function() {
		mom.add("days",1);
		routes.navigate("weekview/"+mom.format("YYYY-MM-DD"), { trigger: true });
	},
	loadPrevWeek: function() {
		mom.subtract("days",8);
		routes.navigate("weekview/"+mom.format("YYYY-MM-DD"), { trigger: true });
	},
	loadNowWeek: function() {
		mom = new moment();
		routes.navigate("weekview/"+mom.format("YYYY-MM-DD"), { trigger: true });
	}
	
});
//view for the calendar modes - week or month
var ViewModes = Backbone.View.extend({
	el: $(".calendar"),
	events: {
		"click #month-mode": "switchToMonth",
		"click #week-mode":  "switchToWeek"
	},
	switchToMonth: function() {
		var year = mom.format("YYYY");
		var month = mom.format("M");
		routes.navigate("year/"+year+"/month/"+month, { trigger: true });
	},
	switchToWeek: function() {
		if(mom.date()==1) mom.subtract("days", 1);
		var month = mom.format("M");
		routes.navigate("weekview/"+mom.format("YYYY")+"-"+month+"-01", { trigger: true });
	}
});
//creating an object for the top navigation and rendering it
var nav = new TopNav;
nav.render();
var modes = new ViewModes;
modes.render();
