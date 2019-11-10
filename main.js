const {
    app,
    BrowserWindow,
    Menu,
    dialog,
    // shell
} = require('electron')

let win
const ipc = require('electron').ipcMain
const dialogsss = require('electron').dialog
const shell = require('electron').shell;
ipc.on('open-file-dialog', function (event) {
    dialogsss.showOpenDialog({
        properties: ['openFile', 'openDirectory']
    }, function (files) {
        if (files) event.sender.send('selected-directory', files[0])
    })
})
function createWindow() {
    // 创建浏览器窗口。
    win = new BrowserWindow({
        width: 550,
        height: 400,
        backgroundColor: "#111",
        show: false,
        resizable:false,
        fullscreen: false,
        fullscreenable: false,
        frame: true,
        // skipTaskbar:true,
        // transparent:true,
        titleBarStyle: 'hidden',
        // minHeight: 550,
        // minWidth: 300,
        title: "APP",
        center: true,
    });
    // win.setAlwaysOnTop(true)
    // 然后加载应用的 index.html。
    win.loadFile('html/index.html')
    // win.loadURL("https://dev.hamm.cn")

    // 打开开发者工具
    //   win.webContents.openDevTools()

    win.on('closing', () => {
        win.hide()
    });
    win.on('closed', () => {
        win = null
    })
    win.once('ready-to-show', () => {
        win.show()
    });

    const menu = Menu.buildFromTemplate(menuForMac)
    Menu.setApplicationMenu(menu)




};

app.on('ready', createWindow)

// 当全部窗口关闭时退出。
app.on('window-all-closed', () => {
    app.quit()
});

app.on('activate', () => {
    if (win === null) {
        createWindow()
    }
});
let menuForMac = [{
    label: "设置",
    submenu: [{
        label: '关于',
        accelerator: '',
        click: () => {
            dialog.showMessageBox(win, {
                type: "none",
                title: "关于",
                message: "\nTester by Hamm.cn",
            })
        }
    }, {
        label: '反馈',
        accelerator: '',
        click: () => {
            shell.openExternal("https://gitee.com/hamm/tester")
        }
    },
    { type: 'separator' }, {
        label: '调试',
        accelerator: "",
        click: (item, focusedWindow) => {
            if (focusedWindow) {
                focusedWindow.toggleDevTools()
            }
        }
    }, {
        label: '退出',
        // accelerator: function() {
        //     if (process.platform == 'darwin') {
        //         return 'Command+Q';
        //     } else {
        //         return 'Alt+F4';
        //     }
        // }(),
        accelerator: "",
        click: () => {
            app.quit()
        }
    }
    ]
}, {
    label: "窗口",
    submenu: [
        //     {
        //     label: '全屏',
        //     accelerator: '',
        //     click: () => {
        //         if (win.isFullScreen()) {
        //             win.setFullScreen(false)
        //         } else {
        //             win.setFullScreen(true)
        //         }
        //     }
        // }, 
        {
            label: '最大',
            accelerator: "",
            click: (item, focusedWindow) => {
                if (win.isMaximized()) {
                    win.unmaximize()
                } else {
                    win.maximize()
                }
            }
        },
        // {
        //     label: '置顶',
        //     accelerator: "",
        //     click: (item, focusedWindow) => {
        //         if (win.isAlwaysOnTop()) {
        //             win.setAlwaysOnTop(false)
        //         } else {
        //             win.setAlwaysOnTop(true)
        //         }
        //     }
        // },
        // { type: 'separator' },
        // {
        //     label: '沉浸',
        //     accelerator: "Command+Esc",
        //     click: (item, focusedWindow) => {
        //         if (win.isKiosk() || win.isFullScreen()) {
        //             win.setKiosk(false)
        //             setTimeout(() => {
        //                 win.setFullScreen(false)
        //             }, 100)
        //         } else {
        //             win.setKiosk(true)
        //         }
        //     }
        // }
    ]
},
{
    label: '编辑',
    submenu: [
        { role: 'undo', label: '撤销' },
        { role: 'redo', label: '重做' },
        { type: 'separator' },
        { role: 'cut', label: '剪切' },
        { role: 'copy', label: '复制' },
        { role: 'paste', label: '粘贴' },
        { role: 'selectall', label: '全选' }
    ]
}
]