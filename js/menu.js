/* ============================================
   BeanSpeak Coffee - Menu Page JS
   Cart CRUD, LocalStorage, Pagination, Category Filter
   ============================================ */

(function() {
  'use strict';

  /* --- Product Data --- */
  var PRODUCTS = [
    /* 玄米拿铁 */
    { id: 1,  name: '经典玄米拿铁',       category: 'genmai',  price: 32, originalPrice: 38,  desc: '日式烘焙玄米的经典之作', image: 'images/products/a.jpg' },
    { id: 2,  name: '玄米焦糖拿铁',       category: 'genmai',  price: 36, originalPrice: 42,  desc: '焦糖与玄米的美妙邂逅',     image: 'images/products/b.jpg' },
    { id: 3,  name: '冰玄米拿铁',         category: 'genmai',  price: 34, originalPrice: 40,  desc: '夏日的清凉玄米体验',       image: 'images/products/c.jpg' },
    { id: 4,  name: '玄米燕麦拿铁',       category: 'genmai',  price: 38, originalPrice: 45,  desc: '植物基燕麦与玄米的健康搭配', image: 'images/products/d.jpg' },
    { id: 5,  name: '玄米榛果拿铁',       category: 'genmai',  price: 36, originalPrice: 43,  desc: '榛果风味与玄米香的碰撞',   image: 'images/products/a.jpg' },
    { id: 6,  name: '玄米海盐拿铁',       category: 'genmai',  price: 35, originalPrice: 40,  desc: '海盐提味，玄米香更浓郁',   image: 'images/products/b.jpg' },

    /* 沫茶拿铁 */
    { id: 7,  name: '经典沫茶拿铁',       category: 'matcha',  price: 34, originalPrice: 40,  desc: '宇治抹茶的温润呈现',       image: 'images/products/c.jpg' },
    { id: 8,  name: '冰沫茶拿铁',         category: 'matcha',  price: 36, originalPrice: 42,  desc: '冰爽与茶香的双重享受',     image: 'images/products/d.jpg' },
    { id: 9,  name: '沫茶白巧克力拿铁',   category: 'matcha',  price: 40, originalPrice: 48,  desc: '白巧克力的甜蜜融入茶香',   image: 'images/products/a.jpg' },
    { id: 10, name: '沫茶椰奶拿铁',       category: 'matcha',  price: 38, originalPrice: 45,  desc: '椰香与抹茶的异域风情',     image: 'images/products/b.jpg' },
    { id: 11, name: '沫茶红豆拿铁',       category: 'matcha',  price: 36, originalPrice: 42,  desc: '经典日式红豆搭配抹茶',     image: 'images/products/c.jpg' },
    { id: 12, name: '沫茶杏仁拿铁',       category: 'matcha',  price: 38, originalPrice: 44,  desc: '杏仁的坚果香气衬托茶韵',   image: 'images/products/d.jpg' },

    /* HOJICHA */
    { id: 13, name: '经典HOJICHA拿铁',    category: 'hojicha', price: 33, originalPrice: 38,  desc: '焙茶的焦香与奶香完美融合', image: 'images/products/a.jpg' },
    { id: 14, name: '冰HOJICHA拿铁',      category: 'hojicha', price: 35, originalPrice: 40,  desc: '冰爽焙茶，夏日解暑之选',   image: 'images/products/b.jpg' },
    { id: 15, name: 'HOJICHA焦糖拿铁',    category: 'hojicha', price: 37, originalPrice: 44,  desc: '焦糖甜味烘托焙茶焦香',     image: 'images/products/c.jpg' },
    { id: 16, name: 'HOJICHA黑糖拿铁',    category: 'hojicha', price: 38, originalPrice: 45,  desc: '冲绳黑糖与焙茶的浓郁滋味', image: 'images/products/d.jpg' },
    { id: 17, name: 'HOJICHA燕麦拿铁',    category: 'hojicha', price: 39, originalPrice: 46,  desc: '燕麦奶与焙茶的健康选择',   image: 'images/products/a.jpg' },
    { id: 18, name: 'HOJICHA可可拿铁',    category: 'hojicha', price: 37, originalPrice: 43,  desc: '可可与焙茶的双重浓郁体验', image: 'images/products/b.jpg' },

    /* 冷饮 — image: e~h 循环 */
    { id: 19, name: '冷萃黑咖啡',         category: 'cold',    price: 28, originalPrice: 34,  desc: '12小时低温慢萃，醇香顺滑',       image: 'images/products/e.jpg' },
    { id: 20, name: '冰美式咖啡',         category: 'cold',    price: 25, originalPrice: 30,  desc: '经典冰咖啡，清爽纯粹',             image: 'images/products/f.jpg' },
    { id: 21, name: '冰焦糖玛奇朵',       category: 'cold',    price: 36, originalPrice: 42,  desc: '焦糖与咖啡的冰爽版本',             image: 'images/products/g.jpg' },
    { id: 22, name: '冰摩卡',             category: 'cold',    price: 38, originalPrice: 45,  desc: '巧克力与咖啡的冰爽二重奏',         image: 'images/products/h.jpg' },
    { id: 23, name: '柠檬气泡咖啡',       category: 'cold',    price: 32, originalPrice: 38,  desc: '咖啡与气泡水的创新组合',           image: 'images/products/e.jpg' },
    { id: 24, name: '椰青冷萃',           category: 'cold',    price: 35, originalPrice: 42,  desc: '椰子水与冷萃咖啡的热带风情',       image: 'images/products/f.jpg' },

    /* 热饮 — image: a~d 循环 */
    { id: 25, name: '经典拿铁',           category: 'hot',     price: 28, originalPrice: 34,  desc: '意式浓缩与牛奶的永恒经典',         image: 'images/products/a.jpg' },
    { id: 26, name: '卡布奇诺',           category: 'hot',     price: 30, originalPrice: 36,  desc: '黄金比例的奶泡与咖啡',             image: 'images/products/b.jpg' },
    { id: 27, name: '摩卡',               category: 'hot',     price: 34, originalPrice: 40,  desc: '巧克力与咖啡的温暖交融',           image: 'images/products/c.jpg' },
    { id: 28, name: '美式咖啡',           category: 'hot',     price: 24, originalPrice: 28,  desc: '纯粹咖啡体验，风味层次分明',       image: 'images/products/d.jpg' },
    { id: 29, name: '馥芮白',             category: 'hot',     price: 32, originalPrice: 38,  desc: '丝绒般细腻的奶泡口感',             image: 'images/products/a.jpg' },
    { id: 30, name: '浓缩咖啡',           category: 'hot',     price: 22, originalPrice: 26,  desc: '最纯粹的咖啡精华',                 image: 'images/products/b.jpg' },
    { id: 31, name: '焦糖玛奇朵（热）',   category: 'hot',     price: 34, originalPrice: 40,  desc: '温热焦糖的甜蜜诱惑',               image: 'images/products/c.jpg' },
    { id: 32, name: '榛果拿铁',           category: 'hot',     price: 32, originalPrice: 38,  desc: '榛果风味融合经典拿铁',             image: 'images/products/d.jpg' },
    { id: 33, name: '香草拿铁',           category: 'hot',     price: 32, originalPrice: 38,  desc: '香草的温柔与咖啡的醇厚',           image: 'images/products/a.jpg' },
    { id: 34, name: '海盐焦糖拿铁',       category: 'hot',     price: 36, originalPrice: 42,  desc: '甜咸交织的浓郁口感',               image: 'images/products/b.jpg' },
    { id: 35, name: '爱尔兰咖啡',         category: 'hot',     price: 42, originalPrice: 50,  desc: '经典鸡尾酒咖啡的温暖演绎',         image: 'images/products/c.jpg' },
    { id: 36, name: '黑糖姜味拿铁',       category: 'hot',     price: 35, originalPrice: 42,  desc: '冬季暖身的独特风味拿铁',           image: 'images/products/d.jpg' }
  ];

  var ITEMS_PER_PAGE = 12;

  /* --- Cart Manager --- */
  var CartManager = {
    STORAGE_KEY: 'beanspeak_cart',

    getCart: function() {
      try {
        return JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '{}');
      } catch (e) {
        return {};
      }
    },

    saveCart: function(cart) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(cart));
    },

    addItem: function(productId) {
      var product = PRODUCTS.find(function(p) { return p.id === productId; });
      if (!product) return;

      var cart = this.getCart();
      var key = String(productId);

      if (cart[key]) {
        cart[key].quantity += 1;
      } else {
        cart[key] = {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1
        };
      }

      this.saveCart(cart);
      return cart;
    },

    removeItem: function(productId) {
      var cart = this.getCart();
      delete cart[String(productId)];
      this.saveCart(cart);
      return cart;
    },

    updateQuantity: function(productId, delta) {
      var cart = this.getCart();
      var key = String(productId);

      if (!cart[key]) return cart;

      cart[key].quantity += delta;

      if (cart[key].quantity <= 0) {
        delete cart[key];
      }

      this.saveCart(cart);
      return cart;
    },

    clearCart: function() {
      localStorage.removeItem(this.STORAGE_KEY);
    },

    getTotal: function() {
      var cart = this.getCart();
      var total = 0;
      Object.values(cart).forEach(function(item) {
        total += item.price * item.quantity;
      });
      return total;
    },

    getCount: function() {
      var cart = this.getCart();
      var count = 0;
      Object.values(cart).forEach(function(item) {
        count += item.quantity;
      });
      return count;
    }
  };

  /* --- Menu Page Module --- */
  var MenuPage = {
    currentCategory: 'all',
    currentPage: 1,
    filteredProducts: [],

    init: function() {
      this.filteredProducts = PRODUCTS.slice();
      this._bindCategoryFilter();
      this._bindCartPanel();
      this._bindProductGrid();
      this._renderCurrentPage();
      this.renderCart();
    },

    /* --- Category Filter --- */
    _bindCategoryFilter: function() {
      var self = this;
      var categoryList = document.getElementById('categoryList');
      if (!categoryList) return;

      categoryList.addEventListener('click', function(e) {
        var btn = e.target.closest('.category-list__btn');
        if (!btn) return;

        /* Update active */
        categoryList.querySelectorAll('.category-list__btn').forEach(function(b) {
          b.classList.remove('category-list__btn--active');
        });
        btn.classList.add('category-list__btn--active');

        /* Filter */
        self.currentCategory = btn.getAttribute('data-category');
        self.currentPage = 1;

        if (self.currentCategory === 'all') {
          self.filteredProducts = PRODUCTS.slice();
        } else {
          self.filteredProducts = PRODUCTS.filter(function(p) {
            return p.category === self.currentCategory;
          });
        }

        self._renderCurrentPage();
      });
    },

    /* --- Product Grid Click (event delegation) --- */
    _bindProductGrid: function() {
      var self = this;
      var grid = document.getElementById('productGrid');
      if (!grid) return;

      grid.addEventListener('click', function(e) {
        var btn = e.target.closest('[data-action="add-to-cart"]');
        if (!btn) return;

        var productId = parseInt(btn.getAttribute('data-product-id'));
        var card = btn.closest('.menu-product-card');

        /* Add to cart */
        CartManager.addItem(productId);

        /* Feedback animation */
        if (card) {
          card.classList.add('menu-product-card--added');
          setTimeout(function() {
            card.classList.remove('menu-product-card--added');
          }, 800);
        }

        /* Bounce cart button */
        var floatBtn = document.getElementById('cartFloatBtn');
        if (floatBtn) {
          floatBtn.classList.add('cart-float-btn--bounce');
          setTimeout(function() {
            floatBtn.classList.remove('cart-float-btn--bounce');
          }, 400);
        }

        /* Update cart UI */
        self.renderCart();
        if (BeanSpeak.Nav) BeanSpeak.Nav._updateCartBadge();
      });
    },

    /* --- Render Product Grid --- */
    _renderProductGrid: function() {
      var grid = document.getElementById('productGrid');
      if (!grid) return;

      var start = (this.currentPage - 1) * ITEMS_PER_PAGE;
      var end = start + ITEMS_PER_PAGE;
      var pageProducts = this.filteredProducts.slice(start, end);

      grid.innerHTML = '';

      if (pageProducts.length === 0) {
        grid.innerHTML = '<p style="grid-column:1/-1;text-align:center;color:var(--text-light);padding:60px;">该分类暂无商品</p>';
        return;
      }

      pageProducts.forEach(function(p) {
        var card = document.createElement('div');
        card.className = 'menu-product-card';

        var imgHtml = p.image
          ? '<img class="menu-product-card__img" src="' + p.image + '" alt="' + p.name + '" loading="lazy">'
          : '<div class="menu-product-card__img image-placeholder">' + p.name + '</div>';

        card.innerHTML =
          imgHtml +
          '<div class="menu-product-card__body">' +
            '<h3 class="menu-product-card__name">' + p.name + '</h3>' +
            '<span class="menu-product-card__category">' + p.desc + '</span>' +
            '<div class="menu-product-card__pricing">' +
              '<span class="menu-product-card__price-original">' + BeanSpeak.Util.formatPrice(p.originalPrice) + '</span>' +
              '<span class="menu-product-card__price">' + BeanSpeak.Util.formatPrice(p.price) + '</span>' +
            '</div>' +
            '<button class="menu-product-card__add-btn" data-action="add-to-cart" data-product-id="' + p.id + '">加入购物车</button>' +
          '</div>';
        grid.appendChild(card);
      });
    },

    /* --- Render Pagination --- */
    _renderPagination: function() {
      var pagination = document.getElementById('pagination');
      if (!pagination) return;

      var totalPages = Math.ceil(this.filteredProducts.length / ITEMS_PER_PAGE);
      if (totalPages <= 1) {
        pagination.innerHTML = '';
        return;
      }

      var self = this;
      var html = '';

      /* Prev */
      html += '<button class="pagination__btn" data-page="prev" ' +
        (this.currentPage <= 1 ? 'disabled' : '') + '>‹</button>';

      /* Page numbers */
      for (var i = 1; i <= totalPages; i++) {
        /* Show first, last, and pages around current */
        var show = i === 1 || i === totalPages ||
                   (i >= this.currentPage - 1 && i <= this.currentPage + 1);

        if (show) {
          html += '<button class="pagination__btn' +
            (i === this.currentPage ? ' pagination__btn--active' : '') +
            '" data-page="' + i + '">' + i + '</button>';
        } else if (i === this.currentPage - 2 || i === this.currentPage + 2) {
          html += '<span class="pagination__ellipsis">…</span>';
        }
      }

      /* Next */
      html += '<button class="pagination__btn" data-page="next" ' +
        (this.currentPage >= totalPages ? 'disabled' : '') + '>›</button>';

      pagination.innerHTML = html;

      /* Bind pagination clicks */
      pagination.querySelectorAll('.pagination__btn').forEach(function(btn) {
        btn.addEventListener('click', function() {
          var page = btn.getAttribute('data-page');
          var total = Math.ceil(self.filteredProducts.length / ITEMS_PER_PAGE);

          if (page === 'prev') {
            self.currentPage = Math.max(1, self.currentPage - 1);
          } else if (page === 'next') {
            self.currentPage = Math.min(total, self.currentPage + 1);
          } else {
            self.currentPage = parseInt(page);
          }

          self._renderCurrentPage();
          /* Scroll to top of product grid */
          document.getElementById('productGrid').scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
      });
    },

    _renderCurrentPage: function() {
      this._renderProductGrid();
      this._renderPagination();
    },

    /* --- Cart Panel --- */
    _bindCartPanel: function() {
      var self = this;
      var cartPanel = document.getElementById('cartPanel');
      var cartFloatBtn = document.getElementById('cartFloatBtn');
      var cartClose = document.getElementById('cartClose');
      var cartClear = document.getElementById('cartClear');
      var cartOrder = document.getElementById('cartOrder');

      /* Open cart */
      if (cartFloatBtn) {
        cartFloatBtn.addEventListener('click', function() {
          cartPanel.classList.add('cart-panel--open');
          document.body.style.overflow = 'hidden';
        });
      }

      /* Close cart */
      if (cartClose && cartPanel) {
        cartClose.addEventListener('click', function() {
          cartPanel.classList.remove('cart-panel--open');
          document.body.style.overflow = '';
        });
      }

      /* Clear cart */
      if (cartClear) {
        cartClear.addEventListener('click', function() {
          if (CartManager.getCount() === 0) return;
          CartManager.clearCart();
          self.renderCart();
          if (BeanSpeak.Nav) BeanSpeak.Nav._updateCartBadge();
        });
      }

      /* Place order */
      if (cartOrder) {
        cartOrder.addEventListener('click', function() {
          if (CartManager.getCount() === 0) return;

          BeanSpeak.Modal.open({
            icon: '✓',
            title: '下单成功！',
            message: '感谢您的订购，我们将尽快为您准备咖啡。\n订单金额：' +
              BeanSpeak.Util.formatPrice(CartManager.getTotal()),
            btnText: '好的',
            onClose: function() {
              CartManager.clearCart();
              self.renderCart();
              if (BeanSpeak.Nav) BeanSpeak.Nav._updateCartBadge();
            }
          });

          cartPanel.classList.remove('cart-panel--open');
          document.body.style.overflow = '';
        });
      }

      /* Cart item actions (event delegation) */
      var cartItemsContainer = document.getElementById('cartItems');
      if (cartItemsContainer) {
        cartItemsContainer.addEventListener('click', function(e) {
          var qtyBtn = e.target.closest('[data-action]');
          if (!qtyBtn) return;

          var productId = parseInt(qtyBtn.getAttribute('data-product-id'));
          var action = qtyBtn.getAttribute('data-action');

          if (action === 'increase') {
            CartManager.updateQuantity(productId, 1);
          } else if (action === 'decrease') {
            CartManager.updateQuantity(productId, -1);
          } else if (action === 'remove') {
            CartManager.removeItem(productId);
          }

          self.renderCart();
          if (BeanSpeak.Nav) BeanSpeak.Nav._updateCartBadge();
        });
      }
    },

    /* --- Render Cart --- */
    renderCart: function() {
      var cart = CartManager.getCart();
      var items = Object.values(cart);
      var cartItemsEl = document.getElementById('cartItems');
      var cartTotalEl = document.getElementById('cartTotal');
      var cartFloatCount = document.getElementById('cartFloatCount');

      /* Float button count */
      var count = CartManager.getCount();
      if (cartFloatCount) {
        cartFloatCount.textContent = count > 0 ? count : '';
      }

      /* Total */
      if (cartTotalEl) {
        cartTotalEl.textContent = BeanSpeak.Util.formatPrice(CartManager.getTotal());
      }

      /* Items */
      if (!cartItemsEl) return;

      if (items.length === 0) {
        cartItemsEl.innerHTML = '<div class="cart-panel__empty">购物车是空的<br>快去挑选心仪的咖啡吧</div>';
        return;
      }

      cartItemsEl.innerHTML = items.map(function(item) {
        return '<div class="cart-item">' +
          '<div class="cart-item__info">' +
            '<div class="cart-item__name">' + item.name + '</div>' +
            '<div class="cart-item__price">' + BeanSpeak.Util.formatPrice(item.price) + '</div>' +
          '</div>' +
          '<div class="cart-item__qty">' +
            '<button class="cart-item__qty-btn" data-action="decrease" data-product-id="' + item.id + '">−</button>' +
            '<span class="cart-item__qty-num">' + item.quantity + '</span>' +
            '<button class="cart-item__qty-btn" data-action="increase" data-product-id="' + item.id + '">+</button>' +
          '</div>' +
          '<button class="cart-item__remove" data-action="remove" data-product-id="' + item.id + '" aria-label="删除">&times;</button>' +
        '</div>';
      }).join('');
    }
  };

  /* --- Expose --- */
  window.BeanSpeak = window.BeanSpeak || {};
  window.BeanSpeak.CartManager = CartManager;
  window.BeanSpeak.MenuPage = MenuPage;

})();
