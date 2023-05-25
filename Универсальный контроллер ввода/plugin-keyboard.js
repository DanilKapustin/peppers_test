export default class PluginKeyboard {

    constructor({ onActionChanged }) {
        this.onActionChanged = onActionChanged;
    }

    activate() {
        document.addEventListener('keydown', this.onkeyDown);
        document.addEventListener('keyup', this.onkeyUp);
    }
    
    deactivate() {
        document.removeEventListener('keydown', this.keyDownHandler);
        document.removeEventListener('keyup', this.keyUpHandler);
    }

    addAction({ actionName, actionData }) {
        this.actionName = actionName;
        this.actionData = actionData;
    }

    onkeyDown() {
        this.onActionChanged({ actionData, actionName, active: true })   
    }
    onkeyUp() {
        this.onActionChanged({ actionData, actionName, active: false })  
    }
}