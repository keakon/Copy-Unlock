var doc = document;
var body = doc.body;
body.onselectstart = body.oncopy = body.onpaste = body.onkeydown = body.oncontextmenu = body.onmousemove = body.onselectstart = body.ondragstart = doc.onselectstart = doc.oncopy = doc.onpaste = doc.onkeydown = doc.oncontextmenu = null;

var url = doc.URL;
var domain_pattern = /^https?:\/\/([^\/]+)/;
var result = domain_pattern.exec(url);
if (result && result[1] == 'www.qidian.com') {
	var element = doc.getElementById('bigcontbox');
	if (element) {
		element.onmousedown = null;
	}
}