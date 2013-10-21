# emailauth.js

## Usage

Place a script tag wherever you want the login form displayed.  

```html
<script src='/path/to/emailauth.js' 
        data-app_name="your_app_name" 
        data-root_url="https://emailauth.herokuapp.com"></script>
```

Get the latest [emailauth.js here](https://github.com/scottmotte/emailauth-js/blob/master/build/emailauth.js). Replace the `data-app_name` with your own.

Next, bind to the emailauth:login_confirm event to get the successful login data. This is where you would make an internal request to your application to set the session for the user.

```html
<script>
  emailauth.script.addEventListener('emailauth:login_confirm', function(e) {
    console.log(e.data);
    $.post("/login/success", {email: e.data.identity.email}, function(data) {
      window.location.href = "/dashboard";
    });    
  }, false); 
</script>
```

## Dev Setup

```
$ npm install -g grunt-cli
$ npm install
$ grunt
```
