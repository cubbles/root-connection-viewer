## root-connection-viewer
Webpackage containing artifacts to visualize component connections of a web page or app.
### Artifacts of the webpackage
| Name | Type | Description | Links |
|---|---|---|---|
| **docs** | Application | Generated webpackage documentation. | [docs](https://cubbles.world/sandbox/root-connection-viewer@1.0.1/docs/index.html)  |
| **root-definitions-extractor** | Elementary Component | Component to extact connection info of an ad-hoc component | [demo](https://cubbles.world/sandbox/root-connection-viewer@1.0.1/root-definitions-extractor/demo/index.html) [docs](https://cubbles.world/sandbox/root-connection-viewer@1.0.1/root-definitions-extractor/docs/index.html)  |
| **root-connection-viewer** | Compound Component | Component to visualize the connections of a root context. | [demo](https://cubbles.world/sandbox/root-connection-viewer@1.0.1/root-connection-viewer/demo/index.html) [docs](https://cubbles.world/sandbox/root-connection-viewer@1.0.1/root-connection-viewer/docs/index.html)  |
### Use of components
The html file should contain the desire component using its tag, e.g. the `<root-connection-viewer>`, as follows:
```html
<root-connection-viewer cubx-webpackage-id="root-connection-viewer@1.0.1"></root-connection-viewer>
```
Note that the `webpackageId` should be provided, which in this case is: `root-connection-viewer@1.0.1`.
Additionally, the component can be accessed and then manipulated from Javascript as follows:
```javascript
// Wait until CIF is ready
document.addEventListener('cifReady', function() {
	// Manipulate component
	var component= document.querySelector('root-connection-viewer');
	...
});
```
[Want to get to know the Cubbles Platform?](https://cubbles.github.io)
