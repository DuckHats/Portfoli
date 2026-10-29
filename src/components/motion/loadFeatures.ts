/** The animation engine, in its own chunk so it stays out of the entry bundle. */
export const loadFeatures = () => import('./features').then((module) => module.default)
