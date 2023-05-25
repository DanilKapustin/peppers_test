//import pluginsSettings from "./pluginSettings";

class InputController {
  
  enabled; //<bool> Включение/отключение генерации событий контроллера
  focused; //<bool> Находится ли окно с целью контроллера в фокусе
  ACTION_ACTIVATED = "input-controller:action-activated"; //<string> название события активации активности (одна из кнопок активности нажата)
  ACTION_DEACTIVATED = "input-controller:action-deactivated"; //<string> (одна из кнопок активности отжата)

  activityList; //список активностей
  target; //объект, управляемый контроллером
  butPress;
  plugins;

  constructor(actionsToBind, target) { //actionsToBind - объект с активностями, target - DOM элемент, на котором слушаем активности
    this.keyDownHandler = this.keyDownHandler.bind(this);
    this.keyUpHandler = this.keyUpHandler.bind(this);
    
    this.enabled = false;
    this.focused = true;
    
    this.activityList = actionsToBind;
    this.target = target;
    this.butPress = [];

    //тут ещё что-то про плагины
  }

  turnON() {
    //убрать т.к. плагин заменит
    document.addEventListener('keydown', this.keyDownHandler);
    document.addEventListener('keyup', this.keyUpHandler);
  }  
  
  turnOFF() {
    //убрать т.к. плагин заменит
    document.removeEventListener('keydown', this.keyDownHandler);
    document.removeEventListener('keyup', this.keyUpHandler);
  }

  keyDownHandler(e) {
    if (!this.butPress.includes(e.keyCode))
      this.butPress.push(e.keyCode);
  }

  keyUpHandler(e) {
    //TODO: filter на splice
    return this.butPress.splice(this.butPress.indexOf(e.keyCode),1)
  }

  bindActions(actionsToBind) { //Добавляет в контроллер переданные активности.
    const { activityList } = this;
    Object.entries(actionsToBind).forEach(([actionName, actionData]) => {
      if (activityList.hasOwnProperty(actionName))  
        this.mergeActions(activityList[actionName], actionData);
      else 
        activityList[actionName] = actionData;
    });
  }

  mergeActions(target, newAction) { //Изменяет уже имеющиеся действия в actionList
    target.keys = newAction.keys;
    if (newAction.enabled === undefined) 
      target.enabled = true; 
    else 
      target.enabled = newAction.enabled;
  }

  enableAction(actionName) {
    //Включает объявленную активность - включает генерацию событий для этой активности при изменении её статуса. 
    //Например нажатие кнопки
    if (!this.enabled) return;

    this.activityList[actionName].enabled = true;
  }

  disableAction(actionName) { 
    //Деактивирует объявленную активность - выключает генерацию событий для этой активности. Отжатие кнопки
    
    if (!this.enabled) return;

    this.activityList[actionName].enabled = false;
  }

  attach(target, dontEnable) { 
    //dontEnable - Если передано true - не активирует контроллер.
    //Нацеливает контроллер на переданный DOM-элемент (вешает слушатели).
    
    if (!dontEnable) {
      this.target = target;
    }

    if (this.target != null) {
      this.enabled = true;
    }  
  }

  detach() { 
    //Отцепляет контроллер от активного DOM-элемента и деактивирует контроллер.
    
    this.target = null;
    this.enabled = false;  
  }

  isActionActive(action) { //Проверяет активирована ли переданная активность в контроллере
    if (!this.enabled) return;

    if(!(action in this.activityList)) return;

    for (let i = 0; i < activityList[action].keys.length; i++){ 
      if(this.isKeyPressed(activityList[action].keys[i])) 
        return this.activityList[action].enabled;
    }
    return;
  }

  isKeyPressed(keyCode) { 
    //Метод для источника ввода клавиатура. Проверяет нажата ли переданная кнопка в контроллере    
    return this.butPress.includes(keyCode);
  }

}
window.InputController = InputController;