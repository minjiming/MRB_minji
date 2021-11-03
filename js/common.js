/////////////////////////////////////////////////////////////////////////////////////////////// AJAX
/////////////////////////////////////////////////////////////////////////////////////////////// AJAX
// function ajaxFunc(url, callback)
function ajaxFunc(url, params, message, callback) {
	var token = $('meta[name="csrf-token"]').attr('content');

	$.ajax({
		type:'POST',
		headers: {'X-CSRF-TOKEN': token},
		url: url,
		contentType: 'application/json',
		data : params,
		success: function(result){
			// if (result) {console.log(result);}
			if (message) {alert(message);}
			if (callback) {callback(result);}
		}, error : function(xhr, status, error) {
			console.log(error);
		}
	});
}

// get file  // 파일 그대로 가져오기
function ajax_GetFile(url, callback) {
	var xobj = new XMLHttpRequest();
	xobj.overrideMimeType("application/json");
	xobj.open('GET', url, true);
	xobj.onreadystatechange = function () {
		if (xobj.readyState == 4 && xobj.status == "200") {
			// var json_obj = JSON.parse(xobj.responseText);
			// var json_str = JSON.stringify(xobj.responseText);
			callback(xobj.responseText);
		}
	};
	xobj.send(null);
}

/////////////////////////////////////////////////////////////////////////////////////////////// File 연관 함수
/////////////////////////////////////////////////////////////////////////////////////////////// File 연관 함수
// get json file  // parse 해서 가져오기
function ajax_GetJSON(url, callback, params = '') {
	$.ajax(url, {
		dataType: 'json',
		type: 'get',
		success: function(result) {
			if (callback) {
				// var json_str = JSON.stringify(result);
				callback(result, params);
			}
		},
		error: function(e) {
			console.log(e);
		}
	});
}

// file include  ex=>include("ethereal/js/breakpoints.min.js");
function include(FileDir) {
	var includejs = document.createElement("script");
	includejs.type = "text/javascript";
	includejs.src = FileDir;
	document.head.appendChild(includejs);
}

/////////////////////////////////////////////////////////////////////////////////////////////// 알림, 유저 제공 관련 함수
/////////////////////////////////////////////////////////////////////////////////////////////// 알림, 유저 제공 관련 함수
// alert
function alert_str(str) {
	if( !str ) {
		str = "준비중 입니다.";
	}
	alert(str);
}

// recheck alert
function reCheck(formEI, question) {
	if( !question ) {
		question = "실행 하시겠습니까?";
	}
	return confirm(question);
}

// current page reload
function pageReload() {
	location.reload();
}

// html 입력 함수
function loadHtml(result, target) {
	var id = target;
	$(id).html(result);
}

// 클립보드로 복사하는 기능을 생성
function copyToClipboard(elementId, str = "", alert = "") {
	// 글을 쓸 수 있는 란을 만든다.
	var aux = document.createElement("input");
	// 지정된 요소의 값을 할당 한다.
	aux.setAttribute("value", document.getElementById(elementId).innerHTML);
	// bdy에 추가한다.
	document.body.appendChild(aux);
	// 지정된 내용을 강조한다.
	aux.select();
	// 텍스트를 카피 하는 변수를 생성
	document.execCommand("copy");
	// body 로 부터 다시 반환 한다.
	document.body.removeChild(aux);
	// 클립보드 알림을 한다.
	if (alert){
		alert_str(str + '복사되었습니다.');
	}
}

/////////////////////////////////////////////////////////////////////////////////////////////// 입력 데이터 가공 관련 함수
/////////////////////////////////////////////////////////////////////////////////////////////// 입력 데이터 가공 관련 함수
// 숫자 input area 에서 char 입력 제한 remove korean word
function removeKChar(event) {
	event = event || window.event;
	var keyID = (event.which) ? event.which : event.keyCode;
	if ( keyID == 8 || keyID == 46 || keyID == 37 || keyID == 39 ) 
		return;
	else
		event.target.value = event.target.value.replace(/[^0-9]/g, "");
}

// textarea 텍스트공간 최대 줄 및 최대 글자 제한
function limitTextarea(textarea, maxLines, maxChar) {
	var lines = textarea.value.replace(/\r/g, '').split('\n'), lines_removed, char_removed, i;
	if (maxLines && lines.length > maxLines) {
		lines = lines.slice(0, maxLines);
		lines_removed = 1
	}
	if (maxChar) {
		i = lines.length;
		while (i-- > 0) if (lines[i].length > maxChar) {
			lines[i] = lines[i].slice(0, maxChar);
			char_removed = 1
		}
		if (char_removed || lines_removed) {
			textarea.value = lines.join('\n')
		}
	}
}

/////////////////////////////////////////////////////////////////////////////////////////////// 시간 데이터 가공 관련 함수
/////////////////////////////////////////////////////////////////////////////////////////////// 시간 데이터 가공 관련 함수

