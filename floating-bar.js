/*!
 * 카페게이트 가맹문의 플로팅 바
 * 호스팅: https://hwjung11-source.github.io/-cafegate-franchise2/floating-bar.js
 * 사용처: cafegate.co.kr/franchise (imweb 사이트 코드 영역에 <script src="..."> 한 줄로 로드)
 */
(function () {
  if (!/^\/franchise/.test(window.location.pathname)) return;
  if (document.getElementById('cgFbStyle') || document.getElementById('cgFbBar')) return;

  var SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxxpk5lLm_SkN1fwCUvJ9-u2NbHbxB82qg82_nm7tBIHsGMLuAL2LKCgtXhxipj77LC/exec';

  // 화살표 SVG의 따옴표를 모두 %27로 URL-encode 하여 CSS 문자열 안에 따옴표가 들어가지 않게 함
  var arrowUrl = "url(\"data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2712%27 height=%278%27 viewBox=%270 0 12 8%27%3E%3Cpath d=%27M1 1l5 5 5-5%27 stroke=%27%23aaaaaa%27 stroke-width=%271.8%27 fill=%27none%27 stroke-linecap=%27round%27/%3E%3C/svg%3E\")";

  var css = [
    '#cgFbBar{position:fixed !important;bottom:0 !important;left:0 !important;width:100% !important;background:#fff;z-index:2147483600;',
    'box-shadow:0 -2px 20px rgba(0,0,0,.10);padding:14px 0;border-top:1px solid #eee;box-sizing:border-box;',
    'font-family:-apple-system,BlinkMacSystemFont,"Apple SD Gothic Neo","Pretendard","Noto Sans KR",sans-serif;}',
    '#cgFbBar *,#cgFbBar *::before,#cgFbBar *::after{box-sizing:border-box;}',
    '#cgFbBar .cg-fb-inner{max-width:1080px;margin:0 auto;padding:0 40px;display:flex;align-items:center;gap:12px;}',
    '#cgFbBar .cg-fb-tel{font-size:14px;font-weight:800;color:#111;white-space:nowrap;letter-spacing:-.01em;margin-right:8px;text-decoration:none;}',
    '#cgFbBar .cg-fb-tel span{font-size:22px;letter-spacing:-.02em;color:#FF2B5E;}',
    '#cgFbBar input,#cgFbBar select{height:44px;border:1.5px solid #e8e4de;border-radius:8px;background:#f7f5f2;color:#111;',
    'font-family:inherit;font-size:14px;font-weight:500;padding:0 14px;outline:none;flex:1;min-width:0;letter-spacing:-.02em;',
    '-webkit-appearance:none;appearance:none;transition:border-color .2s,background .2s;}',
    '#cgFbBar input::placeholder{color:#aaa;}',
    '#cgFbBar select{cursor:pointer;background-image:' + arrowUrl + ';background-repeat:no-repeat;background-position:right 12px center;padding-right:32px;background-color:#f7f5f2;}',
    '#cgFbBar select option{color:#111;background:#fff;}',
    '#cgFbBar input:focus,#cgFbBar select:focus{border-color:#FF2B5E;background:#fff;}',
    '#cgFbBar .cg-fb-btn{height:44px;padding:0 24px;background:#FF2B5E;color:#fff;font-family:inherit;font-size:15px;',
    'font-weight:800;border:none;border-radius:8px;cursor:pointer;white-space:nowrap;flex-shrink:0;letter-spacing:-.02em;',
    'transition:background .2s,transform .15s;}',
    '#cgFbBar .cg-fb-btn:hover{background:#e0224f;transform:translateY(-1px);}',
    '@media (max-width:1023px){',
    '#cgFbBar{padding:10px 0;}',
    '#cgFbBar .cg-fb-inner{padding:0 16px;gap:8px;}',
    '#cgFbBar input,#cgFbBar select{display:none;}',
    '#cgFbBar .cg-fb-tel{flex:1;margin-right:0;font-size:13px;}',
    '#cgFbBar .cg-fb-tel span{font-size:18px;}',
    '#cgFbBar .cg-fb-btn{height:42px;padding:0 18px;font-size:14px;}',
    'body{padding-bottom:64px !important;}',
    '}',
    '@media (min-width:1024px){body{padding-bottom:76px !important;}}'
  ].join('');

  function inject() {
    if (document.getElementById('cgFbBar')) return;

    var style = document.createElement('style');
    style.id = 'cgFbStyle';
    style.appendChild(document.createTextNode(css));
    document.head.appendChild(style);

    var bar = document.createElement('div');
    bar.id = 'cgFbBar';

    var inner = document.createElement('div');
    inner.className = 'cg-fb-inner';

    var tel = document.createElement('a');
    tel.className = 'cg-fb-tel';
    tel.href = 'tel:1599-1067';
    tel.innerHTML = '가맹문의 <span>1599-1067</span>';
    inner.appendChild(tel);

    var name = document.createElement('input');
    name.type = 'text'; name.id = 'cgFbName'; name.placeholder = '성함';
    inner.appendChild(name);

    var phone = document.createElement('input');
    phone.type = 'tel'; phone.id = 'cgFbTel'; phone.placeholder = '연락처';
    inner.appendChild(phone);

    var src = document.createElement('select');
    src.id = 'cgFbSource';
    var sources = [
      ['', '유입경로', true, true],
      ['네이버 검색'],
      ['인스타그램'],
      ['유튜브'],
      ['마이프차 / 창업 플랫폼'],
      ['지인 소개'],
      ['매장 방문'],
      ['기타']
    ];
    sources.forEach(function (item) {
      var opt = document.createElement('option');
      if (item.length === 1) {
        opt.textContent = item[0];
        opt.value = item[0];
      } else {
        opt.value = item[0];
        opt.textContent = item[1];
        if (item[2]) opt.disabled = true;
        if (item[3]) opt.selected = true;
      }
      src.appendChild(opt);
    });
    inner.appendChild(src);

    var region = document.createElement('input');
    region.type = 'text'; region.id = 'cgFbRegion'; region.placeholder = '희망지역';
    inner.appendChild(region);

    var btn = document.createElement('button');
    btn.className = 'cg-fb-btn';
    btn.id = 'cgFbBtn';
    btn.textContent = '상담신청';
    inner.appendChild(btn);

    bar.appendChild(inner);
    document.body.appendChild(bar);

    btn.addEventListener('click', function () {
      if (window.matchMedia('(max-width: 1023px)').matches) {
        window.location.href = 'tel:1599-1067';
        return;
      }
      var ok = true;
      [name, phone].forEach(function (el) {
        var v = el.value.trim();
        el.style.background = v ? '' : 'rgba(255,43,94,0.08)';
        el.style.borderColor = v ? '' : '#FF2B5E';
        if (!v) ok = false;
      });
      if (!ok) {
        alert('성함과 연락처는 필수입니다.');
        return;
      }
      var params = new URLSearchParams({
        name:    name.value.trim(),
        phone:   phone.value.trim(),
        region:  region.value.trim() || '미입력',
        budget:  '미입력',
        channel: src.value || '미입력',
        message: 'sticky bar 신청 (imweb external script)'
      });
      fetch(SCRIPT_URL + '?' + params.toString(), { method: 'GET', mode: 'no-cors' })
        .then(function () { window.location.href = 'https://cafegate.co.kr/thankyou'; })
        .catch(function () { alert('오류가 발생했습니다. 다시 시도해주세요.'); });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }
})();
