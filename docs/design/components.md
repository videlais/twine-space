# Components

AFrame uses an entity-component architecture. Each element is an *entity*, a description of some part of the structure of the scene. Inside each entity are *components*, data influencing how the entity is presented or interacts with a reader during the experience:

Because AFrame is based on HTML, entities are elements and their components are the attributes of each element:

```html
<a-scene>
    <a-entity component="value"></a-entity>
</a-scene>
```

New components can be added with JavaScript using the action of *registering*. In AFrame, the method `registerComponent()` can be used before any scenes are created to *register* a potential new component.

Registering a new component *foo* might look like the following:

```javascript
AFRAME.registerComponent('foo', {
  schema: {},
  init: function () {},
  update: function () {},
  tick: function () {},
  remove: function () {},
  pause: function () {},
  play: function () {}
});
```

After a component is defined, it can be reference by an entity:

```html
<a-scene>
    <a-entity foo></a-entity>
</a-scene>
```

[The AFrame documentation](https://aframe.io/docs/1.3.0/core/component.html#register-a-component) has more details on this process and potential interactions on the lifecycle of an entity.

## Using the `script` tag in **Twine Space**

**Twine Space** follows this same model as AFrame with a small change. Instead of elements, **Twine Space** uses macros to create a new scene per passage.

Additional components can also be added through JavaScript. This can be entered in either the Story JavaScript panel in Twine 2 or using any passage containing the `script` tag:

Twee Example:

```twee
:: UserScript[script]
AFRAME.registerComponent('counter', {
    init: function () {
        this.counter = 0;
    },
    tick: function () {
        this.counter++;
        this.el.setAttribute('value', `Counter: ${this.counter}`)
    }
});
```

When **Twine Space** starts, it processes the Story JavaScript area first and then any passages with the tag `script`. It does this before the parsing of the starting passage and any potential creation of an AFrame scene.
