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
