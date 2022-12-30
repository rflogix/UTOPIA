
/***********************************************************************************
* FullCalendar
***********************************************************************************/

// DB일정 가져오기
function getCalData(){
	
	var strParam = "BoardType=140";
	$.post(CALENDAR_LIST_URL, strParam, function(p_data, p_status) {
		if (p_data.state == "Y") {
			var arrDate = p_data.start.split(",");
			var arrTitle = p_data.title.split(",");
			var eventData = [];
			for (var i in arrDate) {
				//console.log(arrTitle[i]);
				//console.log(arrDate[i]);
			
				 eventData.push({			        	
					title :arrTitle[i]
					,start :arrDate[i]
				});
			}
			setCalData(eventData);
		}
		
	}, "JSON");
}

// 캘린더 설정하기
function setCalData(p_eventData){
	
	var calendarEl = document.getElementById("calendar");
	var calendar = new FullCalendar.Calendar(calendarEl, {
		initialView: "dayGridMonth"
		, firstDay:1 // 월요일부터 표시
		, editable:false	// 수정 못하도록
		, height  : 'parent'
		//, contentHeight: 'auto'
		, hiddenDays: [0,6] // 주말 안보이게 
	    , dateClick: function(info) {
	      	//makeAppointment(info.dateStr);
	    }
	    ,events: p_eventData
		,eventColor: "#ffffff"
		,locale: "ko"
		,headerToolbar: {
			left: 'prev'
			,center: 'title'
			,right: 'next'
		}
		,eventContent: function(arg) {
			return {
				html: "<div class='cal_content'>"+arg.event.title+"</div>"
			}
		}
		,titleFormat: function(date) {
			//return `${date.date.year}년 ${date.date.month + 1} 월 수익내역`;
			return date.date.year + "년 " + (date.date.month + 1) + " 월";
		}
		/*,customButtons: {
			custom1: {
				text: "custom 1"
				,click: function() {
					alert("clicked custom button 1!");
				}
  			}
			,custom2: {
				text: "custom 2"
				,click: function() {
					alert("clicked custom button 2!");
				}
			}
		}*/
		
	});
 	
	calendar.render();
}