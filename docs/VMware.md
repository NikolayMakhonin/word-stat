## Install MacOS:
**Admin password: 1234**

* https://rutracker.org/forum/viewtopic.php?t=5634652
* https://www.geekrar.com/install-macos-mojave-on-vmware/
* https://github.com/DrDonk/unlocker
* Install pfx
    * double click on pfx
    * add it to System
* sudo nano /etc/paths
    Add this line:
    ./node_modules/.bin
* // sudo nano /etc/profile
    // Add this line:
    //export PATH=./node_modules/.bin:$PATH
* Free disk space
    sudo pmset hibernatemode 0; sudo rm -f /var/vm/sleepimage
    diskutil list
    System                  16.6 GB    disk1s1
    sudo diskutil secureErase freespace 0 /dev/disk1s1
    "E:\Program Files (x86)\VMware\VMware Workstation\vmware-vdiskmanager.exe" -k "l:\Data\Virtual Machines\Mac\macOS Mojave.vmdk"
* Reduce disk max size
	diskutil apfs defragment /dev/disk1 status
	diskutil apfs defragment /dev/disk1 enable
	diskutil apfs defragment /dev/disk1s1 enable
    sudo diskutil secureErase freespace 0 /dev/disk1s1
	sudo diskutil apfs resizeContainer disk1 25GB
* Allow apps downloaded from anywhere
    sudo spctl --master-disable
    Check this policy in security settings
* Show hidden files
    defaults write com.apple.Finder AppleShowAllFiles true

### Mac commands

* Check App signature
```
codesign -dv --verbose=4 "/Applications/App Template Dev.app"
```
* Build
```
sudo git checkout . && sudo git stash && sudo git pull && sudo npm run pack:dev
```
* Others
```
sudo diskutil secureErase freespace 0 system
mkdir -p projects/nodejs/apps
mkdir -p projects/nodejs/modules
brew install node
cd projects/nodejs/modules
git clone https://NikolayMakhonin@github.com/NikolayMakhonin/webrain.js.git
cd ../apps/
git clone https://NikolayMakhonin@github.com/NikolayMakhonin/app-template.git
mv ../../modules/webrain.js ../../modules/webrain
ls ../../modules/
sudo npm i
sudo nano /etc/paths
cd projects/nodejs/apps/app-template/
electron ./src/main/node/electron/run/export/run.js
sudo nano package.json
npm run electron:export
sudo git stash && sudo git pull && sudo npm run pack:dev
sudo spctl --master-disable
codesign -dv --verbose=4 "/Applications/App Template Dev.app"
```
* Troubleshooting

* EACCES: permission denied, mkdir
https://github.com/gdotdesign/elm-github-install/issues/21#issuecomment-366789305
sudo npm i --unsafe-perm=true --allow-root

### Ubuntu

* [Install node](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-18-04)
```
curl -sL https://raw.githubusercontent.com/creationix/nvm/v0.35.3/install.sh -o install_nvm.sh
bash install_nvm.sh
```
Relogin
```
nvm install 12.17.0
node -v
npm -v
```
```
mkdir -p projects/nodejs/apps
cd projects/nodejs/apps
git clone https://NikolayMakhonin@github.com/NikolayMakhonin/terminal.git 
cd terminal
npm i --unsafe-perm=true --allow-root
```

### Create installer
```
git config --global credential.helper store
sudo git checkout . && sudo git stash && sudo git pull && npm run pack:dev
```

### Install *.deb

```
sudo apt remove terminal-dev
sudo apt autoremove
sudo apt install "./dist/dev/electron/pack/Terminal Dev 0.0.1.deb"

```
