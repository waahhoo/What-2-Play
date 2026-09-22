import * as universal from '../entries/pages/_layout.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.js";
export const imports = ["_app/immutable/nodes/0.DNTg42g1.js","_app/immutable/chunks/Cl3zXerE.js","_app/immutable/chunks/xihTtKlq.js"];
export const stylesheets = ["_app/immutable/assets/0.Dm--1QvO.css"];
export const fonts = ["_app/immutable/assets/inter-cyrillic-ext-wght-normal.BOeWTOD4.woff2","_app/immutable/assets/inter-cyrillic-wght-normal.DqGufNeO.woff2","_app/immutable/assets/inter-greek-ext-wght-normal.DlzME5K_.woff2","_app/immutable/assets/inter-greek-wght-normal.CkhJZR-_.woff2","_app/immutable/assets/inter-vietnamese-wght-normal.CBcvBZtf.woff2","_app/immutable/assets/inter-latin-ext-wght-normal.DO1Apj_S.woff2","_app/immutable/assets/inter-latin-wght-normal.Dx4kXJAl.woff2"];
