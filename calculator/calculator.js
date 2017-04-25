
var btns = document.querySelectorAll('.number')
    ops = document.querySelectorAll('.op')
    equals = document.querySelector('#equals')
    display = document.querySelector('#display')
    ac = document.querySelector('#acBtn')

var temp = ''
    value
    op

var opHandlerMap = {
  '+': function() {value += temp},
  '-': function() {value -= temp},
  '*': function() {value *= temp},
  '/': function() {value /= temp}
}
/*
value op  temp          input     operate
3             3
3    +(1)               +(1)
3    +(1) 2             2
3    +(1) 2             +         3 +(1) 2 = 5
5    +
5    +    1             1
5    +    1             /         5 + 1 = 6
6    /
6    /    2             2
6    /    2             =         6 / 2 = 3
3
3    *                  *
3    *    2             2
3    *    2             -         3 * 2 = 6
6    -
*/

//Make number buttons' event listeners
for (var i = 0; i < btns.length; i++) {
  btns[i].onclick = clickBtns
}

//Make operator buttons' event listeners.
//이벤트 발생시마다 for문이 도는게 아니라 for문을 만나면 해당 리스너들을 등록 시켜놓는거임.
for (var i = 0; i < ops.length; i++) {
  ops[i].onclick = clickOperators
}

equals.addEventListener('click', function() {
  doCalculate()
  op = undefined
})

ac.addEventListener('click', function() {
  temp = ''
  value = undefined
  op = undefined
  display.innerHTML = 0
  ac.innerHTML = 'AC'
  console.log('clear')
})

function clickBtns() {
  temp += this.innerHTML
  console.log('pressed ', temp)
  display.innerHTML = Number(temp)
  //console.log('btns변수작동: ', btns[i]) 라고하면 왜 btns[i]값이 undefined로 나오는지?
  ac.innerHTML = 'C'
}

function clickOperators() {
  console.log('pressed ', this.innerHTML)
  //Do calculate only when op exisits.
  if(op) {
    doCalculate()
  } else {
    value = Number(temp)
    temp = ''
  }
  //Set an operator
  op = opHandlerMap[this.innerHTML]
}

function doCalculate() {
  temp = Number(temp)
  op()
  temp = ''
  display.innerHTML = value
  console.log('value is ', value)
}
