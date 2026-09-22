export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([]),
	mimeTypes: {},
	_: {
		client: {start:"_app/immutable/entry/start.Do9OZI8P.js",app:"_app/immutable/entry/app.BGmOmN8q.js",imports:["_app/immutable/entry/start.Do9OZI8P.js","_app/immutable/chunks/CPPzZSIm.js","_app/immutable/chunks/Cl3zXerE.js","_app/immutable/entry/app.BGmOmN8q.js","_app/immutable/chunks/Cl3zXerE.js","_app/immutable/chunks/xihTtKlq.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js'))
		],
		remotes: {
			
		},
		routes: [
			
		],
		prerendered_routes: new Set(["/"]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
