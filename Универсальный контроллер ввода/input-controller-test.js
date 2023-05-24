const activityList = {
  "left": { // название активности
    keys: [37, 65], // список кодов кнопок соответствующих активности
    enabled: true // включенная активность
  },
  "right": {
    keys: [39, 68],
    enabled: true // включенная активность
  },
  "up": {
    keys: [38, 87],
    enabled: true // включенная активность
  },
  "down": {
    keys: [40, 83],
    enabled: true // включенная активность
  },
}

const target = document.getElementById('cool-rect');
const controller = new InputController(activityList, target);
 let OX = 100;
 let OY = 100;


const bgColor = 'green';

document.addEventListener(controller.ACTION_ACTIVATED, function (event) { //Активное действие   
  try{
  const name = event.detail.action; //получает действие из события
    //console.log(name);
  console.log(event);
  if (controller.isActionActive(name) ) { //если оно активно - перемещаем объект
    requestAnimationFrame(update);
  }
}
catch 
{}
}, false);

controller.enableAction('right');
requestAnimationFrame(update)

function update(){
  try{
    if(controller.isActionActive("left")){
      console.log('left');
      OX-=5;
      target.style.left = OX;
    }
    else if(controller.isActionActive('right')){
      OX+=5;
      target.style.left = OX;
    }
    else if(controller.isActionActive('up')){
      OY-=5;
      target.style.top = OY;
    }
    else if(controller.isActionActive('down')){
      OY+=5;
      target.style.top = OY;
    }
    else if (controller.isActionActive('jump')) {
       target.style.backgroundColor = target.style.backgroundColor === bgColor ?  'red' : bgColor ;
    }


    requestAnimationFrame(update)
  }
  catch{}
}

const attach = document.getElementById('attach');
attach.onclick = function () {
  controller.attach(target, false);
};

const detach = document.getElementById('detach');
detach.onclick = function () {
  controller.detach();
};

const extraBind = document.getElementById('extra-bind');
extraBind.onclick = function () {

  const extraAction = {
      "jump": { // название активности
        keys: [32], // список кодов кнопок соответствующих активности
      }
    }
    controller.bindActions(extraAction);
};

const activation = document.getElementById('activation'); 
//активация контроллера. Дает реацию на события клавиатуры
activation.onclick = function () {
  controller.turnON();
};

const deactivation = document.getElementById('deactivation'); 
//запретить контроллеру генерировать события и реагировать на клавиатуру
deactivation.onclick = function () { 
	controller.turnOFF();
};
