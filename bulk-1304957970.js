$(
	function () {
		(function ($R) {
	
	
/* secondary-init stuff */
/* ==================== */

	//	debug
	if ($R.debug); else { $R.debug = false; }

	//	ios
	$R.iOS = ($R.win.navigator.userAgent.match(/like Mac OS X/i) != null);
	
	
/* debug stuff */
/* =========== */
	
	if ($R.debug)
	{
		//	vars
		//	====

			$R.debugOutputsFixed = {
				'GetTarget': 			0,
				'ProcessHTML': 			0,
				'GetContent':			0,
				'PreviousSiblings':		0,
				'TitleSource':			''
			};
			$R.debugOutputs = [];
			$R.debugTimers = [];
	
	
		//	log
		//	===
	
			$R.initializeWriteLogFunction = function ()
			{
				switch (true)
				{
					case (!(!($R.win.console && $R.win.console.log))):
						$R.writeLog = function (msg) { $R.win.console.log(msg); };
						break;
						
					case (!(!($R.win.opera && $R.win.opera.postError))):
						$R.writeLog = function (msg) { $R.win.opera.postError(msg); };
						break;
						
					default:
						$R.writeLog = function (msg) {};
						break;
				}
			};
			$R.initializeWriteLogFunction();
		
			$R.log = function () {
				for (var i=0, il=arguments.length; i<il ; i++) {
					$R.writeLog(arguments[i]);
				}
			};

			
		//	timers
		//	======
			
			$R.debugTimerStart = function (timerName) {
				$R.debugTimers.push({
					'name': timerName,
					'start': (new Date()).getTime()
				});
			};
			
			$R.debugTimerEnd = function () {
				var 
					_t = $R.debugTimers.pop(),
					_time = ((new Date()).getTime() - _t.start)
				;
				
				$R.log('TIMER / '+_t.name+': ' + _time);
				return _time;
			};
			
		
		//	output
		//	======
		
			//	will be shown in Show function
		
			$R.debugOutput = function () {
				for (var i=0, il=arguments.length; i<il ; i++) {
					$R.debugOutputs.push(arguments[i]);
				}
			};
			
			$R.printDebugOutput = function ()
			{
				if ($R.debug && !$R.custom); else { return; }

				//	vars
				_$debugFixed = $('#debugOutputFixed');
				_$debugVariable = $('#debugOutputVariable');
				
				//	fixed
				_$debugFixed.html('');
				for (var _k in $R.debugOutputsFixed) { _$debugFixed.append('<p>'+_k+': <strong>'+$R.debugOutputsFixed[_k]+'</strong></p>'); }
					
				//	variable
				_$debugVariable.html('');
				for (var i=0, _i=$R.debugOutputs.length; i<_i; i++) { _$debugVariable.append('<p>'+$R.debugOutputs[i]+'</p>'); }
				
				//	end. clear.
				$R.debugOutputs = [];
				$R.debugOutputsFixed = {};
			};
	}
	else
	{
		//	makes it faster
		//	when not debugging

		$R.writeLog 		= function () { return false; };
		$R.log 				= function () { return false; };
		
		$R.debugTimerStart 	= function () { return false; };
		$R.debugTimerEnd 	= function () { return false; };
		
		$R.debugOutput 		= function () { return false; };
		$R.printDebugOutput = function () { return false; };
	}
	
	
/* more css, outside frame */
/* ======================= */
	
	var 
		_document = $R.win.document,
		_html = _document.getElementsByTagName('html')[0],
		_html_identifier = (_html.id && _html.id > '' && _html.id.match(/^[a-z]/i) != null ? '#'+_html.id : 'html'),
		_body = _document.getElementsByTagName('body')[0],
		_body_identifier = (_body.id && _body.id > '' && _body.id.match(/^[a-z]/i) != null ? '#'+_body.id : 'body'),
		_coverElement = document.createElement('div'),
		_cssElement = _document.createElement('style'),
		_cssText = ''
		+	_html_identifier + '.readableVisible, '
		+	'html > ' + _body_identifier + '.readableVisible, '
		+	_body_identifier + '.readableVisible '
		+	'{ '
		+		'margin: 0 !important; padding: 0 !important; border: 0 !important; '
		+		'overflow: hidden !important; overflow-x: hidden !important; overflow-y: hidden !important; '
		+		'position: static !important; '
		+	'} '
		
		+	_html_identifier + '.readableBeforeVisible, '
		+	'html > ' + _body_identifier + '.readableBeforeVisible, '
		+	_body_identifier + '.readableBeforeVisible '
		+	'{ '
		+		'position: static !important; '
		+	'} '
		
		+	_html_identifier + '.readableVisible object, '
		+	_html_identifier + '.readableVisible embed, '
		+	_html_identifier + '.readableVisible iframe, '
		+	'html > ' + _body_identifier + '.readableVisible object, '
		+	'html > ' + _body_identifier + '.readableVisible embed, '
		+	'html > ' + _body_identifier + '.readableVisible iframe, '
		+	_body_identifier + '.readableVisible object, '
		+	_body_identifier + '.readableVisible embed, '
		+	_body_identifier + '.readableVisible iframe '
		+ 	'{ '
		+		'display: none !important; '
		+	'} '
		
		+	_html_identifier + '.readableVisible #readable_app_iframe, '
		+	'html > ' + _body_identifier + '.readableVisible #readable_app_iframe, '
		+	_body_identifier + '.readableVisible #readable_app_iframe, '
		+	'#readable_app_iframe '
		+ 	'{ '
		+		'display: block !important; '
		+		'overflow: auto !important; '
		+	'} '
	;

	/* css */
	_cssElement.setAttribute('id', 'readableCSS2');
	_cssElement.setAttribute('type', 'text/css');
	if (_cssElement.styleSheet) {_cssElement.styleSheet.cssText = _cssText; }
		else { _cssElement.appendChild(_document.createTextNode(_cssText)); }
	_body.appendChild(_cssElement);

	/* cover */
	_coverElement.setAttribute('id', 'readable_app_cover');
	_coverElement.setAttribute('style', 'display: none');
	_body.appendChild(_coverElement);

	
/* cache vars */
/* ========== */

	$R.$iframeDocument = $(document);
	$R.$document = $(_document);
	$R.$iframe = $R.$document.find('#readable_app_iframe');
	$R.$cover = $R.$document.find('#readable_app_cover');
	$R.visible = false;
	
	
/* check for rtl */
/* ============= */

	$R.rtl = false;
	if ($R.$document.find("div[dir='rtl'], table[dir='rtl'], td[dir='rtl']").length > 0)
		{ $('html').addClass('couldBeRTL'); }
	
	$R.makeRTL = function ()
	{
		$R.rtl = true;
		$('html')
			.attr('dir', 'rtl')
			.addClass('couldBeRTL')
			.addClass('rtl');
	};
	
	$R.makeNotRTL = function ()
	{
		$R.rtl = false;
		$('html')
			.attr('dir', '')
			.removeClass('rtl');
	};
	
	$R.$document.find('html, body').each(function (_i, _e)
	{
		switch (true) {
			case ($(_e).attr('dir') == 'rtl'):
			case ($(_e).css('direction') == 'rtl'):

			case ($(_e).attr('lang') == 'he'):
			case ($(_e).attr('lang') == 'he-il'):
			case ($(_e).attr('lang') == 'ar'):
			case ($(_e).attr('lang') == 'ur'):

				$R.makeRTL();
				return false;
		}
	});

			
/* more html, inside frame */
/* ======================= */
	
	$('#bodyContent').html(''
		+	'<div id="box">'
		+		'<div id="box_inner">'
		
		+			(($R.debug && !($R.custom)) ? 
					'<div id="debugOutputFixed"></div><div id="debugOutputVariable"></div>' : '')
		
		+			'<div id="embedded_logo">'
		+				($R.embedded && $R.embeddedOptions['logo'] > '' ?
						'<img src="'+$R.embeddedOptions['logo']+'" alt=""/>' :
						'<a href="#">'+$R.win.location.host+'</a>')
		+			'</div>'
		+			'<div id="rtl_box"><strong>Right to left?</strong><a href="#" id="rtl_box_on">Yes.</a><a id="rtl_box_off" href="#">No.</a></div>'
		+			'<div id="text"></div>'
		+			'<div id="menu">'
		+				'<a id="menu_close" href="#" title="You can also double-click the background, or single-click the left edge of the screen.">Close</a>'
		+				'<a id="menu_print" href="#" title="Only prints the text in Readable\'s overlay.">Print</a>'
		+				'<a id="menu_settings" target="_blank" title="Takes you to Readable\'s setup page, where you can alter your current style.">Change Style</a>'
		+				'<a id="menu_problem" target="_blank" title="Encountered a problem? Tell me about it.">Report Bug</a>'
		+			'</div>'
		
		+			($R.embedded ? '' : 
					'<div id="my_news">If you <strong>love</strong> Readable, spread the word &mdash; it\'s the only thing I\'ll ever ask in return.</div>')

		+			'<div id="embedded_powered_by">Powered by <a target="_blank" href="http://readable.tastefulwords.com/?get"><strong>Readable</strong></a>.<br/>'+'Get <a target="_blank" href="http://readable.tastefulwords.com/?get">this view</a> on any website.</div>'
		+		'</div>'
		+	'</div>'
		+	'<div id="background"></div>'
		+	'<a id="fitts" href="#" title="Click to close Readable."></a>'
		+	'<div id="floating">'
		+		'<a href="#" id="floating_scroll_back" title="Just Clicked on an internal link? Scroll back to where you were."><strong>&larr;</strong> scroll back</a>'
		+		'<a href="#" id="floating_close" title="You can also double-click the background, single-click the left edge of the screen, or use the Close menu item.">close</a>'
		+		'<a href="#" id="floating_menu" title="Go to Readable\'s Menu, at the bottom of the overlay.">&darr;</a>'
		+	'</div>'
	);
	
	//	text var; it has now been created
	$R.$iframeText = $('#text');
	
	
/* setup ux */
/* ======== */

	$('#fitts').click(function(){ $R.hide(); return false; });
	$('#background').dblclick(function(){ $R.hide(); return false; });
	$('#embedded_logo').find('a, img').click(function(){ $R.hide(); return false; });

	$('#floating_menu').click(function(){ $(window).scrollTop($R.$iframeText.height()); return false; });
	$('#floating_close').click(function(){ $R.hide(); return false; });
	$('#floating_scroll_back').click(function(){ $(window).scrollTop($R.scrollPosition); $R.scrollPosition=0; $('#bottom_scroll_back').hide(); return false; });
	
	$('#menu_close').click(function(){ $R.hide(); return false; });
	$('#menu_print').click(function(){ window.print(); return false; });
	$('#menu_problem').attr('href', $R.linksPath+'problem/');
	
	$('#rtl_box_on').click(function(){ $R.makeRTL(); return false; });
	$('#rtl_box_off').click(function(){ $R.makeNotRTL(); return false; });
	
	//	scroll-back
	$R.scrollPosition = 0;
	$R.goToNamedAnchor = function (_anchor)
	{
		var _$e = $("[id='"+_anchor+"'], [name='"+_anchor+"']");
		if (_$e.length > 0); else { return; }
		
		$R.scrollPosition = $(window).scrollTop();
		$('#bottom_scroll_back').show();
		
		$(window).scrollTop(_$e.offset().top);
	};

	
/* options */
/* ======= */

	
	$R.setOptions = function ()
	{
		var 
			_resetOptions = false, 
			_resetBase = false,
			_applyOptions = {}
		;

		//	if null, set default
		if ($R.options); else {	$R.options = $R._defaultOptions; }
		
		//	create applyOptions
		for (var _option in $R._defaultOptions)
		{
			switch (true)
			{
				case (!(_option in $R.options)):
				case ($R.options[_option].match(/[<>]/gi)):
					_applyOptions[_option] = $R._defaultOptions[_option];
					break;
					
				default:
					_applyOptions[_option] = $R.options[_option].replace(/quote\(([^\)]*?)\)/gi, '"$1"');
					break;
			}
		}
			
		if ($R.currentOptions)
		{
			_resetOptions = false;
			for (var _option in _applyOptions) {
				if (_applyOptions[_option] != $R.currentOptions[_option]) {
					_resetOptions = true; break;
				}
			}
			
			_resetBase = (_applyOptions['base'] != $R.currentOptions['base']);
		}
		else
		{
			_resetOptions = true;
			_resetBase = true;
		}
		
		if (_resetBase)
		{
			//	remove
			$('#baseCSS').remove();
			
			//	append
			$('head').append('<link id="baseCSS" rel="stylesheet" href="'+$R.path+'base-'+_applyOptions['base']+'-'+$R.compileTime+'.css'+'" type="text/css" />');
		}
		
		if (_resetOptions)
		{
			//	remove
			$('#optionsCSS').remove();
			
			//	google fonts
			var 
				_check_google_font = function (_match, _font)
				{
					if (_font in $R.googleFontsIndex); else { return; }
					
					var _font_key = _font.replace(/\s/gi, '+');
					$('head').append('<link href="http://fonts.googleapis.com/css?family='+_font_key+'" rel="stylesheet" type="text/css" />');
				},
				_double_check_font = function (fontVariable)
				{
					_applyOptions[fontVariable].replace(/"([^",]+)"/gi, _check_google_font);
					_applyOptions[fontVariable].replace(/([^",\s]+)/gi, _check_google_font);				
				}
			;

			//	check fonts
			_double_check_font('text_font');
			_double_check_font('text_font_header');
			_double_check_font('text_font_monospace');
			
			_applyOptions['custom_css'].replace(/font-family: "([^",]+)"/gi, _check_google_font);
			_applyOptions['custom_css'].replace(/font-family: ([^",\s]+)/gi, _check_google_font);
			
			//	custom css
			//	use options in the custom_css
			_applyOptions['custom_css'] = _applyOptions['custom_css'].replace(/\[=custom_css\]/gi, '');
			_applyOptions['custom_css'] = _applyOptions['custom_css'].replace(
				/\[=([a-z_]+?)\]/gi,
				function (_match, _key) { return _applyOptions[_key]; }
			);
			
			//	create css
			var _cssText = (''
				+	'#body { '
				+		'font-family: [=text_font]; '
				+		'font-size: [=text_size]; '
				+		'line-height: [=text_line_height]; '
				+		'color: [=color_text]; '
				+		'text-align: '+(_applyOptions['text_align'] == 'justified' ? 'justify' : 'left')+'; '
				+	'} '
				
				+	'#background { background-color: [=color_background]; } '
				+	'#box { width: [=box_width]; background-color: [=color_background]; } '
				
				+	'a { color: [=color_links]; } '
				+	'a:visited { color: [=color_text]; } '

				+	'img { border-color: [=color_text]; } '
				+	'a img { border-color: [=color_links]; } '
				+	'a:visited img { border-color: [=color_text]; } '

				+	'h1 a, h2 a, a h1, a h2 { color: [=color_text]; } '
				+	'h1, h2, h3, h4, h5, h6 { '
				+		(_applyOptions['text_font_header'] == '' ? '' : 
						'font-family: [=text_font_header]; ')
				+	'} '

				+	'pre { background-color: [=color_background]; } '
				+	'pre, code { font-family: [=text_font_monospace]; } '
				+	'hr { border-color: [=color_text]; } '

				
				+	'#floating a { background-color: [=color_text]; color: [=color_background]; } '
				+	'#floating #floating_menu { background-color: transparent; color: [=color_text]; } '
				+	'#fitts:hover { background-color: [=color_text]; } '

				+	'#menu, #rtl_box { background-color: [=color_text]; color: [=color_background]; } '
				+	'#menu a, #rtl_box a { color: [=color_background]; border-color: [=color_background]; } '

				
				+	'[=custom_css] '
				
				+	'html.rtl #body { text-align: ' + (_applyOptions['text_align'] == 'justified' ? 'justify' : 'right')+' !important; } '
				+	'h1, h2, h3, h4, h5, h6 { text-align: left; } '
				+	'html.rtl h1, html.rtl h2, html.rtl h3, html.rtl h4, html.rtl h5, html.rtl h6 { text-align: right !important; } '
				
			).replace(
				/\[=([a-z_]+?)\]/gi,
				function (_match, _key) { return _applyOptions[_key]; }
			);
		
			//	append
			var _cssElement = document.createElement('style');
				_cssElement.setAttribute('type', 'text/css');
				_cssElement.setAttribute('id', 'optionsCSS');
				
			if (_cssElement.styleSheet) { _cssElement.styleSheet.cssText = _cssText; }
				else { _cssElement.appendChild(document.createTextNode(_cssText)); }
		
			$('head').append(_cssElement);
			
			//	cover background-color
			$R.$cover.css('background-color', _applyOptions['color_background']);
		}
		
		//	current options, not modified
		$R.currentOptions = $R.options;

		//	change settings
		var changeSettingsURL = ''
			+	$R.linksPath + '?'
			+	'setup'
			+	'&change'
		;
	
		for (var __opt in $R.currentOptions) {
			changeSettingsURL += 
				'&' + __opt + '=' + encodeURIComponent($R.currentOptions[__opt]);
		}
	
		$('#menu_settings').attr('href', changeSettingsURL);
	};

	$R.setRTL = function ()
	{
		//	append
		var _cssElement = document.createElement('style');
			_cssElement.setAttribute('type', 'text/css');
			_cssElement.setAttribute('id', 'rtlCSS');
			
		if (_cssElement.styleSheet) { _cssElement.styleSheet.cssText = _cssText; }
			else { _cssElement.appendChild(document.createTextNode(_cssText)); }
	
		$('head').append(_cssElement);
	};
	
	
	$R._defaultOptions = {
		'text_font': 			'"Palatino Linotype", Palatino, "Book Antigua", Georgia, serif',
		'text_font_monospace':	'"Courier New", Courier, monospace',
		'text_font_header':		'',

		'text_size': 			'18px',
		'text_line_height': 	'1.5',
		'box_width': 			'30em',

		'color_background': 	'#F5F5F5',
		'color_text': 			'#000000',
		'color_links': 			'#0000FF',
		
		'text_align': 			'normal',
		'base': 				'blueprint',
		'custom_css':			''
	};

	
	$R.googleFontsIndex = {};
	$R.googleFontsArray =
	[
		'Arvo',
		'Bentham',
		'Cardo',
		'Copse',
		'Corben',
		'Crimson Text',
		'Droid Serif',
		'Goudy Bookletter 1911',
		'Gruppo',
		'IM Fell',
		'Josefin Slab',
		'Kreon',
		'Meddon',
		'Merriweather',
		'Neuton',
		'OFL Sorts Mill Goudy TT',
		'Old Standard TT',
		'Philosopher',
		'PT Serif',
		'Radley',
		'Tinos',
		'Vollkorn',
		
		'Allerta',
		'Anton',
		'Arimo',
		'Bevan',
		'Buda',
		'Cabin',
		'Cantarell',
		'Coda',
		'Cuprum',
		'Droid Sans',
		'Geo',
		'Josefin Sans',
		'Lato',
		'Lekton',
		'Molengo',
		'Nobile',
		'Orbitron',
		'PT Sans',
		'Puritan',
		'Raleway',
		'Syncopate',
		'Ubuntu',
		'Yanone Kaffeesatz',
		
		'Anonymous Pro',
		'Cousine',
		'Droid Sans Mono',
		'Inconsolata'	
	];

	for (var i=0, ii=$R.googleFontsArray.length; i<ii; i++) {
		$R.googleFontsIndex[$R.googleFontsArray[i]] = 1;
	}
	

/* content */
/* ======= */

	$R.getContent = function (checkIfHomePage)
	{
		//	homepage?
		if ((checkIfHomePage == undefined) || (checkIfHomePage == true))
		{
			if ($R.win.location.href == ($R.win.location.protocol + '//' + $R.win.location.host + '/'))
			{
				//	write directly into Text
				$R.displayHTML(''
					+	'<h1>Homepage</h1>'
					+	'<p>Readable doesn\'t do well with homepages. It\'s only designed to work on <strong>article pages</strong>.</p>'
					+	'<p>An <strong>article page</strong> is any page that contains one large block of text &mdash; like, for example, all newspaper articles.</p>'
					+	'<br/>'
					+	'<p><a href="#" onclick="window.parent.$readable.getContent(false); return false;">Process the page anyway?</a></p>'
					+	'<br/><br/>'
				);
				return;
			}
		}
		
		//	selection or whole
		switch (true)
		{
			case ($R.getContent__manualSelection()): return;
			case ($R.getContent__findHere()): return;
		}
		
		//	no content found; display body element
		//	======================================

			if ($R.debug) { $R.log('Found nothing. Displaying body element.'); }
			if ($R.debug) { $R.debugOutput('Displaying BODY.'); }

			//	measure and display
			if ($R.debug) { $R.debugTimerStart('get/processTargetHTML'); }

				$R.debugOutputsFixed['TitleSource'] = 'Body';
				var _html = $R.processHTML__getHTMLToProcess([$R.$document.find('body').get(0)]);
					_html = $R.processHTML(_html);
					_html = $R.getContent__findHere__findTitleInHTML(_html, 'second-try');
					_html = ((_html.substr(0, 14) == '<found_title/>') ? _html.substr(14) : _html);
				$R.displayHTML(_html);

			if ($R.debug) { $R.debugOutputsFixed['ProcessHTML'] = $R.debugTimerEnd(); }
	};
	
	
	$R.getContent__manualSelection = function ()
	{
		var 
			_selection = $R.sel.getSelection($R.win),
			_range = $R.sel.getRange(_selection),
			_html = $R.sel.getRangeHTML(_range),
			_text = $R.sel.getRangeText(_range)
		;
		
		if (_html > '' && _text > ''); else
		{
			_html = null;
			_text = null;
			
			$R.$document.find('frame, iframe').each(function (_i, _e)
			{
				if (_e.getAttribute('id') == 'readable_app_iframe') { return; }
				
				try
				{
					var
						__doc = $(_e).contents().get(0),
						__win = $R.sel.getWindowFromDocument(__doc),
						__selection = $R.sel.getSelection(__win),
						__range = $R.sel.getRange(__selection),
						__html = $R.sel.getRangeHTML(__range),
						__text = $R.sel.getRangeText(__range)
					;
						
					if (__html > '' && __text > '')
					{
						_html = __html;
						_text = __text;
						
						// stop the each
						return false;
					}
				}
				catch(e) { }
			});
		}
		
		//	haven't found anything		
		if (_html > '' && _text > ''); else { return false; }

		//	probably selected something by mistake
		if ($R.getContent__nrWords(_text) > 50); else { return false; }
		
		//	got some selected text; show it
		$R.displayHTML($R.processHTML(_html));

		//	return true
		return true;
	};
	
/* functions */	
/* ========= */
	
	$R.sel = {};

	$R.sel.getWindowFromDocument = function (theDocument)
	{
		if (theDocument); else { return null; }
		
		if ('defaultView' in theDocument) {
			arguments.calee = function (theDocument) {
				if (theDocument); else { return null; }
				return theDocument.defaultView;
			};
		}
		else if ('parentWindow' in theDocument) {
			arguments.calee = function (theDocument) {
				if (theDocument); else { return null; }
				return theDocument.parentWindow;
			};
		}
		else {
			arguments.calee = function (theDocument) {
				return null;
			};
		}
		
		return arguments.calee(theDocument);
	};


	$R.sel.getSelection = function (theWindow)
	{
		if (theWindow); else { return null; }
	
		if ('getSelection' in theWindow) {
			arguments.calee = function (theWindow) {
				if (theWindow); else { return null; }
				return theWindow.getSelection();
			};
		}
		else if ('selection' in theWindow.document) {
			arguments.calee = function (theWindow) {
				if (theWindow); else { return null; }
				return theWindow.document.selection;
			};
		}
		else {
			arguments.calee = function (theWindow) {
				return null;
			};
		}
		
		return arguments.calee(theWindow);
	};


	$R.sel.getRange = function (selection)
	{
		if (selection); else { return null; }
	
		if ('getRangeAt' in selection) {
			arguments.calee = function (selection) {
				if (selection); else { return null; }
				if (selection.rangeCount > 0) { return selection.getRangeAt(0); }
				else { return null; }
				//	doesn't work in old versions of safari 
				//	... I don't care
			};
		}
		else if ('createRange' in selection) {
			arguments.calee = function (selection) {
				if (selection); else { return null; }
				return selection.createRange();
			};
		}
		else {
			arguments.calee = function (selection) {
				return null;
			};
		}
		
		return arguments.calee(selection);
	};


	$R.sel.getRangeHTML = function (range)
	{
		if (range); else { return null; }
		
		if ('htmlText' in range) {
			arguments.calee = function (range) {
				if (range); else { return null; }
				return range.htmlText;
			};
		}
		else if ('surroundContents' in range) {
			arguments.calee = function (range) {
				if (range); else { return null; }
				var dummy = range.commonAncestorContainer.ownerDocument.createElement("div");
				dummy.appendChild(range.cloneContents());
				return dummy.innerHTML;
			};
		}
		else {
			arguments.calee = function (range) {
				return null;
			};
		}
		
		return arguments.calee(range);
	};


	$R.sel.getRangeText = function (range)
	{
		if (range); else { return null; }
		
		if ('text' in range) {
			arguments.calee = function (range) {
				if (range); else { return null; }
				return range.text;
			};
		}
		else if ('surroundContents' in range) {
			arguments.calee = function (range) {
				if (range); else { return null; }
				var dummy = range.commonAncestorContainer.ownerDocument.createElement("div");
				dummy.appendChild(range.cloneContents());
				return dummy.textContent;
			};
		}
		else {
			arguments.calee = function (range) {
				return null;
			};
		}
		
		return arguments.calee(range);
	};

	
	$R.getContent__findHere = function ()
	{
		//	clear what we did before -- everything
		//	======================================

			var 
				_readable_attrs =
				[
					'readable_attr_mark_keep',
					'readable_attr_mark_delete',
					'readable_attr_only_content',
					
					'readable_attr_big_image'
				],
				_readable_classes = 
				[
					'readable_class_is_hidden',

					'readable_class_is_paragraph',
					'readable_class_big_image'
				]
			;
			
			$.each(_readable_attrs,	function (_i, _attr) { $R.$document.find('['+_attr+']').removeAttr(''+_attr); });
			$.each(_readable_classes, function (_i, _class) { $R.$document.find('.'+_class).removeClass(''+_class); });
	
	
		//	get target
		//	==========

			if ($R.debug) { $R.debugTimerStart('getTargetElement'); }
			var
				_html = '',
				
                _custom_target = ($R.custom && ($R.customOptions['selector'] > '') ? $R.$document.find($R.customOptions['selector']) : false),
				_custom_target = (_custom_target.length && (_custom_target.length > 0) ? _custom_target.get(0) : false),
				
				_target = (_custom_target ? _custom_target : $R.getContent__findHere__getTargetElement()),
				_$target = $(_target),
				
				_prevs = [],
				_prev = false,
				_prev_test = function (_x)
				{
					if (_x.nodeType); else { return false; }
					if (_x.nodeType == 1); else { return false; }
					
					switch (true)
					{
						//	is a heading
						case (_x.tagName.match(/^h(1|2|3|4|5|6)$/gi) != null):
						
						//	is paragraph, blockquote
						case (_x.tagName.match(/^p|blockquote$/gi) != null):
						case ($(_x).hasClass('readable_class_is_paragraph')):
						
						//	contains h1
						case (_x.getElementsByTagName('h1').length > 0):
						case (_x.tagName.match(/^header$/i) != null):
						
						//	is/was candidate
						case ($.data(_x, 'readable_candidate_key') > ''):
							return true;
					}

					//	just text
					var _text_computation = $R.getContent__computeTextForElement(_x);
					if (_text_computation._theoretical_paragraphs_3_lines > 2 && _text_computation._links_to_text_ratio < 0.10) { return true; }

					//	nope
					return false;
				}
			;
			if ($R.debug) { $R.debugOutputsFixed['GetTarget'] = $R.debugTimerEnd(); }

			//	if not target, return
			if (_target); else { return false; }

		
		//	mark target
		//	and RTL
		//	=======
		
			//	mark
			_$target.attr('readable_the_target', '1');
		
			//	RTL
			switch (true)
			{
				case (_$target.attr('dir') == 'rtl'):
				case (_$target.css('direction') == 'rtl'):
					$R.makeRTL();
					break;
			}

			
		//	_html
		//	and document title/h1?
		//	======================
		
			if ($R.debug) { $R.debugTimerStart('get/processTargetHTML'); }

				_html = $R.processHTML($R.processHTML__getHTMLToProcess([_target]))
				_html = $R.getContent__findHere__findTitleInHTML(_html, 'first-try');
			
			if ($R.debug) { $R.debugOutputsFixed['ProcessHTML'] = $R.debugTimerEnd(); }

			
		//	if title not found, check previous siblings
		//	if title was found, _html will be prefixed
		//	==========================================
		
			if (_html.substr(0, 14) == '<found_title/>')
			{
				//	title log
				if ($R.debug) { $R.log('Found title in Target.'); }
				if ($R.debug) { $R.debugOutputsFixed['TitleSource'] = 'Target'; }
			}
			else
			{
				//	check previous siblings
				//	=======================
				
					_prev = _target;
					
					while (true)
					{
						//	get
						_prev = _prev.previousSibling;
						if (_prev); else { break; }

						//	test
						if (_prev_test(_prev)); else { continue; }

						//	put
						_prevs.unshift(_prev);
						
						if ($R.debug) { $R.log('Found previous-sibling:', _prev); }
						
						//	break on title
						if ((_prev.tagName.toLowerCase() == 'h1') || (_prev.getElementsByTagName('h1').length > 0)) { break; }
					}
					
					if ($R.debug) { $R.debugOutputsFixed['PreviousSiblings'] = _prevs.length; }
					if ($R.debug) { $R.log('Found '+_prevs.length+' previous siblings.'); }

					//	add _prevs html
					_html = $R.processHTML($R.processHTML__getHTMLToProcess(_prevs)) + _html;
					
					//	check for title again
					_html = $R.getContent__findHere__findTitleInHTML(_html, 'second-try');
				
				//	if not found title, get title from document.title
				//	if title was found, _html will be prefixed
				//	==========================================
				
					if (_html.substr(0, 14) == '<found_title/>')
					{
						//	title log
						if ($R.debug) { $R.log('Found title in Previous Siblings.'); }
						if ($R.debug) { $R.debugOutputsFixed['TitleSource'] = (_prevs.length > 0 ? 'PreviousSecond' : 'Second'); }
					}
					else
					{
						_html = $R.getContent__findHere__addDocumentTitleToHTML(_html);
							
						if (_html.substr(0, 14) == '<found_title/>')
						{
							//	title log
							if ($R.debug) { $R.log('Used Document\'s title.'); }
							if ($R.debug) { $R.debugOutputsFixed['TitleSource'] = 'Document'; }
						}
					}
			}

			if (_html.substr(0, 14) == '<found_title/>')
			{
				//	skip
				_html = _html.substr(14);
			}
			else
			{
				//	no title log
				if ($R.debug) { $R.log('No title at all.'); }
				if ($R.debug) { $R.debugOutputsFixed['TitleSource'] = 'None'; }
			}
			
			
		//	show
		//	====
			
			$R.displayHTML(_html);
			return true;
	};
	
	
	$R.getContent__findHere__findTitleInHTML = function (_html, _rule_set)
	{
		//	rule sets are the possible header matches
		//	when we look for a title in the target html, we only look for h1 -- and maybe h2
		//	when we look for a title in the target html plus the previous children html we look for all tags
	
		var 
			_rule_sets =
			{
				'first-try': ['h1'],
				'second-try': ['h1', 'h2', 'h3', 'h4', 'h5']
			},
			_possibles = _rule_sets[_rule_set],
			_html_until = '',
			_tag_start = -1,
			_found = false
		;

		for (var i=0, _i=_possibles.length; i<_i; i++)
		{
			//	get start
			_tag_start = _html.indexOf('<'+_possibles[i]);
			
			//	valid start?
			if (_tag_start > -1); else { continue; }
			
			//	html until
			_html_until = _html.substr(0, _tag_start);
			_html_until = _html_until.replace(/<([^>]+)>/gi, '');
			_html_until = _html_until.replace(/\s+/gi, ' ');
			
			//	valid?
			if (_html_until.length < 125)
			{
				//	make it into a H1
				_html = _html.replace((new RegExp('<'+_possibles[i]+'[^>]*>([\\s\\S]+?)</'+_possibles[i]+'>', 'i')), '<h1 class="found_title">$1</h1>');
				
				//	break
				_found = true;
				break;
			}
		}

		//	return with prefix (if found)
		return ((_found ? '<found_title/>' : '') + _html);
	};
	
	
	$R.getContent__findHere__addDocumentTitleToHTML = function (_html)
	{
		//	does the document have a title?
		if ($R.$document.get(0).title && $R.$document.get(0).title > ''); else { return _html; }
	
		var
			_doc_title = $R.$document.get(0).title,
			_title_location = -1,
			_html_until_title = '',
			_doc_title_parts = [],
			_doc_title_pregs =
			[
				/( [-][-] |( [-] )|( [>][>] )|( [<][<] )|( [|] )|( [\/] ))/i,
				/(([:] ))/i
			]
		;
	
		//	loop through pregs
		for (var i =0, _i=_doc_title_pregs.length; i<_i; i++)
		{
			//	split
			_doc_title_parts = _doc_title.split(_doc_title_pregs[i]);
			
			//	break if we managed a split
			if (_doc_title_parts.length > 1) { break; }
		}
			
		//	sort title parts
		//	longer goes higher up -- i.e. towards 0
		_doc_title_parts.sort(function (a, b)
		{
			switch (true)
			{
				case (a.length > b.length): return -1;
				case (a.length < b.length): return 1;
				default: return 0;
			}
		});
		
		//	more than one word?
		_doc_title = (_doc_title_parts[0].split(/\s+/i).length > 1 ? _doc_title_parts[0] : _doc_title);
		
		//	return
		return ''
			+ '<found_title/>'
			+ '<h1 class="document_title">'+_doc_title+'</h1>'
			+ _html
		;
	};
	
	
	$R.getContent__findHere__getTargetElement = function ()
	{
		var
			_candidates_dictionary = {},
			_candidates_dictionary_initial_length = 0,
			_candidates_array = [],
			_candidates_array_length = 0
		;
		
		//	DIVs that are actually Ps
		//	=========================
	
			$R.$document.find('div').each(function (_i, _e)
			{
				if (_e.childNodes.length == 1); else { return; }
				if (_e.childNodes[0].nodeType == 3); else { return; }
				
				var _text_computation = $R.getContent__computeTextForElement(_e, false);
				if (_text_computation._theoretical_lines_of_65_characters > 2); else { return; }
				if (_text_computation._theoretical_paragraphs_50_words > 0.75); else { return; }
				
				if ($R.debug) { $R.log('DIV is paragraph:', _e); }
				$(_e).addClass('readable_class_is_paragraph');
			});
		
		
		//	all hidden elements
		//	===================
		
			var _$all_hidden = $R.$document.find('ul, ol, li, dd, table, tr, td, div, h1, h2, h3, h4, h5').filter(':hidden');
			_$all_hidden.each(function (_i, _hidden_child)
			{
				_contained = false;
				
				//	make sure a parent doesn't already contain it
				_$all_hidden.each(function (_i, _hidden_parent)
				{
					if ($.contains(_hidden_parent, _hidden_child))
					{
						_contained = true;
						return false;
					}
				});
				
				//	add to array
				if (_contained); else
				{
					//	delete and add class
					$(_hidden_child).attr('readable_attr_mark_delete', 1).addClass('readable_class_is_hidden');
					if ($R.debug) { $R.log('Hidden element:', _hidden_child); }
				}
			});
		
		
		//	text containing elements
		//	========================
		
			$R.$document.find('p, br+br, div.readable_class_is_paragraph, h2, h3, h4, h5, pre').each(function (_i, _e)
			{
				//	skip hidden elements
				if ($(_e).hasClass('readable_class_is_hidden')) { return; }
			
				//	get parent
				var _parent = $R.getContent__findHere__findPropperParent(_e);
				if (_parent); else { return; }

				//	skip hidden parent
				if ($(_parent).hasClass('readable_class_is_hidden')) { return; }
				
				//	get key
				var _dictionary_key = $.data(_parent, 'readable_candidate_key');
				
				//	add to dictionary
				if (_dictionary_key && _dictionary_key in _candidates_dictionary); else
				{
					//	set key
					_dictionary_key = 'k'+(_candidates_dictionary_initial_length++);
					$.data(_parent, 'readable_candidate_key', _dictionary_key);

					//	add to dictionary
					//	this is the item format
					_candidates_dictionary[_dictionary_key] =
					{
						'_element': 							_parent,
						'_paragraphs': 							0,
						'_computation': 						false,
						'_points': 								0,
						'_points_before_dom_order__3':			0,
						'_points_before_subs_addition__2':		0,
						'_points_before_link_ratio__1':			0
					};
				};
				
				//	increment paragraphs
				_candidates_dictionary[_dictionary_key]['_paragraphs'] += 1;
			});
		
			if ($R.debug)
			{
				//	print candidates
				$R.log('Candidates. Preliminary:');
				$.each(_candidates_dictionary, function (_k, _e) { $R.log(_e); });
			}
			
			
		//	calculate/set element points
		//	and remove some elemeents
		//	=========================

			$.each(_candidates_dictionary, function (_key, _item)
			{
				var
					_element = _item._element,
					_parent = null,
					_points_computation = $R.getContent__computePointsForElement(_element, _item._paragraphs),
					_delete = false
				;
				
				switch (true)
				{
					//	less than 50 words
					case (_points_computation._text_computation._theoretical_paragraphs_3_lines < 1):
						if ($R.debug) { $R.log('Remove candidate. Less than 50 words:', _element); }
						_delete = true;
						break;
					
					//	less than 100 words, and big link ratio
					case ((_points_computation._text_computation._theoretical_paragraphs_3_lines < 2) && (_points_computation._text_computation._links_to_text_ratio >= 0.25)):
						if ($R.debug) { $R.log('Remove candidate. Less than 100 words and link ratio:', _element); }
						_delete = true;
						break;
				}
				
				if (_delete)
				{
					//	delete from dictionary
					delete _candidates_dictionary[_key];
				}
				else
				{
					//	set computation/points
					_candidates_dictionary[_key]['_computation'] = _points_computation;
					_candidates_dictionary[_key]['_points'] = _points_computation._points;
					_candidates_dictionary[_key]['_points_before_link_ratio__1'] = _points_computation._points_before_link_ratio;
					_candidates_dictionary[_key]['_points_before_subs_addition__2'] = _points_computation._points;
				}
			});
		
		
		//	build _candidates_array
		//	=======================
		
			for (var i=0; i<_candidates_dictionary_initial_length; i++)	{
				if (('k'+i) in _candidates_dictionary) {
					_candidates_array.push(_candidates_dictionary['k'+i])
				}
			}
			_candidates_length = _candidates_array.length;
			

		//	do the dom-order
		//	================
		
			$R.log('Candidates before dom-order:', _candidates_length + ' candidates');
			$.each(_candidates_array, function (_i, _e) { $R.log(_e); });
		
			//	loop
			$.each(_candidates_array, function (_i, _item)
			{
				_candidates_array[_i]['_points_before_dom_order__3'] = _candidates_array[_i]._points;
				_candidates_array[_i]['_points'] *= (_candidates_length / (_i + 1));
			});
			
			
		//	do we actually have some elements?
		//	==================================
		
			switch (true)
			{
				case (_candidates_length == 0):
					if ($R.debug) { $R.log('No candidates found.'); }
					if ($R.debug) { $R.debugOutput('No candidates found.'); }
					return false;
					
				case (_candidates_length == 1):
					if ($R.debug) { $R.log('Only one candidate found:', _candidates_array[0]._element); }
					if ($R.debug) { $R.debugOutput('Only one candidate found.'); }
					return _candidates_array[0]._element;
			}
			

		//	subs addition
		//	=============
			
			for (var i=0; i<_candidates_length; i++)
			{
				for (var ii=0; ii<_candidates_length; ii++)
				{
					if ($.contains(_candidates_array[i]._element, _candidates_array[ii]._element))
					{
						//	debug
						if ($R.debug) { $R.log('Subs Addition (parent, child):', _candidates_array[i], _candidates_array[ii]); }
					
						//	add points
						_candidates_array[i]._points += 1
							* (0.66 * _candidates_array[ii]._points)
							* (1 - (2 * _candidates_array[i]._computation._text_computation._links_to_text_ratio))
							* (1 - (2 * _candidates_array[i]._computation._text_computation._links_words_nr_to_words_nr_ratio))
						;
					
						//	only one
						break;
					}
				}
			}

			
		//	sort candidates_copy
		//	bigger goes higher up -- i.e. towards 0
		//	=======================================
		
			_candidates_array.sort(function (a, b)
			{
				switch (true)
				{
					case (a._points > b._points): return -1;
					case (a._points < b._points): return 1;
					default: return 0;
				}
			});

			if ($R.debug)
			{
				//	print candidates
				$R.log('Candidates final:');
				$.each(_candidates_array, function (_i, _e) { $R.log(_e); });
			}
		
		
		//	common parent element
		//	if some of the first N elements have the same parent, maybe that parent is the correct candidate
		//	================================================================================================
		
			if (_candidates_length > 1)
			{
				var
					_first_element = _candidates_array[0]._element,
					_common_parent =  $R.getContent__findHere__findPropperParent(_first_element),
					_common_parent_nr = 0,
					_total_points = _candidates_array[0]._points
				;
				
				//	loop through the elements
				for (var i=1; i<_candidates_length; i++)
				{
					var 
						_element = _candidates_array[i]._element,
						_parent = $R.getContent__findHere__findPropperParent(_element)
					;
					
					switch (true)
					{
						case (_element == _common_parent):
							_common_parent_nr++;
							break;
							
						case (_parent == _common_parent):
							_common_parent_nr++;
							_total_points += _candidates_array[i]._points;
							break;
					}
				}
				//	enough elements with the common parent?
				if ((_common_parent_nr > Math.floor(_candidates_length/2)) || (_common_parent_nr > 4))
				{
					//	get points for this common element
					//	compensate for dom-order
					var 
						_common_parent_points = 1
							* $R.getContent__computePointsForElement(_common_parent, 'calculate')._points
							* _candidates_length
					;	
						
					//	does this element have more points thann all of its children?
					if (_common_parent_points > _total_points)
					{
						if ($R.debug) { $R.log('Candidates common parent:', _common_parent); }
						if ($R.debug) { $R.debugOutput('Found common parent of candidates.'); }
						return _common_parent;
					}
				}
			}
			
			
		//	finally return
		//	==============

			if ($R.debug) { $R.log('First candidate:', _candidates_array[0]._element); }
			return _candidates_array[0]._element;
	};
	
	
	/* compute functions */
	/* ================= */

	$R.getContent__computeTextForElement__getElementValidText = function (_element, _skip_candidates)
	{
		//	global (for recursive) vars
		var 
			_text = '',
			_links = '',
			_links_nr = 0,
			_candidates_nr = 0,
			_hidden_nr = 0,
			
			_current_element = null,
			_$current_element = null,
			_current_write_to = 'text',
			
			_skip_these = '|button|canvas|embed|frame|input|iframe|link|map|marquee|nobr|noframes|noscript|object|script|select|style|textarea|'
		;
		
		//	recursive function
		var _recursive = function (_children)
		{
			for (var i=0, _i=_children.length; i<_i; i++)
			{
				_current_element = _children[i];
				
				if (_current_element.nodeType === 3)
				{
					switch (_current_write_to)
					{
						case 'text':	_text 	+= ' ' + _current_element.nodeValue; break;
						case 'links': 	_links 	+= ' ' + _current_element.nodeValue; break;
					}
				}
				else if (_current_element.nodeType === 1)
				{
					//	skip stuff
					if (_skip_these.indexOf('|'+_current_element.tagName.toLowerCase()+'|') > -1) { continue; }
				
					if (_current_element.tagName.toLowerCase() == 'a')
					{
						//	a link
						_links_nr++;
						
						_current_write_to = 'links';
							_recursive(_current_element.childNodes);
						_current_write_to = 'text';
					}
					else
					{
						//	skip candidates
						if (_skip_candidates && $.data(_current_element, 'readable_candidate_key') > '') { _candidates_nr++; continue; }

						//	skip hidden
						if ($(_current_element).hasClass('readable_class_is_hidden')) { _hidden_nr++; continue; }
					
						//	call self
						_recursive(_current_element.childNodes);
					}
				}
			}
		};

		//	look for reasons not to do it
		switch (true)
		{
			case (!(_element.tagName > '')):
			case ((_skip_these.indexOf('|'+_element.tagName.toLowerCase()+'|') > -1)):
				break;
				
			default:
				//	run it -- if valid element
				_recursive(_element.childNodes);
				break;
		}
		
		//	return
		return {
			'_text': 			_text.replace(/\s+/gi, ' '),
			'_links': 			_links.replace(/\s+/gi, ' '),
			'_links_nr': 		_links_nr,
			'_candidates_nr': 	_candidates_nr
		};
	};
	
	$R.getContent__computeTextForElement = function(_element, _skip_candidates_in_text_computation)
	{
		var
			//	valid text
			_valid_text = 							$R.getContent__computeTextForElement__getElementValidText(_element, _skip_candidates_in_text_computation),
		
			//	text
			_text = 								_valid_text._text,
			_text_length = 							_text.length,
			_text_words_nr = 						$R.getContent__nrWords(_text),
			
			//	links
			_links = 								_valid_text._links,
			_links_nr = 							_valid_text._links_nr,
			_links_length = 						_links.length,
			_links_words_nr = 						$R.getContent__nrWords(_links),

			//	theoretical
			_theoretical_lines_of_65_characters = 	(_text_length / 65),
			_theoretical_paragraphs_3_lines = 		(_theoretical_lines_of_65_characters / 3),
			_theoretical_paragraphs_5_lines = 		(_theoretical_lines_of_65_characters / 5),
			_theoretical_paragraphs_50_words = 		(_text_words_nr / 50),
			_theoretical_paragraphs_80_words = 		(_text_words_nr / 80),

			//	links ratio
			_links_to_text_ratio = 					(_links_length > _text_length ? 1 : (_links_length / _text_length)),
			_links_words_nr_to_words_nr_ratio =		(_links_words_nr > _text_words_nr ? 1 : (_links_words_nr / _text_words_nr))
		;
		
		//$R.log('Valid text:', _element, _valid_text);
		
		return {
			'_text_length': 						_text_length,
			'_text_words_nr': 						_text_words_nr,

			'_links_length':						_links_length,
			'_links_words_nr':						_links_words_nr,
			'_links_nr':							_links_nr,
			
			'_theoretical_lines_of_65_characters':	_theoretical_lines_of_65_characters,
			'_theoretical_paragraphs_3_lines':		_theoretical_paragraphs_3_lines,
			'_theoretical_paragraphs_5_lines':		_theoretical_paragraphs_5_lines,
			'_theoretical_paragraphs_50_words':		_theoretical_paragraphs_50_words,
			'_theoretical_paragraphs_80_words':		_theoretical_paragraphs_80_words,
			
			'_links_to_text_ratio':					_links_to_text_ratio,
			'_links_words_nr_to_words_nr_ratio':	_links_words_nr_to_words_nr_ratio
		};
	};
	
	
	$R.getContent__computePointsForElement = function(_element, _paragraphsInElement)
	{
		if (_paragraphsInElement == 'calculate')
		{
			//	if we don't have it, get it now
			_paragraphsInElement = $(_element).find('p, br+br, pre, div.readable_class_is_paragraph, h2, h3, h4, h5').length;
		}
	
		var
			_text_computation = $R.getContent__computeTextForElement(_element, true),
			
			_points_before_link_ratio = (
				((0
					+ (_paragraphsInElement * 5)										/*  5 */
					+ (_text_computation._theoretical_paragraphs_3_lines * 4)			/*  4 */
					+ ((_text_computation._theoretical_paragraphs_5_lines * 1.5) * 3)	/*  3 */
					+ _text_computation._theoretical_paragraphs_50_words				/*  1 */
					+ ((_text_computation._theoretical_paragraphs_80_words * 1.5))		/*  1 */
				)/14)																	/* 14 */
			),
			
			_points = ((0
				+ (3 * (_points_before_link_ratio * (1 - _text_computation._links_to_text_ratio)))
				+ (1 * (_points_before_link_ratio * (1 - _text_computation._links_words_nr_to_words_nr_ratio)))
			)/4)
		;

		return {
			'_text_computation':					_text_computation,
			'_points':								_points,
			'_points_before_link_ratio':			_points_before_link_ratio
		};
	};


	
	/* helper functions */	
	/* ================ */
	
	$R.getContent__findHere__findPropperParent = function (_e)
	{
		var _p = _e;
			
		while(true)
		{
			_p = _p.parentNode;

			//	no parent node
			if (_p && _p.nodeType == 1); else { return false; }
			
			//	propper parent
			//	only return some element-types
			//	and make sure they have width/height
			//	if (_p.offsetWidth === 0) { continue; }
			//	if (_p.offsetHeight === 0) { continue; }
			if (_p.tagName.match(/^(article|body|div|dd|li|section|td)$/gi) != null); else { continue; }
			//if (_p.tagName.match(/^(article|body|div|ol|section|td|ul)$/gi) != null); else { continue; }
			
			//	return element
			return _p;
		}
	};
	
	$R.getContent__nrWords = function (_text)
	{
		var _words_match = _text.match(/\s+/gi);
		return (1 + (_words_match != null ? (_words_match.length) : 0));
	};

	
	$R.processHTML__getHTMLToProcess = function (_elements)
	{
		var _h = '';
		
		//	mark ...
		//	stuff to keep
		//	stuff to take out
		
		$.each(_elements, function (_i_big, _e_big)
		{
			//	readable__ classes
			$(_e_big).find('.readable__delete').attr('readable_attr_mark_delete', '1');
			$(_e_big).find('.readable__keep').attr('readable_attr_mark_keep', '1');

			//	hidden elements
			//	are already removed in the getContent__findHere__getTargetElement function
			
			//	headings with too much content
			$(_e_big).find('h1, h2, h3, h4, h5').each(function (_i, _e)
			{
				var 
					_text_computation = $R.getContent__computeTextForElement(_e, false),
					_content_it = false
				;
				
				switch (_e.tagName.toLowerCase())
				{
					case 'h1':
						//	not more than 130 characters
						_content_it = (_text_computation._theoretical_lines_of_65_characters > 2);
						break;
						
					case 'h2':
						//	not more than two paragraphs -- (65 * 3 * 2) characters
						_content_it = (_text_computation._theoretical_paragraphs_3_lines > 2);
						break;
						
					case 'h3':
					case 'h4':
					case 'h5':
						//	not more than five paragraphs -- (65 * 3 * 5) characters
						_content_it = (_text_computation._theoretical_paragraphs_3_lines > 5);
						break;
				}
				
				//	content?
				if (_content_it)
				{
					$(_e).attr('readable_attr_only_content', '1');
					if ($R.debug) { $R.log('Remove. Heading with too much content:', _e); }
				}
			});

			
			//	styling with too much content
			$(_e_big).find('b, i, e, strong, em').each(function (_i, _e)
			{
				//	not more than five paragraphs -- (65 * 5 * 5) characters
				if ($R.getContent__computeTextForElement(_e, false)._theoretical_paragraphs_5_lines > 5)
				{
					//	content
					$(_e).attr('readable_attr_only_content', '1');
					if ($R.debug) { $R.log('Remove. Emphasis with too much content:', _e); }
				}
			});

				
			//	big Images
			$(_e_big).find('img').each(function (_i, _e)
			{
				var
					_width = _e.width,
					_width = ((_e.naturalWidth && _e.naturalWidth > _width) ? _e.naturalWidth : _width),
					_width = ((_e.clientWidth && _e.clientWidth > _width) ? _e.clientWidth : _width),
					_width = ((_e.offsetWidth && _e.offsetWidth > _width) ? _e.offsetWidth : _width),
				
					_height = _e.height,
					_height = ((_e.naturalHeight && _e.naturalHeight > _height) ? _e.naturalHeight : _height),
					_height = ((_e.clientHeight && _e.clientHeight > _height) ? _e.clientHeight : _height),
					_height = ((_e.offsetHeight && _e.offsetHeight > _height) ? _e.offsetHeight : _height)
				;
				
				if ((_width * _height) > 10000)
				{
					$(_e).attr('readable_attr_big_image', '1');
					$(_e).addClass('readable_class_big_image');
					if ($R.debug) { $R.log('Mark. Big image:', _e); }
				}
			});
			
			
			//	images in links
			$(_e_big).find('a > img').each(function (_i, _e)
			{
				if ($(_e).attr('readable_attr_big_image') == '1') { return; }
				
				//	remove
				$(_e.parentNode).attr('readable_attr_mark_delete', '1');
				if ($R.debug) { $R.log('Remove. Small image in link:', _e.parentNode); }
			});
			
			
			//	table/ul/ol/div not enough words
			$(_e_big).find('ul, ol, table, div, section, aside, header').each(function (_i, _e)
			{
				//	paragraph div
				if ($(_e).hasClass('readable_class_is_paragraph')) { return; }
				
				//	word count
				var 
					_text_computation = $R.getContent__computeTextForElement(_e, false)
					_big_images = $(_e).find('img.readable_class_big_image').length,
					_headings = $(_e).find('h1, h2, h3, h4, h5, h6').length
				;
				
				switch (true)
				{
					//	probably just an image
					case (_big_images > 0 && _text_computation._text_words_nr < 4):
					
					//	a list with links -- not more than 5
					case (_e.tagName.match(/^ul|ol$/i) != null && _text_computation._links_nr < 6):
					
					//	more than 15 words; low link ratio
					case (_text_computation._text_words_nr > 15 && _text_computation._links_to_text_ratio < 0.25):
					
					//	more than two words; zero links
					case (_text_computation._text_words_nr > 1 && _text_computation._links_nr < 1):
						return;
						break;
				
					case (_text_computation._links_to_text_ratio < 0.5):
						switch (true)
						{
							case (_headings > 0):
							case (_big_images > 1):
							case (_text_computation._theoretical_paragraphs_3_lines > 3):
							case (_text_computation._theoretical_paragraphs_50_words > 3):
								return;
								break;
						}
						break;
				}
				
				$(_e).attr('readable_attr_mark_delete', '1');
				if ($R.debug) { $R.log('Remove. Not enough words:', _e, _text_computation); }
			});
		
		
			//	keep some elements
			$(_e_big).find('pre, code, nobr, video').each(function (_i, _e)
			{
				$(_e).attr('readable_attr_mark_keep', '1');
				if ($R.debug) { $R.log('Mark. Keep:', _e); }
			});
		
		
			//	keep object from certain sites
			$(_e_big).find('object > param[name=\'movie\']').each(function (_i, _e)
			{
				if ($(_e).attr('value').match(/(flickr|vimeo|yahoo|youtube)\.com/))
				{
					$(_e.parentNode).attr('readable_attr_mark_keep', '1');
					if ($R.debug) { $R.log('Mark. Keep:', _e.parentNode); }
				}
			});

			
			//	keep embeds/iframes from certain sites
			$(_e_big).find('embed[src], iframe[src]').each(function (_i, _e)
			{
				if ($(_e).attr('src').match(/(flickr|vimeo|yahoo|youtube)\.com/))
				{
					$(_e).attr('readable_attr_mark_keep', '1');
					if ($R.debug) { $R.log('Mark. Keep:', _e); }
				}
			});

			
			//	get element html
			switch (true)
			{
				case (_e_big.tagName.match(/^h(1|2|3|4|5|6)$/i) != null):
				case (_e_big.tagName.match(/^p|table|ul|ol$/i) != null):
					_h += ''
						+ '<' + _e_big.tagName.toLowerCase() + '>'
						+ $(_e_big).html()
						+ '</' + _e_big.tagName.toLowerCase() + '>'
					;
					break;
					
				default:
					_h += $(_e_big).html();
					break;
			}
		});
		
		return _h;
	};

	$R.processHTML = function (_h)
	{
var TongWen = {};
TongWen.s_2_t = {
"\u00b7":"\u2027", 
"\u2015":"\u2500", 
"\u2016":"\u2225", 
"\u2018":"\u300e", 
"\u2019":"\u300f", 
"\u201c":"\u300c", 
"\u201d":"\u300d", 
"\u2033":"\u301e", 
"\u220f":"\u03a0", 
"\u2211":"\u03a3", 
"\u2227":"\ufe3f", 
"\u2228":"\ufe40", 
"\u2236":"\ufe30", 
"\u2248":"\u2252", 
"\u2264":"\u2266", 
"\u2265":"\u2267", 
"\u2501":"\u2500", 
"\u2503":"\u2502", 
"\u250f":"\u250c", 
"\u2513":"\u2510", 
"\u2517":"\u2514", 
"\u251b":"\u2518", 
"\u2523":"\u251c", 
"\u252b":"\u2524", 
"\u2533":"\u252c", 
"\u253b":"\u2534", 
"\u254b":"\u253c", 
"\u3016":"\u3010", 
"\u3017":"\u3011", 
"\u3447":"\u3473", 
"\u359e":"\u558e", 
"\u360e":"\u361a", 
"\u3918":"\u396e", 
"\u39cf":"\u6386", 
"\u39d0":"\u3a73", 
"\u39df":"\u64d3", 
"\u3b4e":"\u68e1", 
"\u3ce0":"\u6fbe", 
"\u4056":"\u779c", 
"\u415f":"\u7a47", 
"\u4337":"\u7d2c", 
"\u43ac":"\u43b1", 
"\u43dd":"\u819e", 
"\u44d6":"\u85ed", 
"\u464c":"\u4661", 
"\u4723":"\u8a22", 
"\u4729":"\u8b8c", 
"\u478d":"\u477c", 
"\u497a":"\u91fe", 
"\u497d":"\u93fa", 
"\u4982":"\u4947", 
"\u4983":"\u942f", 
"\u4985":"\u9425", 
"\u4986":"\u9481", 
"\u49b6":"\u499b", 
"\u49b7":"\u499f", 
"\u4c9f":"\u9ba3", 
"\u4ca1":"\u9c0c", 
"\u4ca2":"\u9c27", 
"\u4ca3":"\u4c77", 
"\u4d13":"\u9cfe", 
"\u4d14":"\u9d41", 
"\u4d15":"\u9d37", 
"\u4d16":"\u9d84", 
"\u4d17":"\u9daa", 
"\u4d18":"\u9dc9", 
"\u4d19":"\u9e0a", 
"\u4dae":"\u9f91", 
"\u4e07":"\u842c", 
"\u4e0e":"\u8207", 
"\u4e13":"\u5c08", 
"\u4e1a":"\u696d", 
"\u4e1b":"\u53e2", 
"\u4e1c":"\u6771", 
"\u4e1d":"\u7d72", 
"\u4e22":"\u4e1f", 
"\u4e24":"\u5169", 
"\u4e25":"\u56b4", 
"\u4e27":"\u55aa", 
"\u4e2a":"\u500b", 
"\u4e30":"\u8c50", 
"\u4e34":"\u81e8", 
"\u4e3a":"\u70ba", 
"\u4e3d":"\u9e97", 
"\u4e3e":"\u8209", 
"\u4e48":"\u9ebc", 
"\u4e49":"\u7fa9", 
"\u4e4c":"\u70cf", 
"\u4e50":"\u6a02", 
"\u4e54":"\u55ac", 
"\u4e60":"\u7fd2", 
"\u4e61":"\u9109", 
"\u4e66":"\u66f8", 
"\u4e70":"\u8cb7", 
"\u4e71":"\u4e82", 
"\u4e89":"\u722d", 
"\u4e8e":"\u65bc", 
"\u4e8f":"\u8667", 
"\u4e91":"\u96f2", 
"\u4e98":"\u4e99", 
"\u4e9a":"\u4e9e", 
"\u4ea7":"\u7522", 
"\u4ea9":"\u755d", 
"\u4eb2":"\u89aa", 
"\u4eb5":"\u893b", 
"\u4ebf":"\u5104", 
"\u4ec5":"\u50c5", 
"\u4ec6":"\u50d5", 
"\u4ece":"\u5f9e", 
"\u4ed1":"\u4f96", 
"\u4ed3":"\u5009", 
"\u4eea":"\u5100", 
"\u4eec":"\u5011", 
"\u4ef7":"\u50f9", 
"\u4f17":"\u773e", 
"\u4f18":"\u512a", 
"\u4f1a":"\u6703", 
"\u4f1b":"\u50b4", 
"\u4f1e":"\u5098", 
"\u4f1f":"\u5049", 
"\u4f20":"\u50b3", 
"\u4f24":"\u50b7", 
"\u4f25":"\u5000", 
"\u4f26":"\u502b", 
"\u4f27":"\u5096", 
"\u4f2a":"\u507d", 
"\u4f2b":"\u4f47", 
"\u4f32":"\u4f60", 
"\u4f53":"\u9ad4", 
"\u4f63":"\u50ad", 
"\u4f65":"\u50c9", 
"\u4fa0":"\u4fe0", 
"\u4fa3":"\u4fb6", 
"\u4fa5":"\u50e5", 
"\u4fa6":"\u5075", 
"\u4fa7":"\u5074", 
"\u4fa8":"\u50d1", 
"\u4fa9":"\u5108", 
"\u4faa":"\u5115", 
"\u4fac":"\u5102", 
"\u4fe3":"\u4fc1", 
"\u4fe6":"\u5114", 
"\u4fe8":"\u513c", 
"\u4fe9":"\u5006", 
"\u4fea":"\u5137", 
"\u4fed":"\u5109", 
"\u502e":"\u88f8", 
"\u503a":"\u50b5", 
"\u503e":"\u50be", 
"\u506c":"\u50af", 
"\u507b":"\u50c2", 
"\u507e":"\u50e8", 
"\u507f":"\u511f", 
"\u50a5":"\u513b", 
"\u50a7":"\u5110", 
"\u50a8":"\u5132", 
"\u50a9":"\u513a", 
"\u513f":"\u5152", 
"\u5151":"\u514c", 
"\u5156":"\u5157", 
"\u515a":"\u9ee8", 
"\u5170":"\u862d", 
"\u5173":"\u95dc", 
"\u5174":"\u8208", 
"\u5179":"\u8332", 
"\u517b":"\u990a", 
"\u517d":"\u7378", 
"\u5181":"\u56c5", 
"\u5185":"\u5167", 
"\u5188":"\u5ca1", 
"\u518c":"\u518a", 
"\u5199":"\u5beb", 
"\u519b":"\u8ecd", 
"\u519c":"\u8fb2", 
"\u51af":"\u99ae", 
"\u51b2":"\u6c96", 
"\u51b3":"\u6c7a", 
"\u51b5":"\u6cc1", 
"\u51bb":"\u51cd", 
"\u51c0":"\u6de8", 
"\u51c4":"\u6dd2", 
"\u51c7":"\u6dde", 
"\u51c9":"\u6dbc", 
"\u51cf":"\u6e1b", 
"\u51d1":"\u6e4a", 
"\u51db":"\u51dc", 
"\u51e0":"\u5e7e", 
"\u51e4":"\u9cf3", 
"\u51e6":"\u8655", 
"\u51eb":"\u9ce7", 
"\u51ed":"\u6191", 
"\u51ef":"\u51f1", 
"\u51fb":"\u64ca", 
"\u51fc":"\u5e7d", 
"\u51ff":"\u947f", 
"\u520d":"\u82bb", 
"\u5212":"\u5283", 
"\u5218":"\u5289", 
"\u5219":"\u5247", 
"\u521a":"\u525b", 
"\u521b":"\u5275", 
"\u5220":"\u522a", 
"\u522b":"\u5225", 
"\u522c":"\u5257", 
"\u522d":"\u5244", 
"\u5239":"\u524e", 
"\u523d":"\u528a", 
"\u523f":"\u528c", 
"\u5240":"\u5274", 
"\u5242":"\u5291", 
"\u5250":"\u526e", 
"\u5251":"\u528d", 
"\u5265":"\u525d", 
"\u5267":"\u5287", 
"\u5273":"\u5284", 
"\u529d":"\u52f8", 
"\u529e":"\u8fa6", 
"\u52a1":"\u52d9", 
"\u52a2":"\u52f1", 
"\u52a8":"\u52d5", 
"\u52b1":"\u52f5", 
"\u52b2":"\u52c1", 
"\u52b3":"\u52de", 
"\u52bf":"\u52e2", 
"\u52cb":"\u52f3", 
"\u52da":"\u52e9", 
"\u52db":"\u52f3", 
"\u52e6":"\u527f", 
"\u5300":"\u52fb", 
"\u5326":"\u532d", 
"\u532e":"\u5331", 
"\u533a":"\u5340", 
"\u533b":"\u91ab", 
"\u534e":"\u83ef", 
"\u534f":"\u5354", 
"\u5355":"\u55ae", 
"\u5356":"\u8ce3", 
"\u5360":"\u4f54", 
"\u5362":"\u76e7", 
"\u5364":"\u9e75", 
"\u5367":"\u81e5", 
"\u536b":"\u885b", 
"\u5374":"\u537b", 
"\u537a":"\u5df9", 
"\u5382":"\u5ee0", 
"\u5385":"\u5ef3", 
"\u5386":"\u6b77", 
"\u5389":"\u53b2", 
"\u538b":"\u58d3", 
"\u538c":"\u53ad", 
"\u538d":"\u5399", 
"\u5395":"\u5ec1", 
"\u5398":"\u91d0", 
"\u53a2":"\u5ec2", 
"\u53a3":"\u53b4", 
"\u53a6":"\u5ec8", 
"\u53a8":"\u5eda", 
"\u53a9":"\u5ec4", 
"\u53ae":"\u5edd", 
"\u53bf":"\u7e23", 
"\u53c1":"\u53c3", 
"\u53c2":"\u53c3", 
"\u53c6":"\u9749", 
"\u53c7":"\u9746", 
"\u53cc":"\u96d9", 
"\u53d1":"\u767c", 
"\u53d8":"\u8b8a", 
"\u53d9":"\u6558", 
"\u53e0":"\u758a", 
"\u53f6":"\u8449", 
"\u53f7":"\u865f", 
"\u53f9":"\u5606", 
"\u53fd":"\u5630", 
"\u5401":"\u7c72", 
"\u540e":"\u5f8c", 
"\u5413":"\u5687", 
"\u5415":"\u5442", 
"\u5417":"\u55ce", 
"\u5428":"\u5678", 
"\u542c":"\u807d", 
"\u542f":"\u555f", 
"\u5434":"\u5433", 
"\u5450":"\u5436", 
"\u5452":"\u5638", 
"\u5453":"\u56c8", 
"\u5455":"\u5614", 
"\u5456":"\u56a6", 
"\u5457":"\u5504", 
"\u5458":"\u54e1", 
"\u5459":"\u54bc", 
"\u545b":"\u55c6", 
"\u545c":"\u55da", 
"\u548f":"\u8a60", 
"\u5499":"\u56a8", 
"\u549b":"\u5680", 
"\u549d":"\u565d", 
"\u54cc":"\u5471", 
"\u54cd":"\u97ff", 
"\u54d1":"\u555e", 
"\u54d2":"\u5660", 
"\u54d3":"\u5635", 
"\u54d4":"\u55f6", 
"\u54d5":"\u5666", 
"\u54d7":"\u5629", 
"\u54d9":"\u5672", 
"\u54dc":"\u568c", 
"\u54dd":"\u5665", 
"\u54df":"\u55b2", 
"\u551b":"\u561c", 
"\u551d":"\u55ca", 
"\u5520":"\u562e", 
"\u5521":"\u5562", 
"\u5522":"\u55e9", 
"\u5524":"\u559a", 
"\u5553":"\u555f", 
"\u5567":"\u5616", 
"\u556c":"\u55c7", 
"\u556d":"\u56c0", 
"\u556e":"\u9f67", 
"\u5570":"\u56c9", 
"\u5578":"\u562f", 
"\u55b7":"\u5674", 
"\u55bd":"\u560d", 
"\u55be":"\u56b3", 
"\u55eb":"\u56c1", 
"\u55ec":"\u5475", 
"\u55f3":"\u566f", 
"\u5618":"\u5653", 
"\u5624":"\u56b6", 
"\u5629":"\u8b41", 
"\u5631":"\u56d1", 
"\u565c":"\u5695", 
"\u56a3":"\u56c2", 
"\u56ae":"\u5411", 
"\u56e2":"\u5718", 
"\u56ed":"\u5712", 
"\u56ef":"\u570b", 
"\u56f1":"\u56ea", 
"\u56f4":"\u570d", 
"\u56f5":"\u5707", 
"\u56fd":"\u570b", 
"\u56fe":"\u5716", 
"\u5706":"\u5713", 
"\u5723":"\u8056", 
"\u5739":"\u58d9", 
"\u573a":"\u5834", 
"\u5742":"\u962a", 
"\u574f":"\u58de", 
"\u5757":"\u584a", 
"\u575a":"\u5805", 
"\u575b":"\u58c7", 
"\u575c":"\u58e2", 
"\u575d":"\u58e9", 
"\u575e":"\u5862", 
"\u575f":"\u58b3", 
"\u5760":"\u589c", 
"\u5784":"\u58df", 
"\u5785":"\u58df", 
"\u5786":"\u58da", 
"\u5792":"\u58d8", 
"\u57a6":"\u58be", 
"\u57a9":"\u580a", 
"\u57ab":"\u588a", 
"\u57ad":"\u57e1", 
"\u57b2":"\u584f", 
"\u57b4":"\u5816", 
"\u57d8":"\u5852", 
"\u57d9":"\u58ce", 
"\u57da":"\u581d", 
"\u5811":"\u5879", 
"\u5815":"\u58ae", 
"\u5892":"\u5891", 
"\u5899":"\u7246", 
"\u58ee":"\u58ef", 
"\u58f0":"\u8072", 
"\u58f3":"\u6bbc", 
"\u58f6":"\u58fa", 
"\u5904":"\u8655", 
"\u5907":"\u5099", 
"\u590d":"\u5fa9", 
"\u591f":"\u5920", 
"\u5934":"\u982d", 
"\u5938":"\u8a87", 
"\u5939":"\u593e", 
"\u593a":"\u596a", 
"\u5941":"\u5969", 
"\u5942":"\u5950", 
"\u594b":"\u596e", 
"\u5956":"\u734e", 
"\u5965":"\u5967", 
"\u596c":"\u734e", 
"\u5986":"\u599d", 
"\u5987":"\u5a66", 
"\u5988":"\u5abd", 
"\u59a9":"\u5af5", 
"\u59aa":"\u5ad7", 
"\u59ab":"\u5aaf", 
"\u59d7":"\u59cd", 
"\u5a04":"\u5a41", 
"\u5a05":"\u5a6d", 
"\u5a06":"\u5b08", 
"\u5a07":"\u5b0c", 
"\u5a08":"\u5b4c", 
"\u5a31":"\u5a1b", 
"\u5a32":"\u5aa7", 
"\u5a34":"\u5afb", 
"\u5a73":"\u5aff", 
"\u5a74":"\u5b30", 
"\u5a75":"\u5b0b", 
"\u5a76":"\u5b38", 
"\u5aaa":"\u5abc", 
"\u5ad2":"\u5b21", 
"\u5ad4":"\u5b2a", 
"\u5af1":"\u5b19", 
"\u5b37":"\u5b24", 
"\u5b59":"\u5b6b", 
"\u5b66":"\u5b78", 
"\u5b6a":"\u5b7f", 
"\u5b81":"\u5be7", 
"\u5b9d":"\u5bf6", 
"\u5b9e":"\u5be6", 
"\u5ba0":"\u5bf5", 
"\u5ba1":"\u5be9", 
"\u5baa":"\u61b2", 
"\u5bab":"\u5bae", 
"\u5bbd":"\u5bec", 
"\u5bbe":"\u8cd3", 
"\u5bc0":"\u91c7", 
"\u5bdd":"\u5be2", 
"\u5bf9":"\u5c0d", 
"\u5bfb":"\u5c0b", 
"\u5bfc":"\u5c0e", 
"\u5bff":"\u58fd", 
"\u5c06":"\u5c07", 
"\u5c14":"\u723e", 
"\u5c18":"\u5875", 
"\u5c1c":"\u560e", 
"\u5c1d":"\u5617", 
"\u5c27":"\u582f", 
"\u5c34":"\u5c37", 
"\u5c38":"\u5c4d", 
"\u5c3d":"\u76e1", 
"\u5c42":"\u5c64", 
"\u5c49":"\u5c5c", 
"\u5c4a":"\u5c46", 
"\u5c5e":"\u5c6c", 
"\u5c61":"\u5c62", 
"\u5c66":"\u5c68", 
"\u5c7f":"\u5dbc", 
"\u5c81":"\u6b72", 
"\u5c82":"\u8c48", 
"\u5c96":"\u5d87", 
"\u5c97":"\u5d17", 
"\u5c98":"\u5cf4", 
"\u5c9a":"\u5d50", 
"\u5c9b":"\u5cf6", 
"\u5cad":"\u5dba", 
"\u5cbd":"\u5d20", 
"\u5cbf":"\u5dcb", 
"\u5cc3":"\u5da8", 
"\u5cc4":"\u5da7", 
"\u5ce1":"\u5cfd", 
"\u5ce3":"\u5da2", 
"\u5ce4":"\u5da0", 
"\u5ce5":"\u5d22", 
"\u5ce6":"\u5dd2", 
"\u5cef":"\u5cf0", 
"\u5d02":"\u5d97", 
"\u5d03":"\u5d0d", 
"\u5d10":"\u5d11", 
"\u5d2d":"\u5d84", 
"\u5d58":"\u5db8", 
"\u5d5a":"\u5d94", 
"\u5d5b":"\u5d33", 
"\u5d5d":"\u5d81", 
"\u5dc5":"\u5dd4", 
"\u5dcc":"\u5dd6", 
"\u5de9":"\u978f", 
"\u5def":"\u5df0", 
"\u5e01":"\u5e63", 
"\u5e05":"\u5e25", 
"\u5e08":"\u5e2b", 
"\u5e0f":"\u5e43", 
"\u5e10":"\u5e33", 
"\u5e18":"\u7c3e", 
"\u5e1c":"\u5e5f", 
"\u5e26":"\u5e36", 
"\u5e27":"\u5e40", 
"\u5e2e":"\u5e6b", 
"\u5e31":"\u5e6c", 
"\u5e3b":"\u5e58", 
"\u5e3c":"\u5e57", 
"\u5e42":"\u51aa", 
"\u5e75":"\u958b", 
"\u5e76":"\u4e26", 
"\u5e77":"\u4e26", 
"\u5e7f":"\u5ee3", 
"\u5e84":"\u838a", 
"\u5e86":"\u6176", 
"\u5e90":"\u5eec", 
"\u5e91":"\u5ee1", 
"\u5e93":"\u5eab", 
"\u5e94":"\u61c9", 
"\u5e99":"\u5edf", 
"\u5e9e":"\u9f90", 
"\u5e9f":"\u5ee2", 
"\u5ebc":"\u5ece", 
"\u5eea":"\u5ee9", 
"\u5f00":"\u958b", 
"\u5f02":"\u7570", 
"\u5f03":"\u68c4", 
"\u5f11":"\u5f12", 
"\u5f20":"\u5f35", 
"\u5f25":"\u5f4c", 
"\u5f2a":"\u5f33", 
"\u5f2f":"\u5f4e", 
"\u5f39":"\u5f48", 
"\u5f3a":"\u5f37", 
"\u5f52":"\u6b78", 
"\u5f53":"\u7576", 
"\u5f54":"\u5f55", 
"\u5f55":"\u9304", 
"\u5f5a":"\u5f59", 
"\u5f66":"\u5f65", 
"\u5f7b":"\u5fb9", 
"\u5f84":"\u5f91", 
"\u5f95":"\u5fa0", 
"\u5fc6":"\u61b6", 
"\u5fcf":"\u61fa", 
"\u5fe7":"\u6182", 
"\u5ffe":"\u613e", 
"\u6000":"\u61f7", 
"\u6001":"\u614b", 
"\u6002":"\u616b", 
"\u6003":"\u61ae", 
"\u6004":"\u616a", 
"\u6005":"\u60b5", 
"\u6006":"\u6134", 
"\u601c":"\u6190", 
"\u603b":"\u7e3d", 
"\u603c":"\u61df", 
"\u603f":"\u61cc", 
"\u604b":"\u6200", 
"\u6052":"\u6046", 
"\u6073":"\u61c7", 
"\u6076":"\u60e1", 
"\u6078":"\u615f", 
"\u6079":"\u61e8", 
"\u607a":"\u6137", 
"\u607b":"\u60fb", 
"\u607c":"\u60f1", 
"\u607d":"\u60f2", 
"\u60a6":"\u6085", 
"\u60ab":"\u6128", 
"\u60ac":"\u61f8", 
"\u60ad":"\u6173", 
"\u60af":"\u61ab", 
"\u60ca":"\u9a5a", 
"\u60e7":"\u61fc", 
"\u60e8":"\u6158", 
"\u60e9":"\u61f2", 
"\u60eb":"\u618a", 
"\u60ec":"\u611c", 
"\u60ed":"\u615a", 
"\u60ee":"\u619a", 
"\u60ef":"\u6163", 
"\u6120":"\u614d", 
"\u6124":"\u61a4", 
"\u6126":"\u6192", 
"\u613f":"\u9858", 
"\u6151":"\u61fe", 
"\u61d1":"\u61e3", 
"\u61d2":"\u61f6", 
"\u61d4":"\u61cd", 
"\u6206":"\u6207", 
"\u620b":"\u6214", 
"\u620f":"\u6232", 
"\u6217":"\u6227", 
"\u6218":"\u6230", 
"\u622c":"\u6229", 
"\u6237":"\u6236", 
"\u6251":"\u64b2", 
"\u6267":"\u57f7", 
"\u6269":"\u64f4", 
"\u626a":"\u636b", 
"\u626b":"\u6383", 
"\u626c":"\u63da", 
"\u6270":"\u64fe", 
"\u629a":"\u64ab", 
"\u629b":"\u62cb", 
"\u629f":"\u6476", 
"\u62a0":"\u6473", 
"\u62a1":"\u6384", 
"\u62a2":"\u6436", 
"\u62a4":"\u8b77", 
"\u62a5":"\u5831", 
"\u62c5":"\u64d4", 
"\u62df":"\u64ec", 
"\u62e2":"\u650f", 
"\u62e3":"\u63c0", 
"\u62e5":"\u64c1", 
"\u62e6":"\u6514", 
"\u62e7":"\u64f0", 
"\u62e8":"\u64a5", 
"\u62e9":"\u64c7", 
"\u6302":"\u639b", 
"\u631a":"\u646f", 
"\u631b":"\u6523", 
"\u631c":"\u6397", 
"\u631d":"\u64be", 
"\u631e":"\u64bb", 
"\u631f":"\u633e", 
"\u6320":"\u6493", 
"\u6321":"\u64cb", 
"\u6322":"\u649f", 
"\u6323":"\u6399", 
"\u6324":"\u64e0", 
"\u6325":"\u63ee", 
"\u6326":"\u648f", 
"\u635c":"\u641c", 
"\u635e":"\u6488", 
"\u635f":"\u640d", 
"\u6361":"\u64bf", 
"\u6362":"\u63db", 
"\u6363":"\u6417", 
"\u636e":"\u64da", 
"\u63b3":"\u64c4", 
"\u63b4":"\u6451", 
"\u63b7":"\u64f2", 
"\u63b8":"\u64a3", 
"\u63ba":"\u647b", 
"\u63bc":"\u645c", 
"\u63fd":"\u652c", 
"\u63ff":"\u64b3", 
"\u6400":"\u6519", 
"\u6401":"\u64f1", 
"\u6402":"\u645f", 
"\u6405":"\u652a", 
"\u643a":"\u651c", 
"\u6444":"\u651d", 
"\u6445":"\u6504", 
"\u6446":"\u64fa", 
"\u6447":"\u6416", 
"\u6448":"\u64ef", 
"\u644a":"\u6524", 
"\u6484":"\u6516", 
"\u6491":"\u6490", 
"\u64b5":"\u6506", 
"\u64b7":"\u64f7", 
"\u64b8":"\u64fc", 
"\u64ba":"\u651b", 
"\u64c0":"\u641f", 
"\u64de":"\u64fb", 
"\u6512":"\u6522", 
"\u654c":"\u6575", 
"\u655b":"\u6582", 
"\u6570":"\u6578", 
"\u658b":"\u9f4b", 
"\u6593":"\u6595", 
"\u65a9":"\u65ac", 
"\u65ad":"\u65b7", 
"\u65e0":"\u7121", 
"\u65e7":"\u820a", 
"\u65f6":"\u6642", 
"\u65f7":"\u66e0", 
"\u65f8":"\u6698", 
"\u6619":"\u66c7", 
"\u6635":"\u66b1", 
"\u663c":"\u665d", 
"\u663d":"\u66e8", 
"\u663e":"\u986f", 
"\u664b":"\u6649", 
"\u6652":"\u66ec", 
"\u6653":"\u66c9", 
"\u6654":"\u66c4", 
"\u6655":"\u6688", 
"\u6656":"\u6689", 
"\u6682":"\u66ab", 
"\u66a7":"\u66d6", 
"\u66b8":"\u77ad", 
"\u672e":"\u8853", 
"\u672f":"\u8853", 
"\u673a":"\u6a5f", 
"\u6740":"\u6bba", 
"\u6742":"\u96dc", 
"\u6743":"\u6b0a", 
"\u6746":"\u687f", 
"\u6760":"\u69d3", 
"\u6761":"\u689d", 
"\u6765":"\u4f86", 
"\u6768":"\u694a", 
"\u6769":"\u69aa", 
"\u6770":"\u5091", 
"\u6781":"\u6975", 
"\u6784":"\u69cb", 
"\u679e":"\u6a05", 
"\u67a2":"\u6a1e", 
"\u67a3":"\u68d7", 
"\u67a5":"\u6aea", 
"\u67a7":"\u6898", 
"\u67a8":"\u68d6", 
"\u67aa":"\u69cd", 
"\u67ab":"\u6953", 
"\u67ad":"\u689f", 
"\u67dc":"\u6ac3", 
"\u67e0":"\u6ab8", 
"\u67fd":"\u6a89", 
"\u6800":"\u6894", 
"\u6805":"\u67f5", 
"\u6807":"\u6a19", 
"\u6808":"\u68e7", 
"\u6809":"\u6adb", 
"\u680a":"\u6af3", 
"\u680b":"\u68df", 
"\u680c":"\u6ae8", 
"\u680e":"\u6adf", 
"\u680f":"\u6b04", 
"\u6811":"\u6a39", 
"\u6816":"\u68f2", 
"\u6837":"\u6a23", 
"\u683e":"\u6b12", 
"\u6854":"\u6a58", 
"\u6860":"\u690f", 
"\u6861":"\u6a48", 
"\u6862":"\u6968", 
"\u6863":"\u6a94", 
"\u6864":"\u69bf", 
"\u6865":"\u6a4b", 
"\u6866":"\u6a3a", 
"\u6867":"\u6a9c", 
"\u6868":"\u69f3", 
"\u6869":"\u6a01", 
"\u68a6":"\u5922", 
"\u68c0":"\u6aa2", 
"\u68c2":"\u6afa", 
"\u6901":"\u69e8", 
"\u691f":"\u6add", 
"\u6920":"\u69e7", 
"\u6924":"\u6b0f", 
"\u692d":"\u6a62", 
"\u697c":"\u6a13", 
"\u6984":"\u6b16", 
"\u6987":"\u6aec", 
"\u6988":"\u6ada", 
"\u6989":"\u6af8", 
"\u6998":"\u77e9", 
"\u69da":"\u6a9f", 
"\u69db":"\u6abb", 
"\u69df":"\u6ab3", 
"\u69e0":"\u6ae7", 
"\u69fc":"\u898f", 
"\u6a2a":"\u6a6b", 
"\u6a2f":"\u6aa3", 
"\u6a31":"\u6afb", 
"\u6a65":"\u6aeb", 
"\u6a71":"\u6ae5", 
"\u6a79":"\u6ad3", 
"\u6a7c":"\u6ade", 
"\u6a90":"\u7c37", 
"\u6aa9":"\u6a81", 
"\u6b22":"\u6b61", 
"\u6b24":"\u6b5f", 
"\u6b27":"\u6b50", 
"\u6b4e":"\u5606", 
"\u6b7c":"\u6bb2", 
"\u6b81":"\u6b7f", 
"\u6b87":"\u6ba4", 
"\u6b8b":"\u6b98", 
"\u6b92":"\u6b9e", 
"\u6b93":"\u6bae", 
"\u6b9a":"\u6bab", 
"\u6ba1":"\u6baf", 
"\u6bb4":"\u6bc6", 
"\u6bc1":"\u6bc0", 
"\u6bc2":"\u8f42", 
"\u6bd5":"\u7562", 
"\u6bd9":"\u6583", 
"\u6be1":"\u6c08", 
"\u6bf5":"\u6bff", 
"\u6c07":"\u6c0c", 
"\u6c14":"\u6c23", 
"\u6c22":"\u6c2b", 
"\u6c29":"\u6c2c", 
"\u6c32":"\u6c33", 
"\u6c3d":"\u6c46", 
"\u6c47":"\u532f", 
"\u6c49":"\u6f22", 
"\u6c64":"\u6e6f", 
"\u6c79":"\u6d36", 
"\u6c9f":"\u6e9d", 
"\u6ca1":"\u6c92", 
"\u6ca3":"\u7043", 
"\u6ca4":"\u6f1a", 
"\u6ca5":"\u701d", 
"\u6ca6":"\u6dea", 
"\u6ca7":"\u6ec4", 
"\u6ca8":"\u6e22", 
"\u6ca9":"\u6e88", 
"\u6caa":"\u6eec", 
"\u6cb2":"\u6cb1", 
"\u6cc4":"\u6d29", 
"\u6cde":"\u6fd8", 
"\u6cea":"\u6dda", 
"\u6cf6":"\u6fa9", 
"\u6cf7":"\u7027", 
"\u6cf8":"\u7018", 
"\u6cfa":"\u6ffc", 
"\u6cfb":"\u7009", 
"\u6cfc":"\u6f51", 
"\u6cfd":"\u6fa4", 
"\u6cfe":"\u6d87", 
"\u6d01":"\u6f54", 
"\u6d12":"\u7051", 
"\u6d3c":"\u7aaa", 
"\u6d43":"\u6d79", 
"\u6d45":"\u6dfa", 
"\u6d46":"\u6f3f", 
"\u6d47":"\u6f86", 
"\u6d48":"\u6e5e", 
"\u6d49":"\u6eae", 
"\u6d4a":"\u6fc1", 
"\u6d4b":"\u6e2c", 
"\u6d4d":"\u6fae", 
"\u6d4e":"\u6fdf", 
"\u6d4f":"\u700f", 
"\u6d50":"\u6efb", 
"\u6d51":"\u6e3e", 
"\u6d52":"\u6ef8", 
"\u6d53":"\u6fc3", 
"\u6d54":"\u6f6f", 
"\u6d55":"\u6fdc", 
"\u6d5c":"\u6ff1", 
"\u6d8c":"\u6e67", 
"\u6d9b":"\u6fe4", 
"\u6d9d":"\u6f87", 
"\u6d9e":"\u6df6", 
"\u6d9f":"\u6f23", 
"\u6da0":"\u6f7f", 
"\u6da1":"\u6e26", 
"\u6da2":"\u6eb3", 
"\u6da3":"\u6e19", 
"\u6da4":"\u6ecc", 
"\u6da6":"\u6f64", 
"\u6da7":"\u6f97", 
"\u6da8":"\u6f32", 
"\u6da9":"\u6f80", 
"\u6e0a":"\u6df5", 
"\u6e0c":"\u6de5", 
"\u6e0d":"\u6f2c", 
"\u6e0e":"\u7006", 
"\u6e10":"\u6f38", 
"\u6e11":"\u6fa0", 
"\u6e14":"\u6f01", 
"\u6e16":"\u700b", 
"\u6e17":"\u6ef2", 
"\u6e29":"\u6eab", 
"\u6e7e":"\u7063", 
"\u6e7f":"\u6fd5", 
"\u6e83":"\u6f70", 
"\u6e85":"\u6ffa", 
"\u6e86":"\u6f35", 
"\u6e87":"\u6f0a", 
"\u6ebc":"\u6fd5", 
"\u6ed7":"\u6f77", 
"\u6eda":"\u6efe", 
"\u6ede":"\u6eef", 
"\u6edf":"\u7069", 
"\u6ee0":"\u7044", 
"\u6ee1":"\u6eff", 
"\u6ee2":"\u7005", 
"\u6ee4":"\u6ffe", 
"\u6ee5":"\u6feb", 
"\u6ee6":"\u7064", 
"\u6ee8":"\u6ff1", 
"\u6ee9":"\u7058", 
"\u6eea":"\u6fa6", 
"\u6f46":"\u7020", 
"\u6f47":"\u701f", 
"\u6f4b":"\u7032", 
"\u6f4d":"\u6ff0", 
"\u6f5c":"\u6f5b", 
"\u6f74":"\u7026", 
"\u6f9c":"\u703e", 
"\u6fd1":"\u7028", 
"\u6fd2":"\u7015", 
"\u704f":"\u705d", 
"\u706d":"\u6ec5", 
"\u706f":"\u71c8", 
"\u7075":"\u9748", 
"\u707e":"\u707d", 
"\u707f":"\u71e6", 
"\u7080":"\u716c", 
"\u7089":"\u7210", 
"\u7096":"\u71c9", 
"\u709c":"\u7152", 
"\u709d":"\u7197", 
"\u70a4":"\u7167", 
"\u70b9":"\u9ede", 
"\u70bc":"\u7149", 
"\u70bd":"\u71be", 
"\u70c1":"\u720d", 
"\u70c2":"\u721b", 
"\u70c3":"\u70f4", 
"\u70db":"\u71ed", 
"\u70df":"\u7159", 
"\u70e6":"\u7169", 
"\u70e7":"\u71d2", 
"\u70e8":"\u71c1", 
"\u70e9":"\u71f4", 
"\u70eb":"\u71d9", 
"\u70ec":"\u71fc", 
"\u70ed":"\u71b1", 
"\u7115":"\u7165", 
"\u7116":"\u71dc", 
"\u7118":"\u71fe", 
"\u7145":"\u935b", 
"\u7231":"\u611b", 
"\u7232":"\u70ba", 
"\u7237":"\u723a", 
"\u7240":"\u5e8a", 
"\u724d":"\u7258", 
"\u7266":"\u729b", 
"\u7275":"\u727d", 
"\u727a":"\u72a7", 
"\u728a":"\u72a2", 
"\u72b6":"\u72c0", 
"\u72b7":"\u7377", 
"\u72b8":"\u7341", 
"\u72b9":"\u7336", 
"\u72c8":"\u72fd", 
"\u72dd":"\u736e", 
"\u72de":"\u7370", 
"\u72ec":"\u7368", 
"\u72ed":"\u72f9", 
"\u72ee":"\u7345", 
"\u72ef":"\u736a", 
"\u72f0":"\u7319", 
"\u72f1":"\u7344", 
"\u72f2":"\u733b", 
"\u7303":"\u736b", 
"\u730e":"\u7375", 
"\u7315":"\u737c", 
"\u7321":"\u7380", 
"\u732a":"\u8c6c", 
"\u732b":"\u8c93", 
"\u732c":"\u875f", 
"\u732e":"\u737b", 
"\u7343":"\u5446", 
"\u736d":"\u737a", 
"\u7391":"\u74a3", 
"\u739b":"\u746a", 
"\u73ae":"\u744b", 
"\u73af":"\u74b0", 
"\u73b0":"\u73fe", 
"\u73b1":"\u7472", 
"\u73ba":"\u74bd", 
"\u73c9":"\u739f", 
"\u73cf":"\u73a8", 
"\u73d0":"\u743a", 
"\u73d1":"\u74cf", 
"\u73f2":"\u743f", 
"\u740e":"\u74a1", 
"\u740f":"\u7489", 
"\u7410":"\u7463", 
"\u742f":"\u7ba1", 
"\u743c":"\u74ca", 
"\u7476":"\u7464", 
"\u7477":"\u74a6", 
"\u748e":"\u74d4", 
"\u74d2":"\u74da", 
"\u74ee":"\u7515", 
"\u74ef":"\u750c", 
"\u7523":"\u7522", 
"\u7535":"\u96fb", 
"\u753b":"\u756b", 
"\u7545":"\u66a2", 
"\u7572":"\u756c", 
"\u7574":"\u7587", 
"\u7596":"\u7664", 
"\u7597":"\u7642", 
"\u759f":"\u7627", 
"\u75a0":"\u7658", 
"\u75a1":"\u760d", 
"\u75ac":"\u7667", 
"\u75ae":"\u7621", 
"\u75af":"\u760b", 
"\u75b1":"\u76b0", 
"\u75b4":"\u75fe", 
"\u75c8":"\u7670", 
"\u75c9":"\u75d9", 
"\u75d2":"\u7662", 
"\u75d6":"\u7602", 
"\u75e8":"\u7646", 
"\u75ea":"\u7613", 
"\u75eb":"\u7647", 
"\u75f9":"\u75fa", 
"\u7605":"\u7649", 
"\u7617":"\u761e", 
"\u7618":"\u763b", 
"\u762a":"\u765f", 
"\u762b":"\u7671", 
"\u763e":"\u766e", 
"\u763f":"\u766d", 
"\u765e":"\u7669", 
"\u7661":"\u75f4", 
"\u7663":"\u766c", 
"\u766b":"\u7672", 
"\u7691":"\u769a", 
"\u76b0":"\u75b1", 
"\u76b1":"\u76ba", 
"\u76b2":"\u76b8", 
"\u76cf":"\u76de", 
"\u76d0":"\u9e7d", 
"\u76d1":"\u76e3", 
"\u76d6":"\u84cb", 
"\u76d7":"\u76dc", 
"\u76d8":"\u76e4", 
"\u770d":"\u7798", 
"\u770e":"\u8996", 
"\u7726":"\u7725", 
"\u772c":"\u77d3", 
"\u7740":"\u8457", 
"\u7741":"\u775c", 
"\u7750":"\u775e", 
"\u7751":"\u77bc", 
"\u7792":"\u779e", 
"\u77a9":"\u77da", 
"\u77eb":"\u77ef", 
"\u77f6":"\u78ef", 
"\u77fe":"\u792c", 
"\u77ff":"\u7926", 
"\u7800":"\u78ad", 
"\u7801":"\u78bc", 
"\u7816":"\u78da", 
"\u7817":"\u7868", 
"\u781a":"\u786f", 
"\u781c":"\u78b8", 
"\u783a":"\u792a", 
"\u783b":"\u7931", 
"\u783e":"\u792b", 
"\u7840":"\u790e", 
"\u7855":"\u78a9", 
"\u7856":"\u7864", 
"\u7857":"\u78fd", 
"\u7859":"\u78d1", 
"\u785a":"\u7904", 
"\u786e":"\u78ba", 
"\u7877":"\u9e7c", 
"\u788d":"\u7919", 
"\u789b":"\u78e7", 
"\u789c":"\u78e3", 
"\u78b1":"\u9e7c", 
"\u7921":"\u7934", 
"\u793c":"\u79ae", 
"\u794e":"\u7995", 
"\u796f":"\u798e", 
"\u7977":"\u79b1", 
"\u7978":"\u798d", 
"\u7980":"\u7a1f", 
"\u7984":"\u797f", 
"\u7985":"\u79aa", 
"\u79b0":"\u7962", 
"\u79bb":"\u96e2", 
"\u79c3":"\u79bf", 
"\u79c6":"\u7a08", 
"\u79cd":"\u7a2e", 
"\u79ef":"\u7a4d", 
"\u79f0":"\u7a31", 
"\u79fd":"\u7a62", 
"\u7a0e":"\u7a05", 
"\u7a23":"\u7a4c", 
"\u7a2d":"\u79f8", 
"\u7a33":"\u7a69", 
"\u7a51":"\u7a61", 
"\u7a77":"\u7aae", 
"\u7a83":"\u7aca", 
"\u7a8d":"\u7ac5", 
"\u7a8e":"\u7ab5", 
"\u7a91":"\u7aaf", 
"\u7a9c":"\u7ac4", 
"\u7a9d":"\u7aa9", 
"\u7aa5":"\u7aba", 
"\u7aa6":"\u7ac7", 
"\u7aad":"\u7ab6", 
"\u7ad6":"\u8c4e", 
"\u7ade":"\u7af6", 
"\u7b03":"\u7be4", 
"\u7b0b":"\u7b4d", 
"\u7b14":"\u7b46", 
"\u7b15":"\u7b67", 
"\u7b3a":"\u7b8b", 
"\u7b3c":"\u7c60", 
"\u7b3e":"\u7c69", 
"\u7b51":"\u7bc9", 
"\u7b5a":"\u7bf3", 
"\u7b5b":"\u7be9", 
"\u7b5d":"\u7b8f", 
"\u7b79":"\u7c4c", 
"\u7b7e":"\u7c3d", 
"\u7b80":"\u7c21", 
"\u7b93":"\u7c59", 
"\u7ba6":"\u7c00", 
"\u7ba7":"\u7bcb", 
"\u7ba8":"\u7c5c", 
"\u7ba9":"\u7c6e", 
"\u7baa":"\u7c1e", 
"\u7bab":"\u7c2b", 
"\u7bd1":"\u7c23", 
"\u7bd3":"\u7c0d", 
"\u7bee":"\u7c43", 
"\u7bf1":"\u7c6c", 
"\u7c16":"\u7c6a", 
"\u7c41":"\u7c5f", 
"\u7c74":"\u7cf4", 
"\u7c7b":"\u985e", 
"\u7c7c":"\u79c8", 
"\u7c9c":"\u7cf6", 
"\u7c9d":"\u7cf2", 
"\u7ca4":"\u7cb5", 
"\u7caa":"\u7cde", 
"\u7cae":"\u7ce7", 
"\u7cc1":"\u7cdd", 
"\u7cc7":"\u9931", 
"\u7ccd":"\u9908", 
"\u7d25":"\u7d2e", 
"\u7d27":"\u7dca", 
"\u7d77":"\u7e36", 
"\u7dab":"\u7dda", 
"\u7ea0":"\u7cfe", 
"\u7ea1":"\u7d06", 
"\u7ea2":"\u7d05", 
"\u7ea3":"\u7d02", 
"\u7ea4":"\u7e96", 
"\u7ea5":"\u7d07", 
"\u7ea6":"\u7d04", 
"\u7ea7":"\u7d1a", 
"\u7ea8":"\u7d08", 
"\u7ea9":"\u7e8a", 
"\u7eaa":"\u7d00", 
"\u7eab":"\u7d09", 
"\u7eac":"\u7def", 
"\u7ead":"\u7d1c", 
"\u7eae":"\u7d18", 
"\u7eaf":"\u7d14", 
"\u7eb0":"\u7d15", 
"\u7eb1":"\u7d17", 
"\u7eb2":"\u7db1", 
"\u7eb3":"\u7d0d", 
"\u7eb4":"\u7d1d", 
"\u7eb5":"\u7e31", 
"\u7eb6":"\u7db8", 
"\u7eb7":"\u7d1b", 
"\u7eb8":"\u7d19", 
"\u7eb9":"\u7d0b", 
"\u7eba":"\u7d21", 
"\u7ebc":"\u7d16", 
"\u7ebd":"\u7d10", 
"\u7ebe":"\u7d13", 
"\u7ebf":"\u7dda", 
"\u7ec0":"\u7d3a", 
"\u7ec1":"\u7d32", 
"\u7ec2":"\u7d31", 
"\u7ec3":"\u7df4", 
"\u7ec4":"\u7d44", 
"\u7ec5":"\u7d33", 
"\u7ec6":"\u7d30", 
"\u7ec7":"\u7e54", 
"\u7ec8":"\u7d42", 
"\u7ec9":"\u7e10", 
"\u7eca":"\u7d46", 
"\u7ecb":"\u7d3c", 
"\u7ecc":"\u7d40", 
"\u7ecd":"\u7d39", 
"\u7ece":"\u7e79", 
"\u7ecf":"\u7d93", 
"\u7ed0":"\u7d3f", 
"\u7ed1":"\u7d81", 
"\u7ed2":"\u7d68", 
"\u7ed3":"\u7d50", 
"\u7ed4":"\u7d5d", 
"\u7ed5":"\u7e5e", 
"\u7ed6":"\u7d70", 
"\u7ed7":"\u7d4e", 
"\u7ed8":"\u7e6a", 
"\u7ed9":"\u7d66", 
"\u7eda":"\u7d62", 
"\u7edb":"\u7d73", 
"\u7edc":"\u7d61", 
"\u7edd":"\u7d55", 
"\u7ede":"\u7d5e", 
"\u7edf":"\u7d71", 
"\u7ee0":"\u7d86", 
"\u7ee1":"\u7d83", 
"\u7ee2":"\u7d79", 
"\u7ee3":"\u7e61", 
"\u7ee5":"\u7d8f", 
"\u7ee6":"\u7d5b", 
"\u7ee7":"\u7e7c", 
"\u7ee8":"\u7d88", 
"\u7ee9":"\u7e3e", 
"\u7eea":"\u7dd2", 
"\u7eeb":"\u7dbe", 
"\u7eed":"\u7e8c", 
"\u7eee":"\u7dba", 
"\u7eef":"\u7dcb", 
"\u7ef0":"\u7dbd", 
"\u7ef1":"\u7dd4", 
"\u7ef2":"\u7dc4", 
"\u7ef3":"\u7e69", 
"\u7ef4":"\u7dad", 
"\u7ef5":"\u7dbf", 
"\u7ef6":"\u7dac", 
"\u7ef7":"\u7e43", 
"\u7ef8":"\u7da2", 
"\u7efa":"\u7db9", 
"\u7efb":"\u7da3", 
"\u7efc":"\u7d9c", 
"\u7efd":"\u7dbb", 
"\u7efe":"\u7db0", 
"\u7eff":"\u7da0", 
"\u7f00":"\u7db4", 
"\u7f01":"\u7dc7", 
"\u7f02":"\u7dd9", 
"\u7f03":"\u7dd7", 
"\u7f04":"\u7dd8", 
"\u7f05":"\u7dec", 
"\u7f06":"\u7e9c", 
"\u7f07":"\u7df9", 
"\u7f08":"\u7df2", 
"\u7f09":"\u7ddd", 
"\u7f0a":"\u7e15", 
"\u7f0b":"\u7e62", 
"\u7f0c":"\u7de6", 
"\u7f0d":"\u7d9e", 
"\u7f0e":"\u7dde", 
"\u7f0f":"\u7df6", 
"\u7f11":"\u7df1", 
"\u7f12":"\u7e0b", 
"\u7f13":"\u7de9", 
"\u7f14":"\u7de0", 
"\u7f15":"\u7e37", 
"\u7f16":"\u7de8", 
"\u7f17":"\u7de1", 
"\u7f18":"\u7de3", 
"\u7f19":"\u7e09", 
"\u7f1a":"\u7e1b", 
"\u7f1b":"\u7e1f", 
"\u7f1c":"\u7e1d", 
"\u7f1d":"\u7e2b", 
"\u7f1e":"\u7e17", 
"\u7f1f":"\u7e1e", 
"\u7f20":"\u7e8f", 
"\u7f21":"\u7e2d", 
"\u7f22":"\u7e0a", 
"\u7f23":"\u7e11", 
"\u7f24":"\u7e7d", 
"\u7f25":"\u7e39", 
"\u7f26":"\u7e35", 
"\u7f27":"\u7e32", 
"\u7f28":"\u7e93", 
"\u7f29":"\u7e2e", 
"\u7f2a":"\u7e46", 
"\u7f2b":"\u7e45", 
"\u7f2c":"\u7e88", 
"\u7f2d":"\u7e5a", 
"\u7f2e":"\u7e55", 
"\u7f2f":"\u7e52", 
"\u7f30":"\u97c1", 
"\u7f31":"\u7e7e", 
"\u7f32":"\u7e70", 
"\u7f33":"\u7e6f", 
"\u7f34":"\u7e73", 
"\u7f35":"\u7e98", 
"\u7f42":"\u7f4c", 
"\u7f4e":"\u7f48", 
"\u7f51":"\u7db2", 
"\u7f57":"\u7f85", 
"\u7f5a":"\u7f70", 
"\u7f62":"\u7f77", 
"\u7f74":"\u7f86", 
"\u7f81":"\u7f88", 
"\u7f9f":"\u7fa5", 
"\u7fa1":"\u7fa8", 
"\u7fd8":"\u7ff9", 
"\u7fda":"\u7fec", 
"\u8022":"\u802e", 
"\u8027":"\u802c", 
"\u8038":"\u8073", 
"\u803b":"\u6065", 
"\u8042":"\u8076", 
"\u804b":"\u807e", 
"\u804c":"\u8077", 
"\u804d":"\u8079", 
"\u8054":"\u806f", 
"\u8069":"\u8075", 
"\u806a":"\u8070", 
"\u8080":"\u807f", 
"\u8083":"\u8085", 
"\u80a0":"\u8178", 
"\u80a4":"\u819a", 
"\u80ae":"\u9aaf", 
"\u80be":"\u814e", 
"\u80bf":"\u816b", 
"\u80c0":"\u8139", 
"\u80c1":"\u8105", 
"\u80c6":"\u81bd", 
"\u80dc":"\u52dd", 
"\u80e7":"\u6727", 
"\u80e8":"\u8156", 
"\u80ea":"\u81da", 
"\u80eb":"\u811b", 
"\u80f6":"\u81a0", 
"\u8109":"\u8108", 
"\u810d":"\u81be", 
"\u810f":"\u9ad2", 
"\u8110":"\u81cd", 
"\u8111":"\u8166", 
"\u8113":"\u81bf", 
"\u8114":"\u81e0", 
"\u811a":"\u8173", 
"\u8123":"\u5507", 
"\u8129":"\u4fee", 
"\u8131":"\u812b", 
"\u8136":"\u8161", 
"\u8138":"\u81c9", 
"\u814a":"\u81d8", 
"\u814c":"\u9183", 
"\u8158":"\u8195", 
"\u816d":"\u984e", 
"\u817b":"\u81a9", 
"\u817c":"\u9766", 
"\u817d":"\u8183", 
"\u817e":"\u9a30", 
"\u8191":"\u81cf", 
"\u81bb":"\u7fb6", 
"\u81dc":"\u81e2", 
"\u8206":"\u8f3f", 
"\u8223":"\u8264", 
"\u8230":"\u8266", 
"\u8231":"\u8259", 
"\u823b":"\u826b", 
"\u8270":"\u8271", 
"\u8273":"\u8c54", 
"\u827a":"\u85dd", 
"\u8282":"\u7bc0", 
"\u8288":"\u7f8b", 
"\u8297":"\u858c", 
"\u829c":"\u856a", 
"\u82a6":"\u8606", 
"\u82c1":"\u84ef", 
"\u82c7":"\u8466", 
"\u82c8":"\u85f6", 
"\u82cb":"\u83a7", 
"\u82cc":"\u8407", 
"\u82cd":"\u84bc", 
"\u82ce":"\u82e7", 
"\u82cf":"\u8607", 
"\u82f9":"\u860b", 
"\u830e":"\u8396", 
"\u830f":"\u8622", 
"\u8311":"\u8526", 
"\u8314":"\u584b", 
"\u8315":"\u7162", 
"\u8327":"\u7e6d", 
"\u8346":"\u834a", 
"\u8350":"\u85a6", 
"\u835a":"\u83a2", 
"\u835b":"\u8558", 
"\u835c":"\u84fd", 
"\u835e":"\u854e", 
"\u835f":"\u8588", 
"\u8360":"\u85ba", 
"\u8361":"\u8569", 
"\u8363":"\u69ae", 
"\u8364":"\u8477", 
"\u8365":"\u6ece", 
"\u8366":"\u7296", 
"\u8367":"\u7192", 
"\u8368":"\u8541", 
"\u8369":"\u85ce", 
"\u836a":"\u84c0", 
"\u836b":"\u852d", 
"\u836c":"\u8552", 
"\u836d":"\u8452", 
"\u836e":"\u8464", 
"\u836f":"\u85e5", 
"\u8385":"\u849e", 
"\u83b1":"\u840a", 
"\u83b2":"\u84ee", 
"\u83b3":"\u8494", 
"\u83b4":"\u8435", 
"\u83b6":"\u859f", 
"\u83b7":"\u7372", 
"\u83b8":"\u8555", 
"\u83b9":"\u7469", 
"\u83ba":"\u9daf", 
"\u83bc":"\u84f4", 
"\u841a":"\u8600", 
"\u841d":"\u863f", 
"\u8424":"\u87a2", 
"\u8425":"\u71df", 
"\u8426":"\u7e08", 
"\u8427":"\u856d", 
"\u8428":"\u85a9", 
"\u8457":"\u8457", 
"\u846f":"\u85e5", 
"\u8471":"\u8525", 
"\u8487":"\u8546", 
"\u8489":"\u8562", 
"\u848b":"\u8523", 
"\u848c":"\u851e", 
"\u84dd":"\u85cd", 
"\u84df":"\u858a", 
"\u84e0":"\u863a", 
"\u84e3":"\u8577", 
"\u84e5":"\u93a3", 
"\u84e6":"\u9a40", 
"\u8534":"\u9ebb", 
"\u8537":"\u8594", 
"\u8539":"\u861e", 
"\u853a":"\u85fa", 
"\u853c":"\u85f9", 
"\u8572":"\u8604", 
"\u8574":"\u860a", 
"\u85ae":"\u85ea", 
"\u85d3":"\u861a", 
"\u8616":"\u8617", 
"\u864f":"\u865c", 
"\u8651":"\u616e", 
"\u865a":"\u865b", 
"\u866b":"\u87f2", 
"\u866c":"\u866f", 
"\u866e":"\u87e3", 
"\u8671":"\u8768", 
"\u867d":"\u96d6", 
"\u867e":"\u8766", 
"\u867f":"\u8806", 
"\u8680":"\u8755", 
"\u8681":"\u87fb", 
"\u8682":"\u879e", 
"\u8695":"\u8836", 
"\u86ac":"\u8706", 
"\u86ca":"\u8831", 
"\u86ce":"\u8823", 
"\u86cf":"\u87f6", 
"\u86ee":"\u883b", 
"\u86f0":"\u87c4", 
"\u86f1":"\u86fa", 
"\u86f2":"\u87ef", 
"\u86f3":"\u8784", 
"\u86f4":"\u8810", 
"\u8715":"\u86fb", 
"\u8717":"\u8778", 
"\u8721":"\u881f", 
"\u8747":"\u8805", 
"\u8748":"\u87c8", 
"\u8749":"\u87ec", 
"\u874e":"\u880d", 
"\u8770":"\u867a", 
"\u877c":"\u87bb", 
"\u877e":"\u8811", 
"\u87a8":"\u87ce", 
"\u87cf":"\u8828", 
"\u87ee":"\u87fa", 
"\u8845":"\u91c1", 
"\u8846":"\u773e", 
"\u8854":"\u929c", 
"\u8865":"\u88dc", 
"\u886c":"\u896f", 
"\u886e":"\u889e", 
"\u8884":"\u8956", 
"\u8885":"\u88ca", 
"\u889c":"\u896a", 
"\u88ad":"\u8972", 
"\u88c5":"\u88dd", 
"\u88c6":"\u8960", 
"\u88cf":"\u88e1", 
"\u88e2":"\u8933", 
"\u88e3":"\u895d", 
"\u88e4":"\u8932", 
"\u88e5":"\u8949", 
"\u891b":"\u8938", 
"\u8934":"\u8964", 
"\u89c1":"\u898b", 
"\u89c2":"\u89c0", 
"\u89c3":"\u898e", 
"\u89c4":"\u898f", 
"\u89c5":"\u8993", 
"\u89c6":"\u8996", 
"\u89c7":"\u8998", 
"\u89c8":"\u89bd", 
"\u89c9":"\u89ba", 
"\u89ca":"\u89ac", 
"\u89cb":"\u89a1", 
"\u89cc":"\u89bf", 
"\u89ce":"\u89a6", 
"\u89cf":"\u89af", 
"\u89d0":"\u89b2", 
"\u89d1":"\u89b7", 
"\u89de":"\u89f4", 
"\u89e6":"\u89f8", 
"\u89ef":"\u89f6", 
"\u8a3c":"\u8b49", 
"\u8a89":"\u8b7d", 
"\u8a8a":"\u8b04", 
"\u8ba1":"\u8a08", 
"\u8ba2":"\u8a02", 
"\u8ba3":"\u8a03", 
"\u8ba4":"\u8a8d", 
"\u8ba5":"\u8b4f", 
"\u8ba6":"\u8a10", 
"\u8ba7":"\u8a0c", 
"\u8ba8":"\u8a0e", 
"\u8ba9":"\u8b93", 
"\u8baa":"\u8a15", 
"\u8bab":"\u8a16", 
"\u8bad":"\u8a13", 
"\u8bae":"\u8b70", 
"\u8baf":"\u8a0a", 
"\u8bb0":"\u8a18", 
"\u8bb2":"\u8b1b", 
"\u8bb3":"\u8af1", 
"\u8bb4":"\u8b33", 
"\u8bb5":"\u8a4e", 
"\u8bb6":"\u8a1d", 
"\u8bb7":"\u8a25", 
"\u8bb8":"\u8a31", 
"\u8bb9":"\u8a1b", 
"\u8bba":"\u8ad6", 
"\u8bbb":"\u8a29", 
"\u8bbc":"\u8a1f", 
"\u8bbd":"\u8af7", 
"\u8bbe":"\u8a2d", 
"\u8bbf":"\u8a2a", 
"\u8bc0":"\u8a23", 
"\u8bc1":"\u8b49", 
"\u8bc2":"\u8a41", 
"\u8bc3":"\u8a36", 
"\u8bc4":"\u8a55", 
"\u8bc5":"\u8a5b", 
"\u8bc6":"\u8b58", 
"\u8bc7":"\u8a57", 
"\u8bc8":"\u8a50", 
"\u8bc9":"\u8a34", 
"\u8bca":"\u8a3a", 
"\u8bcb":"\u8a46", 
"\u8bcc":"\u8b05", 
"\u8bcd":"\u8a5e", 
"\u8bce":"\u8a58", 
"\u8bcf":"\u8a54", 
"\u8bd1":"\u8b6f", 
"\u8bd2":"\u8a52", 
"\u8bd3":"\u8a86", 
"\u8bd4":"\u8a84", 
"\u8bd5":"\u8a66", 
"\u8bd6":"\u8a7f", 
"\u8bd7":"\u8a69", 
"\u8bd8":"\u8a70", 
"\u8bd9":"\u8a7c", 
"\u8bda":"\u8aa0", 
"\u8bdb":"\u8a85", 
"\u8bdc":"\u8a75", 
"\u8bdd":"\u8a71", 
"\u8bde":"\u8a95", 
"\u8bdf":"\u8a6c", 
"\u8be0":"\u8a6e", 
"\u8be1":"\u8a6d", 
"\u8be2":"\u8a62", 
"\u8be3":"\u8a63", 
"\u8be4":"\u8acd", 
"\u8be5":"\u8a72", 
"\u8be6":"\u8a73", 
"\u8be7":"\u8a6b", 
"\u8be8":"\u8ae2", 
"\u8be9":"\u8a61", 
"\u8beb":"\u8aa1", 
"\u8bec":"\u8aa3", 
"\u8bed":"\u8a9e", 
"\u8bee":"\u8a9a", 
"\u8bef":"\u8aa4", 
"\u8bf0":"\u8aa5", 
"\u8bf1":"\u8a98", 
"\u8bf2":"\u8aa8", 
"\u8bf3":"\u8a91", 
"\u8bf4":"\u8aaa", 
"\u8bf5":"\u8aa6", 
"\u8bf6":"\u8a92", 
"\u8bf7":"\u8acb", 
"\u8bf8":"\u8af8", 
"\u8bf9":"\u8acf", 
"\u8bfa":"\u8afe", 
"\u8bfb":"\u8b80", 
"\u8bfc":"\u8ad1", 
"\u8bfd":"\u8ab9", 
"\u8bfe":"\u8ab2", 
"\u8bff":"\u8ac9", 
"\u8c00":"\u8adb", 
"\u8c01":"\u8ab0", 
"\u8c02":"\u8ad7", 
"\u8c03":"\u8abf", 
"\u8c04":"\u8ac2", 
"\u8c05":"\u8ad2", 
"\u8c06":"\u8ac4", 
"\u8c07":"\u8ab6", 
"\u8c08":"\u8ac7", 
"\u8c09":"\u8b85", 
"\u8c0a":"\u8abc", 
"\u8c0b":"\u8b00", 
"\u8c0c":"\u8af6", 
"\u8c0d":"\u8adc", 
"\u8c0e":"\u8b0a", 
"\u8c0f":"\u8aeb", 
"\u8c10":"\u8ae7", 
"\u8c11":"\u8b14", 
"\u8c12":"\u8b01", 
"\u8c13":"\u8b02", 
"\u8c14":"\u8ae4", 
"\u8c15":"\u8aed", 
"\u8c16":"\u8afc", 
"\u8c17":"\u8b92", 
"\u8c18":"\u8aee", 
"\u8c19":"\u8af3", 
"\u8c1a":"\u8afa", 
"\u8c1b":"\u8ae6", 
"\u8c1c":"\u8b0e", 
"\u8c1d":"\u8ade", 
"\u8c1e":"\u8add", 
"\u8c1f":"\u8b28", 
"\u8c20":"\u8b9c", 
"\u8c21":"\u8b16", 
"\u8c22":"\u8b1d", 
"\u8c23":"\u8b20", 
"\u8c24":"\u8b17", 
"\u8c25":"\u8b1a", 
"\u8c26":"\u8b19", 
"\u8c27":"\u8b10", 
"\u8c28":"\u8b39", 
"\u8c29":"\u8b3e", 
"\u8c2a":"\u8b2b", 
"\u8c2b":"\u8b7e", 
"\u8c2c":"\u8b2c", 
"\u8c2d":"\u8b5a", 
"\u8c2e":"\u8b56", 
"\u8c2f":"\u8b59", 
"\u8c30":"\u8b95", 
"\u8c31":"\u8b5c", 
"\u8c32":"\u8b4e", 
"\u8c33":"\u8b9e", 
"\u8c34":"\u8b74", 
"\u8c35":"\u8b6b", 
"\u8c36":"\u8b96", 
"\u8c6e":"\u8c76", 
"\u8d1c":"\u8d13", 
"\u8d1d":"\u8c9d", 
"\u8d1e":"\u8c9e", 
"\u8d1f":"\u8ca0", 
"\u8d21":"\u8ca2", 
"\u8d22":"\u8ca1", 
"\u8d23":"\u8cac", 
"\u8d24":"\u8ce2", 
"\u8d25":"\u6557", 
"\u8d26":"\u8cec", 
"\u8d27":"\u8ca8", 
"\u8d28":"\u8cea", 
"\u8d29":"\u8ca9", 
"\u8d2a":"\u8caa", 
"\u8d2b":"\u8ca7", 
"\u8d2c":"\u8cb6", 
"\u8d2d":"\u8cfc", 
"\u8d2e":"\u8caf", 
"\u8d2f":"\u8cab", 
"\u8d30":"\u8cb3", 
"\u8d31":"\u8ce4", 
"\u8d32":"\u8cc1", 
"\u8d33":"\u8cb0", 
"\u8d34":"\u8cbc", 
"\u8d35":"\u8cb4", 
"\u8d36":"\u8cba", 
"\u8d37":"\u8cb8", 
"\u8d38":"\u8cbf", 
"\u8d39":"\u8cbb", 
"\u8d3a":"\u8cc0", 
"\u8d3b":"\u8cbd", 
"\u8d3c":"\u8cca", 
"\u8d3d":"\u8d04", 
"\u8d3e":"\u8cc8", 
"\u8d3f":"\u8cc4", 
"\u8d40":"\u8cb2", 
"\u8d41":"\u8cc3", 
"\u8d42":"\u8cc2", 
"\u8d43":"\u8d13", 
"\u8d44":"\u8cc7", 
"\u8d45":"\u8cc5", 
"\u8d46":"\u8d10", 
"\u8d47":"\u8cd5", 
"\u8d48":"\u8cd1", 
"\u8d49":"\u8cda", 
"\u8d4a":"\u8cd2", 
"\u8d4b":"\u8ce6", 
"\u8d4c":"\u8ced", 
"\u8d4d":"\u9f4e", 
"\u8d4e":"\u8d16", 
"\u8d4f":"\u8cde", 
"\u8d50":"\u8cdc", 
"\u8d52":"\u8cd9", 
"\u8d53":"\u8ce1", 
"\u8d54":"\u8ce0", 
"\u8d55":"\u8ce7", 
"\u8d56":"\u8cf4", 
"\u8d57":"\u8cf5", 
"\u8d58":"\u8d05", 
"\u8d59":"\u8cfb", 
"\u8d5a":"\u8cfa", 
"\u8d5b":"\u8cfd", 
"\u8d5c":"\u8cfe", 
"\u8d5d":"\u8d0b", 
"\u8d5e":"\u8d0a", 
"\u8d5f":"\u8d07", 
"\u8d60":"\u8d08", 
"\u8d61":"\u8d0d", 
"\u8d62":"\u8d0f", 
"\u8d63":"\u8d1b", 
"\u8d75":"\u8d99", 
"\u8d76":"\u8d95", 
"\u8d8b":"\u8da8", 
"\u8db1":"\u8db2", 
"\u8db8":"\u8e89", 
"\u8dc3":"\u8e8d", 
"\u8dc4":"\u8e4c", 
"\u8dde":"\u8e92", 
"\u8df5":"\u8e10", 
"\u8df7":"\u8e7a", 
"\u8df8":"\u8e55", 
"\u8df9":"\u8e9a", 
"\u8dfb":"\u8e8b", 
"\u8e0a":"\u8e34", 
"\u8e0c":"\u8e8a", 
"\u8e2a":"\u8e64", 
"\u8e2c":"\u8e93", 
"\u8e2f":"\u8e91", 
"\u8e51":"\u8ea1", 
"\u8e52":"\u8e63", 
"\u8e70":"\u8e95", 
"\u8e7f":"\u8ea5", 
"\u8e8f":"\u8eaa", 
"\u8e9c":"\u8ea6", 
"\u8eaf":"\u8ec0", 
"\u8eb0":"\u9ad4", 
"\u8f66":"\u8eca", 
"\u8f67":"\u8ecb", 
"\u8f68":"\u8ecc", 
"\u8f69":"\u8ed2", 
"\u8f6b":"\u8ed4", 
"\u8f6c":"\u8f49", 
"\u8f6d":"\u8edb", 
"\u8f6e":"\u8f2a", 
"\u8f6f":"\u8edf", 
"\u8f70":"\u8f5f", 
"\u8f71":"\u8ef2", 
"\u8f72":"\u8efb", 
"\u8f73":"\u8f64", 
"\u8f74":"\u8ef8", 
"\u8f75":"\u8ef9", 
"\u8f76":"\u8efc", 
"\u8f77":"\u8ee4", 
"\u8f78":"\u8eeb", 
"\u8f79":"\u8f62", 
"\u8f7a":"\u8efa", 
"\u8f7b":"\u8f15", 
"\u8f7c":"\u8efe", 
"\u8f7d":"\u8f09", 
"\u8f7e":"\u8f0a", 
"\u8f7f":"\u8f4e", 
"\u8f81":"\u8f07", 
"\u8f82":"\u8f05", 
"\u8f83":"\u8f03", 
"\u8f84":"\u8f12", 
"\u8f85":"\u8f14", 
"\u8f86":"\u8f1b", 
"\u8f87":"\u8f26", 
"\u8f88":"\u8f29", 
"\u8f89":"\u8f1d", 
"\u8f8a":"\u8f25", 
"\u8f8b":"\u8f1e", 
"\u8f8d":"\u8f1f", 
"\u8f8e":"\u8f1c", 
"\u8f8f":"\u8f33", 
"\u8f90":"\u8f3b", 
"\u8f91":"\u8f2f", 
"\u8f93":"\u8f38", 
"\u8f94":"\u8f61", 
"\u8f95":"\u8f45", 
"\u8f96":"\u8f44", 
"\u8f97":"\u8f3e", 
"\u8f98":"\u8f46", 
"\u8f99":"\u8f4d", 
"\u8f9a":"\u8f54", 
"\u8f9e":"\u8fad", 
"\u8fa9":"\u8faf", 
"\u8fab":"\u8fae", 
"\u8fb9":"\u908a", 
"\u8fbd":"\u907c", 
"\u8fbe":"\u9054", 
"\u8fc1":"\u9077", 
"\u8fc7":"\u904e", 
"\u8fc8":"\u9081", 
"\u8fd0":"\u904b", 
"\u8fd8":"\u9084", 
"\u8fd9":"\u9019", 
"\u8fdb":"\u9032", 
"\u8fdc":"\u9060", 
"\u8fdd":"\u9055", 
"\u8fde":"\u9023", 
"\u8fdf":"\u9072", 
"\u8fe9":"\u9087", 
"\u8ff3":"\u9015", 
"\u8ff9":"\u8de1", 
"\u9002":"\u9069", 
"\u9009":"\u9078", 
"\u900a":"\u905c", 
"\u9012":"\u905e", 
"\u9026":"\u9090", 
"\u903b":"\u908f", 
"\u9057":"\u907a", 
"\u9065":"\u9059", 
"\u9093":"\u9127", 
"\u909d":"\u913a", 
"\u90ac":"\u9114", 
"\u90ae":"\u90f5", 
"\u90b9":"\u9112", 
"\u90ba":"\u9134", 
"\u90bb":"\u9130", 
"\u90c3":"\u5408", 
"\u90c4":"\u9699", 
"\u90cf":"\u90df", 
"\u90d0":"\u9136", 
"\u90d1":"\u912d", 
"\u90d3":"\u9106", 
"\u90e6":"\u9148", 
"\u90e7":"\u9116", 
"\u90f8":"\u9132", 
"\u915d":"\u919e", 
"\u9171":"\u91ac", 
"\u917d":"\u91c5", 
"\u917e":"\u91c3", 
"\u917f":"\u91c0", 
"\u9196":"\u919e", 
"\u91ca":"\u91cb", 
"\u91cc":"\u88e1", 
"\u9208":"\u923d", 
"\u9221":"\u9418", 
"\u9246":"\u947d", 
"\u9274":"\u9451", 
"\u92ae":"\u947e", 
"\u92bc":"\u5249", 
"\u92fb":"\u9451", 
"\u9318":"\u939a", 
"\u9332":"\u9304", 
"\u933e":"\u93e8", 
"\u9452":"\u9451", 
"\u9486":"\u91d3", 
"\u9487":"\u91d4", 
"\u9488":"\u91dd", 
"\u9489":"\u91d8", 
"\u948a":"\u91d7", 
"\u948b":"\u91d9", 
"\u948c":"\u91d5", 
"\u948d":"\u91f7", 
"\u948e":"\u91fa", 
"\u948f":"\u91e7", 
"\u9490":"\u91e4", 
"\u9492":"\u91e9", 
"\u9493":"\u91e3", 
"\u9494":"\u9346", 
"\u9495":"\u91f9", 
"\u9496":"\u935a", 
"\u9497":"\u91f5", 
"\u9498":"\u9203", 
"\u9499":"\u9223", 
"\u949a":"\u9208", 
"\u949b":"\u9226", 
"\u949c":"\u9245", 
"\u949d":"\u920d", 
"\u949e":"\u9214", 
"\u949f":"\u9418", 
"\u94a0":"\u9209", 
"\u94a1":"\u92c7", 
"\u94a2":"\u92fc", 
"\u94a3":"\u9211", 
"\u94a4":"\u9210", 
"\u94a5":"\u9470", 
"\u94a6":"\u6b3d", 
"\u94a7":"\u921e", 
"\u94a8":"\u93a2", 
"\u94a9":"\u9264", 
"\u94aa":"\u9227", 
"\u94ab":"\u9201", 
"\u94ac":"\u9225", 
"\u94ad":"\u9204", 
"\u94ae":"\u9215", 
"\u94af":"\u9200", 
"\u94b0":"\u923a", 
"\u94b1":"\u9322", 
"\u94b2":"\u9266", 
"\u94b3":"\u9257", 
"\u94b4":"\u9237", 
"\u94b5":"\u7f3d", 
"\u94b6":"\u9233", 
"\u94b7":"\u9255", 
"\u94b8":"\u923d", 
"\u94b9":"\u9238", 
"\u94ba":"\u925e", 
"\u94bb":"\u947d", 
"\u94bc":"\u926c", 
"\u94bd":"\u926d", 
"\u94be":"\u9240", 
"\u94bf":"\u923f", 
"\u94c0":"\u923e", 
"\u94c1":"\u9435", 
"\u94c2":"\u9251", 
"\u94c3":"\u9234", 
"\u94c4":"\u9460", 
"\u94c5":"\u925b", 
"\u94c6":"\u925a", 
"\u94c8":"\u9230", 
"\u94c9":"\u9249", 
"\u94ca":"\u9248", 
"\u94cb":"\u924d", 
"\u94cc":"\u922e", 
"\u94cd":"\u9239", 
"\u94ce":"\u9438", 
"\u94cf":"\u9276", 
"\u94d0":"\u92ac", 
"\u94d1":"\u92a0", 
"\u94d2":"\u927a", 
"\u94d3":"\u92e9", 
"\u94d5":"\u92aa", 
"\u94d6":"\u92ee", 
"\u94d7":"\u92cf", 
"\u94d8":"\u92e3", 
"\u94d9":"\u9403", 
"\u94db":"\u943a", 
"\u94dc":"\u9285", 
"\u94dd":"\u92c1", 
"\u94de":"\u92b1", 
"\u94df":"\u92a6", 
"\u94e0":"\u93a7", 
"\u94e1":"\u9358", 
"\u94e2":"\u9296", 
"\u94e3":"\u9291", 
"\u94e4":"\u92cc", 
"\u94e5":"\u92a9", 
"\u94e7":"\u93f5", 
"\u94e8":"\u9293", 
"\u94e9":"\u93a9", 
"\u94ea":"\u927f", 
"\u94eb":"\u929a", 
"\u94ec":"\u927b", 
"\u94ed":"\u9298", 
"\u94ee":"\u931a", 
"\u94ef":"\u92ab", 
"\u94f0":"\u9278", 
"\u94f1":"\u92a5", 
"\u94f2":"\u93df", 
"\u94f3":"\u9283", 
"\u94f4":"\u940b", 
"\u94f5":"\u92a8", 
"\u94f6":"\u9280", 
"\u94f7":"\u92a3", 
"\u94f8":"\u9444", 
"\u94f9":"\u9412", 
"\u94fa":"\u92ea", 
"\u94fc":"\u9338", 
"\u94fd":"\u92f1", 
"\u94fe":"\u93c8", 
"\u94ff":"\u93d7", 
"\u9500":"\u92b7", 
"\u9501":"\u9396", 
"\u9502":"\u92f0", 
"\u9503":"\u92e5", 
"\u9504":"\u92e4", 
"\u9505":"\u934b", 
"\u9506":"\u92ef", 
"\u9507":"\u92e8", 
"\u9508":"\u93fd", 
"\u9509":"\u92bc", 
"\u950a":"\u92dd", 
"\u950b":"\u92d2", 
"\u950c":"\u92c5", 
"\u950d":"\u92f6", 
"\u950e":"\u9426", 
"\u950f":"\u9427", 
"\u9510":"\u92b3", 
"\u9511":"\u92bb", 
"\u9512":"\u92c3", 
"\u9513":"\u92df", 
"\u9514":"\u92e6", 
"\u9515":"\u9312", 
"\u9516":"\u9306", 
"\u9517":"\u937a", 
"\u9518":"\u9369", 
"\u9519":"\u932f", 
"\u951a":"\u9328", 
"\u951b":"\u931b", 
"\u951c":"\u9321", 
"\u951d":"\u9340", 
"\u951e":"\u9301", 
"\u951f":"\u9315", 
"\u9521":"\u932b", 
"\u9522":"\u932e", 
"\u9523":"\u947c", 
"\u9524":"\u9318", 
"\u9525":"\u9310", 
"\u9526":"\u9326", 
"\u9527":"\u9455", 
"\u9528":"\u9341", 
"\u9529":"\u9308", 
"\u952a":"\u9343", 
"\u952b":"\u9307", 
"\u952c":"\u931f", 
"\u952d":"\u9320", 
"\u952e":"\u9375", 
"\u952f":"\u92f8", 
"\u9530":"\u9333", 
"\u9531":"\u9319", 
"\u9532":"\u9365", 
"\u9534":"\u9347", 
"\u9535":"\u93d8", 
"\u9536":"\u9376", 
"\u9537":"\u9354", 
"\u9538":"\u9364", 
"\u9539":"\u936c", 
"\u953a":"\u937e", 
"\u953b":"\u935b", 
"\u953c":"\u93aa", 
"\u953e":"\u9370", 
"\u953f":"\u9384", 
"\u9540":"\u934d", 
"\u9541":"\u9382", 
"\u9542":"\u93e4", 
"\u9543":"\u93a1", 
"\u9544":"\u9428", 
"\u9545":"\u9387", 
"\u9546":"\u93cc", 
"\u9547":"\u93ae", 
"\u9549":"\u9398", 
"\u954a":"\u9477", 
"\u954b":"\u9482", 
"\u954c":"\u942b", 
"\u954d":"\u93b3", 
"\u954e":"\u93bf", 
"\u954f":"\u93a6", 
"\u9550":"\u93ac", 
"\u9551":"\u938a", 
"\u9552":"\u93b0", 
"\u9553":"\u93b5", 
"\u9554":"\u944c", 
"\u9555":"\u9394", 
"\u9556":"\u93e2", 
"\u9557":"\u93dc", 
"\u9558":"\u93dd", 
"\u9559":"\u93cd", 
"\u955a":"\u93f0", 
"\u955b":"\u93de", 
"\u955c":"\u93e1", 
"\u955d":"\u93d1", 
"\u955e":"\u93c3", 
"\u955f":"\u93c7", 
"\u9561":"\u9414", 
"\u9562":"\u941d", 
"\u9563":"\u9410", 
"\u9564":"\u93f7", 
"\u9565":"\u9465", 
"\u9566":"\u9413", 
"\u9567":"\u946d", 
"\u9568":"\u9420", 
"\u9569":"\u9479", 
"\u956a":"\u93f9", 
"\u956b":"\u9419", 
"\u956c":"\u944a", 
"\u956d":"\u9433", 
"\u956e":"\u9436", 
"\u956f":"\u9432", 
"\u9570":"\u942e", 
"\u9571":"\u943f", 
"\u9572":"\u9454", 
"\u9573":"\u9463", 
"\u9574":"\u945e", 
"\u9576":"\u9472", 
"\u957f":"\u9577", 
"\u9591":"\u9592", 
"\u95a7":"\u9b28", 
"\u95e8":"\u9580", 
"\u95e9":"\u9582", 
"\u95ea":"\u9583", 
"\u95eb":"\u9586", 
"\u95ed":"\u9589", 
"\u95ee":"\u554f", 
"\u95ef":"\u95d6", 
"\u95f0":"\u958f", 
"\u95f1":"\u95c8", 
"\u95f2":"\u9592", 
"\u95f3":"\u958e", 
"\u95f4":"\u9593", 
"\u95f5":"\u9594", 
"\u95f6":"\u958c", 
"\u95f7":"\u60b6", 
"\u95f8":"\u9598", 
"\u95f9":"\u9b27", 
"\u95fa":"\u95a8", 
"\u95fb":"\u805e", 
"\u95fc":"\u95e5", 
"\u95fd":"\u95a9", 
"\u95fe":"\u95ad", 
"\u95ff":"\u95d3", 
"\u9600":"\u95a5", 
"\u9601":"\u95a3", 
"\u9602":"\u95a1", 
"\u9603":"\u95ab", 
"\u9604":"\u9b2e", 
"\u9605":"\u95b1", 
"\u9606":"\u95ac", 
"\u9608":"\u95be", 
"\u9609":"\u95b9", 
"\u960a":"\u95b6", 
"\u960b":"\u9b29", 
"\u960c":"\u95bf", 
"\u960d":"\u95bd", 
"\u960e":"\u95bb", 
"\u960f":"\u95bc", 
"\u9610":"\u95e1", 
"\u9611":"\u95cc", 
"\u9612":"\u95c3", 
"\u9614":"\u95ca", 
"\u9615":"\u95cb", 
"\u9616":"\u95d4", 
"\u9617":"\u95d0", 
"\u9619":"\u95d5", 
"\u961a":"\u95de", 
"\u961f":"\u968a", 
"\u9633":"\u967d", 
"\u9634":"\u9670", 
"\u9635":"\u9663", 
"\u9636":"\u968e", 
"\u9645":"\u969b", 
"\u9646":"\u9678", 
"\u9647":"\u96b4", 
"\u9648":"\u9673", 
"\u9649":"\u9658", 
"\u9655":"\u965d", 
"\u9667":"\u9689", 
"\u9668":"\u9695", 
"\u9669":"\u96aa", 
"\u968f":"\u96a8", 
"\u9690":"\u96b1", 
"\u96b6":"\u96b8", 
"\u96bd":"\u96cb", 
"\u96be":"\u96e3", 
"\u96cf":"\u96db", 
"\u96e0":"\u8b8e", 
"\u96f3":"\u9742", 
"\u96fe":"\u9727", 
"\u9701":"\u973d", 
"\u9709":"\u9ef4", 
"\u972d":"\u9744", 
"\u9753":"\u975a", 
"\u9759":"\u975c", 
"\u9763":"\u9762", 
"\u9765":"\u9768", 
"\u9791":"\u97c3", 
"\u9792":"\u6a47", 
"\u97af":"\u97c9", 
"\u97e6":"\u97cb", 
"\u97e7":"\u97cc", 
"\u97e8":"\u97cd", 
"\u97e9":"\u97d3", 
"\u97ea":"\u97d9", 
"\u97eb":"\u97de", 
"\u97ec":"\u97dc", 
"\u97f5":"\u97fb", 
"\u9875":"\u9801", 
"\u9876":"\u9802", 
"\u9877":"\u9803", 
"\u9878":"\u9807", 
"\u9879":"\u9805", 
"\u987a":"\u9806", 
"\u987b":"\u9808", 
"\u987c":"\u980a", 
"\u987d":"\u9811", 
"\u987e":"\u9867", 
"\u987f":"\u9813", 
"\u9880":"\u980e", 
"\u9881":"\u9812", 
"\u9882":"\u980c", 
"\u9883":"\u980f", 
"\u9884":"\u9810", 
"\u9885":"\u9871", 
"\u9886":"\u9818", 
"\u9887":"\u9817", 
"\u9888":"\u9838", 
"\u9889":"\u9821", 
"\u988a":"\u9830", 
"\u988b":"\u9832", 
"\u988c":"\u981c", 
"\u988d":"\u6f41", 
"\u988f":"\u9826", 
"\u9890":"\u9824", 
"\u9891":"\u983b", 
"\u9893":"\u9839", 
"\u9894":"\u9837", 
"\u9896":"\u7a4e", 
"\u9897":"\u9846", 
"\u9898":"\u984c", 
"\u9899":"\u9852", 
"\u989a":"\u984e", 
"\u989b":"\u9853", 
"\u989c":"\u984f", 
"\u989d":"\u984d", 
"\u989e":"\u9873", 
"\u989f":"\u9862", 
"\u98a0":"\u985b", 
"\u98a1":"\u9859", 
"\u98a2":"\u9865", 
"\u98a4":"\u986b", 
"\u98a5":"\u986c", 
"\u98a6":"\u9870", 
"\u98a7":"\u9874", 
"\u98ce":"\u98a8", 
"\u98d1":"\u98ae", 
"\u98d2":"\u98af", 
"\u98d3":"\u98b6", 
"\u98d4":"\u98b8", 
"\u98d5":"\u98bc", 
"\u98d7":"\u98c0", 
"\u98d8":"\u98c4", 
"\u98d9":"\u98c6", 
"\u98da":"\u98c8", 
"\u98de":"\u98db", 
"\u98e8":"\u9957", 
"\u990d":"\u995c", 
"\u9965":"\u98e2", 
"\u9966":"\u98e5", 
"\u9967":"\u9933", 
"\u9968":"\u98e9", 
"\u9969":"\u993c", 
"\u996a":"\u98ea", 
"\u996b":"\u98eb", 
"\u996c":"\u98ed", 
"\u996d":"\u98ef", 
"\u996e":"\u98f2", 
"\u996f":"\u991e", 
"\u9970":"\u98fe", 
"\u9971":"\u98fd", 
"\u9972":"\u98fc", 
"\u9973":"\u98ff", 
"\u9974":"\u98f4", 
"\u9975":"\u990c", 
"\u9976":"\u9952", 
"\u9977":"\u9909", 
"\u9978":"\u9904", 
"\u9979":"\u990e", 
"\u997a":"\u9903", 
"\u997b":"\u990f", 
"\u997c":"\u9905", 
"\u997d":"\u9911", 
"\u997f":"\u9913", 
"\u9980":"\u9918", 
"\u9981":"\u9912", 
"\u9983":"\u991c", 
"\u9984":"\u991b", 
"\u9985":"\u9921", 
"\u9986":"\u9928", 
"\u9987":"\u9937", 
"\u9988":"\u994b", 
"\u9989":"\u9936", 
"\u998a":"\u993f", 
"\u998b":"\u995e", 
"\u998d":"\u9943", 
"\u998e":"\u993a", 
"\u998f":"\u993e", 
"\u9990":"\u9948", 
"\u9991":"\u9949", 
"\u9992":"\u9945", 
"\u9993":"\u994a", 
"\u9994":"\u994c", 
"\u9995":"\u995f", 
"\u9a03":"\u5446", 
"\u9a6c":"\u99ac", 
"\u9a6d":"\u99ad", 
"\u9a6e":"\u99b1", 
"\u9a6f":"\u99b4", 
"\u9a70":"\u99b3", 
"\u9a71":"\u9a45", 
"\u9a73":"\u99c1", 
"\u9a74":"\u9a62", 
"\u9a75":"\u99d4", 
"\u9a76":"\u99db", 
"\u9a77":"\u99df", 
"\u9a78":"\u99d9", 
"\u9a79":"\u99d2", 
"\u9a7a":"\u9a36", 
"\u9a7b":"\u99d0", 
"\u9a7c":"\u99dd", 
"\u9a7d":"\u99d1", 
"\u9a7e":"\u99d5", 
"\u9a7f":"\u9a5b", 
"\u9a80":"\u99d8", 
"\u9a81":"\u9a4d", 
"\u9a82":"\u7f75", 
"\u9a84":"\u9a55", 
"\u9a85":"\u9a4a", 
"\u9a86":"\u99f1", 
"\u9a87":"\u99ed", 
"\u9a88":"\u99e2", 
"\u9a8a":"\u9a6a", 
"\u9a8b":"\u9a01", 
"\u9a8c":"\u9a57", 
"\u9a8e":"\u99f8", 
"\u9a8f":"\u99ff", 
"\u9a90":"\u9a0f", 
"\u9a91":"\u9a0e", 
"\u9a92":"\u9a0d", 
"\u9a93":"\u9a05", 
"\u9a96":"\u9a42", 
"\u9a97":"\u9a19", 
"\u9a98":"\u9a2d", 
"\u9a9a":"\u9a37", 
"\u9a9b":"\u9a16", 
"\u9a9c":"\u9a41", 
"\u9a9d":"\u9a2e", 
"\u9a9e":"\u9a2b", 
"\u9a9f":"\u9a38", 
"\u9aa0":"\u9a43", 
"\u9aa1":"\u9a3e", 
"\u9aa2":"\u9a44", 
"\u9aa3":"\u9a4f", 
"\u9aa4":"\u9a5f", 
"\u9aa5":"\u9a65", 
"\u9aa7":"\u9a64", 
"\u9ac5":"\u9acf", 
"\u9acb":"\u9ad6", 
"\u9acc":"\u9ad5", 
"\u9b13":"\u9b22", 
"\u9b47":"\u9b58", 
"\u9b49":"\u9b4e", 
"\u9c7c":"\u9b5a", 
"\u9c7d":"\u9b5b", 
"\u9c7f":"\u9b77", 
"\u9c81":"\u9b6f", 
"\u9c82":"\u9b74", 
"\u9c85":"\u9b81", 
"\u9c86":"\u9b83", 
"\u9c87":"\u9bf0", 
"\u9c88":"\u9c78", 
"\u9c8a":"\u9b93", 
"\u9c8b":"\u9b92", 
"\u9c8d":"\u9b91", 
"\u9c8e":"\u9c5f", 
"\u9c8f":"\u9b8d", 
"\u9c90":"\u9b90", 
"\u9c91":"\u9bad", 
"\u9c92":"\u9b9a", 
"\u9c94":"\u9baa", 
"\u9c95":"\u9b9e", 
"\u9c96":"\u9ba6", 
"\u9c97":"\u9c02", 
"\u9c99":"\u9c60", 
"\u9c9a":"\u9c6d", 
"\u9c9b":"\u9bab", 
"\u9c9c":"\u9bae", 
"\u9c9d":"\u9bba", 
"\u9c9e":"\u9bd7", 
"\u9c9f":"\u9c58", 
"\u9ca0":"\u9bc1", 
"\u9ca1":"\u9c7a", 
"\u9ca2":"\u9c31", 
"\u9ca3":"\u9c39", 
"\u9ca4":"\u9bc9", 
"\u9ca5":"\u9c23", 
"\u9ca6":"\u9c37", 
"\u9ca7":"\u9bc0", 
"\u9ca8":"\u9bca", 
"\u9ca9":"\u9bc7", 
"\u9cab":"\u9bfd", 
"\u9cad":"\u9bd6", 
"\u9cae":"\u9bea", 
"\u9cb0":"\u9beb", 
"\u9cb1":"\u9be1", 
"\u9cb2":"\u9be4", 
"\u9cb3":"\u9be7", 
"\u9cb4":"\u9bdd", 
"\u9cb5":"\u9be2", 
"\u9cb6":"\u9bf0", 
"\u9cb7":"\u9bdb", 
"\u9cb8":"\u9be8", 
"\u9cba":"\u9bf4", 
"\u9cbb":"\u9bd4", 
"\u9cbc":"\u9c5d", 
"\u9cbd":"\u9c08", 
"\u9cbf":"\u9c68", 
"\u9cc1":"\u9c1b", 
"\u9cc3":"\u9c13", 
"\u9cc4":"\u9c77", 
"\u9cc5":"\u9c0d", 
"\u9cc6":"\u9c12", 
"\u9cc7":"\u9c09", 
"\u9cca":"\u9bff", 
"\u9ccb":"\u9c20", 
"\u9ccc":"\u9c32", 
"\u9ccd":"\u9c2d", 
"\u9cce":"\u9c28", 
"\u9ccf":"\u9c25", 
"\u9cd0":"\u9c29", 
"\u9cd1":"\u9c1f", 
"\u9cd2":"\u9c1c", 
"\u9cd3":"\u9c33", 
"\u9cd4":"\u9c3e", 
"\u9cd5":"\u9c48", 
"\u9cd6":"\u9c49", 
"\u9cd7":"\u9c3b", 
"\u9cd8":"\u9c35", 
"\u9cd9":"\u9c45", 
"\u9cdb":"\u9c3c", 
"\u9cdc":"\u9c56", 
"\u9cdd":"\u9c54", 
"\u9cde":"\u9c57", 
"\u9cdf":"\u9c52", 
"\u9ce2":"\u9c67", 
"\u9ce3":"\u9c63", 
"\u9d8f":"\u96de", 
"\u9dc4":"\u96de", 
"\u9e1f":"\u9ce5", 
"\u9e20":"\u9ce9", 
"\u9e21":"\u96de", 
"\u9e22":"\u9cf6", 
"\u9e23":"\u9cf4", 
"\u9e25":"\u9dd7", 
"\u9e26":"\u9d09", 
"\u9e27":"\u9dac", 
"\u9e28":"\u9d07", 
"\u9e29":"\u9d06", 
"\u9e2a":"\u9d23", 
"\u9e2b":"\u9d87", 
"\u9e2c":"\u9e15", 
"\u9e2d":"\u9d28", 
"\u9e2e":"\u9d1e", 
"\u9e2f":"\u9d26", 
"\u9e30":"\u9d12", 
"\u9e31":"\u9d1f", 
"\u9e32":"\u9d1d", 
"\u9e33":"\u9d1b", 
"\u9e35":"\u9d15", 
"\u9e36":"\u9de5", 
"\u9e37":"\u9dd9", 
"\u9e38":"\u9d2f", 
"\u9e39":"\u9d30", 
"\u9e3a":"\u9d42", 
"\u9e3b":"\u9d34", 
"\u9e3c":"\u9d43", 
"\u9e3d":"\u9d3f", 
"\u9e3e":"\u9e1e", 
"\u9e3f":"\u9d3b", 
"\u9e41":"\u9d53", 
"\u9e42":"\u9e1d", 
"\u9e43":"\u9d51", 
"\u9e44":"\u9d60", 
"\u9e45":"\u9d5d", 
"\u9e46":"\u9d52", 
"\u9e47":"\u9df4", 
"\u9e48":"\u9d5c", 
"\u9e49":"\u9d61", 
"\u9e4a":"\u9d72", 
"\u9e4b":"\u9d93", 
"\u9e4c":"\u9d6a", 
"\u9e4e":"\u9d6f", 
"\u9e4f":"\u9d6c", 
"\u9e50":"\u9d6e", 
"\u9e51":"\u9d89", 
"\u9e52":"\u9d8a", 
"\u9e55":"\u9d98", 
"\u9e56":"\u9da1", 
"\u9e57":"\u9d9a", 
"\u9e58":"\u9dbb", 
"\u9e59":"\u9d96", 
"\u9e5a":"\u9dbf", 
"\u9e5b":"\u9da5", 
"\u9e5c":"\u9da9", 
"\u9e5e":"\u9dc2", 
"\u9e61":"\u9dba", 
"\u9e63":"\u9dbc", 
"\u9e64":"\u9db4", 
"\u9e65":"\u9dd6", 
"\u9e66":"\u9e1a", 
"\u9e67":"\u9dd3", 
"\u9e68":"\u9dda", 
"\u9e69":"\u9def", 
"\u9e6a":"\u9de6", 
"\u9e6b":"\u9df2", 
"\u9e6c":"\u9df8", 
"\u9e6d":"\u9dfa", 
"\u9e6f":"\u9e07", 
"\u9e70":"\u9df9", 
"\u9e71":"\u9e0c", 
"\u9e73":"\u9e1b", 
"\u9e7e":"\u9e7a", 
"\u9ea6":"\u9ea5", 
"\u9eb8":"\u9ea9", 
"\u9ebd":"\u9ebc", 
"\u9ec4":"\u9ec3", 
"\u9ec9":"\u9ecc", 
"\u9ee1":"\u9ef6", 
"\u9ee9":"\u9ef7", 
"\u9eea":"\u9ef2", 
"\u9efe":"\u9efd", 
"\u9f0b":"\u9eff", 
"\u9f0d":"\u9f09", 
"\u9f39":"\u9f34", 
"\u9f50":"\u9f4a", 
"\u9f51":"\u9f4f", 
"\u9f76":"\u984e", 
"\u9f7f":"\u9f52", 
"\u9f80":"\u9f54", 
"\u9f83":"\u9f5f", 
"\u9f84":"\u9f61", 
"\u9f85":"\u9f59", 
"\u9f86":"\u9f60", 
"\u9f87":"\u9f5c", 
"\u9f88":"\u9f66", 
"\u9f89":"\u9f6c", 
"\u9f8a":"\u9f6a", 
"\u9f8b":"\u9f72", 
"\u9f8c":"\u9f77", 
"\u9f99":"\u9f8d", 
"\u9f9a":"\u9f94", 
"\u9f9b":"\u9f95", 
"\u9f9f":"\u9f9c", 
"\ue5f1":"\u3000"
};

		//	remove comments
		_h = _h.replace(/<!--[\s\S]*?-->/gi, '');
		
		//	normalize some stuff
		_h = _h.replace(/<\s+/gi, '$1');
		_h = _h.replace(/\s+>/gi, '$1');
		_h = _h.replace(/\s+\/>/gi, '/>');
		_h = _h.replace(/\s*=\s*/gi, '=');
		_h = _h.replace(/(&nbsp;)+/gi, ' ');

		var zhmap = TongWen.s_2_t;
		
		_h = _h.replace
		(
			/[^\x00-\xFF]/g,
			function (s) {
				return ((s in zhmap)?zhmap[s]:s);
			}
		);
		
		//	hold repository
		var
			_hold_repository = {},								// as object
			_hold_repository_length = 0,						// length
			_readable_attr_regex = /<([a-z0-9]+)([^>]+?)readable_attr_(big_image|mark_keep|mark_delete|only_content)="1"([^>]*)>/ig,
			_readable_attr_regex_match = false
		;

		while (true)
		{
			_readable_attr_regex_match = _readable_attr_regex.exec(_h);
			if (_readable_attr_regex_match); else { break; }
			
			var 
				_whole = _readable_attr_regex_match[0],
				_operation = _readable_attr_regex_match[3],
				_tag = _readable_attr_regex_match[1],
				_start_tag_pos = (_readable_attr_regex.lastIndex - _whole.length),
				_end_tag_pos = $R.processHTML__findEndTag(_h, _tag, _start_tag_pos)
			;

			if (_end_tag_pos === false) { continue; }
			var _sub_string = _h.substring(_start_tag_pos, _end_tag_pos);
			
			switch (_operation)
			{
				case 'big_image':
					_hold_repository['i'+_hold_repository_length] = '<div class="readableBigImage">' + _sub_string + '</div>';
					_h = '' 
						+ _h.substr(0, _start_tag_pos)
						+ '[=readable_hold('+_hold_repository_length+')]'
						+ _h.substr(_end_tag_pos)
					;
					_hold_repository_length++;
					break;
					
				case 'mark_keep':
					_hold_repository['i'+_hold_repository_length] = _sub_string;
					_h = '' 
						+ _h.substr(0, _start_tag_pos)
						+ '[=readable_hold('+_hold_repository_length+')]'
						+ _h.substr(_end_tag_pos)
					;
					_hold_repository_length++;
					break;
					
				case 'mark_delete':
					_h = '' 
						+ _h.substr(0, _start_tag_pos)
						+ ' '
						+ _h.substr(_end_tag_pos)
					;
					//	add a space, because we always want to be increasing the lastIndex of the RegEx
					break;
					
				case 'only_content':
					_h = '' 
						+ _h.substr(0, _start_tag_pos)
						+ '<div>' 
						+ 	_sub_string.replace(/^<[^>]+>/i, '').replace(/<\/[^>]+>$/i, '')
						+ '</div>'	
						+ _h.substr(_end_tag_pos)
					;
					break;
			}

			_readable_attr_regex.lastIndex = (_start_tag_pos + 1);
		}
		
		//	remove all elements that can not possibly have any content we're interested in
		//	ordered alphabetically
		//		$a = explode('|', 'embed|frame|iframe|map|marquee|noframes|noscript|object|script|select|style|textarea');
		//		sort($a); echo implode('|', $a); die();
		_h = _h.replace(/<(button|canvas|embed|frame|input|iframe|link|map|marquee|nobr|noframes|noscript|object|script|select|style|textarea)[\s\S]*?<\/\1>/gi, '');
		_h = _h.replace(/<(button|canvas|embed|frame|input|iframe|link|map|marquee|nobr|noframes|noscript|object|script|select|style|textarea)[\s\S]*?>/gi, '');
		
		//	replace bold/italic
		_h = _h.replace(/<span style="font-weight:\s*bold[^>]*>([^>]+?)<\/span>/gi, '<b>$1</b>');
		_h = _h.replace(/<span style="font-style:\s*italic[^>]*>([^>]+?)<\/span>/gi, '<i>$1</i>');

		//	remove all attributes from all elements
		//	except for a few select element-attribut pairs
		var _attribute_preg = /\s*([a-z0-9_-]+)="[^"]*"/gi;
		_h = _h.replace
		(
			/<([a-z0-9_-]+)( [^>]+)>/gi, 
			function (_m, _k, _a)
			{
				var _tag = _k.toLowerCase();
				switch (true)
				{
					case (_tag == 'a'):
						return ''
							+ '<'+_k
							+ ' target="_blank"'
							+ _a.replace(
								_attribute_preg, 
								function (__m, __a) { return (__a.match(/^(href|id|name|title)$/i) ? __m : ''); }
							)
							+ '>';
						
					case (_tag == 'img'):
						return ''
							+ '<'+_k
							+ _a.replace(
								_attribute_preg, 
								function (__m, __a) { return (__a.match(/^(height|id|src|width|title)$/i) ? __m : ''); }
							)
							+ '/>';
					
					case (_tag == 'td'):
					case (_tag == 'th'):
						return ''
							+ '<'+_k
							+ _a.replace(
								_attribute_preg, 
								function (__m, __a) { return (__a.match(/^(colspan|id|rowspan)$/i) ? __m : ''); }
							)
							+ '>';

					default:
						return ''
							+ '<'+_k
							+ _a.replace(
								_attribute_preg, 
								function (__m, __a) { return (__a.match(/^(id)$/i ) ? __m : ''); }
							)
							+ '>';
				}
			}
		);

		//	make BRs out of empty Ps
		_h = _h.replace(/<p>\s*<\/p>/gi, '<br/><br/>');

		//	delete soft BRs -- whatever the fuck those are
		_h = _h.replace(/<br[^>]*?soft[^>]*>/gi, '');
		
		//	normalize BRs, HRs
		_h = _h.replace(/<(br|hr)[^>]*>/gi, '<$1/>');

		//	remove all self closing elements -- except for br and hr
		_h = _h.replace(/<(?!(br|hr|img))([^>]+)\/>/gi, '');

		//	remove tags of some elements -- but leave content
		//	plus elements with underscore in their definition
		_h = _h.replace(/<\/?(body|center|fieldset|font|form|span)([^>]*)>/gi, '');
		_h = _h.replace(/<\/?([a-z]+)(_|:)([a-z]+)([^>]*)>/gi, '');

		//	make Ps out of bits of text with double BRs splattered throughout
		_h = _h.replace(/<br\/>\s*<br\/>/gi, '</p><p>');

		//	remove <br/> after p
		_h = _h.replace(/<\/(div|h\d|ol|p|table|ul)>\s*<br\/>/gi, '</$1>');
		_h = _h.replace(/<br\/>\s*<(div|h\d|ol|p|table|ul)>/gi, '</$1>');

		//	remove <br/> inside p, div
		_h = _h.replace(/<(p|div)>\s*<br\/>\s*<\/\1>/gi, '');
	
		//	remove empty LIs, ULs, OLs, DIVs, and Ps -- in that order
		_h = _h.replace(/<li[^>]*>\s*<\/li>/gi, '');
		_h = _h.replace(/<(ul|ol)[^>]*>\s*<\/\1>/gi, '');
		_h = _h.replace(/<(div|p)[^>]*>\s*<\/\1>/gi, '');
	
		//	put stuff back
		_h = _h.replace
		(
			/\[=readable_hold\(([0-9]+)\)\]/gi,
			function (_match, _key) {
				return (_hold_repository['i'+_key] ? _hold_repository['i'+_key] : '').replace(/<([^>]+?)style="[^">]+"([^>]*)>/i, '<$1$2>');
			}
		);
	
		return _h;
	};

	
	/* helper functions */
	/* ================ */
	
	$R.processHTML__findEndTag = function (_html, _tag, _start_tag_pos)
	{
		//	self closing tags
		switch (_tag)
		{
			case 'img':
			case 'br':
			case 'hr':
			case 'embed':
			
				var _r = />/ig;
					_r.lastIndex = _start_tag_pos;
					_r.exec(_html);
				
				return (_r.lastIndex);
		}

		
		//	count opens and closes
		var
			_r_open = new RegExp('<'+_tag+'[^a-z0-9]', 'ig'),
			_r_close = new RegExp('</'+_tag+'>', 'ig'),
			_r_close_main = new RegExp('</'+_tag+'>', 'ig'),
			_r_match,
			_r_subString
		;
		_r_close_main.lastIndex = _start_tag_pos;
		
		while (true)
		{
			_r_match = _r_close_main.exec(_html);
			if (_r_match); else { return false; }
			
			_r_subString = _html.substring(_start_tag_pos, _r_close_main.lastIndex);
			
			var
				_open_nr = _r_subString.match(_r_open),
				_open_nr = (_open_nr ? _open_nr.length : 0),
				_close_nr = _r_subString.match(_r_close),
				_close_nr = (_close_nr ? _close_nr.length : 0)
			;
			
			if ((_open_nr > 0) && (_open_nr == _close_nr)){
				return (_r_close_main.lastIndex);
			}
		}
	};
	

	$R.displayHTML = function (_processedHTML)
	{
		//	display processed
		$R.$iframeText.html(_processedHTML);

		//	fix named anchor links
		//	======================
		
		var _curr_url = ''
			+ $R.win.location.protocol + '//'
			+ $R.win.location.host
			+ $R.win.location.pathname
		;
		
		$R.$iframeText.find('a[href]').each(function (_i, _e)
		{
			var _href = $(_e).attr('href').replace(_curr_url, '');
			
			//	only anchors
			if (_href.match(/^#/gi)); else { return; }

			//	only anchor name
			_href = _href.substr(1);
			
			//	set full path to href -- if user copies the link, it will be complete
			$(_e).attr('href', _curr_url + '#' + _href);

			//	bind function
			$(_e).click(function(){ $R.goToNamedAnchor(_href); return false; });
		});
	};
	
	
/* show functions */
/* ============== */

	$R.scrolledWindowWhileReadableVisible = function ()
	{
		if ($R.iOS) { return; }
	
		//	if original window is somehow scrolled, while Readable is visible
		//	move the cover and the iframe
		//	this event is binded and unbinded by the show/hide functions
	
		var _win_top = $($R.win).scrollTop()+'px';

		$R.$iframe.css('top', _win_top);
		$R.$cover.css('top', _win_top);
	};

	$R.show = function ()
	{
		//	debug
		$R.printDebugOutput();
	
		//	before visible
		$R.$document
			.find('body, html')
				.addClass('readableBeforeVisible');
	
		//	frame
		$(window).scrollTop(0);

		var 
			_win_height = $($R.win).height(),
			_win_v_scroll = $($R.win).scrollTop()
		;
		
		//	set cover to above scroll
		$R.$cover.show();
		$R.$cover.css('top', (_win_v_scroll-_win_height)+'px');
		
		//	animate cover down
		$R.$cover.animate
		(
			{top:_win_v_scroll+'px'}, 
			'normal',
			function ()
			{
				//	hide scrollbar and objects
				$R.$document
					.find('body, html')
					.add($R.$iframe)
						.addClass('readableVisible');

				//	set min-height
				$('#body').css('min-height', $R.$iframe.height()+'px');
						
				//	show iframe
				$R.$iframe.css('top', $($R.win).scrollTop()+'px');

				//	hide cover
				$R.$cover.hide();
				
				//	bind to scroll
				$($R.win.document).bind('scroll', $R.scrolledWindowWhileReadableVisible);
				
				//	focus
				if (window.focus) { window.focus(); }
		
				//	finished
				$R.visible = true;
			}
		);
	};
	
	$R.hide = function ()
	{
		var 
			_win_height = $($R.win).height(),
			_win_v_scroll = $($R.win).scrollTop()
		;

		//	unbind
		$($R.win.document).unbind('scroll', $R.scrolledWindowWhileReadableVisible);
		
		//	show cover
		$R.$cover.show();
		
		//	hide
		$R.$iframe.css('top', '-100%');

		//	show scrollbars and objects
		$R.$document
			.find('body, html')
			.add($R.$iframe)
				.removeClass('readableVisible');

		$R.$cover.animate
		(
			{top:_win_v_scroll-_win_height+'px'},
			'normal', 
			function ()
			{
				//	hide
				$R.$cover.css('top', '-100%');
				$R.$cover.hide();

				//	before visible
				$R.$document
					.find('body, html')
						.removeClass('readableBeforeVisible');
				
				//	focus
				if ($R.win.focus) { $R.win.focus(); }
				
				//	finished
				$R.visible = false;
			}
		);
	};

/* log */
/* === */

	$R.callLog = function ()
	{
		if ($R.debug) { return; }
		
		var 
			_shortcuts = {
				'text_font': 			'tf',
				'text_font_monospace':	'tfm',
				'text_font_header':		'tfh',

				'text_size': 			'ts',
				'text_line_height': 	'tlh',
				'box_width': 			'bw',

				'color_background': 	'cb',
				'color_text': 			'ct',
				'color_links': 			'cl',
				
				'text_align': 			'ta',
				'base': 				'b',
			},
			_log_options_string = '',
			_custom_css_string = '',
			_log_url = ''
		;

		//	cosntruct options string
		if ($R.options) {
			for (var _option in _shortcuts) {
				_log_options_string += "[[="+_shortcuts[_option]+": "+$R.options[_option]+"]]";
			}
		}

		//	construct url
		_log_url = ''
			+ $R.linksPath+'log.js?'
			+ 'rand=' 		+ encodeURIComponent(Math.random())
			+ '&url=' 		+ encodeURIComponent($R.win.location.href)
			+ '&options=' 	+ encodeURIComponent(_log_options_string)
			+ '&customCSS=' + encodeURIComponent($R.options['custom_css'])
		;
	
		//	wait 2500 seonds
		window.setTimeout
		(
			function ()
			{
				//	create
				var	_script = document.createElement('script');
					_script.setAttribute('src', _log_url);
				
				//	will not actually show up in the document
				//	jQuery does stuff with scripts
				$('body').append(_script);
			}, 
			2500
		);
		
		//	check to see if using custom theme
		//	and propose another theme
	};
	
	
/* launch */
/* ====== */

	$R.bookmarkletClicked = function ()
	{
		//	console might not have been activated on first run
		if ($R.debug) { $R.initializeWriteLogFunction(); }

		
		if ($R.visible)
		{
			$R.hide();
		}
		else
		{
			//	set options -- in case they changed
			$R.setOptions();

			//	time Get Content
			if ($R.debug) { $R.debugTimerStart('getContent'); }
			$R.getContent();
			if ($R.debug) { $R.debugOutputsFixed['GetContent'] = $R.debugTimerEnd(); }
			
			//	show
			$R.show();
		}
		
		$R.bookmarkletTimer = false;
	};

	//	custom hook
	if ($R.beforeLaunchHook) { $R.beforeLaunchHook(); }

	//	auto-launch
	$R.bookmarkletClicked();

	//	log this instance; logger will delay itself
	$R.callLog();

/* finish */
/* ====== */
	
		})(window.parent.$readable);
	}
);