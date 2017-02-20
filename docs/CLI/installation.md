## Installation
Installing MATRIX CLI is quite easy. However, you do need to have a couple of other things installed first:

* [Node.js](https://nodejs.org/en/)
* [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

If your computer already has these, congratulations! This will make the `matrix` command available in your terminal. Just install MATRIX CLI with `npm` and you're good to go.

`Remember not to install MATRIX CLI  on a Raspberry PI`
```
npm install -g matrix-cli
```

### Environment Configuration
Points the CLI to the right servers. If you have errors right off the bat, try this first.
```
matrix set env rc
```

### Registration

##### User registration
If you do not have an AdMobilize MATRIX account, use:
```
matrix register
```
Check your email to confirm the account then you can login.

##### Device registration
In order to set up your device, use:
```
matrix register device
```
This will ask for your device details and then provide you with an id and a secret, you need to set those ENV vars in your device to link it to our platform.  

### Help
For a list of all the available options, use:
```
matrix
```