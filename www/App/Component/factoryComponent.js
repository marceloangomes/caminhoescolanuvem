export {CreateComponent};

const DefineComponent = (tag, componentClass) => {
    customElements.define(tag, componentClass);
    return document.createElement(tag);
};

const CreateComponent = (tag, componentClass, parameter)=>{
    return componentClass.Init(DefineComponent(tag, componentClass), parameter);
}