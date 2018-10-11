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

## How to start contributing to the project
* [Read process workflow](doc/process_workflow.md)
* Create a new github issue for every code change that is required - bug, feature, enhancement, etc. Also use appropriate label and attach the milestone to go along with it
* Create a new branch to work on the above github issue
* Make your change and push to your branch and then submit a PR to be merged into master if everything looks right
* Make a note of this commit on the github issue 
* Close the github issue
* Repeat this process for every single code change you decide to do. This is to ensure maximum transparency and also to make it easier to keep track of what everyone is working on. This way, two people are not working on the same thing. We also need github issues that will be used in conjunction with the amount of contribution you make along with the time spent in order to pay out your ELA rewards every 2 weeks

## Useful Links
* [Code structure](./doc/structure.md)
* [Requirements](./doc/requirements.md)
* [TODO list](./doc/todo.md)
