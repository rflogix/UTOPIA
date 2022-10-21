document.write("<style type='text/css'>");
document.write("#MINI_CAL {width:auto; position:absolute;}");
document.write(".mini_calendar {width:180px; border:2px #b8cd94 solid; font-size:8pt;}");
document.write(".mini_calendar select {padding-right:20px;}");
document.write(".mini_calendar table {width:180px; border:1px #b8cd94 solid; font-family:Tahoma; font-size:8pt;}");
document.write(".mini_calendar table .title {background-color:#EAEAEA;}");
document.write(".mini_calendar table .kr {font-size:8pt;}");
document.write(".mini_calendar table .en {font-size:6.5pt;}");
document.write(".mini_calendar table tr td{text-align:right; font-weight:bold; border-right:1px #dbdbdb solid; border-bottom:1px #dbdbdb solid; padding:3px; vertical-align:top; height:; }");
document.write(".mini_calendar .sun{color:#cd383b;}");
document.write(".mini_calendar .sat{color:#213aa4;}");
document.write(".mini_calendar .dayoff{font-weight:normal; color:#b3b3b3; background-color:#f4f4f4;}");
document.write(".mini_calendar .today{background-color:#D4F4FA}");
document.write("</style>");

var MINI_CAL	 = "<div name='MINI_CAL' id='MINI_CAL' oncontextmenu='return false' ondragstart='return false' onselectstart='return false' style='position:absolute; display:none; background-color:#FFFFFF; z-index: 99'>&nbsp;</div>";
var MC_CurrYear	= "";	   //현재 년도
var MC_CurrMonth   = "";	   //현재 월
var MC_CurrDate	= "";	   //현재 날짜
var MC_target	  = "";	   //target object
var MC_c_gb		= "";	   //구분자
var MC_inputDate   = "";	   //입력날짜 저장변수
var MC_cssLan	  = "";	   //언어(kr,en)
var MC_arrDay	  = "";
var MC_arrMonth	= "";
var MC_arrDay_kr   = ["일","월","화","수","목","금","토"];
var MC_arrDay_en   = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
var MC_arrMonth_kr = ["1","2","3","4","5","6","7","8","9","10","11","12"];
var MC_arrMonth_en = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nev","Dec"];
var MC_strYear	 = "";
var MC_strMonth	= "";

document.write(MINI_CAL);

