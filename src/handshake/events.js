(function(Handshake){
  var self;
  var CLICK             = "click";
  var TOUCH_SUPPORTED   = (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) ? true : false;
  if (!!TOUCH_SUPPORTED) {
    CLICK               = "touchend";
  }

  Handshake.prototype.events = function() {
    self = this;

    this._submitEmailForm();
    this._submitAuthcodeForm();
  };

  Handshake.prototype._submitEmailForm = function() {
    this.email_form.addEventListener('submit', this.requestLogin, false);
  };

  Handshake.prototype._submitAuthcodeForm = function() {
    this.authcode_form.addEventListener('submit', this.confirmLogin, false);
  };

  Handshake.prototype._showEmailFormOnly = function() {
    this.removeClass(this.email_form, "handshake-hidden");
    this.addClass(this.authcode_form, "handshake-hidden");
  };

  Handshake.prototype._showAuthcodeFormOnly = function() {
    this.addClass(this.email_form, "handshake-hidden");
    this.removeClass(this.authcode_form, "handshake-hidden");
    this.authcode_field.focus();
  };

  Handshake.prototype.requestLogin = function(e) {
    if (e) { e.preventDefault(); }

    var payload = {
      email:    self.email_field.value, 
      app_name: self.app_name
    };
    var url     = self.root_url+"/api/v0/login/request.json";

    self.Post(url, payload, function(resp) {
      if (!!resp.success) {
        self.FireEvent("handshake:request_confirm", self.script, resp);
        self._showAuthcodeFormOnly();
      } else { 
        self._showEmailFormOnly();
        alert(resp.error.message);
      }
    });
  };

  Handshake.prototype.confirmLogin = function(e) {
    if (e) { e.preventDefault(); }

    var payload = {
      authcode: self.authcode_field.value, 
      email:    self.email_field.value, 
      app_name: self.app_name
    };
    var url     = self.root_url+"/api/v0/login/confirm.json";

    self.Post(url, payload, function(resp) {
      if (!!resp.success) {
        self.FireEvent("handshake:login_confirm", self.script, resp);
        self.addClass(self.authcode_form, "handshake-hidden");
      } else { 
        self.removeClass(self.authcode_form, "handshake-hidden");
        alert(resp.error.message);
      }
    });
  };

}(Handshake));
