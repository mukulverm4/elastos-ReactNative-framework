# Elastos-ReactNative-Framework
Parallel to the Trinity Browser, this is the Elastos DApp framework implementation on React Native.

## How to Set Up Environment
```shell
$ npm i
$ react-native link
```

## How to Run Local Docker Instance
```shell
$ npm run dep:start
```

## How to Build DApp Files
There are 2 demo DApp files in `/dapp` folder.
* `$ npm run build:dapp -- --name test` to build test dapp.
* Move all of `/build/ios` files to `/remote` folder.

## How to Run iOS App
* Go to `/ios` folder.
* Run `$ pod install`.
* Open `/ios/ELASTOS_RN_FRAMEWORK.xcworkspace` with XCode.
* Check your local IP address with `$ ifconfig`.
* Change `DAPP_SERVER_URL` under `/src/config/index.js` to your local IP address. Default port is 3000 by docker instance setting.

## Useful Links
* [Code structure](./doc/structure.md)
* [Requirements](./doc/requirements.md)
* [TODO list](./doc/todo.md)
