## BDLoader


### What is this?

This is a [chrome extension](https://en.wikipedia.org/wiki/Google_Chrome_extension) to automate the downloading of resources. For now the only service integrated is the downloading of [youtube videos](https://www.youtube.com). This is a component that sends the links for a [python flask](http://flask.pocoo.org/) service called [omxclient](http://git.balhau.net/omxpiclient.git) which do the work of downloading the resources and save them in a local [samba](https://en.wikipedia.org/wiki/Server_Message_Block) shared folder.


### On the name

BDLoader is the shortname for Balhau Downloader. Which was the first idea for the development of this extension. However the name is now a little bit mis-representative of the extension because it already does some more things


### Torrents start/stop

The last feature added to this extension is the possibility to start and stop the torrent service.

### Future improvements

~~Currently the services invoked to start and stop the torrent daemon as well as the downloader service are hard coded in the extension source code. Would be very nice to give the possibility to setup this configurations with a GUI for that purpose and store it with the chrome extension storage API.~~

~~Now would be nice to have a ability to list all the pending requests available in the server side application.~~

Well the look and feel is not the best you ever see. We can check by yourself on the *Look and Feel* section. So I guess that would be pretty interesting if I find time to cleanup a little bit the vintage visual felling. By the way, since the design is pretty much inexistent I did choose red as the main theme color to combine with the blood that drop from your eyes when you look at it! Hope you don't get blind. So, it's pretty much that. Turn this a visual experience with minimal acceptance criteria.

### Configurable API endpoint

From the previous, now done, improvement we end up with an extension that is configurable and so you can set the endpoint for your own instance of omxpiclient which you can setup on the *options* of the extension


### Look and Feel

Currently the chrome extension lacks good tast design so it is pretty lame visually speaking. Nevertheless it works, and for programmers that always come in first place. The main application looks just like this

![bdownloader](http://shared.balhau.net/imgs/bdownloader.png)


There is also a option window where you can feed your omxclient instance

![options](http://shared.balhau.net/imgs/bdownloader_options.png)

And the extensions menu it appears like this

![extensions_menu](http://shared.balhau.net/imgs/bdownloader_extension_menu.png)
