# MiniGolfSFX
Node application to play MP3 files every time a sensor is tripped. Used on a mini golf. 

## Target hardware: 
- The Next Thing Co C.H.I.P. (probably easily portable to Raspberry Pi and similars)

## Connections & set up
- Connect a speaker to C.H.I.P.'s audio output.
- Connect a switch (e.g. reed switct) between CSID1 and 3v3. When closed, it will play tracks under the mp3 folder, one of them in sequence, for each time the sensor is triggered 
- Power the C.H.I.P. (e.g. a USB power brick on the USB port)
- Optionally connect a switch between XIO-P1 and 3v3. It will shut C.H.I.P down gracefully
- create an mp3 folder under the application's folder and add as many MP3 files under it

## Installing required node modules
```
npm init<br/>
npm install -save chip-io johnny-five<br/>
npm install -save child_process<br/>
npm install -save fs<br/>
npm install -save lame<br/>
npm install -save speaker
```  
If last step fails, make sure you have the ALSA backend installed by running:
```
sudo apt-get install libasound2-dev
```

## Setting up forever on boot and rotate log
As root:
```
cp ./init/MiniGolfSFX /etc/init.d<br/>
chmod 755 /etc/init.d/MiniGolfSFX<br/>
sh /etc/init.d/MiniGolfSFX start<br/>
update-rc.d MiniGolfSFX defaults<br/>
cp ./logrotate/MiniGolfSFX /etc/logrotate.d/<br/>
```
Reverting the above
```
rm  /etc/logrotate.d/MiniGolfSFX<br/>
update-rc.d -f MiniGolfSFX remove<br/>
sh /etc/init.d/MiniGolfSFX stop<br/>
rm /etc/init.d/MiniGolfSFX<br/>
```