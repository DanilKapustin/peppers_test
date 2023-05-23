class InputController {
  
  enabled; //<bool> Включение/отключение генерации событий контроллера
  focused; //<bool> Находится ли окно с целью контроллера в фокусе
  ACTION_ACTIVATED = "input-controller:action-activated"; //<string> название события активации активности (одна из кнопок активности нажата)
  ACTION_DEACTIVATED = "input-controller:action-deactivated"; //<string> (одна из кнопок активности отжата)

  activityList; //список активностей
  target; //объект, управляемый контроллером

  constructor(actionsToBind, target) { //actionsToBind - объект с активностями, target - DOM элемент, на котором слушаем активности
    this.enabled = false;
    this.focused = true;

    this.keyDownHandler = this.keyDownHandler.bind(this);
    this.keyUpHandler = this.keyUpHandler.bind(this);
    
    this.activityList = actionsToBind;
    this.target = target;

  }

  vkl() {
    document.addEventListener('keydown', this.keyDownHandler);
    document.addEventListener('keyup', this.keyUpHandler);
  }  
  
  vykl() {
    document.removeEventListener('keydown', this.keyDownHandler);
    document.removeEventListener('keyup', this.keyUpHandler);
  }

  keyDownHandler(e) {
    const name = this.getActionName(e);
    this.enableAction(name); //передается имя активности
  }

  keyUpHandler(e) {
    const name = this.getActionName(e);
    this.disableAction(name); //передается имя активности
  }

  getActionName(btn) { //Возвращает название действия из списка по кнопке
    let found = "";
    const list = this.activityList;
    Object.entries(list).forEach(([key, value]) => {
      value.keys.forEach(k => {
        if (k === btn.keyCode) {
          found = key;

        }
      });
    });
    return found;
  }  

  bindActions(actionsToBind) { //Добавляет в контроллер переданные активности.
    const { activityList } = this;
    Object.entries(actionsToBind).forEach(([actionName, actionData]) => {
      if (activityList.hasOwnProperty(actionName)) {
        this.mergeActions(activityList[actionName], actionData);
      }
      else activityList[actionName] = actionData;
    });
  }

  mergeActions(target, newAction) { //Изменяет уже имеющиеся действия в actionList
    target.keys = newAction.keys;
    if (newAction.enabled === undefined) { target.enabled = true; }
    else target.enabled = newAction.enabled;
  }

  enableAction(actionName) {
    //Включает объявленную активность - включает генерацию событий для этой активности при изменении её статуса. 
    //Например нажатие кнопки
    if (!this.enabled) return;

    const isActive = this.isActionActive(actionName);

    if (!isActive) { 
      Object.entries(this.activityList).forEach(([key, value]) => {
        if (key === actionName) {
          value.enabled = true;
          let event = new CustomEvent(this.ACTION_ACTIVATED, {
            detail: { action: actionName }
          });
          document.dispatchEvent(event); //генерирует событие активация действия
        }
      });
    }
  }

  disableAction(actionName) { //Деактивирует объявленную активность - выключает генерацию событий для этой активности. Отжатие кнопки
    if (!this.enabled) return;

    Object.entries(this.activityList).forEach(([key, value]) => {
      if (key === actionName) {        
        if (this.isActionActive(actionName)) {

          value.enabled = false;

          let event = new CustomEvent(this.ACTION_DEACTIVATED, {
            detail: { name: actionName }
          });

          document.dispatchEvent(event); //генерирует событие активация действия
        }
      }
    });
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

  detach() { //Отцепляет контроллер от активного DOM-элемента и деактивирует контроллер.
    this.target = null;
    this.enabled = false;  
  }

  isActionActive(action) { //Проверяет активирована ли переданная активность в контроллере
    return (Object.entries(activityList).find(([key,]) => key === action) || [])[1].enabled || false;
  }

  isKeyPressed(keyCode) { //Метод для источника ввода клавиатура. Проверяет нажата ли переданная кнопка в контроллере
    return (Object.entries(activityList).find(([key, value]) => key === action && value.keys
    .includes(keyCode)) || [])[1].enabled || false;
  }

}
window.InputController = InputController;