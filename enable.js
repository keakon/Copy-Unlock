var doc = document;
var body = doc.body;
var html = doc.documentElement;
html.onselectstart = html.oncopy = html.oncut = html.onpaste = html.onkeydown = html.oncontextmenu = html.onmousemove = body.oncopy = body.oncut = body.onpaste = body.onkeydown = body.oncontextmenu = body.onmousemove = body.onselectstart = body.ondragstart = doc.onselectstart = doc.oncopy = doc.oncut = doc.onpaste = doc.onkeydown = doc.oncontextmenu = null;
body.style.webkitUserSelect = 'auto';

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
		}
	} catch (e) {
	}
}