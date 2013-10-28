# handshake.js

## Usage

### Register

First register an app_name [here](http://handshakejs-signup.herokuapp.com/).

### Add Script tag

Place handshake.js script tag where you want the login form displayed on your site. 

```html
<script src='/path/to/handshake.js' 
        data-app_name="your_app_name" 
        data-root_url="https://handshakejs.herokuapp.com"></script>
```

(Get the latest [handshake.js here](https://github.com/scottmotte/handshake-js/blob/master/build/handshake.js). Replace the `data-app_name` with your own.)

Next, bind to the handshake:login_confirm event to get the successful login data. This is where you would make an internal request to your application to set the session for the user.

```html
<script>
  handshake.script.addEventListener('handshake:login_confirm', function(e) {
    console.log(e.data);
    $.post("/login/success", {email: e.data.identity.email}, function(data) {
      window.location.href = "/dashboard";
    });    
  }, false); 
</script>
```

### Setup your route

Then you'd setup a route in your app at /login/success to do something like this (setting the session). Here's an example in ruby and there is also a [full example ruby app](https://github.com/scottmotte/handshake-example-ruby).

```ruby
  post "/login/success" do
    session[:user] = params[:email]
    redirect "/dashboard"
  end
```

## Video Demo

[![](https://raw.github.com/scottmotte/handshake-js/master/handshake-vimeo.png)](https://vimeo.com/77449937)

## Dev Setup

Dev setup is if you want to work on the library yourself.

```
$ npm install -g grunt-cli
$ npm install
$ grunt
```
