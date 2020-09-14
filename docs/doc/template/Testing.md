<!-- Required for open source BrowserStack plan -->
<!-- https://www.browserstack.com/open-source?ref=pricing -->

The project has been tested on Travis and BrowserStack

## BrowserStack

You can see your user name / access key here:
https://www.browserstack.com/accounts/settings

### Local

For use BrowserStack locally you can set these environment variables:

For Windows users:
```bash
setx BROWSERSTACK_USERNAME "your user name"
setx BROWSERSTACK_ACCESS_KEY "your access key"
```

**Attention! BrowserStack tests does not work in WebStorm (and this is an unsolvable problem). You should run tests from console.**

### Travis

And you should set your user name and encrypted access key to the .travis.yml

You shoud generate encrypted access key for each repository.

See: https://docs.travis-ci.com/user/encryption-keys
```bash
travis encrypt SOMEVAR="secretvalue" > key.txt
```


```yml
addons:
  browserstack:
    username: "your user name"
    access_key:
      secure: "your encrypted access key"
```
