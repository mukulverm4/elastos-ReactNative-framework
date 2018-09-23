# elastos-ReactNative-framework
Parallel to Trinity Browser, this is the Elastos DApp framework implementation on React Native


## how to set up env
* npm i
* react-native link

## how to run local docker instance
* npm run dep:start

## how to build dapp file
there are 2 demo dapp file in dapp folder.
* "**npm run build:dapp -- --name test**" to build test dapp.
* move all of build/ios files to remote folder.

## how to run ios app
* goto ios folder
* run "pod install"
* open ios/ELASTOS_RN_FRAMEWORK.xcworkspace with xcode
* check your local ipaddress with "ifconfig"
* change "DAPP_SERVER_URL" under src/config/index.js to your local ip address. default port is 3000 by docker instance setting.

## Useful Links
* [Code structure](./doc/structure.md)
* [Requirements](./doc/requirements.md)
* [TODO list](./doc/todo.en.md)