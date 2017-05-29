/*
Buit by:
 ____ ____ ____ ____ ____ ____ ____ ____ ____ ____ ____ ____ ____ 
||L |||u |||k |||e |||@ |||j |||c |||s |||c |||. |||b |||i |||z ||
||__|||__|||__|||__|||__|||__|||__|||__|||__|||__|||__|||__|||__||
|/__\|/__\|/__\|/__\|/__\|/__\|/__\|/__\|/__\|/__\|/__\|/__\|/__\| 
                                                                  
 This is the main nuts & bolts of the Referance Logger tray application.

 -Tray Application
       Left Click  ( Show|hide )
       Right Click ( Menu )   

             -Menu -- ???                                                         
                                                                  



*/


const { app, BrowserWindow, ipcMain, Tray, nativeImage } = require('electron')
const path = require('path')

const assetsDir = path.join(__dirname, 'assets')




let tray = undefined
let window = undefined

// This method is called once Electron is ready to run our code
// It is effectively the main method of our Electron app
app.on('ready', () => {
    // Setup the menubar with an icon
    let icon = nativeImage.createFromDataURL(base64Icon)
    tray = new Tray(icon)


    // Add a click handler so that when the user clicks on the menubar icon, it shows
    // our popup window
    tray.on('click', function(event) {

        //tray.popContextMenu();
        toggleWindow()

        // Show devtools when command clicked
        if (window.isVisible() && process.defaultApp && event.metaKey) {
            window.openDevTools({ mode: 'detach' })
        }
    })

    // Make the popup window for the menubar
    window = new BrowserWindow({

        backgroundColor: '#2e2c29',
        title: 'Referance Logger',
        width: 1100,
        height: 350,
        show: false,
        frame: false,
        resizable: true,
    })

    // Tell the popup window to load our index.html file
    window.loadURL(`file://${path.join(__dirname, 'index.html')}`)

    // Only close the window on blur if dev tools isn't opened
    window.on('blur', () => {
        if (!window.webContents.isDevToolsOpened()) {
            window.hide()
        }
    })
})

const toggleWindow = () => {
    if (window.isVisible()) {
        window.hide()
    } else {
        showWindow()
    }
}

const showWindow = () => {

    const trayPos = tray.getBounds()
    const windowPos = window.getBounds()
    const btmRIGHT = 'BottomRight'

    let x, y = 0
    if (process.platform == 'darwin') {
        x = Math.round(trayPos.x + (trayPos.width / 2) - (windowPos.width / 2))
        y = Math.round(trayPos.y + trayPos.height)
    } else {
        x = Math.round(trayPos.x + (trayPos.width / 2) - (windowPos.width / 2))
        y = Math.round(trayPos.y + trayPos.height * 10)
    }





    window.setPosition(x, y, false)
    window.show()
    window.focus()
}

ipcMain.on('show-window', () => {
    showWindow()
})

app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})



let treebase64Icon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAABACAMAAACAyb93AAAAY1BMVEVwAAAAAADn796Evd54dmgzPj73zoT/cwDO3rVch6LSrIK1zowYGBitSgDMzJm1c1r/3sZ7WkL/5wCtra3///9SUlKlhFI5KRj1m0Dn5+fW1tbnYwCMjIwzMzNSQim9nGObm3U31Ml1AAAAAXRSTlMAQObYZgAAAAFiS0dEAIgFHUgAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQfhBRoEAx2pqs3KAAADiklEQVRIx62X23qrIBSEmYholEQsoNEakvd/yr0WHhLNYaf9ykWDLT8za0BChfjLlv+CKX+O9L9gyhvzpfWnzG7swHy1+JSZQsDXFz5j8nI05xFb9wlznBjhz/BHfJQuIVNB1pgzXtu59XcLInpjXns7lvnK2vx0BjReJlWurM1Pfde59iQG+5wpHxjZO3QS31mWneyHTO+cHdBn3PCcWUG5SK1znXPulGXfTyEela8ncM5kmXMq+z4cWMm/yyCfmexADEtEBv6Nt9i/kkxLjOHR1PjnM6a8rc/ZO9ptxEwIzCumnB8k1Q5mThOj3WHtLS+Xdhx5QloeyoFlByA4tZU5TkQ+axqa9pAJLiMK6R1gH1+Y+wyOhuxnpxtjDfTTYqIx1twZXLMsvnTaniiLzr+ofxJiZ60ejXqdUDPqCvGWyVlGjk++Y8Y9ee+Oa0jUmPt9st/vE2OSRG6h3ZoB5h6J4Jz0/PFSSCzM2Ev2KcD2tszGGTHzUiWa1zVlBC+Q5fDcTRMkjAi4ZI/3WU86MerIpK5PHw/TfJPb3I+IEC7BA3OXdb7a4/BImaEt7p97y7ntblY56rgxXZdumPKhnHnHDpM3QmBfbp54RKPc1POUWSoav0CW5OcM9JYpy7U7YAlkYkhmq7OCyh380pcj4x+jztcQrjfVV8zkY/zw1/ImUw7jYIvHqHkh4b0mASrmerf7+rGQB5lxTXr6etLM+Ps8zqPC424bIGnz1lAGxIDP0Mjwzow6dvB06JzvEJrjAkVNK8QVQV5jNCDB5fuOxyh1pyLyqsJlYnjcmfrBsiNvpTAmiGJn1D2jRdXS9YSGFQpOiEIKFqUy+qLqowFUPTGwyyFnfUU6Pf8JdUv9wahaXVIM5lxp0fIfisJyzc5E0+y05+VWdYtQCSsljGoUjqxW8VTECCkFpKKYCnYvi6IQrKHr6kLXKO5GSc+MnBguxsR+LKcK7JlMXURElGqobtWgUYFMN0oV3qigerY8BaErKFqcuqoKMVpRHKwqWvrV1cbwA01atLHoKQRNr4cONIISawJnFslWSNqdvchT730INQahQnq/GWi2qiYPbDSu1iVIctPN8frYtluI7JlxeI3Wpg27T4V5fxsFxdkwUtAqVUFQn2P8z/1QIoSAFk2V2sE2nJn68AZLB0BdgZJomsvHDCvSoqsQ1A+YKKY5jp9d5jsK1/7Jfyz/AG8PP7Jp4SwJAAAAAElFTkSuQmCC'

// Tray Icon as Base64 
let base64Icon = 'data:image/png;base64,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'