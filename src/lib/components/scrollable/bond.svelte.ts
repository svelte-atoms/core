import { createAttachmentKey } from 'svelte/attachments';
import { getContext, setContext } from 'svelte';
import { Bond, BondState, type BondStateProps } from '$svelte-atoms/core/shared/bond.svelte';

/**
 * Properties for the scrollable state containing all scroll-related data
 * Extends BondStateProps with scrollable-specific properties
 */
export type ScrollableStateProps = BondStateProps & {
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
};

/**
 * DOM elements managed by the scrollable bond
 * Each element represents a part of the scrollable interface
 */
export type ScrollableDomElements = {
	/** The root scrollable container element (acts as both root and scroll container) */
	root: HTMLElement;
	/** The container wrapper element that holds scrollable content and UI */
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
	/** Optional unified track element for generic track components */
	// track?: HTMLElement;
	/** Optional unified thumb element for generic thumb components */
	// thumb?: HTMLElement;
};

/**
 * Main bond class that manages scrollable state and DOM element interactions
 * Extends the base Bond class with scrollable-specific functionality
 */
export class ScrollableBond extends Bond<
	ScrollableStateProps,
	ScrollableState,
	ScrollableDomElements
> {
	/** Unique key for identifying this bond type in the context system */
	static CONTEXT_KEY = '@atoms/context/scrollable';

	/** Reference to parent scrollable bond (for nested scrollable areas) */
	#parent?: ScrollableBond;

	/**
	 * Creates a new scrollable bond instance
	 * @param state - The scrollable state instance to manage
	 */
	constructor(state: ScrollableState) {
		super(state);

		// Capture any existing scrollable context as parent
		this.#parent = ScrollableBond.get();
	}

	/**
	 * Gets the parent scrollable bond if this is a nested scrollable
	 * @returns The parent bond or undefined if this is the root scrollable
	 */
	get parent() {
		return this.#parent;
	}

	/**
	 * Shares this bond instance through the context system
	 * Makes this bond available to child components
	 * @returns This bond instance for chaining
	 */
	share() {
		ScrollableBond.set(this);
		return this;
	}

	/**
	 * Retrieves the current scrollable bond from context
	 * @returns The active scrollable bond or undefined if none exists
	 */
	static get(): ScrollableBond | undefined {
		return getContext(ScrollableBond.CONTEXT_KEY);
	}

	/**
	 * Sets the scrollable bond in context for child components
	 * @param bond - The bond instance to set in context
	 * @returns The bond that was set
	 */
	static set(bond: ScrollableBond): ScrollableBond {
		return setContext(ScrollableBond.CONTEXT_KEY, bond);
	}

	/**
	 * Creates props for the root element with hidden overflow
	 * The root element contains the entire scrollable interface but doesn't scroll itself
	 * @param props - Additional props to merge with the generated props
	 * @returns Object containing all necessary props for the root element
	 */
	root(props: Record<string, unknown> = {}) {
		return {
			'data-atom': this.id ?? '',
			'data-kind': 'scrollable-root',
			'data-disabled': this.state.props.disabled,
			'data-open': this.state.props.open,
			...props,
			// Attach the root DOM element
			[createAttachmentKey()]: (node: HTMLElement) => {
				this.elements.root = node;
			}
		};
	}

	/**
	 * Creates props for the scrollable container element
	 * This element is the actual scrollable area that handles scroll events
	 * @param props - Additional props to merge with the generated props
	 * @returns Object containing all necessary props for the container element
	 */
	container(props: Record<string, unknown> = {}) {
		return {
			'data-atom': this.id ?? '',
			'data-kind': 'scrollable-container',
			// Handle scroll events and update internal state
			onscroll: (e: Event) => {
				this.updateScrollState();
				if ('onscroll' in props && typeof props.onscroll === 'function') {
					props.onscroll(e);
				}
			},
			...props,
			// Attach the container DOM element and initialize scroll state
			[createAttachmentKey()]: (node: HTMLElement) => {
				this.elements.container = node;
				this.updateScrollState();
			}
		};
	}

	/**
	 * Creates props for the scrollable content wrapper element
	 * This element defines the boundaries and size of the scrollable content
	 * @param props - Additional props to merge with the generated props
	 * @returns Object containing all necessary props for the content element
	 */
	content(props: Record<string, unknown> = {}) {
		return {
			'data-atom': this.id ?? '',
			'data-kind': 'scrollable-content',
			...props,
			// Attach the content DOM element for measurement and interaction
			[createAttachmentKey()]: (node: HTMLElement) => {
				this.elements.content = node;
			}
		};
	}

	/**
	 * Creates props for the horizontal scrollbar track element
	 * Provides click-to-scroll functionality for horizontal navigation
	 * @param props - Additional props to merge with the generated props
	 * @returns Object containing all necessary props for the horizontal track element
	 */
	trackX(props: Record<string, unknown> = {}) {
		return {
			'data-atom': this.id ?? '',
			'data-kind': 'scrollable-track-x',
			'data-visible': this.canScrollX,
			...props,
			// Handle click-to-scroll on the horizontal track
			onclick: (e: MouseEvent) => {
				this.handleTrackClick(e, 'x');
				if ('onclick' in props && typeof props.onclick === 'function') {
					props.onclick(e);
				}
			},
			// Attach the horizontal track DOM element
			[createAttachmentKey()]: (node: HTMLElement) => {
				this.elements.trackX = node;
			}
		};
	}

	/**
	 * Creates props for the vertical scrollbar track element
	 * Provides click-to-scroll functionality for vertical navigation
	 * @param props - Additional props to merge with the generated props
	 * @returns Object containing all necessary props for the vertical track element
	 */
	trackY(props: Record<string, unknown> = {}) {
		return {
			'data-atom': this.id ?? '',
			'data-kind': 'scrollable-track-y',
			'data-visible': this.canScrollY,
			...props,
			// Handle click-to-scroll on the vertical track
			onclick: (e: MouseEvent) => {
				this.handleTrackClick(e, 'y');
				if ('onclick' in props && typeof props.onclick === 'function') {
					props.onclick(e);
				}
			},
			// Attach the vertical track DOM element
			[createAttachmentKey()]: (node: HTMLElement) => {
				this.elements.trackY = node;
			}
		};
	}

	/**
	 * Creates props for the horizontal scrollbar thumb element
	 * Provides drag-to-scroll functionality and automatic positioning/sizing
	 * @param props - Additional props to merge with the generated props
	 * @returns Object containing all necessary props for the horizontal thumb element
	 */
	thumbX(props: Record<string, unknown> = {}) {
		return {
			'data-atom': this.id ?? '',
			'data-kind': 'scrollable-thumb-x',
			...props,
			// Dynamically position and size the thumb based on scroll state
			style: `left: ${this.getThumbXPosition()}%; width: ${this.getThumbXSize()}%;`,
			// Handle drag-to-scroll interaction
			onmousedown: (e: MouseEvent) => {
				this.handleThumbDrag(e, 'x');
				if ('onmousedown' in props && typeof props.onmousedown === 'function') {
					props.onmousedown(e);
				}
			},
			// Attach the horizontal thumb DOM element
			[createAttachmentKey()]: (node: HTMLElement) => {
				this.elements.thumbX = node;
			}
		};
	}

	/**
	 * Creates props for the vertical scrollbar thumb element
	 * Provides drag-to-scroll functionality and automatic positioning/sizing
	 * @param props - Additional props to merge with the generated props
	 * @returns Object containing all necessary props for the vertical thumb element
	 */
	thumbY(props: Record<string, unknown> = {}) {
		return {
			'data-atom': this.id ?? '',
			'data-kind': 'scrollable-thumb-y',
			...props,
			// Dynamically position and size the thumb based on scroll state
			style: `top: ${this.getThumbYPosition()}%; height: ${this.getThumbYSize()}%;`,
			// Handle drag-to-scroll interaction
			onmousedown: (e: MouseEvent) => {
				this.handleThumbDrag(e, 'y');
				if ('onmousedown' in props && typeof props.onmousedown === 'function') {
					props.onmousedown(e);
				}
			},
			// Attach the vertical thumb DOM element
			[createAttachmentKey()]: (node: HTMLElement) => {
				this.elements.thumbY = node;
			}
		};
	}

	/**
	 * Creates props for a unified track element that can be oriented horizontally or vertically
	 * This method provides a single interface for both horizontal and vertical tracks
	 * @param orientation - The track orientation ('horizontal' or 'vertical')
	 * @param props - Additional props to merge with the generated props
	 * @returns Object containing all necessary props for the track element
	 */
	track(orientation: 'horizontal' | 'vertical', props: Record<string, unknown> = {}) {
		const isHorizontal = orientation === 'horizontal';
		return {
			'data-atom': this.id ?? '',
			'data-kind': `scrollable-track-${isHorizontal ? 'x' : 'y'}`,
			'data-direction': orientation,
			'data-visible': isHorizontal ? this.canScrollX : this.canScrollY,
			...props,
			// Handle click-to-scroll based on orientation
			onclick: (e: MouseEvent) => {
				this.handleTrackClick(e, isHorizontal ? 'x' : 'y');
				if ('onclick' in props && typeof props.onclick === 'function') {
					props.onclick(e);
				}
			},
			[createAttachmentKey()]: (node: HTMLElement) => {
				// Set both the unified track reference and the specific axis reference
				if (isHorizontal) {
					this.elements.trackX = node;
				} else {
					this.elements.trackY = node;
				}
			}
		};
	}

	/**
	 * Creates props for a unified thumb element that can be oriented horizontally or vertically
	 * This method provides a single interface for both horizontal and vertical thumbs
	 * @param orientation - The thumb orientation ('horizontal' or 'vertical')
	 * @param props - Additional props to merge with the generated props
	 * @returns Object containing all necessary props for the thumb element
	 */
	thumb(orientation: 'horizontal' | 'vertical', props: Record<string, unknown> = {}) {
		const isHorizontal = orientation === 'horizontal';
		// Calculate position and size based on orientation
		// const position = isHorizontal ? this.getThumbXPosition() : this.getThumbYPosition();
		// const size = isHorizontal ? this.getThumbXSize() : this.getThumbYSize();
		// const styleProperty = isHorizontal ? 'left' : 'top';
		// const sizeProperty = isHorizontal ? 'width' : 'height';

		return {
			'data-atom': this.id ?? '',
			'data-kind': `scrollable-thumb-${isHorizontal ? 'x' : 'y'}`,
			'data-direction': orientation,
			...props,
			// Handle drag-to-scroll based on orientation
			onmousedown: (e: MouseEvent) => {
				this.handleThumbDrag(e, isHorizontal ? 'x' : 'y');
				if ('onmousedown' in props && typeof props.onmousedown === 'function') {
					props.onmousedown(e);
				}
			},
			[createAttachmentKey()]: (node: HTMLElement) => {
				// Set both the unified thumb reference and the specific axis reference
				if (isHorizontal) {
					this.elements.thumbX = node;
				} else {
					this.elements.thumbY = node;
				}
			}
		};
	}

	/**
	 * Handles click events on scrollbar tracks for jump-to-position scrolling
	 * Calculates the click position as a percentage and scrolls to that position
	 * @param e - The mouse event from the track click
	 * @param axis - The scroll axis ('x' for horizontal, 'y' for vertical)
	 */
	private handleTrackClick(e: MouseEvent, axis: 'x' | 'y') {
		const container = this.elements.container;
		const track = axis === 'x' ? this.elements.trackX : this.elements.trackY;
		if (!container || !track) return;

		// Calculate click position relative to track boundaries
		const rect = track.getBoundingClientRect();
		const clickPosition = axis === 'x' ? e.clientX - rect.left : e.clientY - rect.top;
		const trackSize = axis === 'x' ? rect.width : rect.height;
		const percentage = clickPosition / trackSize;

		// Apply scroll based on calculated percentage
		if (axis === 'x') {
			const maxScrollX = container.scrollWidth - container.clientWidth;
			container.scrollLeft = percentage * maxScrollX;
		} else {
			const maxScrollY = container.scrollHeight - container.clientHeight;
			container.scrollTop = percentage * maxScrollY;
		}
	}

	/**
	 * Handles mouse drag events on scrollbar thumbs for precise scrolling control
	 * Sets up mouse event listeners for drag-to-scroll functionality
	 * @param e - The initial mousedown event on the thumb
	 * @param axis - The scroll axis ('x' for horizontal, 'y' for vertical)
	 */
	private handleThumbDrag(e: MouseEvent, axis: 'x' | 'y') {
		e.preventDefault();
		// Set scrolling state to true
		this.state.props.isScrolling = true;

		const container = this.elements.container;
		const track = axis === 'x' ? this.elements.trackX : this.elements.trackY;
		if (!container || !track) return;

		// Capture initial state for drag calculations
		const trackRect = track.getBoundingClientRect();
		const startPos = axis === 'x' ? e.clientX : e.clientY;
		const startScroll = axis === 'x' ? container.scrollLeft : container.scrollTop;

		/**
		 * Handles mouse movement during thumb drag
		 * Calculates scroll position based on cursor movement relative to track size
		 */
		const onMouseMove = (moveE: MouseEvent) => {
			const currentPos = axis === 'x' ? moveE.clientX : moveE.clientY;
			const delta = currentPos - startPos;
			const trackSize = axis === 'x' ? trackRect.width : trackRect.height;

			// Apply proportional scrolling based on thumb movement
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

		/**
		 * Cleans up mouse event listeners when drag ends
		 */
		const onMouseUp = () => {
			// Set scrolling state to true
			this.state.props.isScrolling = false;

			document.removeEventListener('mousemove', onMouseMove);
			document.removeEventListener('mouseup', onMouseUp);
		};

		// Set up global mouse event listeners for drag interaction
		document.addEventListener('mousemove', onMouseMove);
		document.addEventListener('mouseup', onMouseUp);
	}

	/**
	 * Scrolls to an absolute position in the scrollable area
	 * @param x - The horizontal scroll position in pixels
	 * @param y - The vertical scroll position in pixels
	 */
	scrollTo(x: number, y: number) {
		const container = this.elements.container;

		if (container) {
			container.scrollTo(x, y);
		}
	}

	/**
	 * Scrolls by a relative amount from the current position
	 * @param x - The horizontal scroll delta in pixels
	 * @param y - The vertical scroll delta in pixels
	 */
	scrollBy(x: number, y: number) {
		const container = this.elements.container;

		if (container) {
			container.scrollBy(x, y);
		}
	}

	/**
	 * Scrolls an element into view within the scrollable area
	 * @param element - The element to scroll into view
	 * @param options - Optional scroll behavior configuration
	 */
	scrollIntoView(element: Element, options?: ScrollIntoViewOptions) {
		const container = this.elements.container;

		if (container && container.contains(element)) {
			element.scrollIntoView(options);
		}
	}

	/**
	 * Updates the internal scroll state based on current DOM measurements
	 * This method should be called when the scroll position or content size changes
	 * TODO: Implement reactive binding updates for scroll properties
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

	/**
	 * Calculates the horizontal thumb position as a percentage
	 * @returns The left position of the horizontal thumb (0-100%)
	 */
	getThumbXPosition(): number {
		const { scrollX, clientWidth, scrollWidth } = this.state.props;
		if (scrollWidth <= clientWidth) return 0;
		return (scrollX / (scrollWidth - clientWidth)) * 100;
	}

	/**
	 * Calculates the vertical thumb position as a percentage
	 * @returns The top position of the vertical thumb (0-100%)
	 */
	getThumbYPosition(): number {
		const { scrollY, clientHeight, scrollHeight } = this.state.props;
		if (scrollHeight <= clientHeight) return 0;
		return (scrollY / (scrollHeight - clientHeight)) * 100;
	}

	/**
	 * Calculates the horizontal thumb size as a percentage
	 * @returns The width of the horizontal thumb (0-100%)
	 */
	getThumbXSize(): number {
		const { clientWidth, scrollWidth } = this.state.props;
		if (scrollWidth <= clientWidth) return 100;
		return (clientWidth / scrollWidth) * 100;
	}

	/**
	 * Calculates the vertical thumb size as a percentage
	 * @returns The height of the vertical thumb (0-100%)
	 */
	getThumbYSize(): number {
		const { clientHeight, scrollHeight } = this.state.props;
		if (scrollHeight <= clientHeight) return 100;
		return (clientHeight / scrollHeight) * 100;
	}

	/**
	 * Determines if horizontal scrolling is possible
	 * @returns True if content width exceeds visible area width
	 */
	get canScrollX(): boolean {
		const { scrollWidth, clientWidth } = this.state.props;
		return scrollWidth > clientWidth;
	}

	/**
	 * Determines if vertical scrolling is possible
	 * @returns True if content height exceeds visible area height
	 */
	get canScrollY(): boolean {
		const { scrollHeight, clientHeight } = this.state.props;
		return scrollHeight > clientHeight;
	}
}

/**
 * Reactive state container for scrollable component properties
 * Extends BondState to provide typed access to scroll-related data
 */
export class ScrollableState extends BondState<ScrollableStateProps> {
	/**
	 * Creates a new scrollable state instance
	 * @param props - Function that returns the current state properties
	 */
	constructor(props: () => ScrollableStateProps) {
		super(props);
	}
}
