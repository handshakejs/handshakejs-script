# [handshake.js](https://github.com/scottmotte/handshake-js/blob/master/build/handshake.js)

![](https://rawgithub.com/scottmotte/handshake-js/master/handshakejs.svg)

## Usage

#### Register app_name

First, [register your app_name](http://handshakejs-signup.herokuapp.com/).

#### Add script tag

Next, place the [handshake.js](https://github.com/scottmotte/handshake-js/blob/master/build/handshake.js) script tag where you want the login form displayed. 

```html
<script src='/path/to/handshake.js' 
        data-app_name="your_app_name" 
        data-root_url="https://handshakejs.herokuapp.com"></script>
```

(Get the latest [handshake.js here](https://github.com/scottmotte/handshake-js/blob/master/build/handshake.js). Replace the `data-app_name` with the one you registered.)

Next, bind to the handshake:login_confirm event to get the successful login data. This is where you would make an internal request to your application to set the session for the user.

```html
<script>
  handshake.script.addEventListener('handshake:login_confirm', function(e) {
    console.log(e.data);
    $.post("/login/success", {email: e.data.identity.email, hash: e.data.identity.hash}, function(data) {
      window.location.href = "/dashboard";
    });    
  }, false); 
</script>
```

#### Setup your /login/success route

Lastly, setup a /login/success route to set your app's session. There are examples below in different languages.

##### Node.js Example

```ruby
var handshakejs = require('handshakejs')('YOUR_SALT');
app.post('/login/success', function(req, res) {
  handshakejs.validate({email: req.body.email, hash: req.body.hash}, function(err, result) {
    if (!err) {
      req.session.user = req.body.email;
    }
    res.redirect('/dashboard');
  });
});
```

See [full example nodejs app](https://github.com/scottmotte/handshake-example-nodejs).

##### Ruby Example

```ruby
post "/login/success" do
  Handshakejs.salt = ENV['SALT']  
  result = Handshakejs.validate({email: params[:email], hash: params[:hash]})

  session[:user] = params[:email] if result

  redirect "/dashboard"
end
```

See [full example ruby app](https://github.com/scottmotte/handshake-example-ruby).

## Video Demo

[![](https://raw.github.com/scottmotte/handshake-js/master/handshake-vimeo.png)](https://vimeo.com/79125268)

## Dev Setup

Dev setup is if you want to work on the library yourself.

```
$ npm install -g grunt-cli
$ npm install
$ grunt
```
