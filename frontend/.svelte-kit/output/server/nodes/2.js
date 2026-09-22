

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.BXElkj2M.js","_app/immutable/chunks/Cl3zXerE.js","_app/immutable/chunks/xihTtKlq.js"];
export const stylesheets = ["_app/immutable/assets/2.NNNaNt-d.css"];
export const fonts = [];
