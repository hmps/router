const state = {}
const routes = {};

initRouter();


/**
 * Set a default path to navigate to when a non-registered route is activated.
 * @param  {string} path The path to set as a default route.
 *
 * @return {string} The default path
 */
export function otherwise(path) {
    return routes.__default = path;
}


/**
 * Add a new route for the router to capture
 *
 * @param  {object} config A configuration object
 * @param  {string} config.path The path to bind to the route
 * @param  {string} config.template The template to render when the route is activated.
 * @param  {function} config.controller The controller to execute when the route is activated.
 *
 * @return {object} The config object
 */
export function route({ path = '', template = '', controller = ''}) {
    return routes[path] = {
        path,
        template,
        controller,
    };
}


/**
 * Start the router
 */
export function start() {
    router();
}


/**
 * Initiate the router
 * @private
 *
 * @return {boolean} True if the router was / has already been initiated.
 */
function initRouter() {
    if (!state.started) {
        window.addEventListener('hashchange', router);
        state.started = true;
    }

    return state.started;
}


/**
 * Do the actual routing.
 * @private
 */
function router() {
    const url = location.hash.replace(/[#/]/g, '') || '/';
    const route = routes[url];

    if (!route) {
        if (routes.__default) {
            location.hash = routes.__default;

            return;
        }
    }

    state.el = state.el || document.getElementById('router-view');

    if (state.el && route.template) {
        state.el.innerHTML = route.template;
    }
}
