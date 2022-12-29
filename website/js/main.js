var timetag="20221111161803";
var audio=new Audio;
var timeout=0;
var windowresize=0;
function LoadHash(){
	let xmlhttp, langcbutton, langebutton, type;
	
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
		let bk, bc;
		switch(type){
			case '1':{
				bk = 'bg_orange.png';
				bc = 'bkcolor1';
				bt = '往照顧者頁面>>';
			}break;
			case '2':{
				bk = 'bg_green.png';
				bc = 'bkcolor5';
				bt = '往長者頁面>>';
			}break;
			case '3':{
				bk = 'bg_blue.png';
				bc = 'bkcolor6';
				bt = '';
			}break;
			case '4':{
				bk = 'bg_brown.png';
				bc = 'bkcolor9';
				bt = '';
			}break;
		}				
		if ($('body').css('background-image').indexOf(bk) == -1)
			$('body').css('background-image', 'url("images/'+bk+'")');
		if ($('#carer').attr('class').indexOf(bc) == -1){
			$('#carer, #logout').each(function(){
				$(this).attr('class', function(index, classname){
					return classname.replace(/bkcolor\d/, bc);
				});
			});
			$('#carer').text(bt);
			$('#carer').css('visibility', (bt == '')?('hidden'):('visible'));
		}
		$('#footer').css('display', (clickid.substr(0, 4) == 'main')?('none'):('flex'));
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
				$('#learning'+type).attr('src', $('#learning'+type).attr('src').substring(0, $('#learning'+type).attr('src').length-7)+'.png');
				xmlhttp.open('GET', 'content/video'+type+'.html?'+timetag, true);
			}
			else if (clickid.substr(0, 8) == 'groupmem' || clickid.substr(0, 5) == 'memgp' || clickid.substr(0, 11) == 'servicetime' || clickid.substr(0, 9) == 'grouptime' || clickid.substr(0, 7) == 'groupmc'){
				$('#client4').attr('src', $('#client4').attr('src').substring(0, $('#client4').attr('src').length-7)+'.png');
				xmlhttp.open('GET', 'content/'+clickid.substr(0, clickid.length-4)+'4.html?'+timetag, true);
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
	if (clickid.substr(0, 6) == 'logout'){
		clickid = '';
	}
	if (clickid.substr(0, 5) == 'login'){
		let xmlhttp, langcbutton, langebutton;
	
		if (window.XMLHttpRequest)
			xmlhttp = new XMLHttpRequest();
		else
			xmlhttp = new window.ActiveXObject("Microsoft.XMLHTTP");	

		xmlhttp.onreadystatechange = function(){
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
				let type=xmlhttp.responseText;		
				// for testing
				type = $('#id').val();
				//
				if (!Number.isNaN(Number(type)) && Number(type) > 0 && Number(type) < 5){
					sessionStorage.setItem('type', type);
					switch(type){
						case '1':case '2':case '4': location.hash = '#!info'+type;break;
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
	else if (clickid.substr(clickid.length - 7) == 'editimg'){
		$('#whiteframe input, #whiteframe textarea').attr('readonly', ($(this).attr('src').indexOf('edit') == -1));
		$('#whiteframe select').css('pointer-events', ($(this).attr('src').indexOf('edit') == -1)?('none'):('auto'));
		$('[contentEditable="false"], [contentEditable="true"]').attr('contentEditable', ($(this).attr('src').indexOf('edit') != -1));
		$(this).attr('src', function(index, srcname){
			if ($(this).attr('src').indexOf('edit') != -1)
				return srcname.replace(/edit/, 'save');
			else
				return srcname.replace(/save/, 'edit');
		});
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
	else if ($(this).attr('class').indexOf('atttick') != -1){
		if ($('[id$=editimg]').attr('src').indexOf('edit') == -1)
			$(this).attr('src', 'images/img_'+(($(this).attr('src').indexOf('yes') != -1)?('no'):(($(this).attr('src').indexOf('no') != -1)?('null'):('yes')))+'.png');
	}
	else if ($(this).attr('class').indexOf('fa-star') != -1){
		if ($('[id$=editimg]').attr('src').indexOf('edit') == -1){
			if ($(this).attr('class').indexOf('fa-star-o') != -1){
				$(this).parent().find('.fa:lt('+($(this).index()+1)+')').each(function(){
					$(this).removeClass('fa-star-o').addClass('fa-star');
				});
			}
			else{
				$(this).parent().find('.fa:gt('+$(this).index()+'), .fa:eq('+$(this).index()+')').each(function(){
					$(this).removeClass('fa-star').addClass('fa-star-o');
				});
			}
		}
	}
	else if (this.className.indexOf('mcitem') != -1){
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
	else{
		if (clickid.substr(0, 5) == 'carer'){
			let type = sessionStorage.getItem('type');
			type = type%2+1;
			sessionStorage.setItem('type', type);
			clickid = "info"+type;
		}
		location.hash = ((clickid.substr(0, 4) == 'main')?('#!'):((location.hash == '#!'+clickid)?('#!'+clickid):('#!'+clickid)));
	}
}
function OnEnter(e){
	if (e.which == 13){
		$('#login').click();
	}
}
function replacehtml(text){
	let type = sessionStorage.getItem('type');
	if ($('#clientbox').length != 0 && $(text).filter('#clientbox').length){
		$('#clientbox').html($(text).filter('#clientbox').html());
		$('.selected').removeClass('selected');
		$('[id^='+((clickid.substr(0, 5) == 'memgp')?('groupmem'):(clickid.substr(0, clickid.length-2)))+']').addClass('selected');
		$('#infoeditimg').attr('src', 'images/btn_sw_edit.png');
		if (clickid.indexOf('memgp') != -1){
			let id = $('[id^=groupmem]').attr('id');
			id = id.substr(id.length-4, 2) + clickid.substr(clickid.length-2, 2);
			$('[id^=groupmem]').attr('id', 'groupmem'+id);
			$('[id^=grouptime]').attr('id', 'grouptime'+id);
			$('[id^=servicetime]').attr('id', 'servicetime'+id);
			$('[id^=groupmc]').attr('id', 'groupmc'+id);
		}
		$('[id^=servicetime]').css('visibility', (clickid.substr(clickid.length-2, 2) == '00')?('hidden'):('visible'));
		$('[id^=groupmc]').css('visibility', (clickid.substr(clickid.length-2, 2) == '00')?('hidden'):('visible'));			
	}
	else{
		$('#whiteframe').html(text);
		if (text.indexOf('groupmem') != -1){
			let id = clickid.substr(clickid.length-4, 4);
			$('#groupmem').attr('id', 'groupmem'+id);
			$('#servicetime').attr('id', 'servicetime'+id);
			$('#grouptime').attr('id', 'grouptime'+id);
			$('#groupmc').attr('id', 'groupmc'+id);
			$('[id^=servicetime]').css('visibility', (clickid.substr(clickid.length-2, 2) == '00')?('hidden'):('visible'));
			$('[id^=groupmc]').css('visibility', (clickid.substr(clickid.length-2, 2) == '00')?('hidden'):('visible'));			
		}
	}
	if (clickid.indexOf('groupmem') != -1){
		$('[id^=memgp]').each(function(){
			let id = $(this).attr('id');
			$(this).attr('id', 'memgp' + clickid.substr(clickid.length-4, 2) + id.substr(id.length-2, 2));
		});
	}
	direction();
	$('#login').unbind('click');
	$('#logout').unbind('click');
	$('#carer').unbind('click');
	$('#howlogin').unbind('click');
	$('#howgroup').unbind('click');
	$('.mcitem').unbind('click');	
	$('[id$=editimg]').unbind('click');	
	$('#mctotaleditimg').unbind('click');
	$('#groupsongimg').unbind('click');
	$('span.item6').unbind('click');
	$('#zoomlink').unbind('click');
	$('.atttick').unbind('click');
	$('.timetitle .fa').unbind('click');
	$('.learnvideo').unbind('click');
	$('.selectbox:not("#groupname4")').unbind('click');
	$('[id^=memgp]').unbind('click');
	$('[id^=groupmem]').unbind('click');
	for (let loop=1; loop<=4; loop++){
		$('#buttonbox'+loop+' > img').each(function(){
			$(this).unbind('click');
			$(this).click(OnClick);
		})
	}
	$('#login').click(OnClick);
	$('#logout').click(OnClick);
	$('#carer').click(OnClick);
	$('#howlogin').click(OnClick);
	$('#howgroup').click(OnClick);
	$('.bdcolor1 +#mc .mcitem').click(OnClick);	
	$('[id$=editimg]').click(OnClick);
//	$('#groupsongimg').click(OnClick);
	$('span.item6').click(OnClick);
	$('#zoomlink').click(OnClick);
	$('.atttick').click(OnClick);
	$('.timetitle .fa').click(OnClick);
	$('.learnvideo').click(OnClick);
	$('.selectbox:not("#groupname4")').click(OnClick);
	$('[id^=memgp]').click(OnClick);
	$('[id^=groupmem]').click(OnClick);
	$('#id').on('keypress', OnEnter);
	$('#password').on('keypress', OnEnter);
	$('html,body').animate({scrollTop:0}, 'slow');
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
function resetvh(){
	let vh = Math.min(window.innerHeight, document.documentElement.clientHeight) * 0.01;
	document.documentElement.style.setProperty('--vh', `${vh}px`);
}
$(document).ready(function(){
	resetvh();
	LoadHash();
})
$(window).resize('resize', function(){
	clearTimeout(windowresize);
	windowresize = setTimeout(function (){
		resetvh();
		clearTimeout(windowresize);
	}, 500);
	resetvh();
})
$(window).on('orientationchange', function(){
	direction();
	$(window).resize();
})
