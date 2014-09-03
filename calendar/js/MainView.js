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
//some jquery handlers for the top buttons
$(".prev-month").click(function(){
	var year = currentDate.getFullYear();
	var month = currentDate.getMonth();
	if(month==0) { month = 12; year--; }
	routes.navigate("year/"+year+"/month/"+month, { trigger: true });
});
$(".next-month").click(function(){
	var year = currentDate.getFullYear();
	var month = currentDate.getMonth();
	if(month==11) { month = 1; year++; }
	else month +=2;
	routes.navigate("year/"+year+"/month/"+month, { trigger: true });
});
$(".now-month").click(function(){
	var now = new moment();
	routes.navigate("year/"+now.format("YYYY")+"/month/"+now.format("MM"), { trigger: true });
});

$(".prev-week").click(function(){
	mom.subtract("days",8);
	routes.navigate("weekview/"+mom.format("YYYY-MM-DD"), { trigger: true });
});
$(".next-week").click(function(){
	mom.add("days",1);
	routes.navigate("weekview/"+mom.format("YYYY-MM-DD"), { trigger: true });
});
$(".now-week").click(function(){
	mom = new moment();
	routes.navigate("weekview/"+mom.format("YYYY-MM-DD"), { trigger: true });
});
$("#month-mode").click(function(){
	var year = mom.format("YYYY");
	var month = mom.format("M");
	routes.navigate("year/"+year+"/month/"+month, { trigger: true });
});
$("#week-mode").click(function(){
	if(mom.date()==1) mom.subtract("days", 1);
	var month = mom.format("M");
	routes.navigate("weekview/"+mom.format("YYYY")+"-"+month+"-01", { trigger: true });
});

