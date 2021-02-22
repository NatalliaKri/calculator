
const numbers = document.querySelectorAll('.number');
const operations = document.querySelectorAll('.operation');
const clearButtons = document.querySelectorAll('.operation_clear');
const decimalButton = document.getElementById('decimal');
const result = document.getElementById('equal');
const display = document.getElementById('display');
const operAbsolute = document.querySelector('.operation_absolute');
const input = document.querySelector('input');

let current = '';
let oper;
let newNumber = false;
let local;

for(let i = 0; i < numbers.length; i++){
  let number = numbers[i];
  number.addEventListener('click', (e) => {
     numberPress(e.target.innerText);
  })
};


for(let i = 0; i < operations.length; i++){
  let operation = operations[i];
     operation.addEventListener('click', (e) => {
     operationPress(e.target.innerHTML);
     oper = e.target.innerHTML;
     console.log(e.target.textContent)
     return oper;
  }) 
};
 
clearButtons[0].addEventListener('click', (e) => {
     clearPress(e.target.innerText);
     console.log(e.target.innerText);
  });



clearButtons[1].addEventListener('click', (e) => {
    clearOneNumber(e.target.innerText);
    console.log(e.target.innerText);
  });


operAbsolute.addEventListener('click', (e) => {
     absolute(e.target.innerText);
     console.log(e.target.innerText);
  });


  
function absolute()
 {
  if(+display.value > 0) 
   {
     display.value = 0 - (+display.value);
     return
    };

  if(+display.value  < 0) display.value = (+display.value) * (-1);
  local = display.value;
 
 }



const numberPress = (num) => {
  if(newNumber === false){
       if(display.value === '0'|| display.value === '') display.value = num;
         else display.value = display.value + num;      
  };

  if(newNumber === true){
    display.value = num;
    newNumber = false;
  };
    
  
  if(display.value.length > 10) input.style.fontSize = '2rem';
  if(display.value.length > 16) input.style.fontSize = '1rem';
  if(display.value.length > 30) return; 
}




let operator;
let memory;

const operationPress = (oper) => {
   
  if(operator === '='){local = display.value};


  if(local == undefined ){
    
        local = display.value;
        operator = oper;
        display.value = '';
        newNumber = true;
        return;
  };
  
  if(local != undefined && operator !== '=') {
    
    current = display.value;
  
    if(operator === '+') {memory = (+local) + (+current);
       display.value = memory;
       local = memory;
    };

    if(operator === '-') {memory = (+local) - (+current);
      display.value = memory;
      local = memory;
    };

    if(operator === '*') {memory = (+local) * (+current);
    display.value = memory;
    local = memory;
    };

    if(operator === '/') 
    {
      display.value = (+local) / (+current);
      local = display.value
    };
  
    }
  

  if(local != undefined && operator === '=')
    {
      operator = oper; 
    }

newNumber = true;
}

 

const clearPress = () => {
   display.value = '0'; 
   local = null;
   current = '';
   } 


function clearOneNumber()
   {
     let newNum = display.value;
     newNum = newNum.substring(0, newNum.length - 1);
     display.value = newNum;
     return newNum;
   }



result.addEventListener('click', (e) => {
  equal(local, oper);
})



const equal = function(local, oper)
{ 
  memory = '';
  let dot=false;
  let bot=false;
  let a;// дробная часть первого числа в операции
  let b;// дробная часть второго числа в операции
  let c;// дробная часть результата
  
  current = display.value;
  
  for(let i = 0; i < local.length; i++){
    if(local[i] === '.'){
      dot = true;
      a = local.slice(i+1, local.length);
    } 
  };

  for(let i = 0; i < current.length; i++){
    if(current[i] === '.'){
      bot = true;
      b = current.slice(i+1, current.length);
    }
  };

  if(dot && bot){
    c = (a.length + b.length);
  }

  if(dot && !bot) c = a.length;

  if(bot && !dot) c = b.length;


  if(oper === '+') display.value = (+local) + (+current);
  if(oper === '-') display.value = (+local) - (+current);
  if(oper === '*') display.value = (+local) * (+current);
  if(oper === '/') display.value = (+local) / (+current);
  if(oper === 'x^n') {display.value = Math.pow((+local), (+current))};
  if(oper === '√') {
    if(+local < 0) display.value = 'ошибка';
    if(+local > 0) display.value = Math.sqrt(+local)};
  
if (dot && bot){

    display.value = (+display.value).toFixed(c);
    let f = display.value.split('');// массив из строки
    
    for(let i = display.value.length-1; i >0; i--){

      if(display.value[i] === "0" ){
        f.pop(i);
      }
      if(display.value[i] !== "0" ){
           break;
      }
      
     display.value = f.join('');
    }
};


if (dot && !bot){
  
  display.value = (+display.value).toFixed(c+2);
  let f = display.value.split('');
    
    for(let i = display.value.length-1; i >0; i--){
      
      if(display.value[i] === "0" ){
        f.pop(i);
      }

      if(display.value[i] !== "0" ){
           break;
      }
     
     display.value = f.join('');
    }
};

    
if (bot && !dot){
  
  display.value = (+display.value).toFixed(c+2);
  
  let f = display.value.split('');
   
    for(let i = display.value.length-1; i >0; i--){
      
      if(display.value[i] === "0" ){
        f.pop(i);
      }

      if(display.value[i] !== "0" ){
           break;
      }
     
     display.value = f.join('');
    }
}

if(!dot && !bot){
  for(let i = 0; i < display.value.length; i++){
    if(display.value[i] === '.'){
  
      display.value = (+display.value).toFixed(3);
      let f = display.value.split('');
        
        for(let i = display.value.length-1; i >0; i--){
          
          if(display.value[i] === "0" ){
            f.pop(i);
          }

          if(display.value[i] !== "0" ){
              break;
          }
        
        display.value = f.join('');
        }
    }
  }
}

local= display.value;
newNumber=true; 
operator = '='; 
  
};


decimalButton.addEventListener('click', (e) => {
  decimal();
});


function decimal()
{
  display.value += '.';
  return display.value;
};

