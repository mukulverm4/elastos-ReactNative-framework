Note: Ideas.MD this file will be replaced with formal Readme.md file when done

# Requirements and Features
## Seaparate RN Framework as a general mobile App. as well as the DApp itself as a standalone internal app.
End user can install a RN framework app as trinity browser. Then user can load a DApp into the RN framework app and run inside.
RN framework app itself is a general purpose app. 

## RN Framework can check the hash of DApp package code before loading

In order to check the legality of DApp, RN framework can check the hash of the DApp code. It can reject loading if hash not matching original published value in blockchain.

RN framework can also check signature etc.

## RN Framework can load DApp (bundled js code) from local or remote via Carrier

Just like Trinity, RN framework can load bundled DApp project from local or a remote address via Carrier.

At early testing environment, we can allow load from a http address. but at future production, we should disable any http communication

## DApp can check RN framework too to make sure the RN framework is not altered.

No only RN framework validate DApp, the DApp can also validate the RN framework app to make sure it is not alterecd.

Currently I do not know how this can be implemented yet.

## RN framework disable http module

I know Jacky has done this. Just need to make sure is it secure?

## RN framework has internal carrier built-in and with JS API

DApp can call carrier features from JS API.

## RN framework has internal RT built-in and with JS API

DApp can call RT's CAR components features from JS API.

# Deliverables

## RN source code
## Example apps
### Hello world app
### Todo app
### End to End demo app
## tutorial
## Technical documents

