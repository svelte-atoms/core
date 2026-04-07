import { getContext, setContext, untrack } from 'svelte';
import { createAttachmentKey } from 'svelte/attachments';
import {
	Bond,
	BondState,
	BondAtom,
	type BondStateProps
} from '$svelte-atoms/core/shared/bond.svelte';

/**
 * Properties for the scrollable state containing all scroll-related data
 */
export type ScrollableBondProps = BondStateProps & {
	/** Current horizontal scroll position in pixels */
	scrollX: number;
	/** Current vertical scroll position in pixels */
	scrollY: number;
	/** Total scrollable width of content in pixels */
	scrollWidth: number;
	/** Total scrollable height of content in pixels */
	scrollHeight: number;
	/** Visible width of the scrollable area in pixels */
	clientWidth: number;
	/** Visible height of the scrollable area in pixels */
	clientHeight: number;
	/** Whether scrolling is disabled */
	disabled: boolean;
	/** Whether custom scrollbars should be hidden */
	open: boolean;
	/** Indicates if the user is currently scrolling */
	isScrolling?: boolean;
	/** Rest props passed to the component */
	readonly rest?: Record<string, unknown>;
};

/**
 * DOM elements managed by the scrollable bond
 */
export type ScrollableBondElements = {
	/** The root scrollable container element */
	root: HTMLElement;
	/** The container wrapper element that holds scrollable content */
	container: HTMLElement;
	/** The content wrapper element that defines scrollable bounds */
	content: HTMLElement;
	/** Horizontal scrollbar track element */
	trackX: HTMLElement;
	/** Vertical scrollbar track element */
	trackY: HTMLElement;
	/** Horizontal scrollbar thumb element */
	thumbX: HTMLElement;
	/** Vertical scrollbar thumb element */
	thumbY: HTMLElement;
};

// ============================================================================
// BondAtom Classes
// ============================================================================

/**
 * Root atom for the scrollable component
 */
export class ScrollableRootAtom extends BondAtom<ScrollableBond> {
	constructor(bond: ScrollableBond) {
		super(bond, 'root');
	}

	override get attrs() {
		const props = untrack(() => this.bond.state.props);

		return {
			...super.attrs,
			'data-disabled': props.disabled,
			'data-open': props.open
		};
	}
}

/**
 * Container atom for the scrollable area
 */
export class ScrollableContainerAtom extends BondAtom<ScrollableBond> {
	constructor(bond: ScrollableBond) {
		super(bond, 'container');
	}

	override get handlers() {
		return {
			onscroll: (e: Event) => {
				this.bond.updateScrollState();
			}
		};
	}

	override onmount(node: HTMLElement) {
		this.bond.updateScrollState();
	}
}

/**
 * Content atom for the scrollable content wrapper
 */
export class ScrollableContentAtom extends BondAtom<ScrollableBond> {
	constructor(bond: ScrollableBond) {
		super(bond, 'content');
	}
}

/**
 * Track atom for scrollbar tracks (horizontal or vertical)
 */
export class ScrollableTrackAtom extends BondAtom<ScrollableBond> {
	#axis: 'x' | 'y';

	constructor(bond: ScrollableBond, axis: 'x' | 'y') {
		super(bond, axis === 'x' ? 'trackX' : 'trackY');
		this.#axis = axis;
	}

	override get attrs() {
		const canScroll = this.#axis === 'x' ? this.bond.canScrollX : this.bond.canScrollY;

		return {
			...super.attrs,
			'data-visible': canScroll,
			'data-direction': this.#axis === 'x' ? 'horizontal' : 'vertical'
		};
	}

	override get handlers() {
		return {
			onclick: (e: MouseEvent) => {
				this.bond.handleTrackClick(e, this.#axis);
			}
		};
	}
}

/**
 * Thumb atom for scrollbar thumbs (horizontal or vertical)
 */
export class ScrollableThumbAtom extends BondAtom<ScrollableBond> {
	#axis: 'x' | 'y';

	constructor(bond: ScrollableBond, axis: 'x' | 'y') {
		super(bond, axis === 'x' ? 'thumbX' : 'thumbY');
		this.#axis = axis;
	}

