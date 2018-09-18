## TODO LIST

### 对dapp的bundle文件在加载之前进行hash链上验证
* dapp的管理，可以online加载，并cache到本地。
* 对加载的bundle文件可以进行hash验证
* RN app需要加载wallet 和 spv节点SDK，可以上链。

### dapp如何对运行它的RN app验证，保证合法？ （方案不确定，待讨论）
* build RN app的时候进行hash，然后上链存储，保证同样的code build出来的hash要一致
* dapp在运行时要对当前的hash进行验证

### Carrier整合
* Carrier RN plugin开发

### RT整合 （待讨论）