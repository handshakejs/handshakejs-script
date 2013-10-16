# emailauth.js

## Usage

Place the following where you want your login form to be displayed in your application.

Replace the data-app_name value with your own and the root_url value with your own instance of emailauth. See [emailauth repo](https://github.com/scottmotte/emailauth) for more details.

```html
<script src='/build/emailauth.js' 
        data-app_name="emailauthjstest" 
        data-root_url="https://emailauth.herokuapp.com" />
<script>
  emailauth.script.addEventListener('emailauth:login_confirm', function(e) {
    console.log(e.data);
  }, false); 
</script>
```

In the addEventListener portion, add your own bit of logic to log someone in. For example, set a session or a cookie.

## Dev Setup

```
$ npm install -g grunt-cli
$ npm install
$ grunt
```
