const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')

const datasource = require('./util/datasource')
const connection = datasource.getConnection()
//

const memberDao = require('./dao/member-dao')
memberDao.setConnection(connection)
//

const studentDao = require('./dao/student-dao')
studentDao.setConnection(connection)

const studentService = require('./service/student-service')
studentService.setMemberDao(memberDao)
studentService.setStudentDao(studentDao)

global.studentService = studentService
//학생 모듈 등록 끗

const teacherDao = require('./dao/teacher-dao')
teacherDao.setConnection(connection)

const teacherService = require('./service/teacher-service')
teacherService.setTeacherDao(teacherDao)
teacherService.setMemberDao(memberDao)

global.teacherService = teacherService
//강사 모듈 등록 끗

const managerDao = require('./dao/manager-dao')
managerDao.setConnection(connection)

const managerService = require('./service/manager-service')
managerService.setManagerDao(managerDao)
managerService.setMemberDao(memberDao)

global.managerService = managerService
//매니저 모듈 등록 끗

const classroomDao = require('./dao/classroom-dao')
classroomDao.setConnection(connection)
//

const lectureDao = require('./dao/lecture-dao')
lectureDao.setConnection(connection)

const lectureService = require('./service/lecture-service')
lectureService.setLectureDao(lectureDao)
lectureService.setClassroomDao(classroomDao)
lectureService.setManagerDao(managerDao)

global.lectureService = lectureService
//매니저 모듈 등록 끗

let win

app.on('ready', createWindow)

app.on('window-all-closed', quitApp)

console.log(__dirname)

function createWindow() {
  console.log('윈도우 생성하기...')

  win = new BrowserWindow({width: 1200, height: 600})

  win.loadURL(url.format({
    pathname: path.join(__dirname, '../renderer/index.html'),
    protocol: 'file:',
    slashes: true
  }))

win.webContents.openDevTools()

/*

  // Open the DevTools.
  win.webContents.openDevTools()

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })
  */
}

function quitApp() {
  console.log('application 종료하기')
}



/*
const newWindowBtn = document.getElementById('new-window')

newWindowBtn.addEventListener('click', function (event) {
  const modalPath = path.join('file://', __dirname, '../../sections/windows/modal.html')
  let win = new BrowserWindow({ width: 400, height: 320 })
  win.on('close', function () { win = null })
  win.loadURL(modalPath)
  win.show()
})
*/
