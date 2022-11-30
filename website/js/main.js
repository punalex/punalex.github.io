var timetag="20221111161803";
var audio=new Audio;
var timeout=0;
var windowresize=0;
function LoadHash(){
	var xmlhttp, langcbutton, langebutton, type;
	
	clickid = (window.location.href.indexOf('#') != -1 && window.location.href.indexOf('!') != -1 && window.location.href.split("!")[1] != '')?(window.location.href.split("!")[1]):('main');	
	type = sessionStorage.getItem('type');
	if (type == null || clickid.substr(0, 4) == 'main')
		type = '1';
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
		var bk;
		switch(type){
			case '1':{
				bk = 'bg_orange.png';
			}break;
			case '2':{
				bk = 'bg_green.png';
			}break;
			case '3':{
				bk = 'bg_blue.png';
			}break;
		}				
		if ($('body').css('background-image').indexOf(bk) == -1)
			$('body').css('background-image', 'url("images/'+bk+'")');
		if (clickid.substr(0, 4) == 'main'){
			xmlhttp.open('GET', 'content/main.html?'+timetag, true);
			$('body > div:not(#main)').each(function(){
				$(this).css('visibility', 'hidden');
			})
		}
		else{
			$('body > div:not(#main)').each(function(){
				$(this).css('visibility', ($(this).attr('id').substr(-1) == type)?('visible'):('hidden'));
			})
			$('#buttonbox'+type+' > img').each(function(){
				if ($(this).attr('src').indexOf('on.png') == -1)
					$(this).attr('src', $(this).attr('src').substring(0, $(this).attr('src').length-4)+'_on.png');
			})
			if (clickid.substr(0, 5) == 'video'){
				$('#learning2').attr('src', $('#learning2').attr('src').substring(0, $('#learning2').attr('src').length-7)+'.png');
				xmlhttp.open('GET', 'content/video2.html?'+timetag, true);
			}
			else{
				$('#'+clickid).attr('src', $('#'+clickid).attr('src').substring(0, $('#'+clickid).attr('src').length-7)+'.png');
				xmlhttp.open('GET', 'content/'+clickid+'.html?'+timetag, true);
			}
/*			if (clickid.substr(0, 4) == 'info'){
				xmlhttp.open('GET', 'content/'+clickid+'.html?'+timetag, true);
			}				
			else if (clickid.substr(0, 8) == 'support1'){
				xmlhttp.open('GET', 'content/support1.html?'+timetag, true);
			}				
			}*/
		}
		xmlhttp.send();
	}
}
$(window).on('hashchange', function(){
	LoadHash();
})
function OnClick() {
	clickid = (this.id != undefined)?(this.id):((window.location.href.indexOf('#') != -1 && window.location.href.indexOf('!') != -1 && window.location.href.split("!")[1] != '')?(window.location.href.split("!")[1]):('main'));
	if (clickid.substr(0, 5) == 'login'){
		var xmlhttp, langcbutton, langebutton;
	
		if (window.XMLHttpRequest)
			xmlhttp = new XMLHttpRequest();
		else
			xmlhttp = new window.ActiveXObject("Microsoft.XMLHTTP");	

		xmlhttp.onreadystatechange = function(){
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
				var type=xmlhttp.responseText;		
				// for testing
				type = $('#id').val();
				//
				if (!Number.isNaN(Number(type)) && Number(type) > 0 && Number(type) < 5){
					sessionStorage.setItem('type', type);
					switch(type){
						case '1':case '2': location.hash = '#!info'+type;break;
						case '3': location.hash = '#!member'+type;break;
					}
				}
				else{
					$('#logindesc').css('display', 'none');
					$('#error').css('display', 'block');
					clearTimeout(timeout);
					timeout = setTimeout(function (){
						$('#logindesc').css('display', 'block');
						$('#error').css('display', 'none');
						clearTimeout(timeout);
					}, 5000);
				}
			}
		}
		xmlhttp.open('GET', 'login.txt?'+timetag, true);
		xmlhttp.send();
	}
	else if (clickid.substr(0, 5) == 'close'){
		if ($('#'+clickid.substr(0, 6)).html().indexOf('down') != -1){
			$('#'+clickid.substr(0, 6)).html('收起 <span class="fa fa-chevron-up">');
			$('#e'+clickid.substr(5, 1)+'d').css('display', 'block');
			$('#e'+clickid.substr(5, 1)+'do').css('display', 'none');
		}
		else{
			$('#'+clickid.substr(0, 6)).html('展開 <span class="fa fa-chevron-down">');
			$('#e'+clickid.substr(5, 1)+'d').css('display', 'none');
			$('#e'+clickid.substr(5, 1)+'do').css('display', 'inline-block');
		}
	}
	else if (clickid.substr(0, 8) == 'infoedit'){
	}	
	else if (clickid.substr(0, 9) == 'groupsong'){
		if (!audio.paused && !audio.ended)
			audio.pause();
		else{
			audio.setAttribute('src', $('#groupsongimg').attr('alt'));
			audio.load();
			audio.loop = false;
			audio.play();
		}
	}	
	else if (clickid.substr(0, 8) == 'zoomlink'){
		window.open($('#zoomlinkimg').attr('alt'), '_blank');
	}	
	else if (this.className == 'mcitem'){
		let dict = [{"q":"q1", "a":"A"}, {"q":"q2", "a":"B"}, {"q":"q3", "a":"A"}];
		$(this).children('.mcletter').css('border-color', 'rgba(14, 102, 52, 1)');
		$(this).parent().children('.mcitem').unbind('click');
		let answer = dict.find(question => question.q == $(this).parent().attr('id'));
		if (answer.a == $(this).children('.mcletter').text()){
			$(this).parent().siblings().children('.mctick').attr('src', 'images/img_yes.png');
		}
		else{
			$(this).parent().find('.mcletter:eq('+(answer.a.charCodeAt(0)-'A'.charCodeAt(0))+')').css('border-color', 'rgba(255, 0, 0, 1)');
			$(this).parent().siblings().children('.mctick').attr('src', 'images/img_no.png');
		}
	}
	else
		location.hash = ((clickid.substr(0, 4) == 'main')?('#!'):((location.hash == '#!'+clickid)?('#!'+clickid):('#!'+clickid)));
}
function OnEnter(e){
	if (e.which == 13){
		$('#login').click();
	}
}
function replacehtml(text){
	$('#main').html(text);
	$('#login').unbind('click');
	$('#howlogin').unbind('click');
	$('#howgroup').unbind('click');
	for (let loop=1; loop<=3; loop++){
		$('#buttonbox'+loop+' > img').each(function(){
			$(this).unbind('click');
			$(this).click(OnClick);
		})
	}
	$('.mcitem').unbind('click');	
	$('#infoedit').unbind('click');	
	$('#groupsong').unbind('click');
	$('span.item6').unbind('click');
	$('#zoomlink').unbind('click');
	$('.learnvideo').unbind('click');
	$('#login').click(OnClick);
	$('#howlogin').click(OnClick);
	$('#howgroup').click(OnClick);
	$('.mcitem').click(OnClick);	
	$('#infoedit').click(OnClick);
//	$('#groupsong').click(OnClick);
	$('span.item6').click(OnClick);
	$('#zoomlink').click(OnClick);
	$('.learnvideo').click(OnClick);
	$('#id').on('keypress', OnEnter);
	$('#password').on('keypress', OnEnter);
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
$(window).resize('resize', function(){
	clearTimeout(windowresize);
	windowresize = setTimeout(function (){
		let vh = window.innerHeight * 0.01;	
		document.documentElement.style.setProperty('--vh', `${vh}px`);
		clearTimeout(windowresize);
	}, 500);
	let vh = window.innerHeight * 0.01;	
	document.documentElement.style.setProperty('--vh', `${vh}px`);
})
$(window).on('orientationchange', function(){
	direction();
	$(window).resize();
})
