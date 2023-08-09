export {CreateComponent};

const DefineComponent = (tag, componentClass) => {
    customElements.define(tag, componentClass);
    return document.createElement(tag);
};

const CreateComponent = (tag, componentClass, parameters)=>{
    return componentClass.Init(DefineComponent(tag, componentClass), parameters).firstChild;
}