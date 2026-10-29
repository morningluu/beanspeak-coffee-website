/* ============================================
   BeanSpeak Coffee - About Page JS
   Product Intro Slider + Timeline Observer
   ============================================ */

(function() {
  'use strict';

  var AboutPage = {
    slides: null,
    dots: null,
    currentSlide: 0,
    totalSlides: 0,

    init: function() {
      this._initIntroSlider();
      this._initTimelineObserver();
    },

    /* --- Intro Slider --- */
    _initIntroSlider: function() {
      var self = this;
      this.slides = document.querySelectorAll('.intro-slide');
      this.totalSlides = this.slides.length;
      if (this.totalSlides === 0) return;

      this._renderIntroDots();

      var prevBtn = document.getElementById('introPrev');
      var nextBtn = document.getElementById('introNext');

      if (prevBtn) {
        prevBtn.addEventListener('click', function() {
          self._goToSlide(self.currentSlide - 1);
        });
      }
      if (nextBtn) {
        nextBtn.addEventListener('click', function() {
          self._goToSlide(self.currentSlide + 1);
        });
      }
    },

    _renderIntroDots: function() {
      var dotsContainer = document.getElementById('introDots');
      if (!dotsContainer) return;
      dotsContainer.innerHTML = '';

      var self = this;
      for (var i = 0; i < this.totalSlides; i++) {
        var dot = document.createElement('button');
        dot.className = 'intro-nav__dot' + (i === 0 ? ' intro-nav__dot--active' : '');
        dot.setAttribute('aria-label', '第' + (i + 1) + '款');
        dot.addEventListener('click', (function(idx) {
          return function() { self._goToSlide(idx); };
        })(i));
        dotsContainer.appendChild(dot);
      }
      this.dots = dotsContainer.querySelectorAll('.intro-nav__dot');
    },

    _goToSlide: function(index) {
      if (index < 0) index = this.totalSlides - 1;
      if (index >= this.totalSlides) index = 0;
      this.currentSlide = index;

      /* Update slides */
      this.slides.forEach(function(slide, i) {
        slide.classList.toggle('intro-slide--active', i === index);
      });

      /* Update dots */
      if (this.dots) {
        this.dots.forEach(function(dot, i) {
          dot.classList.toggle('intro-nav__dot--active', i === index);
        });
      }
    },

    /* --- Timeline IntersectionObserver --- */
    _initTimelineObserver: function() {
      var entries = document.querySelectorAll('.timeline__entry');
      if (entries.length === 0) return;

      /* Fallback: show all if no IntersectionObserver support */
      if (!('IntersectionObserver' in window)) {
        entries.forEach(function(entry) {
          entry.classList.add('timeline__entry--visible');
        });
        return;
      }

      var observer = new IntersectionObserver(function(observedEntries) {
        observedEntries.forEach(function(obs) {
          if (obs.isIntersecting) {
            obs.target.classList.add('timeline__entry--visible');
            /* Once visible, stop observing to keep it visible */
            observer.unobserve(obs.target);
          }
        });
      }, {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
      });

      entries.forEach(function(entry) {
        observer.observe(entry);
      });
    }
  };

  /* --- Expose --- */
  window.BeanSpeak = window.BeanSpeak || {};
  window.BeanSpeak.AboutPage = AboutPage;

})();
