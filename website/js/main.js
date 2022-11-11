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
			$(document).prop('title', '待定');
			xmlhttp.open('GET', 'content/main.html?'+timetag, true);
		}
		else if (clickid.substr(0, 7) == 'aboutus'){
			xmlhttp.open('GET', 'content/aboutus.html?time='+timetag, true);
		}
		xmlhttp.send();
	}
}
$(window).on('hashchange', function(){
	LoadHash();
})
function replacehtml(text){
	$('#main').html(text);
	$('html,body').animate({scrollTop:0}, 'slow');
}
$(document).ready(function(){
	LoadHash();
})
