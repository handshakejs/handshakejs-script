(function(EmailAuth){
  var self;
  var CLICK             = "click";
  var TOUCH_SUPPORTED   = (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) ? true : false;
  if (!!TOUCH_SUPPORTED) {
    CLICK               = "touchend";
  }

  EmailAuth.prototype.events = function() {
    self = this;

    this._submitEmailForm();
    this._submitAuthcodeForm();
  };

  EmailAuth.prototype._submitEmailForm = function() {
    this.email_form.addEventListener('submit', this.requestLogin, false);
  };

  EmailAuth.prototype._submitAuthcodeForm = function() {
    this.authcode_form.addEventListener('submit', this.confirmLogin, false);
  };

  EmailAuth.prototype._showEmailFormOnly = function() {
    this.removeClass(this.email_form, "emailauth-hidden");
    this.addClass(this.authcode_form, "emailauth-hidden");
  };

  EmailAuth.prototype._showAuthcodeFormOnly = function() {
    this.addClass(this.email_form, "emailauth-hidden");
    this.removeClass(this.authcode_form, "emailauth-hidden");
  };

  EmailAuth.prototype.requestLogin = function(e) {
    if (e) { e.preventDefault(); }

    var payload = {
      email:    self.email_field.value, 
      app_name: self.app_name
    };
    var url     = self.root_url+"/api/v0/login/request.json";

    self.Post(url, payload, function(resp) {
      if (!!resp.success) {
        self._showAuthcodeFormOnly();
      } else { 
        self._showEmailFormOnly();
        alert(resp.error.message);
      }
    });
  };

  EmailAuth.prototype.confirmLogin = function(e) {
    if (e) { e.preventDefault(); }

    var payload = {
      authcode: self.authcode_field.value, 
      email:    self.email_field.value, 
      app_name: self.app_name
    };
    var url     = self.root_url+"/api/v0/login/confirm.json";

    self.Post(url, payload, function(resp) {
      if (!!resp.success) {
        self.FireEvent("emailauth:login_confirm", self.script, resp);
        self.addClass(self.authcode_form, "emailauth-hidden");
      } else { 
        self.removeClass(self.authcode_form, "emailauth-hidden");
        alert(resp.error.message);
      }
    });
  };

}(EmailAuth));
