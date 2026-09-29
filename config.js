/**
 * Cấu hình link redirect theo domain (Cloudflare Pages).
 */
window.LINK_CONFIG = {
  default: "https://22llwin.com/?id=980680827",

  domains: {
    "www.www.llquocte.us": "https://22llwin.com/?id=980680827",
    "www.llquocte.us": "https://22llwin.com/?id=980680827",
    "llquocte.us": "https://22llwin.com/?id=980680827",
    "www.www.ll889.us": "https://25llwin.com/?id=579104605",
    "www.ll889.us": "https://25llwin.com/?id=579104605",
    "ll889.us": "https://25llwin.com/?id=579104605",
    "www.www.ll882.us": "https://www.22llwin.com/home/register?id=334724612",
    "www.ll882.us": "https://www.22llwin.com/home/register?id=334724612",
    "ll882.us": "https://www.22llwin.com/home/register?id=334724612",
    "www.www.ll886.us": "https://www.22llwin.com/home/register?id=844024235",
    "www.ll886.us": "https://www.22llwin.com/home/register?id=844024235",
    "ll886.us": "https://www.22llwin.com/home/register?id=844024235",
    "llgc.uk": "https://25llwin.com/home/register?id=458375969",
    "www.llgc.uk": "https://25llwin.com/home/register?id=458375969",
    "llpro.us": "https://25llwin.com/home/register?id=896861006",
    "www.llpro.us": "https://25llwin.com/home/register?id=896861006",
    "llvip.uk": "https://25llwin.com/home/register?id=510718259",
    "www.llvip.uk": "https://25llwin.com/home/register?id=510718259",
    "llqt.uk": "https://www.22llwin.com/?id=845738530",
    "www.llqt.uk": "https://www.22llwin.com/?id=845738530",
    "www.www.tiktoka.art": "https://www.gg8843.com/?id=347045808",
    "www.tiktoka.art": "https://www.gg8843.com/?id=347045808",
    "tiktoka.art": "https://www.gg8843.com/?id=347045808",
    "www.www.tiktoka.shop": "https://www.gg8843.com/?id=347045808",
    "www.tiktoka.shop": "https://www.gg8843.com/?id=347045808",
    "tiktoka.shop": "https://www.gg8843.com/?id=347045808",
    "www.www.tiktoktv.fit": "https://www.gg8832.com/?id=742263319",
    "www.tiktoktv.fit": "https://www.gg8832.com/?id=742263319",
    "tiktoktv.fit": "https://www.gg8832.com/?id=742263319",
    "www.www.gg88phi.com": "https://www.gg8838.com/?id=407699684",
    "www.gg88phi.com": "https://www.gg8838.com/?id=407699684",
    "www.www.gg88h.shop": "https://gg8817.com/?id=125115306",
    "www.gg88h.shop": "https://gg8817.com/?id=125115306",
    "gg88h.shop": "https://gg8817.com/?id=125115306",
    "www.www.gg88usa.net": "https://www.gg8826.com/home/register?id=170291680",
    "www.gg88usa.net": "https://www.gg8826.com/home/register?id=170291680",
    "gg88usa.net": "https://www.gg8826.com/home/register?id=170291680",
    "www.www.gg88am.com": "https://gg8817.com/?id=340055393",
    "www.gg88am.com": "https://gg8817.com/?id=340055393",
    "gg8sing.com": "https://www.gg8838.com/?id=407699684",
    "www.gg8sing.com": "https://www.gg8838.com/?id=407699684",
    "www.gg88sing.co": "https://www.gg8824.com/?id=516358228",
    "gg88sing.co": "https://www.gg8824.com/?id=516358228",
    "www.gg8sing.vip": "https://gg8824.com/?id=966041804",
    "gg8sing.vip": "https://gg8824.com/?id=966041804",
    "ggtong.vip": "https://gg8842.com/?id=934472881",
    "gg8869.net": "https://gg8835.com/?id=647827737",
    "gg8888.uk": "https://gg8824.com/?id=582517684",
    "g8us.com": "https://gg8854.com/?id=670349095",
    "gg88bet.cc": "https://www.gg8826.com/?id=504586243",
    "gg883.uk": "https://www.gg8826.com/?id=801752117",
    "gg88top.us": "https://gg8843.com/?id=229091387",
    "gg88t.uk": "https://gg8817.com/?id=217268508",
    "gg88s.us": "https://www.gg8854.com/?id=100766338",
    "gg88in.org": "https://www.gg8842.com/?id=124348462",
    "gg88z.link": "https://gg8832.com/?id=959420310",
    "gg88bet.uk": "https://www.gg8850.com/?id=532307045",
    "g8d1.net": "https://www.gg8859.com/?id=235748786",
    "gg88qte.com": "https://gg8846.com/?id=566308881",
    "gg88sgp.com": "https://www.gg8826.com/?id=720056733",
    "gg88quocte.com": "https://www.gg8826.com/?id=720056733",
    "gg88sing.org": "https://www.gg8826.com/?id=720056733",
    "gg88am.com": "https://gg8817.com/?id=340055393",
  },
};

(function () {
  "use strict";

  function normalizeHost(host) {
    return (host || "").toLowerCase().replace(/^www\./, "");
  }

  window.getRedirectUrl = function () {
    var cfg = window.LINK_CONFIG || {};
    var domains = cfg.domains || {};
    var host = normalizeHost(window.location.hostname);
    var fullHost = (window.location.hostname || "").toLowerCase();

    if (domains[fullHost]) return domains[fullHost];
    if (domains[host]) return domains[host];

    for (var domain in domains) {
      if (!Object.prototype.hasOwnProperty.call(domains, domain)) continue;
      if (normalizeHost(domain) === host) {
        return domains[domain];
      }
    }

    return cfg.default || "#";
  };

  window.REDIRECT_URL = window.getRedirectUrl();

  // Tự động đồng bộ domains.json thời gian thực
  try {
    fetch('/domains.json')
      .then(function(res) { return res.json(); })
      .then(function(dj) {
        if (!dj) return;
        var h = (window.location.hostname || "").toLowerCase();
        var normH = normalizeHost(h);
        var entry = dj[h] || dj[normH] || dj['www.' + normH];
        if (entry) {
          var target = entry.main_url || entry.url || entry.link || (typeof entry === 'string' ? entry : '');
          if (target) {
            window.REDIRECT_URL = target;
            var links = document.querySelectorAll('a.redirect-link');
            for (var i = 0; i < links.length; i++) {
              links[i].href = target;
            }
          }
        }
      })
      .catch(function() {});
  } catch(e) {}
})();
