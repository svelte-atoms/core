export function call<const T extends (...args: any) => any = (...args: any) => any>(
	param: T,
	...args: any[]
): ReturnType<T>;
export function call<const T>(param: T, ...args: any[]): T;
export function call<const T>(param: T, ...args: any[]) {
	if (typeof param === 'function') {
		return param(...args);
	}
	return param;
}
