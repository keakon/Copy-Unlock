(function() {
var doc = document;
var body = doc.body;
var html = doc.documentElement;

function clearHandlers() {
	html.onselectstart = html.oncopy = html.oncut = html.onpaste = html.onkeydown = html.oncontextmenu = html.onmousemove = body.oncopy = body.oncut = body.onpaste = body.onkeydown = body.oncontextmenu = body.onmousedown = body.onmousemove = body.onselectstart = body.ondragstart = doc.onselectstart = doc.oncopy = doc.oncut = doc.onpaste = doc.onkeydown = doc.oncontextmenu = doc.onmousedown = doc.onmouseup = window.onkeyup = window.onkeydown = null;
	html.style.webkitUserSelect = html.style.userSelect = body.style.webkitUserSelect = body.style.userSelect = 'auto';
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
	var $body = jQuery(body);
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

function replaceElementEventsWithClone(element) {
	var clone = element.cloneNode();
	while (element.firstChild) {
		clone.appendChild(element.lastChild);
	}
	element.parentNode.replaceChild(clone, element);
}

function replaceElementsEventsWithClone(elements) {
	var length = elements.length;
	for (var i = 0; i < length; ++ i) {
		replaceElementEventsWithClone(elements[i]);
	}
}

function allowUserSelect(element) {
	element.style.webkitUserSelect = element.style.userSelect = 'auto';
}

function allowUserSelectById(element_id) {
	allowUserSelect(doc.getElementById(element_id));
}

function allowUserSelectByClassName(element_class) {
	var elements = doc.getElementsByClassName(element_class);
	var len = elements.length;
	for (var i = 0; i < len; ++i) {
		allowUserSelect(elements[i]);
	}
}

var url = doc.URL;
var domain_pattern = /^https?:\/\/([^\/]+)/;
var result = domain_pattern.exec(url);
if (result) {
	try {
		var domain = result[1];
		if (domain.length > 11 && domain.substr(-11, 11) == '.lofter.com') {
			replaceElementsEventsWithClone(jQuery('.pic>a'));
			return;
		}
		switch(domain) {
			// case 'wenku.baidu.com':  // 替换后会导致「继续阅读」按钮失效，可以尝试把老的按钮换回来
			// 	var element = doc.getElementsByClassName('doc-reader');
			// 	if (element.length) {
			// 		element[0].oncopy = null;
			// 		replaceElementEventsWithClone(doc.getElementById('reader-container-1'));
			// 	}
			// 	break;
			case 'www.qidian.com':
			case 'read.qidian.com':
			case 'big5.qidian.com':
			case 'www.qdmm.com':
				element = doc.getElementById('bigcontbox');
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
			case 'vendor.tahoecn.com':
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
			case 'www.91yanqing.com':
			case 'www.99lib.net':  // 不支持右键
			// case 'www.diyibanzhu9.com':  // 不支持右键，会导致左右键翻页无效
				replaceElementEventsWithClone(body);
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
			case 'www.mygreatdaily.com':
			case 'www.thegreatdaily.com':
				var $elements = jQuery('p').off();
				var length = $elements.length;
				for (var i = 0; i < length; ++ i) {
					allowUserSelect($elements[i]);
				}
				break;
			case 'mojim.com':
				allowUserSelectById('fsZ');
				break;
			case 'storybird.com':
				allowUserSelectByClassName('cm-component');
				break;
			case 'su.lianjia.com':
				allowUserSelectByClassName('xiaoquOverview');
				break;
			case 'life.tw':
				element = doc.getElementById('mainContent').getElementsByTagName('iframe');
				if (element.length) {
					element = element[0].contentWindow.document;
					element.oncontextmenu = element.onselectstart = element.onselect = null;
					jQuery(element).off();
				}
				break;
			case 'www.coco01.today':
				element = doc.getElementsByClassName('post-html');
				if (element.length) {
					element = element[0];
					var elements = element.getElementsByTagName('p');
					jQuery(elements).off();
					var length = elements.length;
					for (i = 0; i < length; ++i) {
						allowUserSelect(elements[i]);
					}
				}
				break;
			case 'news.missevan.com':
				element = doc.getElementById('article');
				element.oncontextmenu = element.onselectstart = null;
				break;
			case 'hk.koreadepart.com':
			case 'tw.koreadepart.com':
				Evt.remove(doc, 'mousedown', MouseEvent.no_right);
				Evt.remove(doc, 'contextmenu', MouseEvent.stop_event);
				Evt.remove(doc, 'selectstart', MouseEvent.stop_event);
				break;
			case 'chokstick.com':
				jQuery('<style>.disable-select{webkit-user-select:auto;user-select:auto}</style>').appendTo(body);
				break;
			case 'imac.hk':
				window.jQuery = function() {
					return {'css': function(){}};
				};
				allowUserSelect(html);
				allowUserSelectByClassName('entry-content');
				break;
			case 'www.uta-net.com':
				jQuery('<style>#flash_area>img{display:none}</style>').appendTo(body);
				break;
			case 'ycg.qq.com':
				elements = doc.getElementsByClassName('box-cover-works');
				length = elements.length;
				for (i = 0; i < length; i++) {
					element = elements[i];
					element.oncontextmenu = element.onselectstart = null;
				}
				break;
			case 'fanyi.youdao.com':
				allowUserSelectByClassName('doc__container--unpay');
				break;
			case 'mdpr.jp':
				elements = doc.getElementsByTagName('img');
				length = elements.length;
				for (i = 0; i < length; i++) {
					element = elements[i];
					element.oncontextmenu = element.onmousedown = element.onselectstart = null;
				}
				break;
			case 'www.bilibili.com':
				jQuery('.article-holder.unable-reprint').off().css('-webkit-user-select', 'auto').css('user-select', 'auto');
				break;
			case 'www.webtoons.com':
				elements = doc.getElementsByTagName('img');
				length = elements.length;
				for (i = 0; i < length; i++) {
					element = elements[i];
					element.oncontextmenu = element.ondragstart = element.onselectstart = null;
				}
				break;
			case 'www.winentaste.com':
				element = doc.getElementsByTagName('main');
				if (element.length) {
					element = element[0];
					element.oncontextmenu = element.onselectstart = null;
				}
				break;
			case 'www.oricon.co.jp':
				element = doc.getElementsByClassName('all-lyrics');
				if (element.length) {
					element = element[0];
					allowUserSelect(element);
					element.oncontextmenu = element.onmousedown = element.onselectstart = null;
				}
				break;
			case 'hshi.58.com':
				jQuery("#generalDesc").off();
				break;
			case 'www.heatmetering.cn':
				jQuery('.box').unbind();
				break;
			case 'time.geekbang.org':  // 不支持右键
				setTimeout(function() {replaceElementsEventsWithClone(doc.getElementsByClassName('_2qqGfSEe_0'));}, 1000);
				break;
		}
	} catch (e) {
		console.log(e);
	}
}
})();