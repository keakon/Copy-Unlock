var doc = document;
var body = doc.body;
body.onselectstart = body.oncopy = body.onpaste = body.onkeydown = body.oncontextmenu = body.onmousemove = body.onselectstart = body.ondragstart = doc.onselectstart = doc.oncopy = doc.onpaste = doc.onkeydown = doc.oncontextmenu = null;

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
				var element = doc.getElementById('bigcontbox');
				if (element) {
					element.onmousedown = null;
				}
				break;
			case 'blog.naver.com':
				unsafeWindow.$Fn.freeElement(unsafeWindow.document);
				break;
		}
	} catch (e) {
	}
}