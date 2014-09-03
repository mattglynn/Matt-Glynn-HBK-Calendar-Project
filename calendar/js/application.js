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
		//count all messages for month
		$(".date").each(function(elem){
			var date = $(this).attr("data-datevalue");
			if(date==undefined) return;
			mesgs = messages.where({date: date});
			$(this).parent().append(' <span class="badge '+((mesgs.length>0)?"alert-success":"alert-info")+'">'+ mesgs.length +'</span>');	
		});
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
		
		rowHtml += '<div class="list-group">  <span class="list-group-item">  <h4 data-datevalue="'+mom.format("YYYY-MM-DD")+'" class="list-group-item-heading">'+dayName[day]+", "+mom.date()+" "+monthNames[mom.month()]+' <span title="Add new note" class="addNote glyphicon glyphicon-plus"></span></h4>    <p class="list-group-item-text">'+
			
			'</p>  </span></div>';
		mom.add("days",1);	
	}
	$(".body").append(rowHtml);
	
	$(".addNote").click(function(){	
		if($(this).parent().parent().children("p").children("input").size()==0)	
			$(this).parent().parent().children("p").append('<input class="note-input" placeholder="Type your message here and hit enter to save..." type="text" />');
		$(".note-input").change(function(){
			if(typeof($(this).attr("data-id"))!="undefined"){
			
			} else {
				
				if($(this).val()!="") {
					var message =  new Message({
						date: $(this).parent().parent().children("h4").attr("data-datevalue"),
						text: $(this).val(),
						gid: messages.getId()
				
					});
					messages.add(message);
					messages.saveAll();
					$(this).remove();
					//stopping and starting the router again to refresh the view
					Backbone.history.stop(); 
					Backbone.history.start();
				}
			}		
		});	
	});
		
	$(".well").click(function(){
		$(".selected").removeClass("selected");
		$(this).addClass("selected");
	});
	//load all messages for week
	$(".list-group-item").each(function(elem){
		var date = $(this).children("h4").attr("data-datevalue");
		mesgs = messages.where({date: date});
		for(var i=0;i<mesgs.length;i++) {
			$(this).children("p").append("<p class='text-message' data-id='"+mesgs[i].get("gid")+"'>"+mesgs[i].get("text")
			+ ' <span class="glyphicon glyphicon-pencil editMessage" title="Edit"></span>  <span title="Delete" class="deleteMessage glyphicon glyphicon-remove"> </span>'			
			+"</p>");	
		};	
	});
	$(".deleteMessage").click(function(){
		var gid = parseInt($(this).parent().attr("data-id"));
		var m = messages.where({ "gid": gid});
		for(var i=0;i<m.length;i++)
			messages.remove(m[i]);
		messages.saveAll();
		//stopping and starting the router again to refresh the view
		Backbone.history.stop(); 
		Backbone.history.start();
	});
	$(".editMessage").click(function(){
		var gid = parseInt($(this).parent().attr("data-id"));
		var m = messages.where({ "gid": gid});
		var value = m[0].get("text");	
		$(this).parent().parent().parent().children("h4").children(".addNote").click();
		$(this).parent().parent().children("input").val(value);
		$("p[data-id="+gid+"]").remove();
		for(var i=0;i<m.length;i++) { messages.remove(m[i]); }
		messages.saveAll();
		//$(".deleteMessage").click();
	});
};

