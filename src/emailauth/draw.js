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
