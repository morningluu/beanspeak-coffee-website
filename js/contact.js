/* ============================================
   BeanSpeak Coffee - Contact Page JS
   Form Validation
   ============================================ */

(function() {
  'use strict';

  var ContactPage = {
    form: null,

    init: function() {
      this.form = document.getElementById('contactForm');
      if (!this.form) return;
      this._bindSubmit();
    },

    _bindSubmit: function() {
      var self = this;
      this.form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (self._validate()) {
          self._showSuccess();
        }
      });
    },

    _validate: function() {
      var isValid = true;

      /* Name */
      var name = this._getVal('name');
      if (!name) {
        this._showError('name', '请输入用户名');
        isValid = false;
      } else if (name.length < 2) {
        this._showError('name', '用户名至少需要2个字符');
        isValid = false;
      } else {
        this._clearError('name');
      }

      /* Email */
      var email = this._getVal('email');
      var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email) {
        this._showError('email', '请输入邮箱地址');
        isValid = false;
      } else if (!emailRegex.test(email)) {
        this._showError('email', '请输入有效的邮箱地址');
        isValid = false;
      } else {
        this._clearError('email');
      }

      /* Address (optional) - no validation needed */

      /* Message */
      var message = this._getVal('message');
      if (!message) {
        this._showError('message', '请输入建议内容');
        isValid = false;
      } else if (message.length < 10) {
        this._showError('message', '建议内容至少需要10个字符');
        isValid = false;
      } else {
        this._clearError('message');
      }

      return isValid;
    },

    _getVal: function(fieldId) {
      var input = document.getElementById(fieldId);
      if (!input) return '';
      return input.value.trim();
    },

    _showError: function(fieldId, message) {
      var input = document.getElementById(fieldId);
      var errorEl = document.getElementById(fieldId + 'Error');

      if (input) {
        input.classList.add('form-input--error');
      }
      if (errorEl) {
        errorEl.textContent = message;
      }
    },

    _clearError: function(fieldId) {
      var input = document.getElementById(fieldId);
      var errorEl = document.getElementById(fieldId + 'Error');

      if (input) {
        input.classList.remove('form-input--error');
      }
      if (errorEl) {
        errorEl.textContent = '';
      }
    },

    _showSuccess: function() {
      var self = this;

      BeanSpeak.Modal.open({
        icon: '✓',
        title: '留言提交成功！',
        message: '感谢您的留言，我们会在24小时内与您联系。',
        btnText: '好的',
        onClose: function() {
          self.form.reset();
        }
      });
    }
  };

  /* --- Expose --- */
  window.BeanSpeak = window.BeanSpeak || {};
  window.BeanSpeak.ContactPage = ContactPage;

})();
