/*! emailauth-js.js - 0.0.1 - 2013-10-17 - scottmotte */
(function(exports){
  var EmailAuth = function() {
    if(!(this instanceof EmailAuth)){
      return new EmailAuth();
    }

    this.uuid      = this.Uuid();
    this.script    = this.CurrentlyExecutedScript();
    this.init();

    return this;
  };

  EmailAuth.prototype.init = function() {
    if (this.script) {
      this.script.className += " emailauth-script";
      this.script.id        = "emailauth-script-"+this.uuid;
      this.app_name         = this.script.getAttribute("data-app_name");
      this.root_url         = this.script.getAttribute("data-root_url");
      this.confirm_url      = this.script.getAttribute("data-confirm_url") || "/login/request.json";

      if (!this.app_name || this.app_name.length < 1) {
        console.error("Warning: data-app_name not set on script tag. Set to the app_name you setup."); 
      }
      if (!this.root_url || this.root_url.length < 1) {
        console.error("Warning: data-root_url not set on script tag. Set to the root url where you deployed emailauth. Likely, https://somedomain.herokuapp.com."); 
      }

      this.draw();
      this.events();
    } else {
      console.error("ERROR: Could not find script tag to initialize on.");
    }
  };

  exports.EmailAuth = EmailAuth;

}(this));


(function(EmailAuth){EmailAuth.prototype._drawCss = function() {this.css = '@charset "utf-8";.emailauth-hidden{display:none}';var style = document.createElement('style');style.type = 'text/css';if (style.styleSheet) {style.styleSheet.cssText = this.css;} else {style.appendChild(document.createTextNode(this.css));}return document.body.appendChild(style);};}(EmailAuth));

(function(EmailAuth){
  EmailAuth.prototype.draw = function() {
    this._drawCss();
    this._drawEmailForm();
    this._drawEmailField();
    this._drawEmailSubmitBtn();
    this._drawAuthcodeForm();
    this._drawAuthcodeField();
    this._drawAuthcodeSubmitBtn();
  };

  EmailAuth.prototype._drawEmailForm = function() {
    this.email_form                     = document.createElement('form');
    this.email_form.className           = "emailauth-email-form";
    this.email_form.id                  = "emailauth-email-form-"+this.uuid;

    return this.InsertAfter(this.script, this.email_form);
  };

  EmailAuth.prototype._drawEmailSubmitBtn = function() {
    this.email_submit_btn               = document.createElement('input'); 
    this.email_submit_btn.className     = "emailauth-email-submit-btn";
    this.email_submit_btn.id            = "emailauth-email-submit-btn-"+this.uuid;
    this.email_submit_btn.type          = "submit";
    this.email_submit_btn.value         = "Request Login";
      
    return this.email_form.appendChild(this.email_submit_btn);
  };

  EmailAuth.prototype._drawEmailField = function() {
    this.email_field                    = document.createElement('input');
    this.email_field.className          = "emailauth-email-field";
    this.email_field.id                 = "emailauth-email-field-id-"+this.uuid;
    this.email_field.placeholder        = "email";

    return this.email_form.appendChild(this.email_field);
  };

  EmailAuth.prototype._drawAuthcodeForm = function() {
    this.authcode_form                      = document.createElement('form');
    this.authcode_form.className            = "emailauth-authcode-form emailauth-hidden";
    this.authcode_form.id                   = "emailauth-authcode-form-"+this.uuid;

    return this.InsertAfter(this.email_form, this.authcode_form);
  };

  EmailAuth.prototype._drawAuthcodeSubmitBtn = function() {
    this.authcode_submit_btn                = document.createElement('input'); 
    this.authcode_submit_btn.className      = "emailauth-authcode-submit-btn";
    this.authcode_submit_btn.id             = "emailauth-authcode-submit-btn-"+this.uuid;
    this.authcode_submit_btn.type           = "submit";
    this.authcode_submit_btn.value          = "Confirm Login";
      
    return this.authcode_form.appendChild(this.authcode_submit_btn);
  };

  EmailAuth.prototype._drawAuthcodeField = function() {
    this.authcode_field                     = document.createElement('input');
    this.authcode_field.className           = "emailauth-authcode-field";
    this.authcode_field.id                  = "emailauth-authcode-field-id-"+this.uuid;
    this.authcode_field.placeholder         = "authcode";    

    return this.authcode_form.appendChild(this.authcode_field);
  };

}(EmailAuth));


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


(function(EmailAuth){  
  EmailAuth.prototype.Uuid = function() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
      var r, v;
      r = Math.random() * 16 | 0;
      v = (c === "x" ? r : r & 0x3 | 0x8);
      return v.toString(16);
    });
  };

  EmailAuth.prototype.CurrentlyExecutedScript = function() {
    var script;

    if (document) {
      var scripts = document.getElementsByTagName('script');
      script      = scripts[scripts.length - 1];
    }
    return script;
  };

  EmailAuth.prototype.InsertAfter = function(reference_node, new_node) {
    return reference_node.parentNode.insertBefore(new_node, reference_node.nextSibling);
  };

  EmailAuth.prototype.hasClass = function(el, name) {
    return new RegExp('(\\s|^)'+name+'(\\s|$)').test(el.className);
  };

  EmailAuth.prototype.addClass = function(el, name) {
    if (!this.hasClass(el, name)) { 
      el.className += (el.className ? ' ' : '') +name; 
    }
  };

  EmailAuth.prototype.removeClass = function(el, name) {
    if (this.hasClass(el, name)) {
      el.className=el.className.replace(new RegExp('(\\s|^)'+name+'(\\s|$)'),' ').replace(/^\s+|\s+$/g, '');
    }
  };
  
  EmailAuth.prototype.FireEvent = function(name, target, data) {
    //Create a generic event
    var bubbles     = true;
    var cancelable  = true;
    var event       = document.createEvent("Events");
    //Initialize it to be the event we want
    event.initEvent(name, bubbles, cancelable);
    event.data = data;
    //FIRE!
    target.dispatchEvent(event);
  };

  EmailAuth.prototype.Post = function(url, data, callback){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("post", url, true);
    xmlhttp.setRequestHeader("Content-type", "application/json");
    xmlhttp.onreadystatechange = function(){
      if (xmlhttp.readyState==4){
        if (xmlhttp.status==200){
          callback(JSON.parse(xmlhttp.responseText));
        } else {
          console.error("You found an ajax error. Please create an issue at http://github.com/scottmotte/emailauth.");
        }
      }
    };

    xmlhttp.send(JSON.stringify(data));
  };

  EmailAuth.prototype.FireEvent = function(name, target, data) {
    //Create a generic event
    var bubbles     = true;
    var cancelable  = true;
    var event       = document.createEvent("Events");
    //Initialize it to be the event we want
    event.initEvent(name, bubbles, cancelable);
    event.data = data;
    //FIRE!
    target.dispatchEvent(event);
  };

}(EmailAuth));


var emailauth = EmailAuth();

