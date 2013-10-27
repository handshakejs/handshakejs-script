/*! handshake-js.js - 0.0.1 - 2013-10-26 - scottmotte */
(function(exports){
  var Handshake = function() {
    if(!(this instanceof Handshake)){
      return new Handshake();
    }

    this.uuid      = this.Uuid();
    this.script    = this.CurrentlyExecutedScript();
    this.init();

    return this;
  };

  Handshake.prototype.init = function() {
    if (this.script) {
      this.script.className += " handshake-script";
      this.script.id        = "handshake-script-"+this.uuid;
      this.app_name         = this.script.getAttribute("data-app_name");
      this.root_url         = this.script.getAttribute("data-root_url");
      this.confirm_url      = this.script.getAttribute("data-confirm_url") || "/login/request.json";

      if (!this.app_name || this.app_name.length < 1) {
        console.error("Warning: data-app_name not set on script tag. Set to the app_name you setup."); 
      }
      if (!this.root_url || this.root_url.length < 1) {
        console.error("Warning: data-root_url not set on script tag. Set to the root url where you deployed handshake. Likely, https://somedomain.herokuapp.com."); 
      }

      this.draw();
      this.events();
    } else {
      console.error("ERROR: Could not find script tag to initialize on.");
    }
  };

  exports.Handshake = Handshake;

}(this));


(function(Handshake){Handshake.prototype._drawCss = function() {this.css = '@charset "utf-8";.handshake-hidden{display:none}';var style = document.createElement('style');style.type = 'text/css';if (style.styleSheet) {style.styleSheet.cssText = this.css;} else {style.appendChild(document.createTextNode(this.css));}return document.body.appendChild(style);};}(Handshake));

(function(Handshake){
  Handshake.prototype.draw = function() {
    this._drawCss();
    this._drawEmailForm();
    this._drawEmailField();
    this._drawEmailSubmitBtn();
    this._drawAuthcodeForm();
    this._drawAuthcodeField();
    this._drawAuthcodeSubmitBtn();
  };

  Handshake.prototype._drawEmailForm = function() {
    this.email_form                     = document.createElement('form');
    this.email_form.className           = "handshake-email-form";
    this.email_form.id                  = "handshake-email-form-"+this.uuid;

    return this.InsertAfter(this.script, this.email_form);
  };

  Handshake.prototype._drawEmailSubmitBtn = function() {
    this.email_submit_btn               = document.createElement('input'); 
    this.email_submit_btn.className     = "handshake-email-submit-btn";
    this.email_submit_btn.id            = "handshake-email-submit-btn-"+this.uuid;
    this.email_submit_btn.type          = "submit";
    this.email_submit_btn.value         = "Request Login";
      
    return this.email_form.appendChild(this.email_submit_btn);
  };

  Handshake.prototype._drawEmailField = function() {
    this.email_field                    = document.createElement('input');
    this.email_field.className          = "handshake-email-field";
    this.email_field.id                 = "handshake-email-field-id-"+this.uuid;
    this.email_field.placeholder        = "email";

    return this.email_form.appendChild(this.email_field);
  };

  Handshake.prototype._drawAuthcodeForm = function() {
    this.authcode_form                      = document.createElement('form');
    this.authcode_form.className            = "handshake-authcode-form handshake-hidden";
    this.authcode_form.id                   = "handshake-authcode-form-"+this.uuid;

    return this.InsertAfter(this.email_form, this.authcode_form);
  };

  Handshake.prototype._drawAuthcodeSubmitBtn = function() {
    this.authcode_submit_btn                = document.createElement('input'); 
    this.authcode_submit_btn.className      = "handshake-authcode-submit-btn";
    this.authcode_submit_btn.id             = "handshake-authcode-submit-btn-"+this.uuid;
    this.authcode_submit_btn.type           = "submit";
    this.authcode_submit_btn.value          = "Confirm Login";
      
    return this.authcode_form.appendChild(this.authcode_submit_btn);
  };

  Handshake.prototype._drawAuthcodeField = function() {
    this.authcode_field                     = document.createElement('input');
    this.authcode_field.className           = "handshake-authcode-field";
    this.authcode_field.id                  = "handshake-authcode-field-id-"+this.uuid;
    this.authcode_field.placeholder         = "authcode";    

    return this.authcode_form.appendChild(this.authcode_field);
  };

}(Handshake));


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


(function(Handshake){  
  Handshake.prototype.Uuid = function() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
      var r, v;
      r = Math.random() * 16 | 0;
      v = (c === "x" ? r : r & 0x3 | 0x8);
      return v.toString(16);
    });
  };

  Handshake.prototype.CurrentlyExecutedScript = function() {
    var script;

    if (document) {
      var scripts = document.getElementsByTagName('script');
      script      = scripts[scripts.length - 1];
    }
    return script;
  };

  Handshake.prototype.InsertAfter = function(reference_node, new_node) {
    return reference_node.parentNode.insertBefore(new_node, reference_node.nextSibling);
  };

  Handshake.prototype.hasClass = function(el, name) {
    return new RegExp('(\\s|^)'+name+'(\\s|$)').test(el.className);
  };

  Handshake.prototype.addClass = function(el, name) {
    if (!this.hasClass(el, name)) { 
      el.className += (el.className ? ' ' : '') +name; 
    }
  };

  Handshake.prototype.removeClass = function(el, name) {
    if (this.hasClass(el, name)) {
      el.className=el.className.replace(new RegExp('(\\s|^)'+name+'(\\s|$)'),' ').replace(/^\s+|\s+$/g, '');
    }
  };
  
  Handshake.prototype.FireEvent = function(name, target, data) {
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

  Handshake.prototype.Post = function(url, data, callback){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("post", url, true);
    xmlhttp.setRequestHeader("Content-type", "application/json");
    xmlhttp.onreadystatechange = function(){
      if (xmlhttp.readyState==4){
        if (xmlhttp.status==200){
          callback(JSON.parse(xmlhttp.responseText));
        } else {
          console.error("You found an ajax error. Please create an issue at http://github.com/scottmotte/handshake.");
        }
      }
    };

    xmlhttp.send(JSON.stringify(data));
  };

  Handshake.prototype.FireEvent = function(name, target, data) {
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

}(Handshake));


var handshake = Handshake();