//obj   : 대상 객체
//gb	: 구분자('-','/')
//lan   : 언어(kr,en)
function Calendar(obj, gb, lan, e){
	var iDate	   = "";
	var nYear	   = "";
	var nMonth	  = "";
	var nDate	   = "";

	if (document.getElementById("MINI_CAL").style.display==""){
		document.getElementById("MINI_CAL").style.display="none";
		return;
	}

	if (gb!="" && gb!=undefined){
		MC_c_gb = gb;
	}else{
		MC_c_gb = "-";
	}

	if (lan=="" || lan==undefined || lan=="kr"){
		MC_cssLan	  = "kr";
		MC_arrDay	  = MC_arrDay_kr;
		MC_arrMonth	= MC_arrMonth_kr;
		MC_strYear	 = "년";
		MC_strMonth	= "월";
	}else{
		MC_cssLan = "en";
		MC_arrDay = MC_arrDay_en;
		MC_arrMonth = MC_arrMonth_en;
		MC_strYear	 = ".";
		MC_strMonth	= "";
	}

	if (obj != "" && obj != undefined){
		MC_target = obj;
		var elementNM = "";
		if ($(MC_target).attr("name")) {
			elementNM = $(MC_target).attr("name");
		} else if ($(MC_target).attr("id")) {
			elementNM = $(MC_target).attr("id");
		}
		if (elementNM != "") {
			if ((elementNM.indexOf("_yyyy") > -1) || (elementNM.indexOf("_mmdd") > -1)) {
				var index = elementNM.indexOf("_yyyy");
				if (index == -1) {
					index = elementNM.indexOf("_mmdd");
				}
				var ElementNM = elementNM.substring(0, index);
				iDate = $("input[name='"+ElementNM+"_yyyy']").val()+"-"+$("input[name='"+ElementNM+"_mmdd']").val();
				
			} else {
				iDate = $(MC_target).val();
			}
		} else {
			iDate = $(MC_target).val();
		}
		iDate = iDate.replace(/-/g,"");
		iDate = iDate.replace(/\//g,"");
	}

	setMC_CurrDate();

	if (iDate.length==8){
		nYear = iDate.substring(0,4);
		nMonth = iDate.substring(4,6);
		nDate = iDate.substring(6,8);
	}else{
		nYear = MC_CurrYear;
		nMonth = MC_CurrMonth;
		nDate = MC_CurrDate;
	}

	MC_inputDate = nYear + nMonth + nDate;

	var x,y;

	var ua = window.navigator.userAgent;

	if ((ua.indexOf("Chrome") > -1) || (ua.indexOf("Chrome") > -1)) {
		x = (document.layers) ? loc.pageX : event.clientX + document.documentElement.scrollLeft;
		y = (document.layers) ? loc.pageY : event.clientY + document.documentElement.scrollTop;

		document.getElementById("MINI_CAL").style.top = y+20 + "px";
		document.getElementById("MINI_CAL").style.left= x-50 + "px";
		
	} else if (ua.indexOf("Safari") > -1) {
		x = (document.layers) ? loc.pageX : event.clientX + document.body.scrollLeft;
		y = (document.layers) ? loc.pageY : event.clientY + document.body.scrollTop;

		document.getElementById("MINI_CAL").style.pixelTop = y+20;
		document.getElementById("MINI_CAL").style.pixelLeft = x-50;
		
	} else {
		x = (document.layers) ? loc.pageX : event.clientX + document.documentElement.scrollLeft;
		y = (document.layers) ? loc.pageY : event.clientY + document.documentElement.scrollTop;

		document.getElementById("MINI_CAL").style.pixelTop = y+20;
		document.getElementById("MINI_CAL").style.pixelLeft = x-50;
	}
	
	MC_ShowCal(nYear, nMonth, nDate);
}

function MC_ShowCal(nYear, nMonth, nDate){
	var FirstDay	= "01";	 //달의 첫번째날짜
	var LastDay	 = "";	   //달의 마지막날짜
	var StartDay	= "";	   //시작날짜 요일
	var EndDay	  = "";	   //마지막날짜 요일
	var pDay		= "";	   //이전달 마지막 시작날짜
	var oDate	   = "";	   //날짜 객체 저장변수
	var i		   = 0 ;	   //계산변수
	var j		   = 0 ;	   //계산변수
	var Cal_html	= "";	   //html 저장변수
	var t_css	   = "";	   //Class 저장변수

	if (nMonth > 12){
		nYear = parseInt(nYear,10) +1;
		nMonth = "01";
	}

	if (nMonth < 1){
		nYear = parseInt(nYear,10) -1;
		nMonth = "12";
	}

	//마지막날짜
	oDate   = new Date(nYear, nMonth, parseInt(FirstDay,10) -1);
	LastDay = oDate.getDate();
	//마지막날짜 끌

	oDate = new Date(nYear, parseInt(nMonth,10) -1, FirstDay);

	//시작날짜 요일
	oDate.setDate(FirstDay);
	StartDay = oDate.getDay();
	//시작날짜 요일 끌

	//마지막날짜 요일
	oDate.setDate(LastDay);
	EndDay = oDate.getDay();
	//마지막날짜 요일 끌

	//이전달 마지막 시작날짜
	oDate = new Date(nYear, parseInt(nMonth,10) -1, parseInt(FirstDay,10) -1);
	pDay = oDate.getDate() - StartDay + 1;
	//이전달 마지막 시작날짜 끝

	oDate = new Date(nYear, parseInt(nMonth,10) -1, FirstDay);

	FirstDay	= parseInt(FirstDay,10);
	LastDay	 = parseInt(LastDay,10);

	Cal_html += "<div class='mini_calendar'>";

	Cal_html += "<div style='text-align:center; padding-top:2px; padding-bottom:2px;'>";
	Cal_html += "   <span onclick=\"MC_ShowCal('"+nYear+"','"+(parseInt(nMonth)-1)+"','"+nDate+"');\" style='cursor:pointer;'>◀&nbsp;</span>";
	Cal_html += MC_SelectYear(nYear, nMonth, nDate)+"&nbsp;<b style='color:#0100FF'>"+MC_strYear+"</b>&nbsp;"+MC_SelectMonth(nYear, nMonth, nDate)+"&nbsp;<b style='color:#0100FF'>"+MC_strMonth+"</b>";
	Cal_html += "   <span onclick=\"MC_ShowCal('"+nYear+"','"+(parseInt(nMonth)+1)+"','"+nDate+"');\" style='cursor:pointer;'>&nbsp;▶</span>";
	Cal_html += "</div>";

	Cal_html += "<table>";
	Cal_html += "   <tr class='title "+MC_cssLan+"'>";
	Cal_html += "	   <td>"+MC_arrDay[0]+"</td>";
	Cal_html += "	   <td>"+MC_arrDay[1]+"</td>";
	Cal_html += "	   <td>"+MC_arrDay[2]+"</td>";
	Cal_html += "	   <td>"+MC_arrDay[3]+"</td>";
	Cal_html += "	   <td>"+MC_arrDay[4]+"</td>";
	Cal_html += "	   <td>"+MC_arrDay[5]+"</td>";
	Cal_html += "	   <td>"+MC_arrDay[6]+"</td>";
	Cal_html += "   </tr>";
	Cal_html += "   <tr>";

	if (nMonth.length==1){ nMonth= "0" + nMonth;  }


	//첫번째날짜까지
	for (i=0;i < StartDay ;i++ ){
		Cal_html += "<td class='dayoff'>"+(pDay + i)+"</td>";
	}

	for (i=FirstDay;i <= LastDay ;i++ ){
		if (i.toString().length==1){
			j = "0" + i.toString();
		}else{
			j = i.toString();
		}

		oDate.setDate(j);

		//입력날짜
		if (MC_inputDate == nYear + nMonth + j){
			t_css = "today";
		}else{
			t_css = "";
		}

		//토요일이면
		if (oDate.getDay()==6){
			Cal_html += "<td class='"+t_css+"' onmouseover='MC_doOver(this);' onmouseout='MC_doOut(this);' onclick=\"MC_doClick('"+nYear+MC_c_gb+nMonth+MC_c_gb+j+"');\" style='cursor:pointer;'><span class='sat'>"+i+"</span></td>";
			Cal_html += "</tr>";
		//일요일이면
		}else if (oDate.getDay()==0){
			Cal_html += "<tr>";
			Cal_html += "<td class='"+t_css+"' onmouseover='MC_doOver(this);' onmouseout='MC_doOut(this);' onclick=\"MC_doClick('"+nYear+MC_c_gb+nMonth+MC_c_gb+j+"');\" style='cursor:pointer;'><span class='sun'>"+i+"</span></td>";
		}else{
			Cal_html += "<td class='"+t_css+"' onmouseover='MC_doOver(this);' onmouseout='MC_doOut(this);' onclick=\"MC_doClick('"+nYear+MC_c_gb+nMonth+MC_c_gb+j+"');\" style='cursor:pointer;'>"+i+"</td>";
		}
	}

	//마지막날짜부터
	for (i=EndDay +1;i <= 6 ;i++ ){
		Cal_html += "<td class='dayoff'>"+(i-EndDay)+"</td>";

		if (i==6){
			Cal_html += "</tr>";
		}
	}

	Cal_html += "</div>";

	document.getElementById("MINI_CAL").style.display = "";
	document.getElementById("MINI_CAL").innerHTML = Cal_html;

}
function MC_doOver(obj){
	obj.style.background = "#b8cd94";
}

function MC_doOut(obj){
	obj.style.background = "";
}

// 년도 select box 만들기
function MC_SelectYear(nYearVal, nMonthVal, nDateVal){
	var i;
	var y_html = "";

	nYearVal = parseInt(nYearVal,10);

	y_html += "<select name='s_Year' id='s_Year' style='font-size:8pt; height:20px;' onchange=\"MC_ShowCal(this.value,'"+nMonthVal+"','"+nDateVal+"');\">";

	for (i=nYearVal +10;i >= nYearVal -10 ;i-- ){
		if (i==nYearVal){
			y_html += "<option value='"+i+"' selected>"+i+"</option>";
		}else{
			y_html += "<option value='"+i+"'>"+i+"</option>";
		}
	}

	y_html += "</select>";

	return y_html;
}

// 월 select box 만들기
function MC_SelectMonth(nYearVal, nMonthVal, nDateVal){
	var i;
	var m_html = "";

	nMonthVal = parseInt(nMonthVal,10);

	m_html += "<select name='s_Month' id='s_Month' style='font-size:8pt; height:20px;' onchange=\"MC_ShowCal("+nYearVal+",this.value,'"+nDateVal+"');\">";

	for (i=1;i <=12 ;i++ ){
		j = i;

		if (j.toString().length==1){
			j = "0" + j;
		}

		if (j==nMonthVal){
			m_html += "<option value='"+j+"' selected>"+MC_arrMonth[i-1]+"</option>";
		}else{
			m_html += "<option value='"+j+"'>"+MC_arrMonth[i-1]+"</option>";
		}

	}

	m_html += "</select>";

	return m_html;
}

// 현재날짜 구하기
function setMC_CurrDate(){
	var oDate = new Date();

	MC_CurrYear	= oDate.getFullYear();
	MC_CurrMonth   = oDate.getMonth();
	MC_CurrDate	= oDate.getDate();

	MC_CurrMonth   = parseInt(MC_CurrMonth,10) + 1;

	MC_CurrYear	= MC_CurrYear.toString();
	MC_CurrMonth   = MC_CurrMonth.toString();
	MC_CurrDate	= MC_CurrDate.toString();

	if (MC_CurrMonth.length==1){ MC_CurrMonth = "0" + MC_CurrMonth;  }
	if (MC_CurrDate.length==1) { MC_CurrDate  = "0" + MC_CurrDate;   }
}

// 마지막 클릭했을때 동작
function MC_doClick(p_date){
	var elementNM = "";
	if ($(MC_target).attr("name")) {
		elementNM = $(MC_target).attr("name");
	} else if ($(MC_target).attr("id")) {
		elementNM = $(MC_target).attr("id");
	}
	if (elementNM != "") {
		if ((elementNM.indexOf("_yyyy") > -1) || (elementNM.indexOf("_mmdd") > -1)) {
			var index = elementNM.indexOf("_yyyy");
			if (index == -1) {
				index = elementNM.indexOf("_mmdd");
			}
			var ElementNM = elementNM.substring(0, index);
			$("input[name='"+ElementNM+"_yyyy']").val(p_date.substring(0, 4));
			$("input[name='"+ElementNM+"_mmdd']").val(p_date.substring(5));
			
		} else {
			$(MC_target).val(p_date);
		}
	} else {
		$(MC_target).val(p_date);
	}
	onClickCalendar(MC_target); // 캘린더 클릭했을때 호출 함수 - 각 페이지에서 재정의
	document.getElementById("MINI_CAL").style.display = "none";
}
function onClickCalendar() {}

function hideMINI_CAL() {
	document.getElementById("MINI_CAL").style.display = "none";
}
