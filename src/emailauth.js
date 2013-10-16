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
