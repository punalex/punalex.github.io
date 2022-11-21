var timetag="20221111161801";
function LoadHash(){
	var xmlhttp, langcbutton, langebutton;
	
	clickid = (window.location.href.indexOf('#') != -1 && window.location.href.indexOf('!') != -1 && window.location.href.split("!")[1] != '')?(window.location.href.split("!")[1]):('main');
	if (window.XMLHttpRequest)
		xmlhttp = new XMLHttpRequest();
	else
		xmlhttp = new window.ActiveXObject("Microsoft.XMLHTTP");	
		
	if (clickid != ''){
		xmlhttp.onreadystatechange = function(){
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
				replacehtml(xmlhttp.responseText);
//				Menu_Out();
//				Resize((size == '-l')?(3):((size == '-s')?(-3):(0)));
			}
		}
		if (clickid.substr(0, 4) == 'main'){
			xmlhttp.open('GET', 'content/main.html?'+timetag, true);
			$('#buttonbox').css('visibility', 'hidden');
		}
		else{
			$('#info').attr('src', 'images/btn_elders_info_on.png');
			$('#support').attr('src', 'images/btn_elders_support_on.png');
			$('#member').attr('src', 'images/btn_elders_members_on.png');
			$('#timetable').attr('src', 'images/btn_elders_timetable_on.png');
			$('#buttonbox').css('visibility', 'visible');
			if (clickid.substr(0, 5) == 'login'){
				$('#info').attr('src', 'images/btn_elders_info.png');
				xmlhttp.open('GET', 'content/info.html?'+timetag, true);
			}
			else if (clickid.substr(0, 4) == 'info'){
				$('#info').attr('src', 'images/btn_elders_info.png');
				xmlhttp.open('GET', 'content/info.html?'+timetag, true);
			}				
			else if (clickid.substr(0, 7) == 'support'){
				$('#support').attr('src', 'images/btn_elders_support.png');
				xmlhttp.open('GET', 'content/support.html?'+timetag, true);
			}				
			else if (clickid.substr(0, 6) == 'member'){
				$('#member').attr('src', 'images/btn_elders_members.png');
				xmlhttp.open('GET', 'content/member.html?'+timetag, true);
			}				
			else if (clickid.substr(0, 9) == 'timetable'){
				$('#timetable').attr('src', 'images/btn_elders_timetable.png');
				xmlhttp.open('GET', 'content/timetable.html?'+timetag, true);
			}				
		}
		xmlhttp.send();
	}
}
$(window).on('hashchange', function(){
	LoadHash();
})
function OnClick() {
	clickid = (this.id != undefined)?(this.id):((window.location.href.indexOf('#') != -1 && window.location.href.indexOf('!') != -1 && window.location.href.split("!")[1] != '')?(window.location.href.split("!")[1]):('main'));
	location.hash = ((clickid.substr(0, 4) == 'main')?('#!'):((location.hash == '#!'+clickid)?('#!'+clickid):('#!'+clickid)));
}
function replacehtml(text){
	$('#main').html(text);
	$('#login').unbind('click');
	$('#howlogin').unbind('click');
	$('#howgroup').unbind('click');
	$('#info').unbind('click');
	$('#support').unbind('click');
	$('#member').unbind('click');
	$('#timetable').unbind('click');
	$('#login').click(OnClick);
	$('#info').click(OnClick);
	$('#support').click(OnClick);
	$('#member').click(OnClick);
	$('#timetable').click(OnClick);
	$('#howlogin').click(OnClick);
	$('#howgroup').click(OnClick);
	$('html,body').animate({scrollTop:0}, 'slow');
	direction();
}
function direction(){
	if (window.orientation == 90 || window.orientation == -90 || (window.orientation == undefined && $(window).width() >= $(window).height())){
		$('#cssland').removeAttr("disabled");
		$('#cssport').attr("disabled", "disabled");
	}
	else if (window.orientation == 0 || window.orientation == 180 || (window.orientation == undefined && $(window).width() < $(window).height())){
		$('#cssport').removeAttr("disabled");
		$('#cssland').attr("disabled", "disabled");
	}
}
$(document).ready(function(){
	let vh = window.innerHeight * 0.01;
	document.documentElement.style.setProperty('--vh', `${vh}px`);
	LoadHash();
})
$(window).on('orientationchange', function(){
	direction();
	$(window).resize('resize', function(){
		let vh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty('--vh', `${vh}px`);
	});
})
