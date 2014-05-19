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
      this.script.id              = "handshake-script-"+this.uuid;
      this.app_name               = this.script.getAttribute("data-app_name");
      this.root_url               = this.script.getAttribute("data-root_url");
      this.request_intro          = this.script.getAttribute("data-request_intro") || "This is the easiest signup process.<br/>Just enter your email address.";
      this.request_button         = this.script.getAttribute("data-request_button") || "Create Account";
      this.confirm_intro          = this.script.getAttribute("data-confirm_intro") || "Go ahead and check your email.<br/>Enter the code you received here.";
      this.confirm_button         = this.script.getAttribute("data-confirm_button") || "Login";
      this.confirm_url            = this.script.getAttribute("data-confirm_url") || "/login/request.json";

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
