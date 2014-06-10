(function(Handshake){
  Handshake.prototype.draw = function() {
    this._drawCss();
    this._drawEmailForm();
    this._drawEmailIntro();
    this._drawEmailField();
    this._drawEmailSubmitBtn();
    this._drawAuthcodeForm();
    this._drawAuthcodeIntro();
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
    this.email_submit_btn.value         = this.request_button;
      
    return this.email_form.appendChild(this.email_submit_btn);
  };

  Handshake.prototype._drawEmailField = function() {
    this.email_field                    = document.createElement('input');
    this.email_field.className          = "handshake-email-field";
    this.email_field.id                 = "handshake-email-field-id-"+this.uuid;
    this.email_field.type               = "email";
    this.email_field.placeholder        = "email";

    return this.email_form.appendChild(this.email_field);
  };

  Handshake.prototype._drawEmailIntro = function() {
    this.email_intro              = document.createElement('p');
    this.email_intro.className    = "handshake-email-intro";
    this.email_intro.id           = "handshake-email-intro-id-"+this.uuid;
    this.email_intro.innerHTML    = this.request_intro;

    return this.email_form.appendChild(this.email_intro);
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
    this.authcode_submit_btn.value          = this.confirm_button;
      
    return this.authcode_form.appendChild(this.authcode_submit_btn);
  };

  Handshake.prototype._drawAuthcodeField = function() {
    this.authcode_field                     = document.createElement('input');
    this.authcode_field.className           = "handshake-authcode-field";
    this.authcode_field.id                  = "handshake-authcode-field-id-"+this.uuid;
    this.authcode_field.maxLength           = 4;
    this.authcode_field.type                = "text";
    this.authcode_field.inputmode           = "numeric";
    this.authcode_field.pattern             = "[0-9]*";

    return this.authcode_form.appendChild(this.authcode_field);
  };

  Handshake.prototype._drawAuthcodeIntro = function() {
    this.authcode_intro              = document.createElement('p');
    this.authcode_intro.className    = "handshake-authcode-intro";
    this.authcode_intro.id           = "handshake-authcode-intro-id-"+this.uuid;
    this.authcode_intro.innerHTML    = this.confirm_intro;

    return this.authcode_form.appendChild(this.authcode_intro);
  };

}(Handshake));
