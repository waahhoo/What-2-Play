import { c as on, i as unmount, n as mount, r as tick } from "../../chunks/index-server.js";
import { Bt as run, E as escape_html, Lt as fallback, Ot as ATTACHMENT_KEY, T as clsx$1, Vt as to_array, _ as getContext, a as derived, c as head, d as spread_props, f as stringify, g as getAllContexts, i as bind_props, l as props_id, n as attr_style, o as element, r as attributes, s as ensure_array_like, t as attr_class, v as hasContext, w as attr, y as setContext } from "../../chunks/server.js";
import "../../chunks/shared2.js";
import { clsx } from "clsx";
import { cn } from "cn";
import parse from "style-to-object";
import { focusable, isFocusable, tabbable } from "tabbable";
import { tv } from "tailwind-variants";
//#region node_modules/@lucide/svelte/dist/utils/defaultAttributes.js
/**
* @file
* @license @lucide/svelte v1.47.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var defaultAttributes = {
	xmlns: "http://www.w3.org/2000/svg",
	width: 24,
	height: 24,
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	"stroke-width": 2,
	"stroke-linecap": "round",
	"stroke-linejoin": "round"
};
//#endregion
//#region node_modules/@lucide/svelte/dist/utils/mergeClasses.js
/**
* @file
* @license @lucide/svelte v1.47.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
/**
* Merges classes into a single string
*
* @param {array} classes
* @returns {string} A string of classes
*/
var mergeClasses = (...classes) => classes.filter((className, index, array) => {
	return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
}).join(" ").trim();
//#endregion
//#region node_modules/@lucide/svelte/dist/utils/buildLucideIconNode.js
/**
* @file
* @license @lucide/svelte v1.47.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
function isDefined(value) {
	return value !== null && value !== void 0;
}
/**
* Creates a Lucide icon node (an svgson-like format) from a Lucide icon object.
*
* @param icon The icon to build.
* @param params Additional build parameters.
*/
function buildLucideIconNode(icon, params = {}) {
	const attributeNames = params.attributeNames ?? {};
	const getAttributeName = (attributeName) => attributeNames[attributeName] ?? attributeName;
	const viewBoxWidth = icon.size ?? icon.width ?? defaultAttributes["width"];
	const viewBoxHeight = icon.size ?? icon.height ?? defaultAttributes["height"];
	const aliasClassNames = icon.aliases?.filter((alias) => typeof alias === "string" && alias.trim() !== "").map((alias) => `lucide-${alias}`) ?? [];
	const iconClassNames = [...icon.name ? [`lucide-${icon.name}`] : [], ...aliasClassNames];
	const classNamesFromClassName = params.className?.split(" ").filter(Boolean) ?? [];
	const className = params.includeDefaultClasses === false ? mergeClasses(...classNamesFromClassName) : mergeClasses("lucide", ...iconClassNames, ...classNamesFromClassName);
	const calculatedStrokeWidth = params.absoluteStrokeWidth ? Number(params.strokeWidth ?? defaultAttributes["stroke-width"]) * Number(icon.size ?? icon.width ?? defaultAttributes["width"]) / Number(params.size ?? params.width ?? defaultAttributes["width"]) : params.strokeWidth ?? defaultAttributes["stroke-width"];
	return [
		"svg",
		{
			...Object.entries(defaultAttributes).reduce((attrs, [attrName, value]) => {
				attrs[getAttributeName(attrName)] = value;
				return attrs;
			}, {}),
			..."color" in params && params.color && { [getAttributeName("stroke")]: params.color },
			..."size" in params && isDefined(params.size) && {
				[getAttributeName("width")]: params.size,
				[getAttributeName("height")]: params.size
			},
			..."width" in params && isDefined(params.width) && { [getAttributeName("width")]: params.width },
			..."height" in params && isDefined(params.height) && { [getAttributeName("height")]: params.height },
			[getAttributeName("stroke-width")]: calculatedStrokeWidth,
			...className && { [getAttributeName("class")]: className },
			[getAttributeName("viewBox")]: `0 0 ${viewBoxWidth} ${viewBoxHeight}`,
			...params.hasA11yProp === false ? { [getAttributeName("aria-hidden")]: "true" } : {},
			..."attributes" in params && params.attributes
		},
		icon.node.map((child) => {
			const [name, attrs, children] = child;
			const nextAttrs = params.nonScalingStroke ? {
				[getAttributeName("vector-effect")]: "non-scaling-stroke",
				...attrs
			} : attrs;
			return children ? [
				name,
				nextAttrs,
				children
			] : [name, nextAttrs];
		})
	];
}
//#endregion
//#region node_modules/@lucide/svelte/dist/utils/hasA11yProp.js
/**
* @file
* @license @lucide/svelte v1.47.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
/**
* Check if a component has an accessibility prop
*
* @param {object} props
* @returns {boolean} Whether the component has an accessibility prop
*/
var hasA11yProp = (props) => {
	for (const prop in props) if (prop.startsWith("aria-") || prop === "role" || prop === "title") return true;
	return false;
};
//#endregion
//#region node_modules/@lucide/svelte/dist/context.js
/**
* @file
* @license @lucide/svelte v1.47.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var LucideContext = Symbol("lucide-context");
var getLucideContext = () => getContext(LucideContext);
//#endregion
//#region node_modules/@lucide/svelte/dist/Icon.svelte
function Icon($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const globalProps = getLucideContext() ?? {};
		const { color = globalProps.color ?? "currentColor", size = globalProps.size ?? 24, width = size, height = size, strokeWidth = globalProps.strokeWidth ?? 2, absoluteStrokeWidth = globalProps.absoluteStrokeWidth ?? false, nonScalingStroke = globalProps.nonScalingStroke ?? false, iconNode = [], icon = {
			node: iconNode,
			aliases: [],
			size: 24
		}, class: propsClass, children, $$slots, $$events, ...props } = $$props;
		const hasAccessibleProp = derived(() => Boolean(children) || hasA11yProp(props));
		const $$d = derived(() => buildLucideIconNode(icon, {
			color,
			width,
			height,
			strokeWidth,
			absoluteStrokeWidth,
			nonScalingStroke,
			className: mergeClasses("lucide-icon", globalProps.class),
			hasA11yProp: hasAccessibleProp(),
			attributes: props
		})), $$derived_array = derived(() => to_array($$d(), 3)), svgAttributes = derived(() => $$derived_array()[1]), builtIconNode = derived(() => fallback($$derived_array()[2], () => [], true));
		const iconAttributes = derived(() => ({
			...svgAttributes(),
			class: [...svgAttributes().class.split(" "), propsClass]
		}));
		$$renderer.push(`<svg${attributes({ ...iconAttributes() }, void 0, void 0, void 0, 3)}><!--[-->`);
		const each_array = ensure_array_like(builtIconNode());
		for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
			let [tag, attrs] = each_array[$$index];
			element($$renderer, tag, () => {
				$$renderer.push(`${attributes({ ...attrs }, void 0, void 0, void 0, 3)}`);
			});
		}
		$$renderer.push(`<!--]-->`);
		children?.($$renderer);
		$$renderer.push(`<!----></svg>`);
	});
}
//#endregion
//#region node_modules/@lucide/svelte/dist/icons/check.svelte
function Check($$renderer, $$props) {
	let { $$slots, $$events, ...props } = $$props;
	Icon($$renderer, spread_props([props, { icon: {
		"name": "check",
		"size": 24,
		"node": [["path", { "d": "M20 6 9 17l-5-5" }]]
	} }]));
}
//#endregion
//#region node_modules/@lucide/svelte/dist/icons/circle-plus.svelte
function Circle_plus($$renderer, $$props) {
	let { $$slots, $$events, ...props } = $$props;
	Icon($$renderer, spread_props([props, { icon: {
		"name": "circle-plus",
		"size": 24,
		"node": [
			["circle", {
				"cx": "12",
				"cy": "12",
				"r": "10"
			}],
			["path", { "d": "M8 12h8" }],
			["path", { "d": "M12 8v8" }]
		],
		"aliases": ["plus-circle"]
	} }]));
}
//#endregion
//#region node_modules/@lucide/svelte/dist/icons/gamepad-2.svelte
function Gamepad_2($$renderer, $$props) {
	let { $$slots, $$events, ...props } = $$props;
	Icon($$renderer, spread_props([props, { icon: {
		"name": "gamepad-2",
		"size": 24,
		"node": [
			["line", {
				"x1": "6",
				"x2": "10",
				"y1": "11",
				"y2": "11"
			}],
			["line", {
				"x1": "8",
				"x2": "8",
				"y1": "9",
				"y2": "13"
			}],
			["line", {
				"x1": "15",
				"x2": "15.01",
				"y1": "12",
				"y2": "12"
			}],
			["line", {
				"x1": "18",
				"x2": "18.01",
				"y1": "10",
				"y2": "10"
			}],
			["path", { "d": "M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z" }]
		]
	} }]));
}
//#endregion
//#region node_modules/@lucide/svelte/dist/icons/sun.svelte
function Sun($$renderer, $$props) {
	let { $$slots, $$events, ...props } = $$props;
	Icon($$renderer, spread_props([props, { icon: {
		"name": "sun",
		"size": 24,
		"node": [
			["circle", {
				"cx": "12",
				"cy": "12",
				"r": "4"
			}],
			["path", { "d": "M12 2v2" }],
			["path", { "d": "M12 20v2" }],
			["path", { "d": "m4.93 4.93 1.41 1.41" }],
			["path", { "d": "m17.66 17.66 1.41 1.41" }],
			["path", { "d": "M2 12h2" }],
			["path", { "d": "M20 12h2" }],
			["path", { "d": "m6.34 17.66-1.41 1.41" }],
			["path", { "d": "m19.07 4.93-1.41 1.41" }]
		]
	} }]));
}
//#endregion
//#region node_modules/@lucide/svelte/dist/icons/x.svelte
function X($$renderer, $$props) {
	let { $$slots, $$events, ...props } = $$props;
	Icon($$renderer, spread_props([props, { icon: {
		"name": "x",
		"size": 24,
		"node": [["path", { "d": "M18 6 6 18" }], ["path", { "d": "m6 6 12 12" }]]
	} }]));
}
//#endregion
//#region node_modules/svelte-toolbelt/dist/utils/is.js
function isObject(value) {
	return value !== null && typeof value === "object";
}
var CLASS_VALUE_PRIMITIVE_TYPES = [
	"string",
	"number",
	"bigint",
	"boolean"
];
function isClassValue(value) {
	if (value === null || value === void 0) return true;
	if (CLASS_VALUE_PRIMITIVE_TYPES.includes(typeof value)) return true;
	if (Array.isArray(value)) return value.every((item) => isClassValue(item));
	if (typeof value === "object") {
		if (Object.getPrototypeOf(value) !== Object.prototype) return false;
		return true;
	}
	return false;
}
//#endregion
//#region node_modules/svelte-toolbelt/dist/box/box-extras.svelte.js
var BoxSymbol = Symbol("box");
var isWritableSymbol = Symbol("is-writable");
function boxWith(getter, setter) {
	const derived$1 = derived(getter);
	if (setter) return {
		[BoxSymbol]: true,
		[isWritableSymbol]: true,
		get current() {
			return derived$1();
		},
		set current(v) {
			setter(v);
		}
	};
	return {
		[BoxSymbol]: true,
		get current() {
			return getter();
		}
	};
}
/**
* @returns Whether the value is a Box
*
* @see {@link https://runed.dev/docs/functions/box}
*/
function isBox(value) {
	return isObject(value) && BoxSymbol in value;
}
function simpleBox(initialValue) {
	let current = initialValue;
	return {
		[BoxSymbol]: true,
		[isWritableSymbol]: true,
		get current() {
			return current;
		},
		set current(v) {
			current = v;
		}
	};
}
//#endregion
//#region node_modules/svelte-toolbelt/dist/utils/compose-handlers.js
/**
* Composes event handlers into a single function that can be called with an event.
* If the previous handler cancels the event using `event.preventDefault()`, the handlers
* that follow will not be called.
*/
function composeHandlers(...handlers) {
	return function(e) {
		for (const handler of handlers) {
			if (!handler) continue;
			if (e.defaultPrevented) return;
			if (typeof handler === "function") handler.call(this, e);
			else handler.current?.call(this, e);
		}
	};
}
//#endregion
//#region node_modules/svelte-toolbelt/dist/utils/strings.js
var NUMBER_CHAR_RE = /\d/;
var STR_SPLITTERS = [
	"-",
	"_",
	"/",
	"."
];
function isUppercase(char = "") {
	if (NUMBER_CHAR_RE.test(char)) return void 0;
	return char !== char.toLowerCase();
}
function splitByCase(str) {
	const parts = [];
	let buff = "";
	let previousUpper;
	let previousSplitter;
	for (const char of str) {
		const isSplitter = STR_SPLITTERS.includes(char);
		if (isSplitter === true) {
			parts.push(buff);
			buff = "";
			previousUpper = void 0;
			continue;
		}
		const isUpper = isUppercase(char);
		if (previousSplitter === false) {
			if (previousUpper === false && isUpper === true) {
				parts.push(buff);
				buff = char;
				previousUpper = isUpper;
				continue;
			}
			if (previousUpper === true && isUpper === false && buff.length > 1) {
				const lastChar = buff.at(-1);
				parts.push(buff.slice(0, Math.max(0, buff.length - 1)));
				buff = lastChar + char;
				previousUpper = isUpper;
				continue;
			}
		}
		buff += char;
		previousUpper = isUpper;
		previousSplitter = isSplitter;
	}
	parts.push(buff);
	return parts;
}
function pascalCase(str) {
	if (!str) return "";
	return splitByCase(str).map((p) => upperFirst(p)).join("");
}
function camelCase(str) {
	return lowerFirst(pascalCase(str || ""));
}
function upperFirst(str) {
	return str ? str[0].toUpperCase() + str.slice(1) : "";
}
function lowerFirst(str) {
	return str ? str[0].toLowerCase() + str.slice(1) : "";
}
//#endregion
//#region node_modules/svelte-toolbelt/dist/utils/css-to-style-obj.js
function cssToStyleObj(css) {
	if (!css) return {};
	const styleObj = {};
	function iterator(name, value) {
		if (name.startsWith("-moz-") || name.startsWith("-webkit-") || name.startsWith("-ms-") || name.startsWith("-o-")) {
			styleObj[pascalCase(name)] = value;
			return;
		}
		if (name.startsWith("--")) {
			styleObj[name] = value;
			return;
		}
		styleObj[camelCase(name)] = value;
	}
	parse(css, iterator);
	return styleObj;
}
//#endregion
//#region node_modules/svelte-toolbelt/dist/utils/execute-callbacks.js
/**
* Executes an array of callback functions with the same arguments.
* @template T The types of the arguments that the callback functions take.
* @param callbacks array of callback functions to execute.
* @returns A new function that executes all of the original callback functions with the same arguments.
*/
function executeCallbacks(...callbacks) {
	return (...args) => {
		for (const callback of callbacks) if (typeof callback === "function") callback(...args);
	};
}
//#endregion
//#region node_modules/svelte-toolbelt/dist/utils/style-to-css.js
function createParser(matcher, replacer) {
	const regex = RegExp(matcher, "g");
	return (str) => {
		if (typeof str !== "string") throw new TypeError(`expected an argument of type string, but got ${typeof str}`);
		if (!str.match(regex)) return str;
		return str.replace(regex, replacer);
	};
}
var camelToKebab = createParser(/[A-Z]/, (match) => `-${match.toLowerCase()}`);
function styleToCSS(styleObj) {
	if (!styleObj || typeof styleObj !== "object" || Array.isArray(styleObj)) throw new TypeError(`expected an argument of type object, but got ${typeof styleObj}`);
	return Object.keys(styleObj).map((property) => `${camelToKebab(property)}: ${styleObj[property]};`).join("\n");
}
//#endregion
//#region node_modules/svelte-toolbelt/dist/utils/style.js
function styleToString(style = {}) {
	return styleToCSS(style).replace("\n", " ");
}
var EVENT_LIST_SET = /* @__PURE__ */ new Set([
	"onabort",
	"onanimationcancel",
	"onanimationend",
	"onanimationiteration",
	"onanimationstart",
	"onauxclick",
	"onbeforeinput",
	"onbeforetoggle",
	"onblur",
	"oncancel",
	"oncanplay",
	"oncanplaythrough",
	"onchange",
	"onclick",
	"onclose",
	"oncompositionend",
	"oncompositionstart",
	"oncompositionupdate",
	"oncontextlost",
	"oncontextmenu",
	"oncontextrestored",
	"oncopy",
	"oncuechange",
	"oncut",
	"ondblclick",
	"ondrag",
	"ondragend",
	"ondragenter",
	"ondragleave",
	"ondragover",
	"ondragstart",
	"ondrop",
	"ondurationchange",
	"onemptied",
	"onended",
	"onerror",
	"onfocus",
	"onfocusin",
	"onfocusout",
	"onformdata",
	"ongotpointercapture",
	"oninput",
	"oninvalid",
	"onkeydown",
	"onkeypress",
	"onkeyup",
	"onload",
	"onloadeddata",
	"onloadedmetadata",
	"onloadstart",
	"onlostpointercapture",
	"onmousedown",
	"onmouseenter",
	"onmouseleave",
	"onmousemove",
	"onmouseout",
	"onmouseover",
	"onmouseup",
	"onpaste",
	"onpause",
	"onplay",
	"onplaying",
	"onpointercancel",
	"onpointerdown",
	"onpointerenter",
	"onpointerleave",
	"onpointermove",
	"onpointerout",
	"onpointerover",
	"onpointerup",
	"onprogress",
	"onratechange",
	"onreset",
	"onresize",
	"onscroll",
	"onscrollend",
	"onsecuritypolicyviolation",
	"onseeked",
	"onseeking",
	"onselect",
	"onselectionchange",
	"onselectstart",
	"onslotchange",
	"onstalled",
	"onsubmit",
	"onsuspend",
	"ontimeupdate",
	"ontoggle",
	"ontouchcancel",
	"ontouchend",
	"ontouchmove",
	"ontouchstart",
	"ontransitioncancel",
	"ontransitionend",
	"ontransitionrun",
	"ontransitionstart",
	"onvolumechange",
	"onwaiting",
	"onwebkitanimationend",
	"onwebkitanimationiteration",
	"onwebkitanimationstart",
	"onwebkittransitionend",
	"onwheel"
]);
//#endregion
//#region node_modules/svelte-toolbelt/dist/utils/merge-props.js
/**
* Modified from https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/utils/src/mergeProps.ts (see NOTICE.txt for source)
*/
function isEventHandler(key) {
	return EVENT_LIST_SET.has(key);
}
/**
* Given a list of prop objects, merges them into a single object.
* - Automatically composes event handlers (e.g. `onclick`, `oninput`, etc.)
* - Chains regular functions with the same name so they are called in order
* - Merges class strings with `clsx`
* - Merges style objects and converts them to strings
* - Handles a bug with Svelte where setting the `hidden` attribute to `false` doesn't remove it
* - Overrides other values with the last one
*/
function mergeProps(...args) {
	const result = { ...args[0] };
	for (let i = 1; i < args.length; i++) {
		const props = args[i];
		if (!props) continue;
		for (const key of Object.keys(props)) {
			const a = result[key];
			const b = props[key];
			const aIsFunction = typeof a === "function";
			const bIsFunction = typeof b === "function";
			if (aIsFunction && typeof bIsFunction && isEventHandler(key)) result[key] = composeHandlers(a, b);
			else if (aIsFunction && bIsFunction) result[key] = executeCallbacks(a, b);
			else if (key === "class") {
				const aIsClassValue = isClassValue(a);
				const bIsClassValue = isClassValue(b);
				if (aIsClassValue && bIsClassValue) result[key] = clsx(a, b);
				else if (aIsClassValue) result[key] = clsx(a);
				else if (bIsClassValue) result[key] = clsx(b);
			} else if (key === "style") {
				const aIsObject = typeof a === "object";
				const bIsObject = typeof b === "object";
				const aIsString = typeof a === "string";
				const bIsString = typeof b === "string";
				if (aIsObject && bIsObject) result[key] = {
					...a,
					...b
				};
				else if (aIsObject && bIsString) {
					const parsedStyle = cssToStyleObj(b);
					result[key] = {
						...a,
						...parsedStyle
					};
				} else if (aIsString && bIsObject) result[key] = {
					...cssToStyleObj(a),
					...b
				};
				else if (aIsString && bIsString) {
					const parsedStyleA = cssToStyleObj(a);
					const parsedStyleB = cssToStyleObj(b);
					result[key] = {
						...parsedStyleA,
						...parsedStyleB
					};
				} else if (aIsObject) result[key] = a;
				else if (bIsObject) result[key] = b;
				else if (aIsString) result[key] = a;
				else if (bIsString) result[key] = b;
			} else result[key] = b !== void 0 ? b : a;
		}
		for (const key of Object.getOwnPropertySymbols(props)) {
			const a = result[key];
			const b = props[key];
			result[key] = b !== void 0 ? b : a;
		}
	}
	if (typeof result.style === "object") result.style = styleToString(result.style).replaceAll("\n", " ");
	if (result.hidden === false) {
		result.hidden = void 0;
		delete result.hidden;
	}
	if (result.disabled === false) {
		result.disabled = void 0;
		delete result.disabled;
	}
	return result;
}
//#endregion
//#region node_modules/runed/dist/internal/configurable-globals.js
var defaultWindow = void 0;
//#endregion
//#region node_modules/runed/dist/internal/utils/dom.js
/**
* Handles getting the active element in a document or shadow root.
* If the active element is within a shadow root, it will traverse the shadow root
* to find the active element.
* If not, it will return the active element in the document.
*
* @param document A document or shadow root to get the active element from.
* @returns The active element in the document or shadow root.
*/
function getActiveElement$1(document) {
	let activeElement = document.activeElement;
	while (activeElement?.shadowRoot) {
		const node = activeElement.shadowRoot.activeElement;
		if (node === activeElement) break;
		else activeElement = node;
	}
	return activeElement;
}
globalThis.Date;
globalThis.Set;
var SvelteMap = globalThis.Map;
globalThis.URL;
globalThis.URLSearchParams;
/**
* @param {any} _
*/
function createSubscriber(_) {
	return () => {};
}
//#endregion
//#region node_modules/runed/dist/utilities/active-element/active-element.svelte.js
var ActiveElement = class {
	#document;
	#subscribe;
	constructor(options = {}) {
		const { window = defaultWindow, document = window?.document } = options;
		if (window === void 0) return;
		this.#document = document;
		this.#subscribe = createSubscriber((update) => {
			const cleanupFocusIn = on(window, "focusin", update);
			const cleanupFocusOut = on(window, "focusout", update);
			return () => {
				cleanupFocusIn();
				cleanupFocusOut();
			};
		});
	}
	get current() {
		this.#subscribe?.();
		if (!this.#document) return null;
		return getActiveElement$1(this.#document);
	}
};
new ActiveElement();
//#endregion
//#region node_modules/runed/dist/utilities/context/context.js
var Context = class {
	#name;
	#key;
	/**
	* @param name The name of the context.
	* This is used for generating the context key and error messages.
	*/
	constructor(name) {
		this.#name = name;
		this.#key = Symbol(name);
	}
	/**
	* The key used to get and set the context.
	*
	* It is not recommended to use this value directly.
	* Instead, use the methods provided by this class.
	*/
	get key() {
		return this.#key;
	}
	/**
	* Checks whether this has been set in the context of a parent component.
	*
	* Must be called during component initialisation.
	*/
	exists() {
		return hasContext(this.#key);
	}
	/**
	* Retrieves the context that belongs to the closest parent component.
	*
	* Must be called during component initialisation.
	*
	* @throws An error if the context does not exist.
	*/
	get() {
		const context = getContext(this.#key);
		if (context === void 0) throw new Error(`Context "${this.#name}" not found`);
		return context;
	}
	/**
	* Retrieves the context that belongs to the closest parent component,
	* or the given fallback value if the context does not exist.
	*
	* Must be called during component initialisation.
	*/
	getOr(fallback) {
		const context = getContext(this.#key);
		if (context === void 0) return fallback;
		return context;
	}
	/**
	* Associates the given value with the current component and returns it.
	*
	* Must be called during component initialisation.
	*/
	set(context) {
		return setContext(this.#key, context);
	}
};
//#endregion
//#region node_modules/runed/dist/utilities/watch/watch.svelte.js
function runWatcher(sources, flush, effect, options = {}) {
	const { lazy = false } = options;
}
function watch(sources, effect, options) {
	runWatcher(sources, "post", effect, options);
}
function watchPre(sources, effect, options) {
	runWatcher(sources, "pre", effect, options);
}
watch.pre = watchPre;
function watchOnce(source, effect) {}
function watchOncePre(source, effect) {}
watchOnce.pre = watchOncePre;
//#endregion
//#region node_modules/runed/dist/utilities/resource/resource.svelte.js
function debounce$1(fn, delay) {
	let timeoutId;
	let lastResolve = null;
	return (...args) => {
		return new Promise((resolve) => {
			if (lastResolve) lastResolve(void 0);
			lastResolve = resolve;
			clearTimeout(timeoutId);
			timeoutId = setTimeout(async () => {
				const result = await fn(...args);
				if (lastResolve) {
					lastResolve(result);
					lastResolve = null;
				}
			}, delay);
		});
	};
}
function throttle(fn, delay) {
	let lastRun = 0;
	let lastPromise = null;
	return (...args) => {
		const now = Date.now();
		if (lastRun && now - lastRun < delay) return lastPromise ?? Promise.resolve(void 0);
		lastRun = now;
		lastPromise = fn(...args);
		return lastPromise;
	};
}
function runResource(source, fetcher, options = {}, effectFn) {
	const { lazy = false, once = false, initialValue, debounce: debounceTime, throttle: throttleTime } = options;
	let current = initialValue;
	let loading = false;
	let error = void 0;
	let cleanupFns = [];
	const runCleanup = () => {
		cleanupFns.forEach((fn) => fn());
		cleanupFns = [];
	};
	const onCleanup = (fn) => {
		cleanupFns = [...cleanupFns, fn];
	};
	const baseFetcher = async (value, previousValue, refetching = false) => {
		try {
			loading = true;
			error = void 0;
			runCleanup();
			const controller = new AbortController();
			onCleanup(() => controller.abort());
			const result = await fetcher(value, previousValue, {
				data: current,
				refetching,
				onCleanup,
				signal: controller.signal
			});
			current = result;
			return result;
		} catch (e) {
			if (!(e instanceof DOMException && e.name === "AbortError")) error = e;
			return;
		} finally {
			loading = false;
		}
	};
	const runFetcher = debounceTime ? debounce$1(baseFetcher, debounceTime) : throttleTime ? throttle(baseFetcher, throttleTime) : baseFetcher;
	const sources = Array.isArray(source) ? source : [source];
	let prevValues;
	effectFn((values, previousValues) => {
		if (once && prevValues) return;
		prevValues = values;
		runFetcher(Array.isArray(source) ? values : values[0], Array.isArray(source) ? previousValues : previousValues?.[0]);
	}, { lazy });
	return {
		get current() {
			return current;
		},
		get loading() {
			return loading;
		},
		get error() {
			return error;
		},
		mutate: (value) => {
			current = value;
		},
		refetch: (info) => {
			const values = sources.map((s) => s());
			return runFetcher(Array.isArray(source) ? values : values[0], Array.isArray(source) ? values : values[0], info ?? true);
		}
	};
}
function resource(source, fetcher, options) {
	return runResource(source, fetcher, options, (fn, options) => {
		const sources = Array.isArray(source) ? source : [source];
		const getters = () => sources.map((s) => s());
		watch(getters, (values, previousValues) => {
			fn(values, previousValues ?? []);
		}, options);
	});
}
function resourcePre(source, fetcher, options) {
	return runResource(source, fetcher, options, (fn, options) => {
		const sources = Array.isArray(source) ? source : [source];
		const getter = () => sources.map((s) => s());
		watch.pre(getter, (values, previousValues) => {
			fn(values, previousValues ?? []);
		}, options);
	});
}
resource.pre = resourcePre;
//#endregion
//#region node_modules/svelte-toolbelt/dist/utils/after-sleep.js
/**
* A utility function that executes a callback after a specified number of milliseconds.
*/
function afterSleep(ms, cb) {
	return setTimeout(cb, ms);
}
//#endregion
//#region node_modules/svelte-toolbelt/dist/utils/after-tick.js
function afterTick(fn) {
	(/* @__PURE__ */ tick()).then(fn);
}
//#endregion
//#region node_modules/svelte-toolbelt/dist/utils/dom.js
var ELEMENT_NODE = 1;
var DOCUMENT_NODE = 9;
var DOCUMENT_FRAGMENT_NODE = 11;
function isHTMLElement$1(node) {
	return isObject(node) && node.nodeType === ELEMENT_NODE && typeof node.nodeName === "string";
}
function isDocument(node) {
	return isObject(node) && node.nodeType === DOCUMENT_NODE;
}
function isWindow(node) {
	return isObject(node) && node.constructor?.name === "VisualViewport";
}
function isNode(node) {
	return isObject(node) && node.nodeType !== void 0;
}
function isShadowRoot(node) {
	return isNode(node) && node.nodeType === DOCUMENT_FRAGMENT_NODE && "host" in node;
}
function contains(parent, child) {
	if (!parent || !child) return false;
	if (!isHTMLElement$1(parent) || !isHTMLElement$1(child)) return false;
	const rootNode = child.getRootNode?.();
	if (parent === child) return true;
	if (parent.contains(child)) return true;
	if (rootNode && isShadowRoot(rootNode)) {
		let next = child;
		while (next) {
			if (parent === next) return true;
			next = next.parentNode || next.host;
		}
	}
	return false;
}
function getDocument(node) {
	if (isDocument(node)) return node;
	if (isWindow(node)) return node.document;
	return node?.ownerDocument ?? document;
}
function getActiveElement(rootNode) {
	let activeElement = rootNode.activeElement;
	while (activeElement?.shadowRoot) {
		const el = activeElement.shadowRoot.activeElement;
		if (el === activeElement) break;
		else activeElement = el;
	}
	return activeElement;
}
//#endregion
//#region node_modules/svelte-toolbelt/dist/utils/dom-context.svelte.js
var DOMContext = class {
	element;
	#root = derived(() => {
		if (!this.element.current) return document;
		return this.element.current.getRootNode() ?? document;
	});
	get root() {
		return this.#root();
	}
	set root($$value) {
		return this.#root($$value);
	}
	constructor(element) {
		if (typeof element === "function") this.element = boxWith(element);
		else this.element = element;
	}
	getDocument = () => {
		return getDocument(this.root);
	};
	getWindow = () => {
		return this.getDocument().defaultView ?? window;
	};
	getActiveElement = () => {
		return getActiveElement(this.root);
	};
	isActiveElement = (node) => {
		return node === this.getActiveElement();
	};
	getElementById(id) {
		return this.root.getElementById(id);
	}
	querySelector = (selector) => {
		if (!this.root) return null;
		return this.root.querySelector(selector);
	};
	querySelectorAll = (selector) => {
		if (!this.root) return [];
		return this.root.querySelectorAll(selector);
	};
	setTimeout = (callback, delay) => {
		return this.getWindow().setTimeout(callback, delay);
	};
	clearTimeout = (timeoutId) => {
		return this.getWindow().clearTimeout(timeoutId);
	};
};
if (typeof HTMLElement === "function");
//#endregion
//#region node_modules/svelte/src/attachments/index.js
/**
* Creates an object key that will be recognised as an attachment when the object is spread onto an element,
* as a programmatic alternative to using `{@attach ...}`. This can be useful for library authors, though
* is generally not needed when building an app.
*
* ```svelte
* <script>
* 	import { createAttachmentKey } from 'svelte/attachments';
*
* 	const props = {
* 		class: 'cool',
* 		onclick: () => alert('clicked'),
* 		[createAttachmentKey()]: (node) => {
* 			node.textContent = 'attached!';
* 		}
* 	};
* <\/script>
*
* <button {...props}>click me</button>
* ```
* @since 5.29
*/
function createAttachmentKey() {
	return Symbol(ATTACHMENT_KEY);
}
//#endregion
//#region node_modules/svelte-toolbelt/dist/utils/attach-ref.js
/**
* Creates a Svelte Attachment that attaches a DOM element to a ref.
* The ref can be either a WritableBox or a callback function.
*
* @param ref - Either a WritableBox to store the element in, or a callback function that receives the element
* @param onChange - Optional callback that fires when the ref changes
* @returns An object with a spreadable attachment key that should be spread onto the element
*
* @example
* // Using with WritableBox
* const ref = box<HTMLDivElement | null>(null);
* <div {...attachRef(ref)}>Content</div>
*
* @example
* // Using with callback
* <div {...attachRef((node) => myNode = node)}>Content</div>
*
* @example
* // Using with onChange
* <div {...attachRef(ref, (node) => console.log(node))}>Content</div>
*/
function attachRef(ref, onChange) {
	return { [createAttachmentKey()]: (node) => {
		if (isBox(ref)) {
			ref.current = node;
			run(() => onChange?.(node));
			return () => {
				if ("isConnected" in node && node.isConnected) return;
				ref.current = null;
				onChange?.(null);
			};
		}
		ref(node);
		run(() => onChange?.(node));
		return () => {
			if ("isConnected" in node && node.isConnected) return;
			ref(null);
			onChange?.(null);
		};
	} };
}
//#endregion
//#region node_modules/bits-ui/dist/internal/attrs.js
function boolToEmptyStrOrUndef(condition) {
	return condition ? "" : void 0;
}
function getDataOpenClosed(condition) {
	return condition ? "open" : "closed";
}
function getDataTransitionAttrs(state) {
	if (state === "starting") return { "data-starting-style": "" };
	if (state === "ending") return { "data-ending-style": "" };
	return {};
}
var BitsAttrs = class {
	#variant;
	#prefix;
	attrs;
	constructor(config) {
		this.#variant = config.getVariant ? config.getVariant() : null;
		this.#prefix = this.#variant ? `data-${this.#variant}-` : `data-${config.component}-`;
		this.getAttr = this.getAttr.bind(this);
		this.selector = this.selector.bind(this);
		this.attrs = Object.fromEntries(config.parts.map((part) => [part, this.getAttr(part)]));
	}
	getAttr(part, variantOverride) {
		if (variantOverride) return `data-${variantOverride}-${part}`;
		return `${this.#prefix}${part}`;
	}
	selector(part, variantOverride) {
		return `[${this.getAttr(part, variantOverride)}]`;
	}
};
function createBitsAttrs(config) {
	const bitsAttrs = new BitsAttrs(config);
	return {
		...bitsAttrs.attrs,
		selector: bitsAttrs.selector,
		getAttr: bitsAttrs.getAttr
	};
}
//#endregion
//#region node_modules/bits-ui/dist/internal/is.js
var isBrowser = typeof document !== "undefined";
var isIOS = getIsIOS();
function getIsIOS() {
	return isBrowser && window?.navigator?.userAgent && (/iP(ad|hone|od)/.test(window.navigator.userAgent) || window?.navigator?.maxTouchPoints > 2 && /iPad|Macintosh/.test(window?.navigator.userAgent));
}
function isHTMLElement(element) {
	return element instanceof HTMLElement;
}
function isElementOrSVGElement(element) {
	return element instanceof Element || element instanceof SVGElement;
}
//#endregion
//#region node_modules/bits-ui/dist/internal/animations-complete.js
var AnimationsComplete = class {
	#opts;
	#currentFrame = null;
	#observer = null;
	#runId = 0;
	constructor(opts) {
		this.#opts = opts;
	}
	#cleanup() {
		if (this.#currentFrame !== null) {
			window.cancelAnimationFrame(this.#currentFrame);
			this.#currentFrame = null;
		}
		this.#observer?.disconnect();
		this.#observer = null;
		this.#runId++;
	}
	run(fn) {
		this.#cleanup();
		const node = this.#opts.ref.current;
		if (!node) return;
		if (typeof node.getAnimations !== "function") {
			this.#executeCallback(fn);
			return;
		}
		const runId = this.#runId;
		const executeIfCurrent = () => {
			if (runId !== this.#runId) return;
			this.#executeCallback(fn);
		};
		const waitForAnimations = () => {
			if (runId !== this.#runId) return;
			const animations = node.getAnimations();
			if (animations.length === 0) {
				executeIfCurrent();
				return;
			}
			Promise.all(animations.map((animation) => animation.finished)).then(() => {
				executeIfCurrent();
			}).catch(() => {
				if (runId !== this.#runId) return;
				if (node.getAnimations().some((animation) => animation.pending || animation.playState !== "finished")) {
					waitForAnimations();
					return;
				}
				executeIfCurrent();
			});
		};
		const requestWaitForAnimations = () => {
			this.#currentFrame = window.requestAnimationFrame(() => {
				this.#currentFrame = null;
				waitForAnimations();
			});
		};
		if (!this.#opts.afterTick.current) {
			requestWaitForAnimations();
			return;
		}
		this.#currentFrame = window.requestAnimationFrame(() => {
			this.#currentFrame = null;
			const startingStyleAttr = "data-starting-style";
			if (!node.hasAttribute(startingStyleAttr)) {
				requestWaitForAnimations();
				return;
			}
			this.#observer = new MutationObserver(() => {
				if (runId !== this.#runId) return;
				if (node.hasAttribute(startingStyleAttr)) return;
				this.#observer?.disconnect();
				this.#observer = null;
				requestWaitForAnimations();
			});
			this.#observer.observe(node, {
				attributes: true,
				attributeFilter: [startingStyleAttr]
			});
		});
	}
	#executeCallback(fn) {
		const execute = () => {
			fn();
		};
		if (this.#opts.afterTick) afterTick(execute);
		else execute();
	}
};
//#endregion
//#region node_modules/bits-ui/dist/internal/presence-manager.svelte.js
var PresenceManager = class {
	#opts;
	#enabled;
	#afterAnimations;
	#shouldRender = false;
	#transitionStatus = void 0;
	#hasMounted = false;
	#transitionFrame = null;
	constructor(opts) {
		this.#opts = opts;
		this.#shouldRender = opts.open.current;
		this.#enabled = opts.enabled ?? true;
		this.#afterAnimations = new AnimationsComplete({
			ref: this.#opts.ref,
			afterTick: this.#opts.open
		});
		watch(() => this.#opts.open.current, (isOpen) => {
			if (!this.#hasMounted) {
				this.#hasMounted = true;
				return;
			}
			this.#clearTransitionFrame();
			if (!isOpen && this.#opts.shouldSkipExitAnimation?.()) {
				this.#shouldRender = false;
				this.#transitionStatus = void 0;
				this.#opts.onComplete?.();
				return;
			}
			if (isOpen) this.#shouldRender = true;
			this.#transitionStatus = isOpen ? "starting" : "ending";
			if (isOpen) this.#transitionFrame = window.requestAnimationFrame(() => {
				this.#transitionFrame = null;
				if (this.#opts.open.current) this.#transitionStatus = void 0;
			});
			if (!this.#enabled) {
				if (!isOpen) this.#shouldRender = false;
				this.#transitionStatus = void 0;
				this.#opts.onComplete?.();
				return;
			}
			this.#afterAnimations.run(() => {
				if (isOpen === this.#opts.open.current) {
					if (!this.#opts.open.current) this.#shouldRender = false;
					this.#transitionStatus = void 0;
					this.#opts.onComplete?.();
				}
			});
		});
	}
	get shouldRender() {
		return this.#shouldRender;
	}
	get transitionStatus() {
		return this.#transitionStatus;
	}
	#clearTransitionFrame() {
		if (this.#transitionFrame === null) return;
		window.cancelAnimationFrame(this.#transitionFrame);
		this.#transitionFrame = null;
	}
};
//#endregion
//#region node_modules/bits-ui/dist/internal/noop.js
/**
* A no operation function (does nothing)
*/
function noop() {}
//#endregion
//#region node_modules/bits-ui/dist/internal/create-id.js
function createId(prefixOrUid, uid) {
	if (uid === void 0) return `bits-${prefixOrUid}`;
	return `bits-${prefixOrUid}-${uid}`;
}
//#endregion
//#region node_modules/bits-ui/dist/bits/dialog/dialog.svelte.js
var dialogAttrs = createBitsAttrs({
	component: "dialog",
	parts: [
		"content",
		"trigger",
		"overlay",
		"title",
		"description",
		"close",
		"cancel",
		"action"
	]
});
var DialogRootContext = new Context("Dialog.Root | AlertDialog.Root");
var DialogRootState = class DialogRootState {
	static create(opts) {
		const parent = DialogRootContext.getOr(null);
		return DialogRootContext.set(new DialogRootState(opts, parent));
	}
	opts;
	triggerNode = null;
	contentNode = null;
	overlayNode = null;
	descriptionNode = null;
	contentId = void 0;
	titleId = void 0;
	triggerId = void 0;
	descriptionId = void 0;
	cancelNode = null;
	nestedOpenCount = 0;
	depth;
	parent;
	contentPresence;
	overlayPresence;
	constructor(opts, parent) {
		this.opts = opts;
		this.parent = parent;
		this.depth = parent ? parent.depth + 1 : 0;
		this.handleOpen = this.handleOpen.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.contentPresence = new PresenceManager({
			ref: boxWith(() => this.contentNode),
			open: this.opts.open,
			enabled: true,
			onComplete: () => {
				this.opts.onOpenChangeComplete.current(this.opts.open.current);
			}
		});
		this.overlayPresence = new PresenceManager({
			ref: boxWith(() => this.overlayNode),
			open: this.opts.open,
			enabled: true
		});
		watch(() => this.opts.open.current, (isOpen) => {
			if (!this.parent) return;
			if (isOpen) this.parent.incrementNested();
			else this.parent.decrementNested();
		}, { lazy: true });
	}
	handleOpen() {
		if (this.opts.open.current) return;
		this.opts.open.current = true;
	}
	handleClose() {
		if (!this.opts.open.current) return;
		this.opts.open.current = false;
	}
	getBitsAttr = (part) => {
		return dialogAttrs.getAttr(part, this.opts.variant.current);
	};
	incrementNested() {
		this.nestedOpenCount++;
		this.parent?.incrementNested();
	}
	decrementNested() {
		if (this.nestedOpenCount === 0) return;
		this.nestedOpenCount--;
		this.parent?.decrementNested();
	}
	#sharedProps = derived(() => ({ "data-state": getDataOpenClosed(this.opts.open.current) }));
	get sharedProps() {
		return this.#sharedProps();
	}
	set sharedProps($$value) {
		return this.#sharedProps($$value);
	}
};
var DialogCloseState = class DialogCloseState {
	static create(opts) {
		return new DialogCloseState(opts, DialogRootContext.get());
	}
	opts;
	root;
	attachment;
	constructor(opts, root) {
		this.opts = opts;
		this.root = root;
		this.attachment = attachRef(this.opts.ref);
		this.onclick = this.onclick.bind(this);
		this.onkeydown = this.onkeydown.bind(this);
	}
	onclick(e) {
		if (this.opts.disabled.current) return;
		if (e.button > 0) return;
		this.root.handleClose();
	}
	onkeydown(e) {
		if (this.opts.disabled.current) return;
		if (e.key === " " || e.key === "Enter") {
			e.preventDefault();
			this.root.handleClose();
		}
	}
	#props = derived(() => ({
		id: this.opts.id.current,
		[this.root.getBitsAttr(this.opts.variant.current)]: "",
		onclick: this.onclick,
		onkeydown: this.onkeydown,
		disabled: this.opts.disabled.current ? true : void 0,
		tabindex: 0,
		...this.root.sharedProps,
		...this.attachment
	}));
	get props() {
		return this.#props();
	}
	set props($$value) {
		return this.#props($$value);
	}
};
var DialogTitleState = class DialogTitleState {
	static create(opts) {
		return new DialogTitleState(opts, DialogRootContext.get());
	}
	opts;
	root;
	attachment;
	constructor(opts, root) {
		this.opts = opts;
		this.root = root;
		this.root.titleId = this.opts.id.current;
		this.attachment = attachRef(this.opts.ref);
		watch.pre(() => this.opts.id.current, (id) => {
			this.root.titleId = id;
		});
	}
	#props = derived(() => ({
		id: this.opts.id.current,
		role: "heading",
		"aria-level": this.opts.level.current,
		[this.root.getBitsAttr("title")]: "",
		...this.root.sharedProps,
		...this.attachment
	}));
	get props() {
		return this.#props();
	}
	set props($$value) {
		return this.#props($$value);
	}
};
var DialogDescriptionState = class DialogDescriptionState {
	static create(opts) {
		return new DialogDescriptionState(opts, DialogRootContext.get());
	}
	opts;
	root;
	attachment;
	constructor(opts, root) {
		this.opts = opts;
		this.root = root;
		this.root.descriptionId = this.opts.id.current;
		this.attachment = attachRef(this.opts.ref, (v) => {
			this.root.descriptionNode = v;
		});
		watch.pre(() => this.opts.id.current, (id) => {
			this.root.descriptionId = id;
		});
	}
	#props = derived(() => ({
		id: this.opts.id.current,
		[this.root.getBitsAttr("description")]: "",
		...this.root.sharedProps,
		...this.attachment
	}));
	get props() {
		return this.#props();
	}
	set props($$value) {
		return this.#props($$value);
	}
};
var DialogContentState = class DialogContentState {
	static create(opts) {
		return new DialogContentState(opts, DialogRootContext.get());
	}
	opts;
	root;
	attachment;
	constructor(opts, root) {
		this.opts = opts;
		this.root = root;
		this.attachment = attachRef(this.opts.ref, (v) => {
			this.root.contentNode = v;
			this.root.contentId = v?.id;
		});
	}
	#snippetProps = derived(() => ({ open: this.root.opts.open.current }));
	get snippetProps() {
		return this.#snippetProps();
	}
	set snippetProps($$value) {
		return this.#snippetProps($$value);
	}
	#props = derived(() => ({
		id: this.opts.id.current,
		role: this.root.opts.variant.current === "alert-dialog" ? "alertdialog" : "dialog",
		"aria-modal": "true",
		"aria-describedby": this.root.descriptionId,
		"aria-labelledby": this.root.titleId,
		[this.root.getBitsAttr("content")]: "",
		style: {
			pointerEvents: "auto",
			outline: this.root.opts.variant.current === "alert-dialog" ? "none" : void 0,
			"--bits-dialog-depth": this.root.depth,
			"--bits-dialog-nested-count": this.root.nestedOpenCount,
			contain: "layout style"
		},
		tabindex: this.root.opts.variant.current === "alert-dialog" ? -1 : void 0,
		"data-nested-open": boolToEmptyStrOrUndef(this.root.nestedOpenCount > 0),
		"data-nested": boolToEmptyStrOrUndef(this.root.parent !== null),
		...getDataTransitionAttrs(this.root.contentPresence.transitionStatus),
		...this.root.sharedProps,
		...this.attachment
	}));
	get props() {
		return this.#props();
	}
	set props($$value) {
		return this.#props($$value);
	}
	get shouldRender() {
		return this.root.contentPresence.shouldRender;
	}
};
var DialogOverlayState = class DialogOverlayState {
	static create(opts) {
		return new DialogOverlayState(opts, DialogRootContext.get());
	}
	opts;
	root;
	attachment;
	constructor(opts, root) {
		this.opts = opts;
		this.root = root;
		this.attachment = attachRef(this.opts.ref, (v) => this.root.overlayNode = v);
	}
	#snippetProps = derived(() => ({ open: this.root.opts.open.current }));
	get snippetProps() {
		return this.#snippetProps();
	}
	set snippetProps($$value) {
		return this.#snippetProps($$value);
	}
	#props = derived(() => ({
		id: this.opts.id.current,
		[this.root.getBitsAttr("overlay")]: "",
		style: {
			pointerEvents: "auto",
			"--bits-dialog-depth": this.root.depth,
			"--bits-dialog-nested-count": this.root.nestedOpenCount
		},
		"data-nested-open": boolToEmptyStrOrUndef(this.root.nestedOpenCount > 0),
		"data-nested": boolToEmptyStrOrUndef(this.root.parent !== null),
		...getDataTransitionAttrs(this.root.overlayPresence.transitionStatus),
		...this.root.sharedProps,
		...this.attachment
	}));
	get props() {
		return this.#props();
	}
	set props($$value) {
		return this.#props($$value);
	}
	get shouldRender() {
		return this.root.overlayPresence.shouldRender;
	}
};
//#endregion
//#region node_modules/bits-ui/dist/bits/dialog/components/dialog-title.svelte
function Dialog_title$1($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const uid = props_id($$renderer);
		let { id = createId(uid), ref = null, child, children, level = 2, $$slots, $$events, ...restProps } = $$props;
		const titleState = DialogTitleState.create({
			id: boxWith(() => id),
			level: boxWith(() => level),
			ref: boxWith(() => ref, (v) => ref = v)
		});
		const mergedProps = derived(() => mergeProps(restProps, titleState.props));
		if (child) {
			$$renderer.push("<!--[0-->");
			child($$renderer, { props: mergedProps() });
			$$renderer.push(`<!---->`);
		} else {
			$$renderer.push(`<!--[-1--><div${attributes({ ...mergedProps() })}>`);
			children?.($$renderer);
			$$renderer.push(`<!----></div>`);
		}
		$$renderer.push(`<!--]-->`);
		bind_props($$props, { ref });
	});
}
//#endregion
//#region node_modules/bits-ui/dist/bits/utilities/portal/portal-consumer.svelte
function Portal_consumer($$renderer, $$props) {
	const { children } = $$props;
	$$renderer.push(`<!---->`);
	children?.($$renderer);
	$$renderer.push(`<!---->`);
	$$renderer.push(`<!---->`);
}
//#endregion
//#region node_modules/bits-ui/dist/bits/utilities/config/bits-config.js
var BitsConfigContext = new Context("BitsConfig");
/**
* Gets the current Bits UI configuration state from the context.
*
* Returns a default configuration (where all values are `undefined`) if no configuration is found.
*/
function getBitsConfig() {
	const fallback = new BitsConfigState(null, {});
	return BitsConfigContext.getOr(fallback).opts;
}
/**
* Configuration state that inherits from parent configurations.
*
* @example
* Config resolution:
* ```
* Level 1: { defaultPortalTo: "#some-element", theme: "dark" }
* Level 2: { spacing: "large" } // inherits defaultPortalTo="#some-element", theme="dark"
* Level 3: { theme: "light" }   // inherits defaultPortalTo="#some-element", spacing="large", overrides theme="light"
* ```
*/
var BitsConfigState = class {
	opts;
	constructor(parent, opts) {
		const resolveConfigOption = createConfigResolver(parent, opts);
		this.opts = {
			defaultPortalTo: resolveConfigOption((config) => config.defaultPortalTo),
			defaultLocale: resolveConfigOption((config) => config.defaultLocale)
		};
	}
};
/**
* Returns a config resolver that resolves a given config option's value.
*
* The resolver creates reactive boxes that resolve config option values using this priority:
* 1. Current level's value (if defined)
* 2. Parent level's value (if defined and current is undefined)
* 3. `undefined` (if no value is found in either parent or child)
*
* @param parent - Parent configuration state (null if this is root level)
* @param currentOpts - Current level's configuration options
*
* @example
* ```typescript
* // Given this hierarchy:
* // Root: { defaultPortalTo: "#some-element" }
* // Child: { someOtherProp: "value" } // no defaultPortalTo specified
*
* const resolveConfigOption = createConfigResolver(parent, opts);
* const portalTo = resolveConfigOption(config => config.defaultPortalTo);
*
* // portalTo.current === "#some-element" (inherited from parent)
* // even when child didn't specify `defaultPortalTo`
* ```
*/
function createConfigResolver(parent, currentOpts) {
	return (getter) => {
		return boxWith(() => {
			const value = getter(currentOpts)?.current;
			if (value !== void 0) return value;
			if (parent === null) return void 0;
			return getter(parent.opts)?.current;
		});
	};
}
//#endregion
//#region node_modules/bits-ui/dist/bits/utilities/config/prop-resolvers.js
/**
* Creates a generic prop resolver that follows a standard priority chain:
* 1. The getter's prop value (if defined)
* 2. The config default value (if no getter prop value is defined)
* 3. The fallback value (if no config value found)
*/
function createPropResolver(configOption, fallback) {
	return (getProp) => {
		const config = getBitsConfig();
		return boxWith(() => {
			const propValue = getProp();
			if (propValue !== void 0) return propValue;
			const option = configOption(config).current;
			if (option !== void 0) return option;
			return fallback;
		});
	};
}
/**
* Resolves a portal's `to` value using the prop, the config default, or a fallback.
*
* Default value: `"body"`
*/
var resolvePortalToProp = createPropResolver((config) => config.defaultPortalTo, "body");
//#endregion
//#region node_modules/bits-ui/dist/bits/utilities/portal/portal.svelte
function Portal($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { to: toProp, children, disabled } = $$props;
		const to = resolvePortalToProp(() => toProp);
		const context = getAllContexts();
		let target = derived(getTarget);
		function getTarget() {
			if (!isBrowser || disabled) return null;
			let localTarget = null;
			if (typeof to.current === "string") localTarget = document.querySelector(to.current);
			else localTarget = to.current;
			return localTarget;
		}
		let instance;
		function unmountInstance() {
			if (instance) {
				unmount(instance);
				instance = null;
			}
		}
		watch([() => target(), () => disabled], ([target, disabled]) => {
			if (!target || disabled) {
				unmountInstance();
				return;
			}
			instance = mount(Portal_consumer, {
				target,
				props: { children },
				context
			});
			return () => {
				unmountInstance();
			};
		});
		if (disabled) {
			$$renderer.push("<!--[0-->");
			children?.($$renderer);
			$$renderer.push(`<!---->`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]-->`);
	});
}
//#endregion
//#region node_modules/bits-ui/dist/internal/events.js
/**
* Creates a typed event dispatcher and listener pair for custom events
* @template T - The type of data that will be passed in the event detail
* @param eventName - The name of the custom event
* @param options - CustomEvent options (bubbles, cancelable, etc.)
*/
var CustomEventDispatcher = class {
	eventName;
	options;
	constructor(eventName, options = {
		bubbles: true,
		cancelable: true
	}) {
		this.eventName = eventName;
		this.options = options;
	}
	createEvent(detail) {
		return new CustomEvent(this.eventName, {
			...this.options,
			detail
		});
	}
	dispatch(element, detail) {
		const event = this.createEvent(detail);
		element.dispatchEvent(event);
		return event;
	}
	listen(element, callback, options) {
		const handler = (event) => {
			callback(event);
		};
		return on(element, this.eventName, handler, options);
	}
};
//#endregion
//#region node_modules/bits-ui/dist/internal/debounce.js
function debounce(fn, wait = 500) {
	let timeout = null;
	const debounced = (...args) => {
		if (timeout !== null) clearTimeout(timeout);
		timeout = setTimeout(() => {
			fn(...args);
		}, wait);
	};
	debounced.destroy = () => {
		if (timeout !== null) {
			clearTimeout(timeout);
			timeout = null;
		}
	};
	return debounced;
}
//#endregion
//#region node_modules/bits-ui/dist/internal/elements.js
function isOrContainsTarget(node, target) {
	return node === target || node.contains(target);
}
function getOwnerDocument(el) {
	return el?.ownerDocument ?? document;
}
//#endregion
//#region node_modules/bits-ui/dist/internal/dom.js
/**
* Determines if the click event truly occurred outside the content node.
* This was added to handle password managers and other elements that may be injected
* into the DOM but visually appear inside the content.
*/
function isClickTrulyOutside(event, contentNode) {
	const { clientX, clientY } = event;
	const rect = contentNode.getBoundingClientRect();
	return clientX < rect.left || clientX > rect.right || clientY < rect.top || clientY > rect.bottom;
}
//#endregion
//#region node_modules/bits-ui/dist/bits/menu/menu.svelte.js
var CONTEXT_MENU_TRIGGER_ATTR = "data-context-menu-trigger";
var CONTEXT_MENU_CONTENT_ATTR = "data-context-menu-content";
new Context("Menu.Root");
new Context("Menu.Root | Menu.Sub");
new Context("Menu.Content");
new Context("Menu.Group | Menu.RadioGroup");
new Context("Menu.RadioGroup");
new Context("Menu.CheckboxGroup");
new CustomEventDispatcher("bitsmenuopen", {
	bubbles: false,
	cancelable: true
});
createBitsAttrs({
	component: "menu",
	parts: [
		"trigger",
		"content",
		"sub-trigger",
		"item",
		"group",
		"group-heading",
		"checkbox-group",
		"checkbox-item",
		"radio-group",
		"radio-item",
		"separator",
		"sub-content",
		"arrow"
	]
});
//#endregion
//#region node_modules/bits-ui/dist/bits/utilities/dismissible-layer/use-dismissable-layer.svelte.js
globalThis.bitsDismissableLayers ??= /* @__PURE__ */ new Map();
var DismissibleLayerState = class DismissibleLayerState {
	static create(opts) {
		return new DismissibleLayerState(opts);
	}
	opts;
	#interactOutsideProp;
	#behaviorType;
	#interceptedEvents = { pointerdown: false };
	#isResponsibleLayer = false;
	#isFocusInsideDOMTree = false;
	#documentObj = void 0;
	#onFocusOutside;
	#unsubClickListener = noop;
	/**
	* Set once the layer is torn down. Deferred work scheduled before teardown can
	* still run afterwards, so every such callback must short-circuit on this
	* before reading `this.opts.ref.current` — reading a destroyed `$derived`
	* triggers Svelte's `derived_inert` warning. A class field rather than a
	* constructor local so the class-field handlers below can see it too.
	*/
	#destroyed = false;
	constructor(opts) {
		this.opts = opts;
		this.#behaviorType = opts.interactOutsideBehavior;
		this.#interactOutsideProp = opts.onInteractOutside;
		this.#onFocusOutside = opts.onFocusOutside;
		let unsubEvents = noop;
		let pendingTimer = null;
		const clearPendingTimer = () => {
			if (pendingTimer != null) {
				clearTimeout(pendingTimer);
				pendingTimer = null;
			}
		};
		const cleanup = () => {
			clearPendingTimer();
			this.#resetState();
			globalThis.bitsDismissableLayers.delete(this);
			this.#handleInteractOutside.destroy();
			unsubEvents();
		};
		watch([() => this.opts.enabled.current, () => this.opts.ref.current], () => {
			if (!this.opts.enabled.current || !this.opts.ref.current) return;
			clearPendingTimer();
			pendingTimer = afterSleep(1, () => {
				pendingTimer = null;
				if (this.#destroyed || !this.opts.ref.current) return;
				globalThis.bitsDismissableLayers.set(this, this.#behaviorType);
				unsubEvents();
				unsubEvents = this.#addEventListeners();
			});
			return cleanup;
		});
	}
	#handleFocus = (event) => {
		if (event.defaultPrevented) return;
		if (this.#destroyed || !this.opts.ref.current) return;
		afterTick(() => {
			if (this.#destroyed) return;
			if (!this.opts.ref.current || this.#isTargetWithinLayer(event.target)) return;
			if (event.target && !this.#isFocusInsideDOMTree) this.#onFocusOutside.current?.(event);
		});
	};
	#addEventListeners() {
		return executeCallbacks(
			/**
			* CAPTURE INTERACTION START
			* mark interaction-start event as intercepted.
			* mark responsible layer during interaction start
			* to avoid checking if is responsible layer during interaction end
			* when a new floating element may have been opened.
			*/
			on(this.#documentObj, "pointerdown", executeCallbacks(this.#markInterceptedEvent, this.#markResponsibleLayer), { capture: true }),
			/**
			* BUBBLE INTERACTION START
			* Mark interaction-start event as non-intercepted. Debounce `onInteractOutsideStart`
			* to avoid prematurely checking if other events were intercepted.
			*/
			on(this.#documentObj, "pointerdown", executeCallbacks(this.#markNonInterceptedEvent, this.#handleInteractOutside)),
			/**
			* HANDLE FOCUS OUTSIDE
			*/
			on(this.#documentObj, "focusin", this.#handleFocus)
		);
	}
	#handleDismiss = (e) => {
		let event = e;
		if (event.defaultPrevented) event = createWrappedEvent(e);
		this.#interactOutsideProp.current(e);
	};
	#handleInteractOutside = debounce((e) => {
		if (!this.opts.ref.current) {
			this.#unsubClickListener();
			return;
		}
		const isEventValid = this.opts.isValidEvent.current(e, this.opts.ref.current) || isValidEvent(e, this.opts.ref.current);
		if (!this.#isResponsibleLayer || this.#isAnyEventIntercepted() || !isEventValid) {
			this.#unsubClickListener();
			return;
		}
		let event = e;
		if (event.defaultPrevented) event = createWrappedEvent(event);
		if (this.#behaviorType.current !== "close" && this.#behaviorType.current !== "defer-otherwise-close") {
			this.#unsubClickListener();
			return;
		}
		if (e.pointerType === "touch") {
			this.#unsubClickListener();
			this.#unsubClickListener = on(this.#documentObj, "click", this.#handleDismiss, { once: true });
		} else this.#interactOutsideProp.current(event);
	}, 10);
	#markInterceptedEvent = (e) => {
		this.#interceptedEvents[e.type] = true;
	};
	#markNonInterceptedEvent = (e) => {
		this.#interceptedEvents[e.type] = false;
	};
	#markResponsibleLayer = () => {
		if (!this.opts.ref.current) return;
		this.#isResponsibleLayer = isResponsibleLayer(this.opts.ref.current);
	};
	#isTargetWithinLayer = (target) => {
		if (!this.opts.ref.current) return false;
		return isOrContainsTarget(this.opts.ref.current, target);
	};
	/**
	* Resets the per-interaction state. Must stay synchronous.
	*
	* This was a `debounce(..., 20)` from when it was also wired to a capture-phase
	* interaction-end listener and had to land after the 10ms `#handleInteractOutside`
	* debounce. That listener is gone, but the debounce stayed on the `cleanup()` path —
	* and because `watch` runs `cleanup()` once per open (`ref` goes null -> node), every
	* layer scheduled a reset 20ms into its own lifetime. An outside `pointerdown` landing
	* 10-20ms after that cleanup would have its `#isResponsibleLayer` flag cleared by the
	* stale reset in the gap before the debounced `#handleInteractOutside` ran, which then
	* bailed and left the layer open. `cleanup()` destroys `#handleInteractOutside` anyway,
	* so nothing is left in flight that needs to observe the pre-reset state.
	*/
	#resetState = () => {
		for (const eventType in this.#interceptedEvents) this.#interceptedEvents[eventType] = false;
		this.#isResponsibleLayer = false;
	};
	#isAnyEventIntercepted() {
		return Object.values(this.#interceptedEvents).some(Boolean);
	}
	#onfocuscapture = () => {
		this.#isFocusInsideDOMTree = true;
	};
	#onblurcapture = () => {
		this.#isFocusInsideDOMTree = false;
	};
	props = {
		onfocuscapture: this.#onfocuscapture,
		onblurcapture: this.#onblurcapture
	};
};
function getTopMostDismissableLayer(layersArr = [...globalThis.bitsDismissableLayers]) {
	return layersArr.findLast(([_, { current: behaviorType }]) => behaviorType === "close" || behaviorType === "ignore");
}
function isResponsibleLayer(node) {
	const layersArr = [...globalThis.bitsDismissableLayers];
	/**
	* We first check if we can find a top layer with `close` or `ignore`.
	* If that top layer was found and matches the provided node, then the node is
	* responsible for the outside interaction. Otherwise, we know that all layers defer so
	* the first layer is the responsible one.
	*/
	const topMostLayer = getTopMostDismissableLayer(layersArr);
	if (topMostLayer) return topMostLayer[0].opts.ref.current === node;
	const [firstLayerNode] = layersArr[0];
	return firstLayerNode.opts.ref.current === node;
}
function isValidEvent(e, node) {
	const target = e.target;
	if (!isElementOrSVGElement(target)) return false;
	const targetIsContextMenuTrigger = Boolean(target.closest(`[${CONTEXT_MENU_TRIGGER_ATTR}]`));
	const nodeIsContextMenu = Boolean(node.closest(`[${CONTEXT_MENU_CONTENT_ATTR}]`));
	if ("button" in e && e.button > 0 && !targetIsContextMenuTrigger) return false;
	if ("button" in e && e.button === 0 && targetIsContextMenuTrigger && nodeIsContextMenu) return true;
	if (targetIsContextMenuTrigger && nodeIsContextMenu) return false;
	return getOwnerDocument(target).documentElement.contains(target) && !isOrContainsTarget(node, target) && isClickTrulyOutside(e, node);
}
function createWrappedEvent(e) {
	const capturedCurrentTarget = e.currentTarget;
	const capturedTarget = e.target;
	let newEvent;
	if (e instanceof PointerEvent) newEvent = new PointerEvent(e.type, e);
	else newEvent = new PointerEvent("pointerdown", e);
	let isPrevented = false;
	return new Proxy(newEvent, { get: (target, prop) => {
		if (prop === "currentTarget") return capturedCurrentTarget;
		if (prop === "target") return capturedTarget;
		if (prop === "preventDefault") return () => {
			isPrevented = true;
			if (typeof target.preventDefault === "function") target.preventDefault();
		};
		if (prop === "defaultPrevented") return isPrevented;
		if (prop in target) return target[prop];
		return e[prop];
	} });
}
//#endregion
//#region node_modules/bits-ui/dist/bits/utilities/dismissible-layer/dismissible-layer.svelte
function Dismissible_layer($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { interactOutsideBehavior = "close", onInteractOutside = noop, onFocusOutside = noop, id, children, enabled, isValidEvent = () => false, ref } = $$props;
		const dismissibleLayerState = DismissibleLayerState.create({
			id: boxWith(() => id),
			interactOutsideBehavior: boxWith(() => interactOutsideBehavior),
			onInteractOutside: boxWith(() => onInteractOutside),
			enabled: boxWith(() => enabled),
			onFocusOutside: boxWith(() => onFocusOutside),
			isValidEvent: boxWith(() => isValidEvent),
			ref
		});
		children?.($$renderer, { props: dismissibleLayerState.props });
		$$renderer.push(`<!---->`);
	});
}
//#endregion
//#region node_modules/bits-ui/dist/bits/utilities/escape-layer/use-escape-layer.svelte.js
globalThis.bitsEscapeLayers ??= /* @__PURE__ */ new Map();
var EscapeLayerState = class EscapeLayerState {
	static create(opts) {
		return new EscapeLayerState(opts);
	}
	opts;
	domContext;
	constructor(opts) {
		this.opts = opts;
		this.domContext = new DOMContext(this.opts.ref);
		let unsubEvents = noop;
		watch(() => opts.enabled.current, (enabled) => {
			if (enabled) {
				globalThis.bitsEscapeLayers.set(this, opts.escapeKeydownBehavior);
				unsubEvents = this.#addEventListener();
			}
			return () => {
				unsubEvents();
				globalThis.bitsEscapeLayers.delete(this);
			};
		});
	}
	#addEventListener = () => {
		return on(this.domContext.getDocument(), "keydown", this.#onkeydown, { passive: false });
	};
	#onkeydown = (e) => {
		if (e.key !== "Escape" || !isResponsibleEscapeLayer(this)) return;
		const clonedEvent = new KeyboardEvent(e.type, e);
		e.preventDefault();
		const behaviorType = this.opts.escapeKeydownBehavior.current;
		if (behaviorType !== "close" && behaviorType !== "defer-otherwise-close") return;
		this.opts.onEscapeKeydown.current(clonedEvent);
	};
};
function isResponsibleEscapeLayer(instance) {
	const layersArr = [...globalThis.bitsEscapeLayers];
	/**
	* We first check if we can find a top layer with `close` or `ignore`.
	* If that top layer was found and matches the provided node, then the node is
	* responsible for the escape. Otherwise, we know that all layers defer so
	* the first layer is the responsible one.
	*/
	const topMostLayer = layersArr.findLast(([_, { current: behaviorType }]) => behaviorType === "close" || behaviorType === "ignore");
	if (topMostLayer) return topMostLayer[0] === instance;
	const [firstLayerNode] = layersArr[0];
	return firstLayerNode === instance;
}
//#endregion
//#region node_modules/bits-ui/dist/bits/utilities/escape-layer/escape-layer.svelte
function Escape_layer($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { escapeKeydownBehavior = "close", onEscapeKeydown = noop, children, enabled, ref } = $$props;
		EscapeLayerState.create({
			escapeKeydownBehavior: boxWith(() => escapeKeydownBehavior),
			onEscapeKeydown: boxWith(() => onEscapeKeydown),
			enabled: boxWith(() => enabled),
			ref
		});
		children?.($$renderer);
		$$renderer.push(`<!---->`);
	});
}
//#endregion
//#region node_modules/bits-ui/dist/bits/utilities/focus-scope/focus-scope-manager.js
var FocusScopeManager = class FocusScopeManager {
	static instance;
	#scopeStack = simpleBox([]);
	#focusHistory = /* @__PURE__ */ new WeakMap();
	#preFocusHistory = /* @__PURE__ */ new WeakMap();
	static getInstance() {
		if (!this.instance) this.instance = new FocusScopeManager();
		return this.instance;
	}
	register(scope) {
		const current = this.getActive();
		if (current && current !== scope) current.pause();
		const activeElement = document.activeElement;
		if (activeElement && activeElement !== document.body) this.#preFocusHistory.set(scope, activeElement);
		this.#scopeStack.current = this.#scopeStack.current.filter((s) => s !== scope);
		this.#scopeStack.current.unshift(scope);
	}
	unregister(scope) {
		this.#scopeStack.current = this.#scopeStack.current.filter((s) => s !== scope);
		const next = this.getActive();
		if (next) next.resume();
	}
	getActive() {
		return this.#scopeStack.current[0];
	}
	setFocusMemory(scope, element) {
		this.#focusHistory.set(scope, element);
	}
	getFocusMemory(scope) {
		return this.#focusHistory.get(scope);
	}
	isActiveScope(scope) {
		return this.getActive() === scope;
	}
	setPreFocusMemory(scope, element) {
		this.#preFocusHistory.set(scope, element);
	}
	getPreFocusMemory(scope) {
		return this.#preFocusHistory.get(scope);
	}
	clearPreFocusMemory(scope) {
		this.#preFocusHistory.delete(scope);
	}
};
//#endregion
//#region node_modules/bits-ui/dist/bits/utilities/focus-scope/focus-scope.svelte.js
var FocusScope = class FocusScope {
	#paused = false;
	#container = null;
	#manager = FocusScopeManager.getInstance();
	#cleanupFns = [];
	#opts;
	constructor(opts) {
		this.#opts = opts;
	}
	get paused() {
		return this.#paused;
	}
	pause() {
		this.#paused = true;
	}
	resume() {
		this.#paused = false;
	}
	#cleanup() {
		for (const fn of this.#cleanupFns) fn();
		this.#cleanupFns = [];
	}
	mount(container) {
		if (this.#container) this.unmount();
		this.#container = container;
		this.#manager.register(this);
		this.#setupEventListeners();
		this.#handleOpenAutoFocus();
	}
	unmount() {
		if (!this.#container) return;
		this.#cleanup();
		this.#handleCloseAutoFocus();
		this.#manager.unregister(this);
		this.#manager.clearPreFocusMemory(this);
		this.#container = null;
	}
	#handleOpenAutoFocus() {
		if (!this.#container) return;
		const event = new CustomEvent("focusScope.onOpenAutoFocus", {
			bubbles: false,
			cancelable: true
		});
		this.#opts.onOpenAutoFocus.current(event);
		if (!event.defaultPrevented) requestAnimationFrame(() => {
			if (!this.#container) return;
			const firstTabbable = this.#getFirstTabbable();
			if (firstTabbable) {
				firstTabbable.focus();
				this.#manager.setFocusMemory(this, firstTabbable);
			} else this.#container.focus();
		});
	}
	#handleCloseAutoFocus() {
		const event = new CustomEvent("focusScope.onCloseAutoFocus", {
			bubbles: false,
			cancelable: true
		});
		this.#opts.onCloseAutoFocus.current?.(event);
		if (!event.defaultPrevented) {
			const preFocusedElement = this.#manager.getPreFocusMemory(this);
			if (preFocusedElement && document.contains(preFocusedElement)) try {
				preFocusedElement.focus();
			} catch {
				document.body.focus();
			}
		}
	}
	#setupEventListeners() {
		if (!this.#container || !this.#opts.trap.current) return;
		const container = this.#container;
		const doc = container.ownerDocument;
		const handleFocus = (e) => {
			if (this.#paused || !this.#manager.isActiveScope(this)) return;
			const target = e.target;
			if (!target) return;
			if (container.contains(target)) this.#manager.setFocusMemory(this, target);
			else {
				const lastFocused = this.#manager.getFocusMemory(this);
				if (lastFocused && container.contains(lastFocused) && isFocusable(lastFocused)) {
					e.preventDefault();
					lastFocused.focus();
				} else {
					const firstTabbable = this.#getFirstTabbable();
					const firstFocusable = this.#getAllFocusables()[0];
					(firstTabbable || firstFocusable || container).focus();
				}
			}
		};
		const handleKeydown = (e) => {
			if (!this.#opts.loop || this.#paused || e.key !== "Tab") return;
			if (!this.#manager.isActiveScope(this)) return;
			const tabbables = this.#getTabbables();
			if (tabbables.length === 0) return;
			const first = tabbables[0];
			const last = tabbables[tabbables.length - 1];
			if (!e.shiftKey && doc.activeElement === last) {
				e.preventDefault();
				first.focus();
			} else if (e.shiftKey && doc.activeElement === first) {
				e.preventDefault();
				last.focus();
			}
		};
		this.#cleanupFns.push(on(doc, "focusin", handleFocus, { capture: true }), on(container, "keydown", handleKeydown));
		const observer = new MutationObserver(() => {
			const lastFocused = this.#manager.getFocusMemory(this);
			if (lastFocused && !container.contains(lastFocused)) {
				const firstTabbable = this.#getFirstTabbable();
				const firstFocusable = this.#getAllFocusables()[0];
				const elementToFocus = firstTabbable || firstFocusable;
				if (elementToFocus) {
					elementToFocus.focus();
					this.#manager.setFocusMemory(this, elementToFocus);
				} else container.focus();
			}
		});
		observer.observe(container, {
			childList: true,
			subtree: true
		});
		this.#cleanupFns.push(() => observer.disconnect());
	}
	#getTabbables() {
		if (!this.#container) return [];
		return tabbable(this.#container, {
			includeContainer: false,
			getShadowRoot: true
		});
	}
	#getFirstTabbable() {
		return this.#getTabbables()[0] || null;
	}
	#getAllFocusables() {
		if (!this.#container) return [];
		return focusable(this.#container, {
			includeContainer: false,
			getShadowRoot: true
		});
	}
	static use(opts) {
		let scope = null;
		watch([() => opts.ref.current, () => opts.enabled.current], ([ref, enabled]) => {
			if (ref && enabled) {
				if (!scope) scope = new FocusScope(opts);
				scope.mount(ref);
			} else if (scope) {
				scope.unmount();
				scope = null;
			}
		});
		return { get props() {
			return { tabindex: -1 };
		} };
	}
};
//#endregion
//#region node_modules/bits-ui/dist/bits/utilities/focus-scope/focus-scope.svelte
function Focus_scope($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { enabled = false, trapFocus = false, loop = false, onCloseAutoFocus = noop, onOpenAutoFocus = noop, focusScope, ref } = $$props;
		const focusScopeState = FocusScope.use({
			enabled: boxWith(() => enabled),
			trap: boxWith(() => trapFocus),
			loop,
			onCloseAutoFocus: boxWith(() => onCloseAutoFocus),
			onOpenAutoFocus: boxWith(() => onOpenAutoFocus),
			ref
		});
		focusScope?.($$renderer, { props: focusScopeState.props });
		$$renderer.push(`<!---->`);
	});
}
//#endregion
//#region node_modules/bits-ui/dist/bits/utilities/text-selection-layer/use-text-selection-layer.svelte.js
var noopPointer = () => {};
globalThis.bitsTextSelectionLayers ??= /* @__PURE__ */ new Map();
var TextSelectionLayerState = class TextSelectionLayerState {
	static create(opts) {
		return new TextSelectionLayerState(opts);
	}
	opts;
	domContext;
	#unsubSelectionLock = noop;
	#enabledSnapshot = false;
	#onPointerDownSnapshot = noopPointer;
	#onPointerUpSnapshot = noopPointer;
	constructor(opts) {
		this.opts = opts;
		this.domContext = new DOMContext(opts.ref);
		let unsubEvents = noop;
		watch(() => [
			this.opts.enabled.current,
			this.opts.onPointerDown.current,
			this.opts.onPointerUp.current
		], ([enabled, onPointerDown, onPointerUp]) => {
			this.#enabledSnapshot = enabled;
			this.#onPointerDownSnapshot = onPointerDown;
			this.#onPointerUpSnapshot = onPointerUp;
			if (enabled) {
				globalThis.bitsTextSelectionLayers.set(this, this.opts.enabled);
				unsubEvents();
				unsubEvents = this.#addEventListeners();
			}
			return () => {
				this.#enabledSnapshot = false;
				unsubEvents();
				this.#resetSelectionLock();
				globalThis.bitsTextSelectionLayers.delete(this);
			};
		});
	}
	#addEventListeners() {
		return executeCallbacks(on(this.domContext.getDocument(), "pointerdown", this.#pointerdown), on(this.domContext.getDocument(), "pointerup", composeHandlers(this.#resetSelectionLock, this.#pointerupUserHandler)));
	}
	#pointerupUserHandler = (e) => {
		this.#onPointerUpSnapshot(e);
	};
	#pointerdown = (e) => {
		if (!this.#enabledSnapshot) return;
		const node = this.opts.ref.current;
		const target = e.target;
		if (!isHTMLElement(node) || !isHTMLElement(target)) return;
		/**
		* We only lock user-selection overflow if layer is the top most layer and
		* pointerdown occurred inside the node. You are still allowed to select text
		* outside the node provided pointerdown occurs outside the node.
		*/
		if (!isHighestLayer(this) || !contains(node, target)) return;
		this.#onPointerDownSnapshot(e);
		if (e.defaultPrevented) return;
		this.#unsubSelectionLock = preventTextSelectionOverflow(node, this.domContext.getDocument().body);
	};
	#resetSelectionLock = () => {
		this.#unsubSelectionLock();
		this.#unsubSelectionLock = noop;
	};
};
var getUserSelect = (node) => node.style.userSelect || node.style.webkitUserSelect;
function preventTextSelectionOverflow(node, body) {
	const originalBodyUserSelect = getUserSelect(body);
	const originalNodeUserSelect = getUserSelect(node);
	setUserSelect(body, "none");
	setUserSelect(node, "text");
	return () => {
		setUserSelect(body, originalBodyUserSelect);
		setUserSelect(node, originalNodeUserSelect);
	};
}
function setUserSelect(node, value) {
	node.style.userSelect = value;
	node.style.webkitUserSelect = value;
}
function isHighestLayer(instance) {
	const layersArr = [...globalThis.bitsTextSelectionLayers];
	if (!layersArr.length) return false;
	const highestLayer = layersArr.at(-1);
	if (!highestLayer) return false;
	return highestLayer[0] === instance;
}
//#endregion
//#region node_modules/bits-ui/dist/bits/utilities/text-selection-layer/text-selection-layer.svelte
function Text_selection_layer($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { preventOverflowTextSelection = true, onPointerDown = noop, onPointerUp = noop, id, children, enabled, ref } = $$props;
		TextSelectionLayerState.create({
			id: boxWith(() => id),
			onPointerDown: boxWith(() => onPointerDown),
			onPointerUp: boxWith(() => onPointerUp),
			enabled: boxWith(() => enabled && preventOverflowTextSelection),
			ref
		});
		children?.($$renderer);
		$$renderer.push(`<!---->`);
	});
}
//#endregion
//#region node_modules/bits-ui/dist/internal/use-id.js
globalThis.bitsIdCounter ??= { current: 0 };
/**
* Generates a unique ID based on a global counter.
*/
function useId(prefix = "bits") {
	globalThis.bitsIdCounter.current++;
	return `${prefix}-${globalThis.bitsIdCounter.current}`;
}
//#endregion
//#region node_modules/bits-ui/dist/internal/shared-state.svelte.js
var SharedState = class {
	#factory;
	#subscribers = 0;
	#state;
	#scope;
	constructor(factory) {
		this.#factory = factory;
	}
	#dispose() {
		this.#subscribers -= 1;
		if (this.#scope && this.#subscribers <= 0) {
			this.#scope();
			this.#state = void 0;
			this.#scope = void 0;
		}
	}
	get(...args) {
		this.#subscribers += 1;
		if (this.#state === void 0) this.#scope = () => {};
		return this.#state;
	}
};
//#endregion
//#region node_modules/bits-ui/dist/internal/body-scroll-lock.svelte.js
var lockMap = new SvelteMap();
var initialBodyStyle = null;
var cleanupTimeoutId = null;
var isInCleanupTransition = false;
var anyLocked = boxWith(() => {
	for (const value of lockMap.values()) if (value) return true;
	return false;
});
/**
* We track the time we scheduled the cleanup to prevent race conditions
* when multiple locks are created/destroyed in the same tick, ensuring
* only the last one to schedule the cleanup will run.
*
* reference: https://github.com/huntabyte/bits-ui/issues/1639
*/
var cleanupScheduledAt = null;
var bodyLockStackCount = new SharedState(() => {
	function resetBodyStyle(documentObj) {}
	function cancelPendingCleanup() {
		if (cleanupTimeoutId === null) return;
		window.clearTimeout(cleanupTimeoutId);
		cleanupTimeoutId = null;
	}
	function scheduleCleanupIfNoNewLocks(delay, callback) {
		cancelPendingCleanup();
		isInCleanupTransition = true;
		cleanupScheduledAt = Date.now();
		const currentCleanupId = cleanupScheduledAt;
		/**
		* We schedule the cleanup to run after a delay to allow new locks to register
		* that might have been added in the same tick as the current cleanup.
		*
		* If a new lock is added in the same tick, the cleanup will be cancelled and
		* a new cleanup will be scheduled.
		*
		* This is to prevent the cleanup from running too early and resetting the body
		* style before the new lock has had a chance to apply its styles.
		*/
		const cleanupFn = () => {
			cleanupTimeoutId = null;
			if (cleanupScheduledAt !== currentCleanupId) return;
			if (!isAnyLocked(lockMap)) {
				isInCleanupTransition = false;
				callback();
			} else isInCleanupTransition = false;
		};
		const actualDelay = delay === null ? 24 : delay;
		cleanupTimeoutId = window.setTimeout(cleanupFn, actualDelay);
	}
	function ensureInitialStyleCaptured() {
		if (initialBodyStyle === null && lockMap.size === 0 && !isInCleanupTransition) initialBodyStyle = document.body.getAttribute("style");
	}
	watch(() => anyLocked.current, () => {
		if (!anyLocked.current) return;
		ensureInitialStyleCaptured();
		isInCleanupTransition = false;
		const htmlStyle = getComputedStyle(document.documentElement);
		const bodyStyle = getComputedStyle(document.body);
		const hasStableGutter = htmlStyle.scrollbarGutter?.includes("stable") || bodyStyle.scrollbarGutter?.includes("stable");
		const verticalScrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
		const config = {
			padding: Number.parseInt(bodyStyle.paddingRight ?? "0", 10) + verticalScrollbarWidth,
			margin: Number.parseInt(bodyStyle.marginRight ?? "0", 10)
		};
		if (verticalScrollbarWidth > 0 && !hasStableGutter) {
			document.body.style.paddingRight = `${config.padding}px`;
			document.body.style.marginRight = `${config.margin}px`;
			document.body.style.setProperty("--scrollbar-width", `${verticalScrollbarWidth}px`);
		}
		document.body.style.overflow = "hidden";
		if (isIOS) on(document, "touchmove", (e) => {
			if (e.target !== document.documentElement) return;
			if (e.touches.length > 1) return;
			e.preventDefault();
		}, { passive: false });
		/**
		* We ensure pointer-events: none is applied _after_ DOM updates, so that any focus/
		* interaction changes from opening overlays/menus complete _before_ we block pointer
		* events.
		*
		* this avoids race conditions where pointer-events could be set too early and break
		* focus/interaction.
		*/
		afterTick(() => {
			document.body.style.pointerEvents = "none";
			document.body.style.overflow = "hidden";
		});
	});
	return {
		get lockMap() {
			return lockMap;
		},
		resetBodyStyle,
		scheduleCleanupIfNoNewLocks,
		cancelPendingCleanup,
		ensureInitialStyleCaptured
	};
});
var BodyScrollLock = class {
	#id = useId();
	#initialState;
	#restoreScrollDelay = () => null;
	#countState;
	locked;
	constructor(initialState, restoreScrollDelay = () => null) {
		this.#initialState = initialState;
		this.#restoreScrollDelay = restoreScrollDelay;
		this.#countState = bodyLockStackCount.get();
		if (!this.#countState) return;
		/**
		* Since a new lock is being created, we cancel any pending cleanup to
		* prevent the cleanup from running too early and resetting the body style
		* before the new lock has had a chance to apply its styles.
		*
		* reference: https://github.com/huntabyte/bits-ui/issues/1639
		*/
		this.#countState.cancelPendingCleanup();
		this.#countState.ensureInitialStyleCaptured();
		this.#countState.lockMap.set(this.#id, this.#initialState ?? false);
		this.locked = boxWith(() => this.#countState.lockMap.get(this.#id) ?? false, (v) => this.#countState.lockMap.set(this.#id, v));
	}
};
function isAnyLocked(map) {
	for (const [_, value] of map) if (value) return true;
	return false;
}
//#endregion
//#region node_modules/bits-ui/dist/bits/utilities/scroll-lock/scroll-lock.svelte
function Scroll_lock($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { preventScroll = true, restoreScrollDelay = null } = $$props;
		if (preventScroll) new BodyScrollLock(preventScroll, () => restoreScrollDelay);
	});
}
//#endregion
//#region node_modules/bits-ui/dist/bits/dialog/components/dialog-overlay.svelte
function Dialog_overlay$1($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const uid = props_id($$renderer);
		let { id = createId(uid), forceMount = false, child, children, ref = null, $$slots, $$events, ...restProps } = $$props;
		const overlayState = DialogOverlayState.create({
			id: boxWith(() => id),
			ref: boxWith(() => ref, (v) => ref = v)
		});
		const mergedProps = derived(() => mergeProps(restProps, overlayState.props));
		if (overlayState.shouldRender || forceMount) {
			$$renderer.push("<!--[0-->");
			if (child) {
				$$renderer.push("<!--[0-->");
				child($$renderer, {
					props: mergeProps(mergedProps()),
					...overlayState.snippetProps
				});
				$$renderer.push(`<!---->`);
			} else {
				$$renderer.push(`<!--[-1--><div${attributes({ ...mergeProps(mergedProps()) })}>`);
				children?.($$renderer, overlayState.snippetProps);
				$$renderer.push(`<!----></div>`);
			}
			$$renderer.push(`<!--]-->`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]-->`);
		bind_props($$props, { ref });
	});
}
//#endregion
//#region node_modules/bits-ui/dist/bits/dialog/components/dialog-description.svelte
function Dialog_description$1($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const uid = props_id($$renderer);
		let { id = createId(uid), children, child, ref = null, $$slots, $$events, ...restProps } = $$props;
		const descriptionState = DialogDescriptionState.create({
			id: boxWith(() => id),
			ref: boxWith(() => ref, (v) => ref = v)
		});
		const mergedProps = derived(() => mergeProps(restProps, descriptionState.props));
		if (child) {
			$$renderer.push("<!--[0-->");
			child($$renderer, { props: mergedProps() });
			$$renderer.push(`<!---->`);
		} else {
			$$renderer.push(`<!--[-1--><div${attributes({ ...mergedProps() })}>`);
			children?.($$renderer);
			$$renderer.push(`<!----></div>`);
		}
		$$renderer.push(`<!--]-->`);
		bind_props($$props, { ref });
	});
}
//#endregion
//#region node_modules/bits-ui/dist/bits/avatar/avatar.svelte.js
var avatarAttrs = createBitsAttrs({
	component: "avatar",
	parts: [
		"root",
		"image",
		"fallback"
	]
});
var AvatarRootContext = new Context("Avatar.Root");
var AvatarRootState = class AvatarRootState {
	static create(opts) {
		return AvatarRootContext.set(new AvatarRootState(opts));
	}
	opts;
	domContext;
	attachment;
	constructor(opts) {
		this.opts = opts;
		this.domContext = new DOMContext(this.opts.ref);
		this.loadImage = this.loadImage.bind(this);
		this.attachment = attachRef(this.opts.ref);
	}
	loadImage(src, crossorigin, referrerPolicy) {
		if (this.opts.loadingStatus.current === "loaded") return;
		let imageTimerId;
		const image = new Image();
		image.src = src;
		if (crossorigin !== void 0) image.crossOrigin = crossorigin;
		if (referrerPolicy) image.referrerPolicy = referrerPolicy;
		this.opts.loadingStatus.current = "loading";
		image.onload = () => {
			imageTimerId = this.domContext.setTimeout(() => {
				this.opts.loadingStatus.current = "loaded";
			}, this.opts.delayMs.current);
		};
		image.onerror = () => {
			this.opts.loadingStatus.current = "error";
		};
		return () => {
			image.onload = null;
			image.onerror = null;
			if (!imageTimerId) return;
			this.domContext.clearTimeout(imageTimerId);
		};
	}
	#props = derived(() => ({
		id: this.opts.id.current,
		[avatarAttrs.root]: "",
		"data-status": this.opts.loadingStatus.current,
		...this.attachment
	}));
	get props() {
		return this.#props();
	}
	set props($$value) {
		return this.#props($$value);
	}
};
var AvatarFallbackState = class AvatarFallbackState {
	static create(opts) {
		return new AvatarFallbackState(opts, AvatarRootContext.get());
	}
	opts;
	root;
	attachment;
	constructor(opts, root) {
		this.opts = opts;
		this.root = root;
		this.attachment = attachRef(this.opts.ref);
	}
	#style = derived(() => this.root.opts.loadingStatus.current === "loaded" ? { display: "none" } : void 0);
	get style() {
		return this.#style();
	}
	set style($$value) {
		return this.#style($$value);
	}
	#props = derived(() => ({
		style: this.style,
		"data-status": this.root.opts.loadingStatus.current,
		[avatarAttrs.fallback]: "",
		...this.attachment
	}));
	get props() {
		return this.#props();
	}
	set props($$value) {
		return this.#props($$value);
	}
};
//#endregion
//#region node_modules/bits-ui/dist/bits/avatar/components/avatar.svelte
function Avatar$1($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const uid = props_id($$renderer);
		let { delayMs = 0, loadingStatus = "loading", onLoadingStatusChange, child, children, id = createId(uid), ref = null, $$slots, $$events, ...restProps } = $$props;
		const rootState = AvatarRootState.create({
			delayMs: boxWith(() => delayMs),
			loadingStatus: boxWith(() => loadingStatus, (v) => {
				if (loadingStatus !== v) {
					loadingStatus = v;
					onLoadingStatusChange?.(v);
				}
			}),
			id: boxWith(() => id),
			ref: boxWith(() => ref, (v) => ref = v)
		});
		const mergedProps = derived(() => mergeProps(restProps, rootState.props));
		if (child) {
			$$renderer.push("<!--[0-->");
			child($$renderer, { props: mergedProps() });
			$$renderer.push(`<!---->`);
		} else {
			$$renderer.push(`<!--[-1--><div${attributes({ ...mergedProps() })}>`);
			children?.($$renderer);
			$$renderer.push(`<!----></div>`);
		}
		$$renderer.push(`<!--]-->`);
		bind_props($$props, {
			loadingStatus,
			ref
		});
	});
}
//#endregion
//#region node_modules/bits-ui/dist/bits/avatar/components/avatar-fallback.svelte
function Avatar_fallback$1($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const uid = props_id($$renderer);
		let { children, child, id = createId(uid), ref = null, $$slots, $$events, ...restProps } = $$props;
		const fallbackState = AvatarFallbackState.create({
			id: boxWith(() => id),
			ref: boxWith(() => ref, (v) => ref = v)
		});
		const mergedProps = derived(() => mergeProps(restProps, fallbackState.props));
		if (child) {
			$$renderer.push("<!--[0-->");
			child($$renderer, { props: mergedProps() });
			$$renderer.push(`<!---->`);
		} else {
			$$renderer.push(`<!--[-1--><span${attributes({ ...mergedProps() })}>`);
			children?.($$renderer);
			$$renderer.push(`<!----></span>`);
		}
		$$renderer.push(`<!--]-->`);
		bind_props($$props, { ref });
	});
}
//#endregion
//#region node_modules/bits-ui/dist/bits/dialog/components/dialog.svelte
function Dialog$1($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { open = false, onOpenChange = noop, onOpenChangeComplete = noop, children } = $$props;
		DialogRootState.create({
			variant: boxWith(() => "dialog"),
			open: boxWith(() => open, (v) => {
				open = v;
				onOpenChange(v);
			}),
			onOpenChangeComplete: boxWith(() => onOpenChangeComplete)
		});
		children?.($$renderer);
		$$renderer.push(`<!---->`);
		bind_props($$props, { open });
	});
}
//#endregion
//#region node_modules/bits-ui/dist/bits/dialog/components/dialog-close.svelte
function Dialog_close$1($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const uid = props_id($$renderer);
		let { children, child, id = createId(uid), ref = null, disabled = false, $$slots, $$events, ...restProps } = $$props;
		const closeState = DialogCloseState.create({
			variant: boxWith(() => "close"),
			id: boxWith(() => id),
			ref: boxWith(() => ref, (v) => ref = v),
			disabled: boxWith(() => Boolean(disabled))
		});
		const mergedProps = derived(() => mergeProps(restProps, closeState.props));
		if (child) {
			$$renderer.push("<!--[0-->");
			child($$renderer, { props: mergedProps() });
			$$renderer.push(`<!---->`);
		} else {
			$$renderer.push(`<!--[-1--><button${attributes({ ...mergedProps() })}>`);
			children?.($$renderer);
			$$renderer.push(`<!----></button>`);
		}
		$$renderer.push(`<!--]-->`);
		bind_props($$props, { ref });
	});
}
//#endregion
//#region node_modules/bits-ui/dist/bits/dialog/components/dialog-content.svelte
function Dialog_content$1($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const uid = props_id($$renderer);
		let { id = createId(uid), children, child, ref = null, forceMount = false, onCloseAutoFocus = noop, onOpenAutoFocus = noop, onEscapeKeydown = noop, onInteractOutside = noop, trapFocus = true, preventScroll = true, restoreScrollDelay = null, $$slots, $$events, ...restProps } = $$props;
		const contentState = DialogContentState.create({
			id: boxWith(() => id),
			ref: boxWith(() => ref, (v) => ref = v)
		});
		const mergedProps = derived(() => mergeProps(restProps, contentState.props));
		if (contentState.shouldRender || forceMount) {
			$$renderer.push("<!--[0-->");
			{
				function focusScope($$renderer, { props: focusScopeProps }) {
					Escape_layer($$renderer, spread_props([mergedProps(), {
						enabled: contentState.root.opts.open.current,
						ref: contentState.opts.ref,
						onEscapeKeydown: (e) => {
							onEscapeKeydown(e);
							if (e.defaultPrevented) return;
							contentState.root.handleClose();
						},
						children: ($$renderer) => {
							Dismissible_layer($$renderer, spread_props([mergedProps(), {
								ref: contentState.opts.ref,
								enabled: contentState.root.opts.open.current,
								onInteractOutside: (e) => {
									onInteractOutside(e);
									if (e.defaultPrevented) return;
									contentState.root.handleClose();
								},
								children: ($$renderer) => {
									Text_selection_layer($$renderer, spread_props([mergedProps(), {
										ref: contentState.opts.ref,
										enabled: contentState.root.opts.open.current,
										children: ($$renderer) => {
											if (child) {
												$$renderer.push("<!--[0-->");
												if (contentState.root.opts.open.current) {
													$$renderer.push("<!--[0-->");
													Scroll_lock($$renderer, {
														preventScroll,
														restoreScrollDelay
													});
												} else $$renderer.push("<!--[-1-->");
												$$renderer.push(`<!--]--> `);
												child($$renderer, {
													props: mergeProps(mergedProps(), focusScopeProps),
													...contentState.snippetProps
												});
												$$renderer.push(`<!---->`);
											} else {
												$$renderer.push("<!--[-1-->");
												Scroll_lock($$renderer, { preventScroll });
												$$renderer.push(`<!----> <div${attributes({ ...mergeProps(mergedProps(), focusScopeProps) })}>`);
												children?.($$renderer);
												$$renderer.push(`<!----></div>`);
											}
											$$renderer.push(`<!--]-->`);
										},
										$$slots: { default: true }
									}]));
								},
								$$slots: { default: true }
							}]));
						},
						$$slots: { default: true }
					}]));
				}
				Focus_scope($$renderer, {
					ref: contentState.opts.ref,
					loop: true,
					trapFocus,
					enabled: contentState.root.opts.open.current,
					onOpenAutoFocus,
					onCloseAutoFocus,
					focusScope,
					$$slots: { focusScope: true }
				});
			}
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]-->`);
		bind_props($$props, { ref });
	});
}
//#endregion
//#region src/lib/components/ui/avatar/avatar-fallback.svelte
function Avatar_fallback($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { ref = null, class: className, $$slots, $$events, ...restProps } = $$props;
		let $$settled = true;
		let $$inner_renderer;
		function $$render_inner($$renderer) {
			if (Avatar_fallback$1) {
				$$renderer.push("<!--[-->");
				Avatar_fallback$1($$renderer, spread_props([
					{
						"data-slot": "avatar-fallback",
						class: cn("bg-muted text-muted-foreground rounded-full flex size-full items-center justify-center text-sm group-data-[size=sm]/avatar:text-xs", className)
					},
					restProps,
					{
						get ref() {
							return ref;
						},
						set ref($$value) {
							ref = $$value;
							$$settled = false;
						}
					}
				]));
				$$renderer.push("<!--]-->");
			} else {
				$$renderer.push("<!--[!-->");
				$$renderer.push("<!--]-->");
			}
		}
		do {
			$$settled = true;
			$$inner_renderer = $$renderer.copy();
			$$render_inner($$inner_renderer);
		} while (!$$settled);
		$$renderer.subsume($$inner_renderer);
		bind_props($$props, { ref });
	});
}
//#endregion
//#region src/lib/components/ui/avatar/avatar.svelte
function Avatar($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { ref = null, loadingStatus = "loading", size = "default", class: className, $$slots, $$events, ...restProps } = $$props;
		let $$settled = true;
		let $$inner_renderer;
		function $$render_inner($$renderer) {
			if (Avatar$1) {
				$$renderer.push("<!--[-->");
				Avatar$1($$renderer, spread_props([
					{
						"data-slot": "avatar",
						"data-size": size,
						class: cn("size-8 rounded-full after:rounded-full data-[size=lg]:size-10 data-[size=sm]:size-6 group/avatar relative flex shrink-0 select-none after:absolute after:inset-0 after:border after:border-border after:mix-blend-darken dark:after:mix-blend-lighten", className)
					},
					restProps,
					{
						get ref() {
							return ref;
						},
						set ref($$value) {
							ref = $$value;
							$$settled = false;
						},
						get loadingStatus() {
							return loadingStatus;
						},
						set loadingStatus($$value) {
							loadingStatus = $$value;
							$$settled = false;
						}
					}
				]));
				$$renderer.push("<!--]-->");
			} else {
				$$renderer.push("<!--[!-->");
				$$renderer.push("<!--]-->");
			}
		}
		do {
			$$settled = true;
			$$inner_renderer = $$renderer.copy();
			$$render_inner($$inner_renderer);
		} while (!$$settled);
		$$renderer.subsume($$inner_renderer);
		bind_props($$props, {
			ref,
			loadingStatus
		});
	});
}
//#endregion
//#region src/lib/components/ui/badge/badge.svelte
var badgeVariants = tv({
	base: "h-5 gap-1 rounded-2xl border border-transparent px-2 py-0.5 text-xs font-medium transition-all has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&>svg]:size-3! group/badge inline-flex w-fit shrink-0 items-center justify-center overflow-hidden whitespace-nowrap focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none",
	variants: { variant: {
		default: "bg-primary text-primary-foreground [a]:hover:bg-primary/80",
		secondary: "bg-secondary text-secondary-foreground [a]:hover:bg-secondary/80",
		destructive: "bg-destructive/10 [a]:hover:bg-destructive/20 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 text-destructive dark:bg-destructive/20",
		outline: "border-border text-foreground [a]:hover:bg-muted [a]:hover:text-muted-foreground",
		ghost: "hover:bg-muted hover:text-muted-foreground dark:hover:bg-muted/50",
		link: "text-primary underline-offset-4 hover:underline"
	} },
	defaultVariants: { variant: "default" }
});
function Badge($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { ref = null, href, class: className, variant = "default", children, $$slots, $$events, ...restProps } = $$props;
		element($$renderer, href ? "a" : "span", () => {
			$$renderer.push(`${attributes({
				"data-slot": "badge",
				href,
				class: clsx$1(cn(badgeVariants({ variant }), className)),
				...restProps
			})}`);
		}, () => {
			children?.($$renderer);
			$$renderer.push(`<!---->`);
		});
		bind_props($$props, { ref });
	});
}
//#endregion
//#region src/lib/components/ui/button/button.svelte
var buttonVariants = tv({
	base: "focus-visible:border-ring focus-visible:ring-ring/30 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 rounded-2xl border border-transparent bg-clip-padding text-sm font-medium focus-visible:ring-3 aria-invalid:ring-3 active:not-aria-[haspopup]:translate-y-px [&_svg:not([class*='size-'])]:size-4 group/button inline-flex shrink-0 items-center justify-center whitespace-nowrap transition-all outline-none select-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground hover:bg-primary/80",
			outline: "border-border bg-background dark:bg-transparent hover:bg-muted hover:text-foreground dark:hover:bg-input/30 aria-expanded:bg-muted aria-expanded:text-foreground",
			secondary: "bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)] aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
			ghost: "hover:bg-muted hover:text-foreground dark:hover:bg-muted/50 aria-expanded:bg-muted aria-expanded:text-foreground",
			destructive: "bg-destructive/10 hover:bg-destructive/20 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/20 text-destructive focus-visible:border-destructive/40 dark:hover:bg-destructive/30",
			link: "text-primary underline-offset-4 hover:underline"
		},
		size: {
			default: "h-8 gap-1.5 px-3 has-data-[icon=inline-end]:pr-2.5 has-data-[icon=inline-start]:pl-2.5",
			xs: "h-6 gap-1 px-2.5 text-xs has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 [&_svg:not([class*='size-'])]:size-3",
			sm: "h-7 gap-1 px-3 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
			lg: "h-9 gap-1.5 px-4 has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3",
			icon: "size-8",
			"icon-xs": "size-6 [&_svg:not([class*='size-'])]:size-3",
			"icon-sm": "size-7",
			"icon-lg": "size-9"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Button($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { class: className, variant = "default", size = "default", ref = null, href = void 0, type = "button", disabled, children, $$slots, $$events, ...restProps } = $$props;
		if (href) {
			$$renderer.push(`<!--[0--><a${attributes({
				"data-slot": "button",
				class: clsx$1(cn(buttonVariants({
					variant,
					size
				}), className)),
				href: disabled ? void 0 : href,
				"aria-disabled": disabled,
				role: disabled ? "link" : void 0,
				tabindex: disabled ? -1 : void 0,
				...restProps
			})}>`);
			children?.($$renderer);
			$$renderer.push(`<!----></a>`);
		} else {
			$$renderer.push(`<!--[-1--><button${attributes({
				"data-slot": "button",
				class: clsx$1(cn(buttonVariants({
					variant,
					size
				}), className)),
				type,
				disabled,
				...restProps
			})}>`);
			children?.($$renderer);
			$$renderer.push(`<!----></button>`);
		}
		$$renderer.push(`<!--]-->`);
		bind_props($$props, { ref });
	});
}
//#endregion
//#region src/lib/components/ui/dialog/dialog-close.svelte
function Dialog_close($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { ref = null, type = "button", $$slots, $$events, ...restProps } = $$props;
		let $$settled = true;
		let $$inner_renderer;
		function $$render_inner($$renderer) {
			if (Dialog_close$1) {
				$$renderer.push("<!--[-->");
				Dialog_close$1($$renderer, spread_props([
					{
						"data-slot": "dialog-close",
						type
					},
					restProps,
					{
						get ref() {
							return ref;
						},
						set ref($$value) {
							ref = $$value;
							$$settled = false;
						}
					}
				]));
				$$renderer.push("<!--]-->");
			} else {
				$$renderer.push("<!--[!-->");
				$$renderer.push("<!--]-->");
			}
		}
		do {
			$$settled = true;
			$$inner_renderer = $$renderer.copy();
			$$render_inner($$inner_renderer);
		} while (!$$settled);
		$$renderer.subsume($$inner_renderer);
		bind_props($$props, { ref });
	});
}
//#endregion
//#region src/lib/components/ui/dialog/dialog-portal.svelte
function Dialog_portal($$renderer, $$props) {
	let { $$slots, $$events, ...restProps } = $$props;
	if (Portal) {
		$$renderer.push("<!--[-->");
		Portal($$renderer, spread_props([restProps]));
		$$renderer.push("<!--]-->");
	} else {
		$$renderer.push("<!--[!-->");
		$$renderer.push("<!--]-->");
	}
}
//#endregion
//#region src/lib/components/ui/dialog/dialog-content.svelte
function Dialog_content($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { ref = null, class: className, portalProps, children, showCloseButton = true, $$slots, $$events, ...restProps } = $$props;
		let $$settled = true;
		let $$inner_renderer;
		function $$render_inner($$renderer) {
			Dialog_portal($$renderer, spread_props([portalProps, {
				children: ($$renderer) => {
					if (Dialog_overlay) {
						$$renderer.push("<!--[-->");
						Dialog_overlay($$renderer, {});
						$$renderer.push("<!--]-->");
					} else {
						$$renderer.push("<!--[!-->");
						$$renderer.push("<!--]-->");
					}
					$$renderer.push(` `);
					if (Dialog_content$1) {
						$$renderer.push("<!--[-->");
						Dialog_content$1($$renderer, spread_props([
							{
								"data-slot": "dialog-content",
								class: cn("bg-popover text-popover-foreground data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 ring-foreground/5 dark:ring-foreground/10 grid max-w-[calc(100%_-_2rem)] gap-6 rounded-[min(var(--radius-4xl),24px)] p-6 text-sm shadow-xl ring-1 duration-100 sm:max-w-md fixed top-1/2 left-1/2 z-50 w-full -translate-x-1/2 -translate-y-1/2 outline-none", className)
							},
							restProps,
							{
								get ref() {
									return ref;
								},
								set ref($$value) {
									ref = $$value;
									$$settled = false;
								},
								children: ($$renderer) => {
									children?.($$renderer);
									$$renderer.push(`<!----> `);
									if (showCloseButton) {
										$$renderer.push("<!--[0-->");
										{
											function child($$renderer, { props }) {
												Button($$renderer, spread_props([
													{
														variant: "ghost",
														class: "absolute top-4 right-4 bg-secondary",
														size: "icon-sm"
													},
													props,
													{
														children: ($$renderer) => {
															X($$renderer, {});
															$$renderer.push(`<!----> <span class="sr-only">Close</span>`);
														},
														$$slots: { default: true }
													}
												]));
											}
											if (Dialog_close$1) {
												$$renderer.push("<!--[-->");
												Dialog_close$1($$renderer, {
													"data-slot": "dialog-close",
													child,
													$$slots: { child: true }
												});
												$$renderer.push("<!--]-->");
											} else {
												$$renderer.push("<!--[!-->");
												$$renderer.push("<!--]-->");
											}
										}
									} else $$renderer.push("<!--[-1-->");
									$$renderer.push(`<!--]-->`);
								},
								$$slots: { default: true }
							}
						]));
						$$renderer.push("<!--]-->");
					} else {
						$$renderer.push("<!--[!-->");
						$$renderer.push("<!--]-->");
					}
				},
				$$slots: { default: true }
			}]));
		}
		do {
			$$settled = true;
			$$inner_renderer = $$renderer.copy();
			$$render_inner($$inner_renderer);
		} while (!$$settled);
		$$renderer.subsume($$inner_renderer);
		bind_props($$props, { ref });
	});
}
//#endregion
//#region src/lib/components/ui/dialog/dialog-description.svelte
function Dialog_description($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { ref = null, class: className, $$slots, $$events, ...restProps } = $$props;
		let $$settled = true;
		let $$inner_renderer;
		function $$render_inner($$renderer) {
			if (Dialog_description$1) {
				$$renderer.push("<!--[-->");
				Dialog_description$1($$renderer, spread_props([
					{
						"data-slot": "dialog-description",
						class: cn("text-muted-foreground *:[a]:hover:text-foreground text-sm *:[a]:underline *:[a]:underline-offset-3", className)
					},
					restProps,
					{
						get ref() {
							return ref;
						},
						set ref($$value) {
							ref = $$value;
							$$settled = false;
						}
					}
				]));
				$$renderer.push("<!--]-->");
			} else {
				$$renderer.push("<!--[!-->");
				$$renderer.push("<!--]-->");
			}
		}
		do {
			$$settled = true;
			$$inner_renderer = $$renderer.copy();
			$$render_inner($$inner_renderer);
		} while (!$$settled);
		$$renderer.subsume($$inner_renderer);
		bind_props($$props, { ref });
	});
}
//#endregion
//#region src/lib/components/ui/dialog/dialog-footer.svelte
function Dialog_footer($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { ref = null, class: className, children, showCloseButton = false, $$slots, $$events, ...restProps } = $$props;
		$$renderer.push(`<div${attributes({
			"data-slot": "dialog-footer",
			class: clsx$1(cn("gap-2 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className)),
			...restProps
		})}>`);
		children?.($$renderer);
		$$renderer.push(`<!----> `);
		if (showCloseButton) {
			$$renderer.push("<!--[0-->");
			{
				function child($$renderer, { props }) {
					Button($$renderer, spread_props([
						{ variant: "outline" },
						props,
						{
							children: ($$renderer) => {
								$$renderer.push(`<!---->Close`);
							},
							$$slots: { default: true }
						}
					]));
				}
				if (Dialog_close$1) {
					$$renderer.push("<!--[-->");
					Dialog_close$1($$renderer, {
						child,
						$$slots: { child: true }
					});
					$$renderer.push("<!--]-->");
				} else {
					$$renderer.push("<!--[!-->");
					$$renderer.push("<!--]-->");
				}
			}
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div>`);
		bind_props($$props, { ref });
	});
}
//#endregion
//#region src/lib/components/ui/dialog/dialog-header.svelte
function Dialog_header($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { ref = null, class: className, children, $$slots, $$events, ...restProps } = $$props;
		$$renderer.push(`<div${attributes({
			"data-slot": "dialog-header",
			class: clsx$1(cn("gap-1.5 flex flex-col", className)),
			...restProps
		})}>`);
		children?.($$renderer);
		$$renderer.push(`<!----></div>`);
		bind_props($$props, { ref });
	});
}
//#endregion
//#region src/lib/components/ui/dialog/dialog-overlay.svelte
function Dialog_overlay($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { ref = null, class: className, $$slots, $$events, ...restProps } = $$props;
		let $$settled = true;
		let $$inner_renderer;
		function $$render_inner($$renderer) {
			if (Dialog_overlay$1) {
				$$renderer.push("<!--[-->");
				Dialog_overlay$1($$renderer, spread_props([
					{
						"data-slot": "dialog-overlay",
						class: cn("data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 bg-black/30 duration-100 supports-backdrop-filter:backdrop-blur-sm fixed inset-0 isolate z-50", className)
					},
					restProps,
					{
						get ref() {
							return ref;
						},
						set ref($$value) {
							ref = $$value;
							$$settled = false;
						}
					}
				]));
				$$renderer.push("<!--]-->");
			} else {
				$$renderer.push("<!--[!-->");
				$$renderer.push("<!--]-->");
			}
		}
		do {
			$$settled = true;
			$$inner_renderer = $$renderer.copy();
			$$render_inner($$inner_renderer);
		} while (!$$settled);
		$$renderer.subsume($$inner_renderer);
		bind_props($$props, { ref });
	});
}
//#endregion
//#region src/lib/components/ui/dialog/dialog-title.svelte
function Dialog_title($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { ref = null, class: className, $$slots, $$events, ...restProps } = $$props;
		let $$settled = true;
		let $$inner_renderer;
		function $$render_inner($$renderer) {
			if (Dialog_title$1) {
				$$renderer.push("<!--[-->");
				Dialog_title$1($$renderer, spread_props([
					{
						"data-slot": "dialog-title",
						class: cn("text-base leading-none font-medium", className)
					},
					restProps,
					{
						get ref() {
							return ref;
						},
						set ref($$value) {
							ref = $$value;
							$$settled = false;
						}
					}
				]));
				$$renderer.push("<!--]-->");
			} else {
				$$renderer.push("<!--[!-->");
				$$renderer.push("<!--]-->");
			}
		}
		do {
			$$settled = true;
			$$inner_renderer = $$renderer.copy();
			$$render_inner($$inner_renderer);
		} while (!$$settled);
		$$renderer.subsume($$inner_renderer);
		bind_props($$props, { ref });
	});
}
//#endregion
//#region src/lib/components/ui/dialog/dialog.svelte
function Dialog($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { open = false, $$slots, $$events, ...restProps } = $$props;
		let $$settled = true;
		let $$inner_renderer;
		function $$render_inner($$renderer) {
			if (Dialog$1) {
				$$renderer.push("<!--[-->");
				Dialog$1($$renderer, spread_props([restProps, {
					get open() {
						return open;
					},
					set open($$value) {
						open = $$value;
						$$settled = false;
					}
				}]));
				$$renderer.push("<!--]-->");
			} else {
				$$renderer.push("<!--[!-->");
				$$renderer.push("<!--]-->");
			}
		}
		do {
			$$settled = true;
			$$inner_renderer = $$renderer.copy();
			$$render_inner($$inner_renderer);
		} while (!$$settled);
		$$renderer.subsume($$inner_renderer);
		bind_props($$props, { open });
	});
}
//#endregion
//#region src/lib/components/ui/input/input.svelte
function Input($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { ref = null, value = void 0, type, files = void 0, class: className, "data-slot": dataSlot = "input", $$slots, $$events, ...restProps } = $$props;
		if (type === "file") $$renderer.push(`<!--[0--><input${attributes({
			"data-slot": dataSlot,
			class: clsx$1(cn("bg-input/50 border-transparent focus-visible:border-ring focus-visible:ring-ring/30 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 h-8 rounded-2xl border px-2.5 py-1 text-base transition-[color,box-shadow] duration-200 file:h-6 file:text-sm file:font-medium focus-visible:ring-3 aria-invalid:ring-3 md:text-sm w-full min-w-0 outline-none file:inline-flex file:border-0 file:bg-transparent file:text-foreground placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50", className)),
			type: "file",
			...restProps
		}, void 0, void 0, void 0, 4)}/>`);
		else $$renderer.push(`<!--[-1--><input${attributes({
			"data-slot": dataSlot,
			class: clsx$1(cn("bg-input/50 border-transparent focus-visible:border-ring focus-visible:ring-ring/30 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 h-8 rounded-2xl border px-2.5 py-1 text-base transition-[color,box-shadow] duration-200 file:h-6 file:text-sm file:font-medium focus-visible:ring-3 aria-invalid:ring-3 md:text-sm w-full min-w-0 outline-none file:inline-flex file:border-0 file:bg-transparent file:text-foreground placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50", className)),
			type,
			value,
			...restProps
		}, void 0, void 0, void 0, 4)}/>`);
		$$renderer.push(`<!--]-->`);
		bind_props($$props, {
			ref,
			value,
			files
		});
	});
}
//#endregion
//#region src/lib/API.ts
var API_BASE_URL = "https://what-2-play-backend.onrender.com";
async function get(endpoint) {
	const response = await fetch(`${API_BASE_URL}${endpoint}`);
	if (!response.ok) throw new Error(await getErrorMessage(response));
	return response.json();
}
async function post(endpoint, body) {
	const response = await fetch(`${API_BASE_URL}${endpoint}`, {
		method: "POST",
		headers: body === void 0 ? void 0 : { "Content-Type": "application/json" },
		body: body === void 0 ? void 0 : JSON.stringify(body)
	});
	if (!response.ok) throw new Error(await getErrorMessage(response));
	if (response.status === 204) return void 0;
	return response.json();
}
var getUsers = () => get("/users");
var getUserGames = (fullName) => get(`/users/${encodeURIComponent(fullName)}/games`);
var createUser = (user) => post("/users", user);
var getGames = () => get("/games");
var createGame = (game) => post("/games", game);
var addOwnedGame = (fullName, gameName) => post(`/users/${encodeURIComponent(fullName)}/games/${encodeURIComponent(gameName)}`);
async function getErrorMessage(response) {
	try {
		return (await response.json()).detail ?? `Request failed with status ${response.status}`;
	} catch {
		return `Request failed with status ${response.status}`;
	}
}
//#endregion
//#region src/lib/components/GameSelection.svelte
function GameSelection($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		/**
		* CS2-style case opening carousel.
		*
		* Drop-in usage:
		*   <GameSelection items={games} onResult={(winner) => console.log(winner)} />
		*
		* `items` shape (matches your existing `games` array):
		*   { title: string, accent: string, image?: string, genre?: string, platform?: string }
		*
		* The rose ticker/glow color reads from --chosen-bg / --chosen-border if your
		* app already defines them (it does, in your app-shell tokens) and falls back
		* to a hardcoded rose if used standalone.
		*/
		/** @typedef {{ title: string, platform: string, players: string, maxPlayers: number, minutes: number, genre: string, accent: string, image?: string }} GameItem */
		/** @type {{ items?: GameItem[], onResult?: (winner: GameItem) => void, isDark?: boolean }} */
		let { items = [], onResult = () => {}, isDark = true } = $$props;
		const ITEM_WIDTH = 150;
		let isSpinning = false;
		let hasSpun = false;
		let offset = 0;
		let reel = buildIdleReel();
		function buildIdleReel() {
			if (!items.length) return [];
			const list = [];
			for (let i = 0; i < 24; i++) {
				const item = items[i % items.length];
				list.push({
					...item,
					key: `idle-${i}`,
					isWinner: false
				});
			}
			return list;
		}
		$$renderer.push(`<div${attr_class("cs-widget svelte-1lryj6g", void 0, { "dark-mode": isDark })}><div class="cs-header svelte-1lryj6g"><h2 class="svelte-1lryj6g">Tonight's pick</h2> <p class="svelte-1lryj6g">${escape_html("Open the case to find your game.")}</p></div> <div class="cs-viewport svelte-1lryj6g"><div class="cs-ticker svelte-1lryj6g"></div> <div class="cs-track svelte-1lryj6g"${attr_style(`transform: translateX(-${offset}px); transition: none;`)}><!--[-->`);
		const each_array = ensure_array_like(reel);
		for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
			let entry = each_array[$$index];
			$$renderer.push(`<div${attr_class(`cs-card ${stringify(entry.accent)}`, "svelte-1lryj6g", { "landed": hasSpun })}${attr_style(`--w: ${ITEM_WIDTH}px`)}>`);
			if (entry.image) $$renderer.push(`<!--[0--><img class="cs-icon svelte-1lryj6g"${attr("src", entry.image)}${attr("alt", entry.title)}/>`);
			else $$renderer.push(`<!--[-1--><span class="cs-icon svelte-1lryj6g">${escape_html(entry.title.slice(0, 2).toUpperCase())}</span>`);
			$$renderer.push(`<!--]--> <span class="cs-name svelte-1lryj6g">${escape_html(entry.title)}</span></div>`);
		}
		$$renderer.push(`<!--]--></div> <div class="cs-edge cs-edge-left svelte-1lryj6g"></div> <div class="cs-edge cs-edge-right svelte-1lryj6g"></div></div> `);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <button type="button" class="cs-button svelte-1lryj6g"${attr("disabled", isSpinning, true)}>${escape_html("Find a game")}</button></div>`);
	});
}
//#endregion
//#region src/lib/assets/DRG_Logo.webp
var DRG_Logo_default = "/_app/immutable/assets/DRG_Logo.l2GCW8fU.webp";
//#endregion
//#region src/lib/assets/lethal company logo.png
var lethal_company_logo_default = "data:image/png;base64,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";
//#endregion
//#region src/lib/assets/overcooked logo.png
var overcooked_logo_default = "/_app/immutable/assets/overcooked%20logo.Dl17Vqy0.png";
//#endregion
//#region src/lib/assets/peak logo.webp
var peak_logo_default = "/_app/immutable/assets/peak%20logo.D0dCo24q.webp";
//#endregion
//#region src/lib/assets/Sea-Of-Thieves-Logo.png
var Sea_Of_Thieves_Logo_default = "/_app/immutable/assets/Sea-Of-Thieves-Logo.CWM-23L5.png";
//#endregion
//#region src/lib/assets/cs2 logo.jpg
var cs2_logo_default = "/_app/immutable/assets/cs2%20logo.BJ9GrLDW.jpg";
//#endregion
//#region src/lib/assets/war selection logo.png
var war_selection_logo_default = "/_app/immutable/assets/war%20selection%20logo.C2wgq_vV.png";
//#endregion
//#region src/lib/assets/Rocket_League_logo.webp
var Rocket_League_logo_default = "/_app/immutable/assets/Rocket_League_logo.4vs5-mcy.webp";
//#endregion
//#region src/lib/assets/BTD6Logo.webp
var BTD6Logo_default = "/_app/immutable/assets/BTD6Logo.BIUVyxlZ.webp";
//#endregion
//#region src/lib/assets/valorant-logo-png_seeklogo-379976.png
var valorant_logo_png_seeklogo_379976_default = "data:image/png;base64,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";
//#endregion
//#region src/lib/assets/7days logo.webp
var _7days_logo_default = "/_app/immutable/assets/7days%20logo.DRapc2Tk.webp";
//#endregion
//#region src/lib/assets/war dogs logo.jpg
var war_dogs_logo_default = "/_app/immutable/assets/war%20dogs%20logo.B9AxLmG4.jpg";
//#endregion
//#region src/lib/assets/civ 6 logo.png
var civ_6_logo_default = "/_app/immutable/assets/civ%206%20logo.BS_HsO1K.png";
//#endregion
//#region src/lib/assets/fortnite logo.png
var fortnite_logo_default = "/_app/immutable/assets/fortnite%20logo.D6XhKkq6.png";
//#endregion
//#region src/lib/assets/subnautica logo.jpg
var subnautica_logo_default = "/_app/immutable/assets/subnautica%20logo.D1zJoInX.jpg";
//#endregion
//#region src/lib/assets/The_Finals_logo_(current).jpg
var The_Finals_logo__current__default = "/_app/immutable/assets/The_Finals_logo_(current).Bfcgc_oS.jpg";
//#endregion
//#region src/lib/assets/Minecraft-Logo-1.png
var Minecraft_Logo_1_default = "/_app/immutable/assets/Minecraft-Logo-1.CPA6nAht.png";
//#endregion
//#region src/lib/assets/Logo_valheim.webp
var Logo_valheim_default = "/_app/immutable/assets/Logo_valheim.CjTpJJcC.webp";
//#endregion
//#region src/lib/assets/fall guys logo.png
var fall_guys_logo_default = "/_app/immutable/assets/fall%20guys%20logo.DMs6Zwh8.png";
//#endregion
//#region src/lib/assets/palworld logo.jpg
var palworld_logo_default = "/_app/immutable/assets/palworld%20logo.t9qO_jFs.jpg";
//#endregion
//#region src/lib/assets/jump space logo.webp
var jump_space_logo_default = "/_app/immutable/assets/jump%20space%20logo.VBUsDgs8.webp";
//#endregion
//#region src/lib/assets/helldiver 2 logo.jpg
var helldiver_2_logo_default = "/_app/immutable/assets/helldiver%202%20logo.BnpLfMO6.jpg";
//#endregion
//#region src/lib/assets/grounded logo.jpg
var grounded_logo_default = "/_app/immutable/assets/grounded%20logo.CfQ5upqJ.jpg";
//#endregion
//#region src/lib/assets/subnautica 2 logo.jpg
var subnautica_2_logo_default = "/_app/immutable/assets/subnautica%202%20logo.CEoID_Yk.jpg";
//#endregion
//#region src/lib/assets/Overwatch-Logo.png
var Overwatch_Logo_default = "/_app/immutable/assets/Overwatch-Logo.B-FlrDZz.png";
//#endregion
//#region src/lib/assets/Among-Us-Logo.png
var Among_Us_Logo_default = "/_app/immutable/assets/Among-Us-Logo.BLMrZdt_.png";
//#endregion
//#region src/lib/assets/terarria logo.webp
var terarria_logo_default = "/_app/immutable/assets/terarria%20logo.BcUq2QfF.webp";
//#endregion
//#region src/lib/assets/the-forest-logo.png
var the_forest_logo_default = "/_app/immutable/assets/the-forest-logo.CE7g00gh.png";
//#endregion
//#region src/lib/assets/Sons_of_the_Forest_logo.jpg
var Sons_of_the_Forest_logo_default = "/_app/immutable/assets/Sons_of_the_Forest_logo.2ETto53e.jpg";
//#endregion
//#region src/lib/assets/ARK-Logo.png
var ARK_Logo_default = "/_app/immutable/assets/ARK-Logo.CJo2GWjO.png";
//#endregion
//#region src/lib/assets/Raft_logo.png
var Raft_logo_default = "/_app/immutable/assets/Raft_logo.CpHrC0Tv.png";
//#endregion
//#region src/lib/assets/stick fight logo.jpg
var stick_fight_logo_default = "/_app/immutable/assets/stick%20fight%20logo.CebVZzkR.jpg";
//#endregion
//#region src/lib/assets/mordhau logo.png
var mordhau_logo_default = "/_app/immutable/assets/mordhau%20logo.BE_1J9NO.png";
//#endregion
//#region src/lib/assets/Rust-Logo.png
var Rust_Logo_default = "/_app/immutable/assets/Rust-Logo.Ci8Qze5o.png";
//#endregion
//#region src/lib/assets/human fall fla logo.png
var human_fall_fla_logo_default = "/_app/immutable/assets/human%20fall%20fla%20logo.glFBYsh0.png";
//#endregion
//#region src/lib/assets/stranded deep logo.jpg
var stranded_deep_logo_default = "/_app/immutable/assets/stranded%20deep%20logo.CQeXfQ2J.jpg";
//#endregion
//#region src/lib/assets/ultimate chicken horse logo.jpg
var ultimate_chicken_horse_logo_default = "/_app/immutable/assets/ultimate%20chicken%20horse%20logo.CgHL7tTS.jpg";
//#endregion
//#region src/lib/assets/puck logo.jpg
var puck_logo_default = "/_app/immutable/assets/puck%20logo.D3wSzHvv.jpg";
//#endregion
//#region src/lib/assets/arc raiders logo.webp
var arc_raiders_logo_default = "/_app/immutable/assets/arc%20raiders%20logo.Bl0MiAQk.webp";
//#endregion
//#region src/lib/assets/body cam logo.jpg
var body_cam_logo_default = "/_app/immutable/assets/body%20cam%20logo.DNanPxQs.jpg";
//#endregion
//#region src/routes/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		/** @typedef {import("$lib/API").Game} Game */
		/** @typedef {import("$lib/API").User} User */
		let selectedNames = [];
		let searchTerm = "";
		let chosenGame = null;
		let showResult = false;
		let isDark = true;
		let userDialogOpen = false;
		let gameDialogOpen = false;
		let userName = "";
		let userGames = [];
		let selectedUserGames = [];
		let gameName = "";
		let playerLimit = 4;
		let selectedGenres = [];
		let selectedPlatforms = [];
		let gameUsers = [];
		let selectedGameUsers = [];
		let dialogLoading = false;
		let dialogError = "";
		let dataLoading = true;
		let dataError = "";
		let players = [];
		let games = [];
		const platformOptions = [
			"Steam",
			"Xbox",
			"Epic Games",
			"Blizzard",
			"Riot Games"
		];
		const genreOptions = [
			"Action",
			"Adventure",
			"Co-op",
			"Competitive",
			"Fighting",
			"Horror",
			"Party",
			"Puzzle",
			"RPG",
			"Shooter",
			"Simulation",
			"Sports",
			"Strategy",
			"Survival"
		];
		const gameImages = {
			CS2: cs2_logo_default,
			"War Selection": war_selection_logo_default,
			"Rocket League": Rocket_League_logo_default,
			BTD6: BTD6Logo_default,
			Valorant: valorant_logo_png_seeklogo_379976_default,
			"Deep Rock Galactic": DRG_Logo_default,
			"7 Days to Die": _7days_logo_default,
			"War Dogs": war_dogs_logo_default,
			"Civ 6": civ_6_logo_default,
			"Overcooked! 2": overcooked_logo_default,
			"Lethal Company": lethal_company_logo_default,
			Fortnite: fortnite_logo_default,
			Subnautica: subnautica_logo_default,
			"The Finals": The_Finals_logo__current__default,
			Minecraft: Minecraft_Logo_1_default,
			Valheim: Logo_valheim_default,
			"Fall Guys": fall_guys_logo_default,
			Palworld: palworld_logo_default,
			"Jump Space": jump_space_logo_default,
			"Helldivers 2": helldiver_2_logo_default,
			Grounded: grounded_logo_default,
			"Subnautica 2": subnautica_2_logo_default,
			Overwatch: Overwatch_Logo_default,
			"Among Us": Among_Us_Logo_default,
			PEAK: peak_logo_default,
			"Sea of Thieves": Sea_Of_Thieves_Logo_default,
			Terraria: terarria_logo_default,
			"The Forest": the_forest_logo_default,
			"Sons of the Forest": Sons_of_the_Forest_logo_default,
			Ark: ARK_Logo_default,
			Raft: Raft_logo_default,
			"Stick Fight": stick_fight_logo_default,
			Mordhau: mordhau_logo_default,
			Rust: Rust_Logo_default,
			"Human Fall Flat": human_fall_fla_logo_default,
			"Stranded Deep": stranded_deep_logo_default,
			"Ultimate Chicken Horse": ultimate_chicken_horse_logo_default,
			Puck: puck_logo_default,
			"Arc Raiders": arc_raiders_logo_default,
			Bodycam: body_cam_logo_default
		};
		const playerColors = [
			"coral",
			"blue",
			"gold",
			"green",
			"purple"
		];
		async function loadBackendData() {
			dataLoading = true;
			dataError = "";
			try {
				const [backendUsers, backendGames] = await Promise.all([getUsers(), getGames()]);
				players = (await Promise.all(backendUsers.map(async (user) => ({
					user,
					ownedGames: (await getUserGames(user.full_name)).map((game) => game.game_name)
				})))).map(({ user, ownedGames }, index) => ({
					name: user.full_name,
					initials: user.initials,
					color: playerColors[index % playerColors.length],
					gameCount: user.game_count,
					ownedGames
				}));
				games = backendGames.map((game, index) => ({
					title: game.game_name,
					platform: game.platform,
					players: `up to ${game.player_limit}`,
					maxPlayers: game.player_limit,
					minutes: 0,
					genre: game.genre,
					accent: [
						"amber",
						"tomato",
						"moss",
						"sky",
						"navy"
					][index % 5],
					image: gameImages[game.game_name],
					orbitDuration: 30 + Math.random() * 15,
					orbitDelay: -(Math.random() * 45)
				}));
			} catch (error) {
				dataError = error instanceof Error ? error.message : "Could not load players and games.";
			} finally {
				dataLoading = false;
			}
		}
		let selectedPlayers = derived(() => players.filter((player) => selectedNames.includes(player.name)));
		let playerCount = derived(() => selectedPlayers().length);
		let filteredGames = derived(() => {
			const query = searchTerm.toLowerCase();
			const selectedOwnedGames = selectedPlayers().length > 0 ? selectedPlayers().slice(1).reduce((commonGames, player) => commonGames.filter((gameName) => player.ownedGames.includes(gameName)), [...selectedPlayers()[0].ownedGames]) : [];
			const supportsGroup = (game) => selectedOwnedGames.includes(game.title) && game.maxPlayers >= playerCount();
			return games.filter((game) => (game.title.toLowerCase().includes(query) || game.genre.toLowerCase().includes(query)) && supportsGroup(game));
		});
		let matchingGames = derived(filteredGames);
		/** @param {typeof games[number]} winner */
		function handleGameResult(winner) {
			chosenGame = winner;
			showResult = true;
		}
		/** @param {string} gameName */
		function toggleUserGame(gameName) {
			selectedUserGames = selectedUserGames.includes(gameName) ? selectedUserGames.filter((item) => item !== gameName) : [...selectedUserGames, gameName];
		}
		/** @param {string} fullName */
		function toggleGameUser(fullName) {
			selectedGameUsers = selectedGameUsers.includes(fullName) ? selectedGameUsers.filter((item) => item !== fullName) : [...selectedGameUsers, fullName];
		}
		function cancelUserDialog() {
			userDialogOpen = false;
			userName = "";
			selectedUserGames = [];
			dialogError = "";
		}
		function cancelGameDialog() {
			gameDialogOpen = false;
			gameName = "";
			playerLimit = 4;
			selectedGenres = [];
			selectedPlatforms = [];
			selectedGameUsers = [];
			dialogError = "";
		}
		async function submitUser() {
			if (!userName.trim()) return;
			dialogLoading = true;
			dialogError = "";
			try {
				const createdUser = await createUser({ full_name: userName });
				if (selectedUserGames.length > 0) await Promise.all(selectedUserGames.map((gameName) => addOwnedGame(createdUser.full_name, gameName)));
				await loadBackendData();
				userDialogOpen = false;
				userName = "";
				selectedUserGames = [];
			} catch (error) {
				dialogError = error instanceof Error ? error.message : "Could not create user.";
			} finally {
				dialogLoading = false;
			}
		}
		async function submitGame() {
			if (!gameName.trim() || selectedGenres.length === 0 || selectedPlatforms.length === 0) return;
			dialogLoading = true;
			dialogError = "";
			try {
				const createdGame = await createGame({
					game_name: gameName,
					player_limit: Number(playerLimit),
					genre: selectedGenres.join(", "),
					platform: selectedPlatforms.join(", ")
				});
				if (selectedGameUsers.length > 0) await Promise.all(selectedGameUsers.map((user) => addOwnedGame(user, createdGame.game_name)));
				await loadBackendData();
				gameDialogOpen = false;
				gameName = "";
				selectedGenres = [];
				selectedPlatforms = [];
				playerLimit = 4;
				selectedGameUsers = [];
			} catch (error) {
				dialogError = error instanceof Error ? error.message : "Could not create game.";
			} finally {
				dialogLoading = false;
			}
		}
		let $$settled = true;
		let $$inner_renderer;
		function $$render_inner($$renderer) {
			head("1uha8ag", $$renderer, ($$renderer) => {
				$$renderer.title(($$renderer) => {
					$$renderer.push(`<title>Gameing</title>`);
				});
				$$renderer.push(`<meta name="description" content="Find the perfect game for everyone in your group."/>`);
			});
			$$renderer.push(`<div${attr_class("app-shell svelte-1uha8ag", void 0, { "dark-mode": isDark })}><button class="theme-toggle svelte-1uha8ag" type="button"${attr("aria-label", "Switch to light mode")}>`);
			$$renderer.push("<!--[0-->");
			Sun($$renderer, { size: 16 });
			$$renderer.push(`<!--]--></button> <main class="svelte-1uha8ag"><section class="intro svelte-1uha8ag"><p class="eyebrow svelte-1uha8ag">Game night planner</p> <h1 class="svelte-1uha8ag">What are we playing?</h1> <p class="subtitle svelte-1uha8ag">Pick your crew. We'll find the games you all have.</p></section> <section class="players-section svelte-1uha8ag"><div class="section-heading svelte-1uha8ag"><h2 class="svelte-1uha8ag">Who's playing?</h2> `);
			Badge($$renderer, {
				href: "",
				class: "pill",
				variant: "secondary",
				children: ($$renderer) => {
					$$renderer.push(`<!---->${escape_html(playerCount())} selected`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----></div> `);
			if (dataLoading) $$renderer.push(`<!--[0--><p class="data-status svelte-1uha8ag">Loading players and games...</p>`);
			else if (dataError) $$renderer.push(`<!--[1--><p class="data-error svelte-1uha8ag">${escape_html(dataError)}</p>`);
			else if (players.length === 0) {
				$$renderer.push(`<!--[2--><div class="player-grid svelte-1uha8ag"><button type="button" class="add-player-card flex items-center justify-center gap-2 svelte-1uha8ag" aria-label="Add user">`);
				Circle_plus($$renderer, { size: 24 });
				$$renderer.push(`<!----> <span>Add Friend</span></button></div>`);
			} else {
				$$renderer.push(`<!--[-1--><div class="player-grid svelte-1uha8ag"><!--[-->`);
				const each_array = ensure_array_like(players);
				for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
					let player = each_array[$$index];
					$$renderer.push(`<button type="button"${attr_class("player-card svelte-1uha8ag", void 0, { "chosen": selectedNames.includes(player.name) })}${attr("aria-pressed", selectedNames.includes(player.name))}>`);
					Avatar($$renderer, {
						class: `player-avatar ${stringify(player.color)}`,
						children: ($$renderer) => {
							Avatar_fallback($$renderer, {
								class: "avatar-fallback",
								children: ($$renderer) => {
									$$renderer.push(`<!---->${escape_html(player.initials)}`);
								},
								$$slots: { default: true }
							});
						},
						$$slots: { default: true }
					});
					$$renderer.push(`<!----> <span class="player-info svelte-1uha8ag"><strong class="svelte-1uha8ag">${escape_html(player.name)}</strong> <small class="svelte-1uha8ag">${escape_html(player.gameCount)} games</small></span> <span class="check-circle svelte-1uha8ag">`);
					if (selectedNames.includes(player.name)) {
						$$renderer.push("<!--[0-->");
						Check($$renderer, {
							size: 14,
							strokeWidth: 3
						});
					} else $$renderer.push("<!--[-1-->");
					$$renderer.push(`<!--]--></span></button>`);
				}
				$$renderer.push(`<!--]--> <button type="button" class="add-player-card flex items-center justify-center gap-2 svelte-1uha8ag" aria-label="Add user">`);
				Circle_plus($$renderer, { size: 24 });
				$$renderer.push(`<!----> <span>Add Friend</span></button></div>`);
			}
			$$renderer.push(`<!--]--></section> <section class="results-section svelte-1uha8ag"><div class="section-heading svelte-1uha8ag"><h2 class="svelte-1uha8ag">Matching games</h2> `);
			Badge($$renderer, {
				href: "",
				class: "pill",
				variant: "secondary",
				children: ($$renderer) => {
					$$renderer.push(`<!---->${escape_html(matchingGames().length)} available`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----> <button type="button" class="add-game-icon" aria-label="Add game">`);
			Circle_plus($$renderer, { size: 18 });
			$$renderer.push(`<!----></button></div> <div${attr_class("bubble-stage svelte-1uha8ag", void 0, { "empty": matchingGames().length === 0 })}><div class="bubble-glow svelte-1uha8ag"></div> <div class="orbit orbit-one svelte-1uha8ag"></div> <div class="orbit orbit-two svelte-1uha8ag"></div> <!--[-->`);
			const each_array_1 = ensure_array_like(matchingGames());
			for (let index = 0, $$length = each_array_1.length; index < $$length; index++) {
				let game = each_array_1[index];
				$$renderer.push(`<div${attr_class(`game-orb ${stringify(game.accent)}`, "svelte-1uha8ag")}${attr_style(`--index: ${index}; --total: ${matchingGames().length}; --orbit-duration: ${game.orbitDuration ?? 30}s; --orbit-delay: ${game.orbitDelay ?? 0}s`)}>`);
				if (game.image) $$renderer.push(`<!--[0--><img class="orb-icon svelte-1uha8ag"${attr("src", game.image)}${attr("alt", game.title)}/>`);
				else $$renderer.push(`<!--[-1--><span class="orb-fallback svelte-1uha8ag">${escape_html(game.title.slice(0, 2).toUpperCase())}</span>`);
				$$renderer.push(`<!--]--> <span class="orb-name svelte-1uha8ag">${escape_html(game.title)}</span></div>`);
			}
			$$renderer.push(`<!--]--> `);
			if (matchingGames().length === 0) $$renderer.push(`<!--[0--><div class="no-games svelte-1uha8ag"><span class="svelte-1uha8ag">¯\\_(ツ)_/¯</span> <strong class="svelte-1uha8ag">No matches yet</strong> <small class="svelte-1uha8ag">Select a new crew to find something to play.</small></div>`);
			else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> <button type="button" class="bubble-core svelte-1uha8ag" aria-label="Add game"><span class="bubble-count svelte-1uha8ag">`);
			Gamepad_2($$renderer, { size: 27 });
			$$renderer.push(`<!----> <span class="svelte-1uha8ag">${escape_html(matchingGames().length)}</span></span> <span class="bubble-add svelte-1uha8ag" aria-hidden="true">`);
			Circle_plus($$renderer, { size: 30 });
			$$renderer.push(`<!----></span></button></div> `);
			if (playerCount() > 1 && matchingGames().length > 0) {
				$$renderer.push("<!--[0-->");
				GameSelection($$renderer, {
					items: matchingGames(),
					isDark,
					onResult: handleGameResult
				});
			} else if (playerCount() === 1) $$renderer.push(`<!--[1--><p class="helper-text svelte-1uha8ag">Choose one more player to start the game picker.</p>`);
			else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></section></main></div> `);
			if (Dialog) {
				$$renderer.push("<!--[-->");
				Dialog($$renderer, {
					get open() {
						return userDialogOpen;
					},
					set open($$value) {
						userDialogOpen = $$value;
						$$settled = false;
					},
					children: ($$renderer) => {
						if (Dialog_content) {
							$$renderer.push("<!--[-->");
							Dialog_content($$renderer, {
								class: `form-dialog dark-dialog`,
								showCloseButton: false,
								portalProps: {},
								children: ($$renderer) => {
									if (Dialog_header) {
										$$renderer.push("<!--[-->");
										Dialog_header($$renderer, {
											class: "dialog-header",
											children: ($$renderer) => {
												if (Dialog_title) {
													$$renderer.push("<!--[-->");
													Dialog_title($$renderer, {
														class: "dialog-title",
														children: ($$renderer) => {
															$$renderer.push(`<!---->Insert user`);
														},
														$$slots: { default: true }
													});
													$$renderer.push("<!--]-->");
												} else {
													$$renderer.push("<!--[!-->");
													$$renderer.push("<!--]-->");
												}
												$$renderer.push(` `);
												if (Dialog_description) {
													$$renderer.push("<!--[-->");
													Dialog_description($$renderer, {
														class: "dialog-description",
														children: ($$renderer) => {
															$$renderer.push(`<!---->Add a friend and choose the games they own.`);
														},
														$$slots: { default: true }
													});
													$$renderer.push("<!--]-->");
												} else {
													$$renderer.push("<!--[!-->");
													$$renderer.push("<!--]-->");
												}
											},
											$$slots: { default: true }
										});
										$$renderer.push("<!--]-->");
									} else {
										$$renderer.push("<!--[!-->");
										$$renderer.push("<!--]-->");
									}
									$$renderer.push(` <div class="form-fields svelte-1uha8ag"><label for="user-name" class="svelte-1uha8ag">Full name</label> `);
									Input($$renderer, {
										id: "user-name",
										type: "text",
										class: "form-input",
										placeholder: "Alex Smith",
										get value() {
											return userName;
										},
										set value($$value) {
											userName = $$value;
											$$settled = false;
										}
									});
									$$renderer.push(`<!----> <label class="svelte-1uha8ag">Games owned</label> `);
									if (dialogLoading) $$renderer.push(`<!--[0--><p class="dialog-status svelte-1uha8ag">Loading games...</p>`);
									else if (userGames.length === 0) $$renderer.push(`<!--[1--><p class="dialog-status svelte-1uha8ag">No games found.</p>`);
									else {
										$$renderer.push(`<!--[-1--><div class="multi-select-list svelte-1uha8ag"><!--[-->`);
										const each_array_2 = ensure_array_like(userGames);
										for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
											let game = each_array_2[$$index_2];
											Button($$renderer, {
												variant: "outline",
												disabled: false,
												class: `multi-select-option ${selectedUserGames.includes(game.game_name) ? "option-selected" : ""}`,
												onclick: () => toggleUserGame(game.game_name),
												children: ($$renderer) => {
													$$renderer.push(`<!---->${escape_html(game.game_name)}<span>${escape_html(selectedUserGames.includes(game.game_name) ? "Added" : "Add")}</span>`);
												},
												$$slots: { default: true }
											});
										}
										$$renderer.push(`<!--]--></div>`);
									}
									$$renderer.push(`<!--]--></div> `);
									if (dialogError) $$renderer.push(`<!--[0--><p class="dialog-error svelte-1uha8ag">${escape_html(dialogError)}</p>`);
									else $$renderer.push("<!--[-1-->");
									$$renderer.push(`<!--]--> `);
									if (Dialog_footer) {
										$$renderer.push("<!--[-->");
										Dialog_footer($$renderer, {
											class: "dialog-footer",
											children: ($$renderer) => {
												Button($$renderer, {
													class: "dialog-cancel",
													variant: "outline",
													disabled: dialogLoading,
													onclick: cancelUserDialog,
													children: ($$renderer) => {
														$$renderer.push(`<!---->Cancel`);
													},
													$$slots: { default: true }
												});
												$$renderer.push(`<!----> `);
												Button($$renderer, {
													class: "dialog-button",
													disabled: dialogLoading || !userName.trim(),
													onclick: submitUser,
													children: ($$renderer) => {
														$$renderer.push(`<!---->Confirm`);
													},
													$$slots: { default: true }
												});
												$$renderer.push(`<!---->`);
											},
											$$slots: { default: true }
										});
										$$renderer.push("<!--]-->");
									} else {
										$$renderer.push("<!--[!-->");
										$$renderer.push("<!--]-->");
									}
								},
								$$slots: { default: true }
							});
							$$renderer.push("<!--]-->");
						} else {
							$$renderer.push("<!--[!-->");
							$$renderer.push("<!--]-->");
						}
					},
					$$slots: { default: true }
				});
				$$renderer.push("<!--]-->");
			} else {
				$$renderer.push("<!--[!-->");
				$$renderer.push("<!--]-->");
			}
			$$renderer.push(` `);
			if (Dialog) {
				$$renderer.push("<!--[-->");
				Dialog($$renderer, {
					get open() {
						return gameDialogOpen;
					},
					set open($$value) {
						gameDialogOpen = $$value;
						$$settled = false;
					},
					children: ($$renderer) => {
						if (Dialog_content) {
							$$renderer.push("<!--[-->");
							Dialog_content($$renderer, {
								class: `form-dialog dark-dialog`,
								showCloseButton: false,
								portalProps: {},
								children: ($$renderer) => {
									if (Dialog_header) {
										$$renderer.push("<!--[-->");
										Dialog_header($$renderer, {
											class: "dialog-header",
											children: ($$renderer) => {
												if (Dialog_title) {
													$$renderer.push("<!--[-->");
													Dialog_title($$renderer, {
														class: "dialog-title",
														children: ($$renderer) => {
															$$renderer.push(`<!---->Insert game`);
														},
														$$slots: { default: true }
													});
													$$renderer.push("<!--]-->");
												} else {
													$$renderer.push("<!--[!-->");
													$$renderer.push("<!--]-->");
												}
												$$renderer.push(` `);
												if (Dialog_description) {
													$$renderer.push("<!--[-->");
													Dialog_description($$renderer, {
														class: "dialog-description",
														children: ($$renderer) => {
															$$renderer.push(`<!---->Add a game and assign it to any existing friends.`);
														},
														$$slots: { default: true }
													});
													$$renderer.push("<!--]-->");
												} else {
													$$renderer.push("<!--[!-->");
													$$renderer.push("<!--]-->");
												}
											},
											$$slots: { default: true }
										});
										$$renderer.push("<!--]-->");
									} else {
										$$renderer.push("<!--[!-->");
										$$renderer.push("<!--]-->");
									}
									$$renderer.push(` <div class="form-fields svelte-1uha8ag"><label for="game-name" class="svelte-1uha8ag">Game name</label> `);
									Input($$renderer, {
										id: "game-name",
										type: "text",
										class: "form-input",
										placeholder: "Deep Rock Galactic",
										get value() {
											return gameName;
										},
										set value($$value) {
											gameName = $$value;
											$$settled = false;
										}
									});
									$$renderer.push(`<!----> <label for="player-limit" class="svelte-1uha8ag">Player limit</label> `);
									Input($$renderer, {
										id: "player-limit",
										type: "number",
										class: "form-input",
										min: "1",
										max: "10",
										get value() {
											return playerLimit;
										},
										set value($$value) {
											playerLimit = $$value;
											$$settled = false;
										}
									});
									$$renderer.push(`<!----> <fieldset class="badge-fieldset svelte-1uha8ag"><legend class="svelte-1uha8ag">Genre</legend> <div class="selection-badges svelte-1uha8ag"><!--[-->`);
									const each_array_3 = ensure_array_like(genreOptions);
									for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
										let genreOption = each_array_3[$$index_3];
										$$renderer.push(`<button type="button"${attr_class("selection-badge svelte-1uha8ag", void 0, { "selected": selectedGenres.includes(genreOption) })}${attr("aria-pressed", selectedGenres.includes(genreOption))}>${escape_html(genreOption)}</button>`);
									}
									$$renderer.push(`<!--]--></div></fieldset> <fieldset class="badge-fieldset svelte-1uha8ag"><legend class="svelte-1uha8ag">Platform</legend> <div class="selection-badges svelte-1uha8ag"><!--[-->`);
									const each_array_4 = ensure_array_like(platformOptions);
									for (let $$index_4 = 0, $$length = each_array_4.length; $$index_4 < $$length; $$index_4++) {
										let platformOption = each_array_4[$$index_4];
										$$renderer.push(`<button type="button"${attr_class("selection-badge svelte-1uha8ag", void 0, { "selected": selectedPlatforms.includes(platformOption) })}${attr("aria-pressed", selectedPlatforms.includes(platformOption))}>${escape_html(platformOption)}</button>`);
									}
									$$renderer.push(`<!--]--></div></fieldset> <label class="svelte-1uha8ag">Owned by</label> `);
									if (dialogLoading) $$renderer.push(`<!--[0--><p class="dialog-status svelte-1uha8ag">Loading users...</p>`);
									else if (gameUsers.length === 0) $$renderer.push(`<!--[1--><p class="dialog-status svelte-1uha8ag">No users found.</p>`);
									else {
										$$renderer.push(`<!--[-1--><div class="multi-select-list svelte-1uha8ag"><!--[-->`);
										const each_array_5 = ensure_array_like(gameUsers);
										for (let $$index_5 = 0, $$length = each_array_5.length; $$index_5 < $$length; $$index_5++) {
											let user = each_array_5[$$index_5];
											Button($$renderer, {
												variant: "outline",
												disabled: false,
												class: `multi-select-option ${selectedGameUsers.includes(user.full_name) ? "option-selected" : ""}`,
												onclick: () => toggleGameUser(user.full_name),
												children: ($$renderer) => {
													$$renderer.push(`<!---->${escape_html(user.full_name)}<span>${escape_html(selectedGameUsers.includes(user.full_name) ? "Added" : "Add")}</span>`);
												},
												$$slots: { default: true }
											});
										}
										$$renderer.push(`<!--]--></div>`);
									}
									$$renderer.push(`<!--]--></div> `);
									if (dialogError) $$renderer.push(`<!--[0--><p class="dialog-error svelte-1uha8ag">${escape_html(dialogError)}</p>`);
									else $$renderer.push("<!--[-1-->");
									$$renderer.push(`<!--]--> `);
									if (Dialog_footer) {
										$$renderer.push("<!--[-->");
										Dialog_footer($$renderer, {
											class: "dialog-footer",
											children: ($$renderer) => {
												Button($$renderer, {
													class: "dialog-cancel",
													variant: "outline",
													disabled: dialogLoading,
													onclick: cancelGameDialog,
													children: ($$renderer) => {
														$$renderer.push(`<!---->Cancel`);
													},
													$$slots: { default: true }
												});
												$$renderer.push(`<!----> `);
												Button($$renderer, {
													class: "dialog-button",
													disabled: dialogLoading || !gameName.trim() || selectedGenres.length === 0 || selectedPlatforms.length === 0,
													onclick: submitGame,
													children: ($$renderer) => {
														$$renderer.push(`<!---->Confirm`);
													},
													$$slots: { default: true }
												});
												$$renderer.push(`<!---->`);
											},
											$$slots: { default: true }
										});
										$$renderer.push("<!--]-->");
									} else {
										$$renderer.push("<!--[!-->");
										$$renderer.push("<!--]-->");
									}
								},
								$$slots: { default: true }
							});
							$$renderer.push("<!--]-->");
						} else {
							$$renderer.push("<!--[!-->");
							$$renderer.push("<!--]-->");
						}
					},
					$$slots: { default: true }
				});
				$$renderer.push("<!--]-->");
			} else {
				$$renderer.push("<!--[!-->");
				$$renderer.push("<!--]-->");
			}
			$$renderer.push(` `);
			if (Dialog) {
				$$renderer.push("<!--[-->");
				Dialog($$renderer, {
					get open() {
						return showResult;
					},
					set open($$value) {
						showResult = $$value;
						$$settled = false;
					},
					children: ($$renderer) => {
						if (Dialog_content) {
							$$renderer.push("<!--[-->");
							Dialog_content($$renderer, {
								class: `result-dialog dark-dialog`,
								showCloseButton: false,
								portalProps: {},
								children: ($$renderer) => {
									if (Dialog_header) {
										$$renderer.push("<!--[-->");
										Dialog_header($$renderer, {
											class: "dialog-header",
											children: ($$renderer) => {
												if (Dialog_title) {
													$$renderer.push("<!--[-->");
													Dialog_title($$renderer, {
														class: "dialog-title",
														children: ($$renderer) => {
															$$renderer.push(`<!---->Tonight's game is...`);
														},
														$$slots: { default: true }
													});
													$$renderer.push("<!--]-->");
												} else {
													$$renderer.push("<!--[!-->");
													$$renderer.push("<!--]-->");
												}
												$$renderer.push(` `);
												if (Dialog_description) {
													$$renderer.push("<!--[-->");
													Dialog_description($$renderer, {
														class: "dialog-description",
														children: ($$renderer) => {
															$$renderer.push(`<!---->Everyone's got it. Time to play.`);
														},
														$$slots: { default: true }
													});
													$$renderer.push("<!--]-->");
												} else {
													$$renderer.push("<!--[!-->");
													$$renderer.push("<!--]-->");
												}
											},
											$$slots: { default: true }
										});
										$$renderer.push("<!--]-->");
									} else {
										$$renderer.push("<!--[!-->");
										$$renderer.push("<!--]-->");
									}
									$$renderer.push(` `);
									if (chosenGame) {
										$$renderer.push(`<!--[0--><div${attr_class(`chosen-art ${stringify(chosenGame.accent)}`, "svelte-1uha8ag")}>`);
										if (chosenGame.image) $$renderer.push(`<!--[0--><img${attr("src", chosenGame.image)}${attr("alt", chosenGame.title)} class="svelte-1uha8ag"/>`);
										else $$renderer.push(`<!--[-1--><span class="chosen-fallback svelte-1uha8ag">${escape_html(chosenGame.title.slice(0, 2).toUpperCase())}</span>`);
										$$renderer.push(`<!--]--></div> <div class="chosen-details svelte-1uha8ag"><h3 class="svelte-1uha8ag">${escape_html(chosenGame.title)}</h3> <p class="svelte-1uha8ag">${escape_html(chosenGame.genre)} · ${escape_html(chosenGame.players)} players · ${escape_html(chosenGame.platform)}</p></div>`);
									} else $$renderer.push("<!--[-1-->");
									$$renderer.push(`<!--]--> `);
									if (Dialog_footer) {
										$$renderer.push("<!--[-->");
										Dialog_footer($$renderer, {
											class: "dialog-footer",
											children: ($$renderer) => {
												if (Dialog_close) {
													$$renderer.push("<!--[-->");
													Dialog_close($$renderer, {
														class: "dialog-button",
														children: ($$renderer) => {
															$$renderer.push(`<!---->Let's play`);
														},
														$$slots: { default: true }
													});
													$$renderer.push("<!--]-->");
												} else {
													$$renderer.push("<!--[!-->");
													$$renderer.push("<!--]-->");
												}
											},
											$$slots: { default: true }
										});
										$$renderer.push("<!--]-->");
									} else {
										$$renderer.push("<!--[!-->");
										$$renderer.push("<!--]-->");
									}
								},
								$$slots: { default: true }
							});
							$$renderer.push("<!--]-->");
						} else {
							$$renderer.push("<!--[!-->");
							$$renderer.push("<!--]-->");
						}
					},
					$$slots: { default: true }
				});
				$$renderer.push("<!--]-->");
			} else {
				$$renderer.push("<!--[!-->");
				$$renderer.push("<!--]-->");
			}
		}
		do {
			$$settled = true;
			$$inner_renderer = $$renderer.copy();
			$$render_inner($$inner_renderer);
		} while (!$$settled);
		$$renderer.subsume($$inner_renderer);
	});
}
//#endregion
export { _page as default };
