export { FactoryComponent };

class FactoryComponent  {
    constructor(tag, componentClass) {
       this.tag=tag;
       this.componentClass = componentClass;       
       customElements.define(this.tag, this.componentClass);
    }
    
    GetElement () {
        return document.createElement(this.tag);
    };

    Init (parameters) {
        const elToDestroy = this.componentClass.Init(this.GetElement(), parameters);
        const elToReturn = elToDestroy.firstElementChild;
        elToDestroy.remove();
        return elToReturn;
    }

}