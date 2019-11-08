// Tamino Martinius - All rights reserved

// Copyright © 2013 Tamino Martinius (http://zaku.eu)
// Copyright © 2013 Particleslider.com (http://particleslider.com

// Terms of usage: http://particleslider.com/legal/license

var init = function() {
  var isMobile =
    navigator.userAgent &&
    navigator.userAgent.toLowerCase().indexOf('mobile') >= 0;
  var isSmall = window.innerWidth < 1000;

  var ps = new ParticleSlider({
    ptlGap: isMobile || isSmall ? 3 : 0,
    ptlSize: isMobile || isSmall ? 3 : 1,
    width: 1e9,
    height: 1e9
  });

  var gui = new dat.GUI();
  gui
    .add(ps, 'ptlGap')
    .min(0)
    .max(5)
    .step(1)
    .onChange(function() {
      ps.init(true);
    });
  gui
    .add(ps, 'ptlSize')
    .min(1)
    .max(5)
    .step(1)
    .onChange(function() {
      ps.init(true);
    });
  gui.add(ps, 'restless');
  gui.addColor(ps, 'color').onChange(function(value) {
    ps.monochrome = true;
    ps.setColor(value);
    ps.init(true);
  });

  window.addEventListener
    ? window.addEventListener(
        'click',
        function() {
          ps.init(true);
        },
        false
      )
    : (window.onclick = function() {
        ps.init(true);
      });
};

var initParticleSlider = (function() {
  var psScript = document.createElement('script');
  psScript.addEventListener
    ? psScript.addEventListener('load', init, false)
    : (psScript.onload = init);
  psScript.src = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/23500/ps-0.9.js';
  psScript.setAttribute('type', 'text/javascript');
  document.body.appendChild(psScript);
})(
  window.addEventListener
    ? window.addEventListener('load', initParticleSlider, false)
    : (window.onload = initParticleSlider)
);

google.load('jquery', '1'),
  google.setOnLoadCallback(function() {
    jQuery(function(a) {
      a('#colored, #monochrome').change(function() {
        var b = a(this);
        b.is(':checked') &&
          ((psinist.monochrome = b.val() == 'true'), psinist.init(!0));
      }),
        a('#color').change(function() {
          var b = a(this);
          psinist.setColor('#' + b.val()), psinist.init(!0);
        }),
        a('#hover-color').change(function() {
          var b = a(this);
          psinist.setHoverColor('#' + b.val()), psinist.init(!0);
        }),
        a('#gap').change(function() {
          var b = a(this);
          (psinist.ptlGap = b.val() * 1), psinist.init(!0);
        }),
        a('#size').change(function() {
          var b = a(this);
          (psinist.ptlSize = b.val() * 1), psinist.init(!0);
        }),
        a('#restful, #restless').change(function() {
          var b = a(this);
          b.is(':checked') && (psinist.restless = b.val() == 'true');
        }),
        a('#mouse-force').change(function() {
          var b = a(this);
          psinist.mouseForce = b.val() * 1;
        }),
        a('#autoplay-on, #autoplay-off').change(function() {
          var b = a(this),
            c = a('#slide-delay'),
            d = a('label[for=slide-delay]');
          b.is(':checked') &&
            (b.val() == 'true'
              ? (c.css('opacity', '1'),
                d.css('opacity', '1'),
                c.prop('disabled', !1),
                (psinist.slideDelay = c.val() * 1),
                clearTimeout(psinist.nextSlideTimer),
                (psinist.nextSlideTimer = setTimeout(function() {
                  psinist.nextSlide();
                }, 1e3 * psinist.slideDelay)))
              : (c.css('opacity', '0.5'),
                d.css('opacity', '0.5'),
                c.prop('disabled', !0),
                (psinist.slideDelay = 0),
                clearTimeout(psinist.nextSlideTimer)));
        }),
        a('#slide-delay').change(function() {
          var b = a(this);
          (psinist.slideDelay = b.val() * 1),
            clearTimeout(psinist.nextSlideTimer),
            (psinist.nextSlideTimer = setTimeout(function() {
              psinist.nextSlide();
            }, 1e3 * psinist.slideDelay));
        }),
        a('#show-paging, #hide-paging').change(function() {
          var b = a(this);
          b.is(':checked') &&
            ((psinist.showArrowControls = b.val() == 'true'), psinist.init(!0));
        }),
        a('.clipboard').mouseenter(function() {
          var b = a(this);
          b.clearQueue(), b.animate({ 'margin-left': 0 });
        }),
        a('.clipboard').mouseleave(function() {
          var b = a(this);
          b.clearQueue(), b.animate({ 'margin-left': '-28em' });
        });
    });
  });
