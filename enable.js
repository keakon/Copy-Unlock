(function() {
var doc = document;
var body = doc.body;
var html = doc.documentElement;

function clearHandlers() {
	html.onselectstart = html.oncopy = html.oncut = html.onpaste = html.onkeydown = html.oncontextmenu = html.onmousemove = body.oncopy = body.oncut = body.onpaste = body.onkeydown = body.oncontextmenu = body.onmousemove = body.onselectstart = body.ondragstart = doc.onselectstart = doc.oncopy = doc.oncut = doc.onpaste = doc.onkeydown = doc.oncontextmenu = doc.onmousedown = doc.onmouseup = window.onkeyup = window.onkeydown = null;
	body.style.webkitUserSelect = 'auto';
}
clearHandlers();

function defaultHandler(event) {
	event.returnValue = true;
}
for (event_type in ['selectstart', 'copy', 'cut', 'paste', 'keydown', 'contextmenu', 'dragstart']) {
	html.addEventListener(event_type, defaultHandler);
	body.addEventListener(event_type, defaultHandler);
	doc.addEventListener(event_type, defaultHandler);
}

var jQuery = window.jQuery;
if (jQuery) {
	var $doc = jQuery(doc);
	var $body = jQuery(body)
	if ($doc.off) {
		$doc.off();
		$body.off();
	} else {
		$doc.unbind();
		$body.unbind();
	}
}

var $Fn = window.$Fn;
if ($Fn) {
	try {
		$Fn.freeElement(doc);
		$Fn.freeElement(body);
	} catch (e) {}
}

var jindo = window.jindo;
if (jindo) {
	jindo.$A = null;
}

function replaceElemntEventsWithClone(element) {
	var clone = element.cloneNode();
	while (element.firstChild) {
		clone.appendChild(element.lastChild);
	}
	element.parentNode.replaceChild(clone, element);
}

function replaceElemntsEventsWithClone(elements) {
	var length = elements.length;
	for (var i = 0; i < length; ++ i) {
		replaceElemntEventsWithClone(elements[i]);
	}
}

function allowUserSelect(element) {
	element.style.webkitUserSelect = 'auto';
}

function allowUserSelectById(element_id) {
	allowUserSelect(doc.getElementById(element_id));
}

function allowUserSelectByClassName(element_class) {
	allowUserSelect(doc.getElementsByClassName(element_class)[0]);
}

var url = doc.URL;
var domain_pattern = /^https?:\/\/([^\/]+)/;
var result = domain_pattern.exec(url);
if (result) {
	try {
		var domain = result[1];
		if (domain.length > 11 && domain.substr(-11, 11) == '.lofter.com') {
			replaceElemntsEventsWithClone(jQuery('.pic>a'));
			return;
		}
		switch(domain) {
			case 'www.qidian.com':
			case 'read.qidian.com':
			case 'big5.qidian.com':
			case 'www.qdmm.com':
				var element = doc.getElementById('bigcontbox');
				if (element) {
					element.onmousedown = null;
				}
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
					allowUserSelectByClassName('mainkashi');
				}
				break;
			case 'detail.china.alibaba.com':
				jQuery('div.mod-detail-gallery').unbind();
				break;
			case 'www.businessweekly.com.tw':
				jQuery('div.maincontent').unbind();
				break;
			case 'bettereducation.com.au':
				jQuery('div.main').unbind();
				break;
			case 'petitlyrics.com':
				allowUserSelectById('lyrics_window');
				break;
			case 'tv.cntv.cn':
				allowUserSelectById('epg_list');
				break;
			case 'www.hbooker.com':
				allowUserSelectById('J_BookRead');
				break;
			case 'www.fanfiction.net':
				allowUserSelectById('storytextp');
				break;
			case 'www.ghrlib.com':
			case 'www.melodog.com.tw':
				allowUserSelectByClassName('unselectable');
				break;
			case 'www.vice.cn':
				allowUserSelectByClassName('noselect');
				break;
			case 'utaten.com':
				allowUserSelectByClassName('lyricBody');
				break;
			case 'www.medialnk.com':
			case 'www.buzzhand.com':
				allowUserSelectByClassName('article_wrap');
				break;
			case 'wiki.mh4g.org':
				element = doc.getElementById('data_container');
				allowUserSelect(element);
				element.onmousedown = element.onselectstart = null;
				break;
			case 'www.buzzhand.com':
				jQuery('#articleContent>p').css('-webkit-user-select', 'auto');
				break;
			case 'ww.happies.news':
			case 'ww.share001.org':
			case 'ww.daliulian.net':
				jQuery('#article-content>p').unbind().css('-webkit-user-select', 'auto');
				break;
			case 'yuedu.163.com':
				jQuery('.portrait-player .article').css('-webkit-user-select', 'auto');
				jQuery('#J_Player').unbind();
				break;
			case 'office.fang.com':
				doc.querySelector('.describe>div').onselectstart = null;
				break;
			case 'pad.skyozora.com':
				jQuery('<style>*{-webkit-user-select:auto}</style>').appendTo(body);
				break;
			case 'news.cari.com.my':
				element = jQuery('.bm .d')[0];
				element.onmousedown = element.onselectstart = null;
				allowUserSelect(element);
				break;
			case 'www.ttpaihang.com':
				element = jQuery('table[oncontextmenu]')[0];
				element.oncontextmenu = element.oncopy = null;
				break;
			case 'www.teepr.com':
				jQuery('a').off();
				break;
			case 'www.zcool.com.cn':
				jQuery('img').unbind();
				break;
			case 'photo.xuite.net':
				jQuery('img.fixed').unbind('contextmenu');
				break;
			case 'www.van698.com':
				replaceElemntEventsWithClone(body);
				break;
			case 'rocklyric.jp':
				element = doc.getElementById('lyric_area');
				allowUserSelect(element);
				element.oncopy = element.oncut = element.onmousemove = element.onmousedown = element.children[0].oncontextmenu = null;
				break;
			case 'kmweb.coa.gov.tw':
				element = doc.getElementById('pl');
				element.oncontextmenu = element.onselectstart = element.ondragstart = null;
				break;
		}
	} catch (e) {
		console.log(e);
	}
}
})();