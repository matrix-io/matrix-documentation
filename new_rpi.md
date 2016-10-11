Image New Card
Copy known_hosts


```
echo "deb http://packages.matrix.one/matrix-creator/ ./" | sudo tee --append /etc/apt/sources.list;
sudo apt-get update;
sudo apt-get upgrade;
sudo apt-get install -y libzmq3-dev xc3sprog malos-eye matrix-creator-malos matrix-creator-openocd oh-my-zsh wiringpi matrix-creator-init cmake g++ git --force-yes;
sudo apt-get install -y npm;
npm install -g n
npm install -g node-gyp
n 6.5

