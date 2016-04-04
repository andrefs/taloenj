# taloenj:  "Print your phone pictures using a thermal printer"


`taloenj` is a node.js web app which allows you to upload pictures and sends them to the Sparkfun/Adafruit/... thermal printer

It includes:

* a web app to upload your pictures and edit their contrast and
  brightness
* an API to talk with the thermal printer


## Install and simple setup

    npm install -g taloenj

    In order to be able to run without `sudo` permissions, you must
    make sure your use is in the dialout group:

        sudo adduser YOUR_USER dialout

    log out and log back in.

### External dependencies

* imagemagick (Ubuntu or Debian-based distros)

### Required hardware

* A thermal printer (sold from [Adafruit](http://www.adafruit.com/product/597), [Sparkfun](https://www.sparkfun.com/products/10438), [InMotion](http://www.inmotion.pt/pt/adafruit/983-mini-thermal-receipt-printer.html), etc)

## Advanced setup suggestion

TBD

### Additional hardware

* Raspberry Pi
* WiFi dongle ([example](http://www.dx.com/p/ultra-mini-nano-usb-2-0-802-11n-150mbps-wifi-wlan-wireless-network-adapter-48166))
* Power bank(s) capable of powering both the Pi and the printer
  ([example](http://www.amazon.co.uk/RAVPower-16750mAh-Portable-External-Technology-y/dp/B00OJXVDAU/ref=sr_1_2?ie=UTF8&qid=1459805916&sr=8-2&keywords=ravpower))

##

## Bugs and stuff

Open a GitHub issue or, preferably, send me a pull request.