	override get attrs() {
		const position =
			this.#axis === 'x' ? this.bond.getThumbXPosition() : this.bond.getThumbYPosition();
		const size = this.#axis === 'x' ? this.bond.getThumbXSize() : this.bond.getThumbYSize();

		const styleProperty = this.#axis === 'x' ? 'left' : 'top';
		const sizeProperty = this.#axis === 'x' ? 'width' : 'height';

		return {
			...super.attrs,
			'data-direction': this.#axis === 'x' ? 'horizontal' : 'vertical',
			style: `${styleProperty}: ${position}%; ${sizeProperty}: ${size}%;`
		};
	}

	override get handlers() {
		return {
			onmousedown: (e: MouseEvent) => {
				this.bond.handleThumbDrag(e, this.#axis);
			}
		};
	}
}

// ============================================================================
// ScrollableBond Class
// ============================================================================

/**
 * Main bond class that manages scrollable state and DOM element interactions
 */
export class ScrollableBond extends Bond<
	ScrollableBondProps,
	ScrollableState,
	ScrollableBondElements
> {
	static CONTEXT_KEY = '@atoms/context/scrollable';

	#parent?: ScrollableBond;

	constructor(state: ScrollableState) {
		super(state);
		this.#parent = ScrollableBond.get();
	}

	get parent() {
		return this.#parent;
	}

	share() {
		ScrollableBond.set(this);
		return this;
	}

	static get(): ScrollableBond | undefined {
		return getContext(ScrollableBond.CONTEXT_KEY);
	}

	static set(bond: ScrollableBond): ScrollableBond {
		return setContext(ScrollableBond.CONTEXT_KEY, bond);
	}

	// ============================================================================
	// Atom Helpers
	// ============================================================================

	root() {
		return this.atom('root', () => new ScrollableRootAtom(this));
	}

	container() {
		return this.atom('container', () => new ScrollableContainerAtom(this));
	}

	content() {
		return this.atom('content', () => new ScrollableContentAtom(this));
	}

	trackX() {
		return this.atom('trackX', () => new ScrollableTrackAtom(this, 'x'));
	}

	trackY() {
		return this.atom('trackY', () => new ScrollableTrackAtom(this, 'y'));
	}

	thumbX() {
		return this.atom('thumbX', () => new ScrollableThumbAtom(this, 'x'));
	}

	thumbY() {
		return this.atom('thumbY', () => new ScrollableThumbAtom(this, 'y'));
	}

	// ============================================================================
	// Public API Methods
	// ============================================================================

	/**
	 * Scrolls to an absolute position
	 */
	scrollTo(x: number, y: number) {
		const container = this.elements.container;
		if (container) {
			container.scrollTo(x, y);
		}
	}

	/**
	 * Scrolls by a relative amount
	 */
	scrollBy(x: number, y: number) {
		const container = this.elements.container;
		if (container) {
			container.scrollBy(x, y);
		}
	}

	/**
	 * Scrolls an element into view
	 */
	scrollIntoView(element: Element, options?: ScrollIntoViewOptions) {
		const container = this.elements.container;
		if (container && container.contains(element)) {
			element.scrollIntoView(options);
		}
	}

	/**
	 * Updates the internal scroll state based on current DOM measurements
	 */
	updateScrollState() {
		const container = this.elements.container;
		if (!container) return;

		this.state.props.scrollX = container.scrollLeft;
		this.state.props.scrollY = container.scrollTop;
		this.state.props.scrollWidth = container.scrollWidth;
		this.state.props.scrollHeight = container.scrollHeight;
		this.state.props.clientWidth = container.clientWidth;
		this.state.props.clientHeight = container.clientHeight;
	}

	// ============================================================================
	// Scroll Calculations
	// ============================================================================

	getThumbXPosition(): number {
		const { scrollX, clientWidth, scrollWidth } = this.state.props;
		if (scrollWidth <= clientWidth) return 0;
		const thumbSize = this.getThumbXSize();
		const maxPosition = 100 - thumbSize;
		const scrollPercentage = scrollX / (scrollWidth - clientWidth);
		return scrollPercentage * maxPosition;
	}

	getThumbYPosition(): number {
		const { scrollY, clientHeight, scrollHeight } = this.state.props;
		if (scrollHeight <= clientHeight) return 0;
		const thumbSize = this.getThumbYSize();
		const maxPosition = 100 - thumbSize;
		const scrollPercentage = scrollY / (scrollHeight - clientHeight);
		return scrollPercentage * maxPosition;
	}

	getThumbXSize(): number {
		const { clientWidth, scrollWidth } = this.state.props;
		if (scrollWidth <= clientWidth) return 100;
		return (clientWidth / scrollWidth) * 100;
	}

	getThumbYSize(): number {
		const { clientHeight, scrollHeight } = this.state.props;
		if (scrollHeight <= clientHeight) return 100;
		return (clientHeight / scrollHeight) * 100;
	}

	get canScrollX(): boolean {
		const { scrollWidth, clientWidth } = this.state.props;
		return scrollWidth > clientWidth;
	}

	get canScrollY(): boolean {
		const { scrollHeight, clientHeight } = this.state.props;
		return scrollHeight > clientHeight;
	}

	// ============================================================================
	// Event Handlers
	// ============================================================================

	/**
	 * Handles click events on scrollbar tracks
	 */
	handleTrackClick(e: MouseEvent, axis: 'x' | 'y') {
		const container = this.elements.container;
		const track = axis === 'x' ? this.elements.trackX : this.elements.trackY;
		if (!container || !track) return;

		const rect = track.getBoundingClientRect();
		const clickPosition = axis === 'x' ? e.clientX - rect.left : e.clientY - rect.top;
		const trackSize = axis === 'x' ? rect.width : rect.height;
		const percentage = clickPosition / trackSize;

		if (axis === 'x') {
			const maxScrollX = container.scrollWidth - container.clientWidth;
			container.scrollLeft = percentage * maxScrollX;
		} else {
			const maxScrollY = container.scrollHeight - container.clientHeight;
			container.scrollTop = percentage * maxScrollY;
		}
	}

	/**
	 * Handles mouse drag events on scrollbar thumbs
	 */
	handleThumbDrag(e: MouseEvent, axis: 'x' | 'y') {
		e.preventDefault();
		this.state.props.isScrolling = true;

		const container = this.elements.container;
		const track = axis === 'x' ? this.elements.trackX : this.elements.trackY;
		if (!container || !track) return;

		const trackRect = track.getBoundingClientRect();
		const startPos = axis === 'x' ? e.clientX : e.clientY;
		const startScroll = axis === 'x' ? container.scrollLeft : container.scrollTop;

		const onMouseMove = (moveE: MouseEvent) => {
			const currentPos = axis === 'x' ? moveE.clientX : moveE.clientY;
			const delta = currentPos - startPos;
			const trackSize = axis === 'x' ? trackRect.width : trackRect.height;

			if (axis === 'x') {
				const maxScrollX = container.scrollWidth - container.clientWidth;
				const scrollDelta = (delta / trackSize) * maxScrollX;
				container.scrollLeft = Math.max(0, Math.min(maxScrollX, startScroll + scrollDelta));
			} else {
				const maxScrollY = container.scrollHeight - container.clientHeight;
				const scrollDelta = (delta / trackSize) * maxScrollY;
				container.scrollTop = Math.max(0, Math.min(maxScrollY, startScroll + scrollDelta));
			}
		};

		const onMouseUp = () => {
			this.state.props.isScrolling = false;
			document.removeEventListener('mousemove', onMouseMove);
			document.removeEventListener('mouseup', onMouseUp);
		};

		document.addEventListener('mousemove', onMouseMove);
		document.addEventListener('mouseup', onMouseUp);
	}
}

/**
 * Reactive state container for scrollable component properties
 */
export class ScrollableState extends BondState<ScrollableBondProps> {
	constructor(props: () => ScrollableBondProps) {
		super(props);
	}
}
