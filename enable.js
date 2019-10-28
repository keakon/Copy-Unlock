(function() {
var doc = document;
var body = doc.body;
var html = doc.documentElement;

function allowUserSelect(element) {
	element.setAttribute('style', '-webkit-user-select: auto !important');
	element.setAttribute('style', 'user-select: auto !important');
	return element;
}

function allowUserSelectById(element_id) {
	return allowUserSelect(doc.getElementById(element_id));
}

function allowUserSelectByClassName(element_class) {
	var elements = doc.getElementsByClassName(element_class);
	var len = elements.length;
	for (var i = 0; i < len; ++i) {
		allowUserSelect(elements[i]);
	}
	return elements;
}

function clearHandlers() {
	html.onselectstart = html.oncopy = html.oncut = html.onpaste = html.onkeydown = html.oncontextmenu = html.onmousemove = body.oncopy = body.oncut = body.onpaste = body.onkeydown = body.oncontextmenu = body.onmousedown = body.onmousemove = body.onselectstart = body.ondragstart = doc.onselectstart = doc.oncopy = doc.oncut = doc.onpaste = doc.onkeydown = doc.oncontextmenu = doc.onmousedown = doc.onmouseup = window.onkeyup = window.onkeydown = null;
	allowUserSelect(html);
	allowUserSelect(body);
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

function removeEventAttributes(element) {
	element.removeAttribute('oncontextmenu');
	element.removeAttribute('ondragstart');
	element.removeAttribute('onselectstart');
	element.removeAttribute('onselect');
	element.removeAttribute('oncopy');
	element.removeAttribute('onbeforecopy');
	element.removeAttribute('oncut');
	element.removeAttribute('onpaste');
	element.removeAttribute('onclick');
	element.removeAttribute('onmousedown');
	element.removeAttribute('onmouseup');
}

var jQuery = window.jQuery;

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
		clone.appendChild(element.firstChild);
	}
	element.parentNode.replaceChild(clone, element);
}

function replaceElementsEventsWithClone(elements) {
	var length = elements.length;
	for (var i = 0; i < length; ++ i) {
		replaceElementEventsWithClone(elements[i]);
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

		switch (domain) {
			case 'wenku.baidu.com':
				jQuery('.doc-reader').off('copy').removeAttr('oncopy');
				jQuery('#reader-container-1').off('copy');
				return;
			case 'www.qidian.com':
			case 'read.qidian.com':
			case 'vipreader.qidian.com':
			case 'big5.qidian.com':
			case 'www.qdmm.com':
				var element = doc.getElementById('bigcontbox');
				if (element) {
					element.onmousedown = null;
				}
				jQuery(body).off('contextmenu copy cut');
				return;
		}

		if (jQuery) {  // 百度文库不能覆盖这些事件，起点会造成无限递归 bug
			var $doc = jQuery(doc);
			var $body = jQuery(body);
			if ($doc.off) {
				$doc.off();
				$body.off();
				jQuery(window).off();
			} else {
				$doc.unbind();
				$body.unbind();
				jQuery(window).unbind();
			}
		}

		switch(domain) {
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
			case 'caiwei.yuedu.163.com':
			case 'guofeng.yuedu.163.com':
				setTimeout(function() {
					jQuery('<style>.portrait-player .article{-webkit-user-select:auto;user-select:auto}</style>').appendTo(jQuery(body).unbind());
					$element = jQuery('#J_Player').unbind();
					replaceElementEventsWithClone($element[0]);
				}, 1000)
				break;
			case 'office.fang.com':
				doc.querySelector('.describe>div').onselectstart = null;
				break;
			case 'pad.skyozora.com':
			case 'vendor.tahoecn.com':
			case 'www.iyingdi.cn':
			case 'www.gardenia.net':
				jQuery('<style>*{-webkit-user-select:auto;user-select:auto}</style>').appendTo(body);
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
			case 'www.99lib.net':
			// case 'www.diyibanzhu9.com':  // 会导致左右键翻页无效
				replaceElementEventsWithClone(body);
				doc.body.oncontextmenu = function(e){e.stopPropagation()};
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
				jQuery('[unselectable]').off().removeAttr('unselectable').each(function() {
					allowUserSelect(this);
				});
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
			case 'www.jerecuperemonex.com':
				jQuery('.unselectable').removeClass('unselectable').removeAttr('unselectable');
				break;
			case 'ms.zjer.cn':
				element = doc.getElementById('stop');
				element.oncontextmenu = element.onselectstart = element.onmousedown = element.onmouseup = null;
				break;
			case 'mail-reibun.com':
				jQuery('<style>.manner.supervision{-webkit-user-select:auto;user-select:auto}</style>').appendTo(body);
				break;
			case 'www.canalys.com':
				allowUserSelectById('article');
				break;
			case 'www.yifatong.com':
				element = doc.getElementById('contract_content');
				allowUserSelect(element);
				jQuery(element).unbind();
				break;
			case 'weibo.com':
				elements = doc.getElementsByClassName('WBA_content');
				if (elements.length > 0) {
					elements = elements[0].getElementsByTagName('div');
					if (elements.length > 0) {
						element = elements[0];
						element.removeAttribute('oncopy');
						element.removeAttribute('oncut');
						element.removeAttribute('onselectstart');
						replaceElementEventsWithClone(element);
					}
				}
				break;
			case 'www.longmabookcn.com':
				removeEventAttributes(body);
				element = doc.getElementById('readpagewidth');
				removeEventAttributes(element);
				allowUserSelect(element);
				element = doc.getElementById('paperrall');
				removeEventAttributes(element);
				allowUserSelect(element);
				element = doc.getElementById('mypaperhouse');
				removeEventAttributes(element);
				allowUserSelect(element);
				element = doc.getElementById('mypaperhome');
				removeEventAttributes(element);
				allowUserSelect(element);
				element = doc.getElementById('mypaper');
				removeEventAttributes(element);
				allowUserSelect(element);
				jQuery('<style>*:not(input):not(textarea){-webkit-user-select:auto}</style>').appendTo(body);
				break;
			case 'beetify.com':
				allowUserSelect(body);
				jQuery('<style>body{user-select:auto !important}</style>').appendTo(body);
				break;
			case 'www.hzmedia.com.cn':
				allowUserSelect(doc.getElementById('content'));
				break;
			case 'www.goeugo.com':
				jQuery('div.main').unbind();
				break;
			case 'car.ctrip.com':
				allowUserSelectByClassName('beginners-guide');
				break;
			case 'www.chinathinktanks.org.cn':
				elements = doc.getElementsByClassName('container');
				if (elements.length > 0) {
					removeEventAttributes(elements[0]);
				}
				break;
			case 'www.liuxue86.com':
				replaceElementEventsWithClone(doc.getElementById('article-content'));
				break;
			case 'www.horou.com':
				element = document.createElement('style');
				element.append('*{-webkit-user-select:auto;user-select:auto}');
				body.append(element);
				break;
			case 'www.sis001.com':
				allowUserSelectByClassName('noSelect');
				break;
			case 'ulsterherald.com':
				jQuery('<style>*:not(input):not(textarea){-webkit-user-select:auto}</style>').appendTo(body);
				break;
			case 'app.motie.com':
				elements = doc.getElementsByClassName('note');
				for (i = 0; i < elements.length; ++i) {
					element = elements[i];
					removeEventAttributes(element);
				}
				break;
			case 'www.laokaoya.com':
				jQuery('<style>html,body,div,p,span{-webkit-user-select:auto !important;user-select:auto !important}::selection{background-color:#dcdcdc !important}</style>').appendTo(body);
				break;
			case 'sosad.fun':
				allowUserSelectByClassName('chapter');
				break;
			case 'www.wattpad.com':
				jQuery('[oncontextmenu]').removeAttr('oncontextmenu');
				break;
			case 'www.pressplay.cc':
				allowUserSelectByClassName('article-content-box');
				elements = doc.getElementsByClassName('project-timeline-article-page');
				if (elements.length > 0) {
					element = elements[0];
					element.oncontextmenu = element.ondragstart = element.onselectstart = null;
				}
				break;
			case 'www.bcquan.me':
				allowUserSelectByClassName('noselect');
				elements = doc.getElementsByClassName('news_detail');
				if (elements.length > 0) {
					element = elements[0];
					element.oncontextmenu = element.ondragstart = element.onselectstart = null;
				}
				break;
			case 'www.xuexi.la':
				Cookies.set(cookieKey, 0);
				break;
			case 'vip.shulink.com':
				allowUserSelectByClassName('acontent');
				break;
			case 'www.8591.com.tw':
				allowUserSelectById('editer_main').onselectstart = null;
				break;
			case 'buzzlife.info':
				removeEventAttributes(body);
				break;
		}
	} catch (e) {
		console.log(e);
	}
}
})();