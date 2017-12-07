/* 주제: Electron 모듈 사용하기
- 사용법:
  => package.json 파일 생성 - 프로그램 설정 파일
  => main.js 파일 생성 - 자바스크립트 실행 시작 파일
  => index.html 파일 생성 - 메인 윈도우 설정 파일
3) 실행
  > electron .
  => 현재 폴더에서 package.json을 읽어 들인다.
  => package.json 파일에 등록된 자바스크립트 파일을 읽어 실행한다.
 */

// 'electron' 모듈의 리턴 값 중에서
// 애플리케이션을 다룰 때 사용할 도구와 웹브라우저 창을 생성시킬 도구를 꺼낸다.
const {app, BrowserWindow} = require('electron')
/*
const electron = require('electron')
const app = electron.app
*/

// 파일 경로를 다룰 때 사용할 도구를 리턴한다.
const path = require('path')

// URL 경로를 보다 쉽게 다루기 위한 모듈이다.
const url = require('url')

const datasource = require('./lib/datasource')
datasource.connect(() => {})

/* app.on(이벤트명, 리스너)
- 지정된 이벤트가 발생할 때 호출될 함수를 등록한다.
*/

// - 'ready' 이벤트?
//   => 애플리케이션이 실행 준비를 마친 상태
//   => 이 상태일 때 보통 윈도우를 생성한다.
app.on('ready', createWindow)

// 윈도우 객체(의 주소)를 저장할 변수
let win

// 윈도우를 생성하고 출력하는 일을 함수
function createWindow() {
  // 웹브라우저 윈도우를 만든다.
  win = new BrowserWindow({width: 800, height: 600})
  // HTML 경로를 제대된 URL로 바꾸기 위해 'url' 모듈을 사용한다.
  win.loadURL(url.format({
    protocol: 'file:',
    pathname: path.join(__dirname, './view/index.html'),
    slashes: true
  }))
  /*
    win.loadURL('file://' + __dirname + '/index.html')
  */
  win.webContents.openDevTools() // 웹브라우저의 개발도구창을 띄운다.
}
