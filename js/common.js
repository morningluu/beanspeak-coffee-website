/* ============================================
   BeanSpeak Coffee - Common JavaScript
   Nav scroll, mobile menu, shared utilities
   ============================================ */

(function() {
  'use strict';

  /* --- Nav Module --- */
  const Nav = {
    header: null,
    toggle: null,
    nav: null,
    links: null,

    init: function() {
      this.header = document.querySelector('.header');
      this.toggle = document.querySelector('.nav__toggle');
      this.nav = document.querySelector('.nav');
      this.links = document.querySelectorAll('.nav__link');

      if (!this.header) return;

      this._bindScroll();
      this._bindMobile();
      this._setActiveLink();
      this._updateCartBadge();
    },

    /* Scroll shadow */
    _bindScroll: function() {
      var self = this;
      var ticking = false;

      window.addEventListener('scroll', function() {
        if (!ticking) {
          requestAnimationFrame(function() {
            if (window.scrollY > 10) {
              self.header.classList.add('header--scrolled');
            } else {
              self.header.classList.remove('header--scrolled');
            }
            ticking = false;
          });
          ticking = true;
        }
      });
    },

    /* Mobile menu toggle */
    _bindMobile: function() {
      if (!this.toggle || !this.nav) return;

      var self = this;
      this.toggle.addEventListener('click', function() {
        self.toggle.classList.toggle('nav__toggle--open');
        self.nav.classList.toggle('nav--open');
        document.body.style.overflow =
          self.nav.classList.contains('nav--open') ? 'hidden' : '';
      });

      /* Close on link click */
      this.links.forEach(function(link) {
        link.addEventListener('click', function() {
          self.toggle.classList.remove('nav__toggle--open');
          self.nav.classList.remove('nav--open');
          document.body.style.overflow = '';
        });
      });
    },

    /* Active link based on body data-page */
    _setActiveLink: function() {
      var page = document.body.getAttribute('data-page');
      if (!page) return;

      this.links.forEach(function(link) {
        link.classList.remove('nav__link--active');
        if (link.getAttribute('data-page') === page) {
          link.classList.add('nav__link--active');
        }
      });
    },

    /* Cart badge in nav */
    _updateCartBadge: function() {
      var badge = document.querySelector('.nav__cart-count');
      if (!badge) return;

      try {
        var cart = JSON.parse(localStorage.getItem('beanspeak_cart') || '{}');
        var count = Object.values(cart).reduce(function(sum, item) {
          return sum + (item.quantity || 1);
        }, 0);
        badge.textContent = count > 0 ? count : '';
      } catch (e) {
        badge.textContent = '';
      }
    }
  };

  /* --- Modal Helper --- */
  var Modal = {
    open: function(config) {
      var overlay = document.createElement('div');
      overlay.className = 'modal-overlay';
      var iconHtml = config.icon ?
        '<div class="modal__icon">' + config.icon + '</div>' : '';
      overlay.innerHTML =
        '<div class="modal">' +
          iconHtml +
          '<h3 class="modal__title">' + (config.title || '') + '</h3>' +
          '<p class="modal__message">' + (config.message || '') + '</p>' +
          '<button class="btn btn--primary modal__close-btn">' +
            (config.btnText || '确定') +
          '</button>' +
        '</div>';

      document.body.appendChild(overlay);
      document.body.style.overflow = 'hidden';

      var closeModal = function() {
        overlay.remove();
        document.body.style.overflow = '';
        if (config.onClose) config.onClose();
      };

      overlay.querySelector('.modal__close-btn').addEventListener('click', closeModal);
      overlay.addEventListener('click', function(e) {
        if (e.target === overlay) closeModal();
      });
    }
  };

  /* --- Shared Utility --- */
  var Util = {
    formatPrice: function(price) {
      return '￥' + Number(price).toFixed(0);
    },

    debounce: function(fn, delay) {
      var timer;
      return function() {
        var context = this, args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function() { fn.apply(context, args); }, delay);
      };
    }
  };

  /* --- Expose Globals --- */
  window.BeanSpeak = window.BeanSpeak || {};
  window.BeanSpeak.Nav = Nav;
  window.BeanSpeak.Modal = Modal;
  window.BeanSpeak.Util = Util;

})();
