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
app.post('/login/success', function(req, res) {
  req.session.user = req.body.email;
  res.redirect('/dashboard');
});
```

See [full example nodejs app](https://github.com/scottmotte/handshake-example-nodejs).

##### Ruby Example

```ruby
post "/login/success" do
  salt    = "the_secret_salt_when_you_created_an_app_that_only_you_should_know"
  pbkdf2  = PBKDF2.new(:password=>params[:email], :salt=>salt, :iterations=>1000, :key_length => 16, :hash_function => "sha1")

  session[:user] = params[:email] if pbkdf2.hex_string == params[:hash]
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
