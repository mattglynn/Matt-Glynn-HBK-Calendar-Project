//Arrays with month names and day names for displaying in the UI
var monthNames = [ "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December" ];
var dayName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var currentDate = new Date();
//Main mathod for displaying the month calendar
var loadMonthCalendar = function(year, month) {
	$("#month-mode").hide(); $("#week-mode").show();
	$(".nav-month").show(); $(".nav-week").hide();
	var date = new Date();
	if(typeof(month)!=undefined)
	{
		date.setMonth(month-1,1);
		date.setYear(year);
	}
	currentDate = date;
	mom = new moment(date);
	var firstWeekDay = mom.weekday();
	var lastDayOfTheMonth = new Date(mom.add('months', 1).date(0)).getDate();
	mom.subtract('months', 1).add("days",1);
	lastDayOfTheMonth += firstWeekDay;
	var numberOfWeeks = (lastDayOfTheMonth%7==0)?(lastDayOfTheMonth/7):(Math.floor(lastDayOfTheMonth/7)+1);
	
	$(".body").html("");
	
	var currentDay = 1;
	for(var wk=0;wk<numberOfWeeks;wk++)
	{
		var rowHtml = "";
		rowHtml += '<div class="row">';
		for(var day=0;day<7;day++)
		{
			if(wk==0&&day<firstWeekDay||currentDay>(lastDayOfTheMonth-firstWeekDay)) rowHtml += '<div class="well"><span class="date"> &nbsp; </span></div>';	
			else { 
				rowHtml += '<div class="well"><span class="date label label-default" data-datevalue="'+mom.add("days",1).format("YYYY-MM-DD")+'">'+currentDay+", "+dayName[(day)]+'</span></div>';	
			       currentDay++;
			     }	
		}
		rowHtml += '</div>';
		$(".body").append(rowHtml);
		//setting the title
		$(".title-info").html(monthNames[currentDate.getMonth()]+" - "+currentDate.getFullYear());
		$(".well").click(function(){
			$(".selected").removeClass("selected");
			$(this).addClass("selected");
		});
		$(".date").parent().dblclick(function(){
			routes.navigate("weekview/"+$(this).children("span").attr("data-datevalue"), { trigger: true });		
		});
	}
}

//Main mathod for displaying the week calendar
var loadWeekCalendar = function(date) {
	$("#month-mode").show(); $("#week-mode").hide();
	$(".nav-month").hide(); $(".nav-week").show();
	mom = new moment(date);
	var firstWeekDay = mom.weekday();
	//set object to the first day of the week	
	mom.subtract("days", mom.day());
	$(".body").html("");
	//setting the title	
	$(".title-info").html("Week "+mom.week()+" - "+currentDate.getFullYear());
	var rowHtml = "";
		
	
	for(var day=0; day<7;day++)
	{
		
		rowHtml += '<div class="list-group">  <span class="list-group-item">  <h4 data-datevalue="'+mom.format("YYYY-MM-DD")+'" class="list-group-item-heading">'+dayName[day]+", "+mom.date()+" "+monthNames[mom.month()]+' <span class="addNote glyphicon glyphicon-plus"></span></h4>    <p class="list-group-item-text">'+
			
			'</p>  </span></div>';
		mom.add("days",1);	
	}
	$(".body").append(rowHtml);
	
	$(".addNote").click(function(){	
		$(this).parent().parent().children("p").append('<input class="note-input" type="text" />');	
	});
		
	$(".well").click(function(){
		$(".selected").removeClass("selected");
		$(this).addClass("selected");
	});
}