// unixTime date 스트링에서 시간을 추출
function hours12(date) {
	return (date.getHours() + 24) % 12 || 12;
}

// javascript unixTime to dateTime
function changToDate(value) {
	var dateTime = new Array();

	var timestamp = value * 1000;
	var date = new Date(timestamp);
	var year = date.getFullYear();
	var month = ("0" + (date.getMonth() + 1)).slice(-2);
	var day = ("0" + date.getDate()).slice(-2);
	var hours = ("0" + date.getHours()).slice(-2);
	var minutes = ("0" + date.getMinutes()).slice(-2);
	var seconds = ("0" + date.getSeconds()).slice(-2);
	var convdataTime = year + '/' + month + '/' + day + ' ' + hours + ':' + minutes.substr(-2);

	dateTime['year'] = year;
	dateTime['month'] = month;
	dateTime['day'] = day;
	dateTime['hours'] = hours;
	dateTime['minutes'] = minutes;
	dateTime['seconds'] = seconds;
	dateTime['datetime'] = convdataTime;

	return dateTime;
}

/** * yyyyMMdd 포맷으로 반환 */
function getFormatDate(date){
	var year = date.getFullYear();
	var month = (1 + date.getMonth());
	month = month >= 10 ? month : '0' + month; //month 두자리로 저장
	var day = date.getDate();
	day = day >= 10 ? day : '0' + day; //day 두자리로 저장
	return year + '' + month + '' + day;
}

// product show 에서 사용
function upMonth(value){
	var down_month = "";
	if (value == "01") {down_month = "12";}
	if (value == "02") {down_month = "03";}
	if (value == "03") {down_month = "04";}
	if (value == "04") {down_month = "05";}
	if (value == "05") {down_month = "06";}
	if (value == "06") {down_month = "07";}
	if (value == "07") {down_month = "08";}
	if (value == "08") {down_month = "09";}
	if (value == "09") {down_month = "10";}
	if (value == "10") {down_month = "11";}
	if (value == "11") {down_month = "12";}
	if (value == "12") {down_month = "01";}
	return down_month;
}
function downMonth(value){
	var down_month = "";
	if (value == "01") {down_month = "12";}
	if (value == "02") {down_month = "01";}
	if (value == "03") {down_month = "02";}
	if (value == "04") {down_month = "03";}
	if (value == "05") {down_month = "04";}
	if (value == "06") {down_month = "05";}
	if (value == "07") {down_month = "06";}
	if (value == "08") {down_month = "07";}
	if (value == "09") {down_month = "08";}
	if (value == "10") {down_month = "09";}
	if (value == "11") {down_month = "10";}
	if (value == "12") {down_month = "11";}
	return down_month;
}
// 12 => 12, 01 => 1
function detachZero(value){
	if (value.substr(0, 1) == '0'){
		return value.substr(1);
	}
	return value;
}

// 4000 => 4,000 
function addNumFormat(data) {
	// obj.rental_cost_hour.format()
	// 숫자 타입에서 쓸 수 있도록 format() 함수 추가
	Number.prototype.format = function(){
		if(this == 0) return 0;
	 
		var reg = /(^[+-]?\d+)(\d{3})/;
		var n = (this + '');
	 
		while (reg.test(n)) n = n.replace(reg, '$1' + ',' + '$2');
	 
		return n;
	};
	// 문자열 타입에서 쓸 수 있도록 format() 함수 추가
	String.prototype.format = function(){
		var num = parseFloat(this);
		if( isNaN(num) ) return "0";
	 
		return num.format();
	};
	// 숫자 타입 test
	//var num = 123456.012;
	//console.log(num.format());               // 123,456.012 
	//num = 13546745;
	//console.log(num.format());               // 13,546,745
	// 문자열 타입 test
	//console.log("12348".format());           // 12,348
	//console.log("12348.6456".format());      // 12,348.6456

	return data.format();
}

/////////////////////////////////////////////////////////////////////////////////////////////// 이미지 또는 파일 관련 함수
/////////////////////////////////////////////////////////////////////////////////////////////// 이미지 또는 파일 관련 함수
// image upload direct show
function readURL(input) {
	if (input.files && input.files[0]) {
		var reader = new FileReader(); //파일을 읽기 위한 FileReader객체 생성
		reader.onload = function (e) { 
		//파일 읽어들이기를 성공했을때 호출되는 이벤트 핸들러
		$("[id^='imageShow']").attr('src', e.target.result);
			//이미지 Tag의 SRC속성에 읽어들인 File내용을 지정
			//(아래 코드에서 읽어들인 dataURL형식)
		}
		reader.readAsDataURL(input.files[0]);
		//File내용을 읽어 dataURL형식의 문자열로 저장
	}
}//readURL()--

// 이미지 가득차게
function imgFullFit(target) {
	var targetImg = $(target);
	(targetImg.width() > targetImg.height()) ? targetImg.addClass('w100p hauto') : targetImg.addClass('wauto h100p');
}





