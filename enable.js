var doc = document;
var body = doc.body;
var html = doc.documentElement;
html.onselectstart = html.oncopy = html.oncut = html.onpaste = html.onkeydown = html.oncontextmenu = html.onmousemove = body.oncopy = body.oncut = body.onpaste = body.onkeydown = body.oncontextmenu = body.onmousemove = body.onselectstart = body.ondragstart = doc.onselectstart = doc.oncopy = doc.oncut = doc.onpaste = doc.onkeydown = doc.oncontextmenu = doc.onmousedown = doc.onmouseup = null;
body.style.webkitUserSelect = 'auto';

function defaultHandler(event) {
	event.returnValue = true;
}
for (event_type in ['selectstart', 'copy', 'cut', 'paste', 'keydown', 'contextmenu', 'dragstart']) {
	html.addEventListener(event_type, defaultHandler);
	body.addEventListener(event_type, defaultHandler);
	doc.addEventListener(event_type, defaultHandler);
}

var div = document.createElement('div');
div.setAttribute('onclick', 'return window;');
var unsafeWindow = div.onclick();
var jQuery = unsafeWindow.jQuery;
if (jQuery) {
	jQuery(unsafeWindow.document).unbind();
	jQuery(unsafeWindow.body).unbind();
}

var url = doc.URL;
var domain_pattern = /^https?:\/\/([^\/]+)/;
var result = domain_pattern.exec(url);
if (result) {
	try {
		switch(result[1]) {
			case 'www.qidian.com':
			case 'www.qdmm.com':
				var element = doc.getElementById('bigcontbox');
				if (element) {
					element.onmousedown = null;
				}
				break;
			case 'blog.naver.com':
				unsafeWindow.$Fn.freeElement(unsafeWindow.document);
				break;
			case 'www.motie.com':
				element = jQuery('.page-content>pre')[0];
				element.ondragstart = element.oncopy = element.oncut = element.oncontextmenu = null;
				break;
			case 'board.miznet.daum.net':
				var gaia = unsafeWindow.gaia;
				doc.removeEventListener('selectstart', gaia.blockContent, false);
				doc.removeEventListener('dragstart', gaia.blockContent, false);
				doc.removeEventListener('contextmenu', gaia.blockContent, false);
				doc.removeEventListener('copy', gaia.blockContent, false);
				doc.removeEventListener('keydown', gaia.blockContent, false);
				break;
			case 'book.zongheng.com':
				element = jQuery('.readcon')[0];
				element.style.webkitUserSelect = 'auto';
				element.onselectstart = null;
				break;
			case 'www.kasi-time.com':
				element = doc.getElementById('center');
				if (element) {
					element.onmousedown = null;
					element = element.getElementsByClassName('mainkashi');
					if (element) {
						element[0].style.webkitUserSelect = 'auto';
					}
				}
				break;
		}
	} catch (e) {
	}
}