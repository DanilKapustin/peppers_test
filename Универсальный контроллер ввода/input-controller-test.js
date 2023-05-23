const activityList = {
  "left": { // название активности
    keys: [37, 65], // список кодов кнопок соответствующих активности
    enabled: false // отключенная активность
  },
  "right": {
    keys: [39, 68],
  },
  "up": {
    keys: [38, 87],
    enabled: false // отключенная активность
  },
  "down": {
    keys: [40, 83],
    enabled: false // отключенная активность
  },
}

const target = document.getElementById('cool-rect');
const controller = new InputController(activityList, target);

let OX = 100;
let OY = 100;

const bgColor = 'green';

document.addEventListener(controller.ACTION_ACTIVATED, function (event) { //Активное действие    
    const name = event.detail.action; //получает действие из события
    if (controller.isActionActive(name)) { //если оно активно - перемещаем объект
    if (name === "left") {
      OX -= 20;
      target.style.left = OX;
    }
    else if (name === "right") {
      OX += 20;
      target.style.left = OX;
    }
    else if (name === "up") {
      OY -= 20;
      target.style.top = OY;
    }
    else if (name === "down") {
      OY += 20;
      target.style.top = OY;
    }
    else if (name === "jump") {
      target.style.backgroundColor = target.style.backgroundColor === bgColor ? 'red' : bgColor;
    }
  }
}, false);

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
  controller.vkl();
};

const deactivation = document.getElementById('deactivation'); 
//запретить контроллеру генерировать события и реагировать на клавиатуру
deactivation.onclick = function () { 
	controller.vykl();
};