/**
 * Map the given events to callback functions
 */
export default interface EventMap {
	[key: string]: (...args: any[]) => void;
};
