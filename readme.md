# MiniGolfSFX
Node application to play MP3 files every time a sensor is tripped. Used on a mini golf. 

Target hardware: 
- The Next Thing Co C.H.I.P. (probably easily portable to Raspberry Pi and similars)

Commands to setup forever on boot and rotate log
as root:

cp ./init/MiniGolfSFX /etc/init.d
chmod 755 /etc/init.d/MiniGolfSFX
sh /etc/init.d/MiniGolfSFX start
update-rc.d MiniGolfSFX defaults
cp ./logrotate/MiniGolfSFX /etc/logrotate.d/


Commands to revert the above
rm  /etc/logrotate.d/MiniGolfSFX
update-rc.d -f MiniGolfSFX remove
sh /etc/init.d/MiniGolfSFX stop
rm /etc/init.d/MiniGolfSFX
