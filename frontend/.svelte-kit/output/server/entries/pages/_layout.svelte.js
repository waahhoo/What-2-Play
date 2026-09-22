import { c as head, w as attr } from "../../chunks/server.js";
//#region src/lib/assets/favicon.jpg
var favicon_default = "/_app/immutable/assets/favicon.hEjC52aX.jpg";
//#endregion
//#region src/routes/+layout.svelte
function _layout($$renderer, $$props) {
	let { children } = $$props;
	head("12qhfyh", $$renderer, ($$renderer) => {
		$$renderer.push(`<link rel="icon"${attr("href", favicon_default)}/>`);
	});
	children($$renderer);
	$$renderer.push(`<!---->`);
}
//#endregion
export { _layout as default };
