In order to launch the program via VS Code open solution src folder. It is hosted on local IIS Express Server so in order to
let VS Code launch it you should verify that IIS Express extension is installed and modify the "path" var in src/.vscode
to "<your full path to src directory>". Press Ctrl + Shift + F5 to start the application.

Possible issues. Make sure that IIS Express is allowed to browse directory files. To make this happen find
the folder on your computer where IIS is Installed. There is a appcmd.exe utilite. Execute command 
"appcmd set config /section:directoryBrowse /enabled:true". That's pretty much it.