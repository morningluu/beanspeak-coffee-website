/* ============================================
   BeanSpeak Coffee - Home Page JS
   Featured Products Carousel
   ============================================ */

(function() {
  'use strict';

  /* --- Product Data --- */
  /* 第一页：拿铁咖啡 | 第二页：冰饮 */
  var PRODUCTS = [
    { name: '玄米拿铁咖啡',   img: 'images/products/a.jpg', desc: '一系列有趣的口味包括海盐，花生酱，杏仁，黑巧克力，与日式烘焙玄米的焦香温暖交织。' },
    { name: '沫茶拿铁咖啡',   img: 'images/products/b.jpg', desc: '一系列有趣的口味包括海盐，花生酱，杏仁，黑巧克力，融入宇治抹茶的清雅与丝滑牛乳。' },
    { name: 'HOJICHA拿铁咖啡', img: 'images/products/c.jpg', desc: '一系列有趣的口味包括海盐，花生酱，杏仁，黑巧克力，搭配深度焙煎茶的浓郁焦糖香气。' },
    { name: '榛果风味拿铁咖啡', img: 'images/products/d.jpg', desc: '一系列有趣的口味包括海盐，花生酱，杏仁，黑巧克力，与意大利榛果酱奏响坚果风味乐章。' },
    { name: '冷萃冰咖啡',     img: 'images/products/e.jpg', desc: '12小时低温慢萃的醇净咖啡，搭配海盐焦糖与黑巧克力碎，冰爽层次分明。' },
    { name: '冰沫茶拿铁',     img: 'images/products/f.jpg', desc: '宇治抹茶与冰牛乳的清甜碰撞，花生酱与杏仁点缀其间，一口入夏的清凉回甘。' },
    { name: '冰HOJICHA拿铁',  img: 'images/products/g.jpg', desc: '冰镇焙茶拿铁融合焦糖花生酱的甜蜜，黑巧克力与海盐收尾，夏日解暑必备。' },
    { name: '海盐焦糖冰摩卡', img: 'images/products/h.jpg', desc: '巧克力与焦糖的奢华冰饮，海盐点睛、杏仁增香，甜而不腻的冰爽体验。' }
  ];

  /* --- HomePage Module --- */
  var HomePage = {
    track: null,
    dotsContainer: null,
    autoTimer: null,
    currentIndex: 0,
    cardsPerView: 4,
    cardWidth: 0,
    gapWidth: 24,
    isPaused: false,

    init: function() {
      this.track = document.getElementById('carouselTrack');
      this.dotsContainer = document.getElementById('carouselDots');
      if (!this.track) return;

      this._calcCardsPerView();
      this._renderCards();
      this._renderDots();
      this._bindArrows();
      this._bindHoverPause();
      this._bindResize();
      this._bindPromoToggles();
      this._startAutoPlay();
      this._goTo(0, false);
    },

    _calcCardsPerView: function() {
      var w = window.innerWidth;
      if (w <= 768) this.cardsPerView = 1;
      else if (w <= 1024) this.cardsPerView = 3;
      else this.cardsPerView = 4;
    },

    /* Build cards */
    _renderCards: function() {
      var self = this;
      this.track.innerHTML = '';

      PRODUCTS.forEach(function(p) {
        var card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML =
          '<img class="product-card__img" src="' + p.img + '" alt="' + p.name + '">' +
          '<div class="product-card__body">' +
            '<h3 class="product-card__name">' + p.name + '</h3>' +
            '<p class="product-card__desc">' + p.desc + '</p>' +
          '</div>';
        self.track.appendChild(card);
      });

      /* Calculate card width after render */
      this._updateCardWidth();
    },

    _updateCardWidth: function() {
      var firstCard = this.track.querySelector('.product-card');
      if (!firstCard) return;
      this.cardWidth = firstCard.offsetWidth;
    },

    _getScrollDistance: function() {
      return this.cardWidth + this.gapWidth;
    },

    /* Dots */
    _renderDots: function() {
      var self = this;
      var totalSlides = Math.ceil(PRODUCTS.length / this.cardsPerView);
      this.dotsContainer.innerHTML = '';

      for (var i = 0; i < totalSlides; i++) {
        var dot = document.createElement('button');
        dot.className = 'carousel__dot';
        dot.setAttribute('aria-label', '第' + (i + 1) + '屏');
        dot.addEventListener('click', (function(idx) {
          return function() { self._goTo(idx * self.cardsPerView, true); };
        })(i));
        this.dotsContainer.appendChild(dot);
      }
    },

    _updateDots: function() {
      var dots = this.dotsContainer.querySelectorAll('.carousel__dot');
      var slideIndex = Math.floor(this.currentIndex / this.cardsPerView);
      dots.forEach(function(d, i) {
        d.classList.toggle('carousel__dot--active', i === slideIndex);
      });
    },

    /* Arrows */
    _bindArrows: function() {
      var self = this;
      var left = document.querySelector('.carousel__arrow--left');
      var right = document.querySelector('.carousel__arrow--right');

      if (left) {
        left.addEventListener('click', function() {
          self._goTo(self.currentIndex - self.cardsPerView, true);
          self._resetAutoPlay();
        });
      }
      if (right) {
        right.addEventListener('click', function() {
          self._goTo(self.currentIndex + self.cardsPerView, true);
          self._resetAutoPlay();
        });
      }
    },

    /* Scroll to index */
    _goTo: function(index, animate) {
      var maxIndex = PRODUCTS.length - this.cardsPerView;
      if (index < 0) index = 0;
      if (index > maxIndex) index = maxIndex;

      this.currentIndex = index;

      var scrollLeft = index * this._getScrollDistance();

      if (animate) {
        this.track.style.scrollBehavior = 'smooth';
      } else {
        this.track.style.scrollBehavior = 'auto';
      }

      this.track.scrollLeft = scrollLeft;
      this._updateDots();
    },

    /* Check reduced motion preference */
    _prefersReducedMotion: function() {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    },

    /* Auto play */
    _startAutoPlay: function() {
      if (this._prefersReducedMotion()) return;

      var self = this;
      this._stopAutoPlay();
      this.autoTimer = setInterval(function() {
        if (self.isPaused) return;

        var maxIndex = PRODUCTS.length - self.cardsPerView;
        var next = self.currentIndex + self.cardsPerView;
        if (next > maxIndex) next = 0;
        self._goTo(next, true);
      }, 3500);
    },

    _stopAutoPlay: function() {
      if (this.autoTimer) {
        clearInterval(this.autoTimer);
        this.autoTimer = null;
      }
    },

    _resetAutoPlay: function() {
      this._stopAutoPlay();
      this._startAutoPlay();
    },

    /* Hover pause */
    _bindHoverPause: function() {
      var self = this;
      var carousel = document.getElementById('featuredCarousel');
      if (!carousel) return;

      carousel.addEventListener('mouseenter', function() {
        self.isPaused = true;
      });
      carousel.addEventListener('mouseleave', function() {
        self.isPaused = false;
      });

      /* Touch events for mobile */
      carousel.addEventListener('touchstart', function() {
        self.isPaused = true;
      });
      carousel.addEventListener('touchend', function() {
        setTimeout(function() { self.isPaused = false; }, 2000);
      });
    },

    /* Promo detail toggle */
    _bindPromoToggles: function() {
      var allCards = document.querySelectorAll('.promo-card');
      var allToggles = document.querySelectorAll('.promo-card__toggle');

      /* Reset all cards to collapsed, flex:1 alignment */
      function resetAll() {
        allCards.forEach(function(c) {
          c.classList.remove('promo-card--expanded');
          c.style.flex = '';
          c.style.overflow = '';
        });
        allToggles.forEach(function(t) {
          t.setAttribute('aria-expanded', 'false');
          t.querySelector('.promo-card__toggle-text').textContent = '展开详情';
        });
      }

      /* Lock other cards at current pixel height */
      function lockOthers(expandedCard) {
        allCards.forEach(function(c) {
          if (c !== expandedCard) {
            c.style.flex = '0 0 ' + c.offsetHeight + 'px';
            c.style.overflow = 'hidden';
          }
        });
      }

      allToggles.forEach(function(toggle) {
        toggle.addEventListener('click', function() {
          var card = this.closest('.promo-card');
          var textEl = this.querySelector('.promo-card__toggle-text');
          var isOpen = this.getAttribute('aria-expanded') === 'true';

          if (isOpen) {
            /* Clicking already-expanded card → collapse all */
            resetAll();
          } else {
            /* Collapse any other expanded card, then lock & expand this one */
            resetAll();
            lockOthers(card);
            this.setAttribute('aria-expanded', 'true');
            textEl.textContent = '收起详情';
            card.classList.add('promo-card--expanded');
          }
        });
      });
    },

    /* Resize handler */
    _bindResize: function() {
      var self = this;
      var debouncedResize = BeanSpeak.Util.debounce(function() {
        self._calcCardsPerView();
        self._updateCardWidth();
        self._renderDots();
        self._goTo(0, false);
      }, 300);

      window.addEventListener('resize', debouncedResize);
    }
  };

  /* --- Expose --- */
  window.BeanSpeak = window.BeanSpeak || {};
  window.BeanSpeak.HomePage = HomePage;

})();
