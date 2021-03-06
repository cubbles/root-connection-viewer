## root-connection-viewer
Webpackage containing artifacts to visualize component connections of a web page or app.
### Webpackage Artifacts
| Name | Type | Description | Links |
|---|---|---|---|
| **docs** | Application | Generated webpackage documentation. | [docs](https://cubbles.world/shared/root-connection-viewer@1.1.2/docs/index.html) |
| **root-definitions-extractor** | Elementary Component | Component to extract connection info of an ad-hoc component | [demo](https://cubbles.world/shared/root-connection-viewer@1.1.2/root-definitions-extractor/demo/index.html) [docs](https://cubbles.world/shared/root-connection-viewer@1.1.2/root-definitions-extractor/docs/index.html) |
| **root-connection-viewer** | Compound Component | Component to visualize the connections of a root context. | [demo](https://cubbles.world/shared/root-connection-viewer@1.1.2/root-connection-viewer/demo/index.html) [Dynamic Connections demo](https://cubbles.world/shared/root-connection-viewer@1.1.2/root-connection-viewer/demo/dynamicConnection.html) [docs](https://cubbles.world/shared/root-connection-viewer@1.1.2/root-connection-viewer/docs/index.html) |
### Use of components
The html file should contain the desire component using its tag, e.g. the `<root-connection-viewer>`, as follows:
```html
<root-connection-viewer cubx-webpackage-id="root-connection-viewer@1.1.2"></root-connection-viewer>
```
Note that the `webpackageId` should be provided as attribute, which in this case is: `root-connection-viewer@1.1.2`.

Additionally, this component can be initialized using the `<cubx-core-slot-init>` tag (available from _cubx.core.rte@1.9.0_).
For example, lets initialize the `shortcut` slot to get the basic package of ckeditor:

```html
<root-connection-viewer cubx-webpackage-id="root-connection-viewer@1.1.2">
    <!--Initilization-->
    <cubx-core-init style="display:none">
        <cubx-core-slot-init slot="shortcut">[ "alt", "v" ]</cubx-core-slot-init>
    </cubx-core-init>
</root-connection-viewer>
```

Or it can be initialized and later manipulated from Javascript as follows:

```javascript
var component= document.querySelector('root-connection-viewer');
// Wait until CIF is ready
document.addEventListener('cifReady', function() {
  // Manipulate slots
  component.setShortcut([ "alt", "v" ]);
});
```

[Want to get to know the Cubbles Platform?](https://cubbles.github.io)