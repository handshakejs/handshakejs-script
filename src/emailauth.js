(function(exports){
  var emailauth = function() {
    if(!(this instanceof emailauth)){
      return new emailauth();
    }

    this.uuid      = this.Uuid();
    this.script    = this.CurrentlyExecutedScript();
    this.init();

    return this;
  };

  emailauth.prototype.init = function() {
    if (this.script) {
      this.script.className += " emailauth-script";
      this.script.id        = "emailauth-script-"+this.uuid;

      this.draw();
    } else {
      console.error("Could not find script tag to initialize on.");
    }
  };

  exports.emailauth = emailauth;

}(this));
