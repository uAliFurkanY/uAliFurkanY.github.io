class Clipboard {
	constructor(element) {
		if ((function (o) {
			return (
				typeof HTMLElement === "object" ? o instanceof HTMLElement : //DOM2
					o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName === "string"
			);
		})(element))
			this.element = element;
		else
			throw new Error(element + "is not an element.");
	}

	copy(copy_only) {
		if (copy_only)
			document.execCommand("copy");
		else {
			let wasSelected = this.isSelected();
			let oldSelection = this.getSelection();
			if (wasSelected) {
				this.select();
				this.copy(true);
				this.setSelect(oldSelection.start, oldSelection.end);
			}
			else
				this.copy(true);
		}
	}

	select() {
		this.element.select();
	}
	unSelect() {
		this.element.selectionStart = this.element.textContent.length;
		this.element.selectionEnd = this.element.textContent.length;
	}
	setSelect(start = 0, end = 0) {
		if (typeof start === "object") {
			this.element.selectionStart = start.start;
			this.element.selectionEnd = start.end;
		}
		else {
			this.element.selectionStart = start;
			this.element.selectionEnd = end;
		}
	}
	getSelection() {
		return { start: this.element.selectionStart, end: this.element.selectionEnd };
	}
	isAllSelected() {
		return Math.abs(this.getSelection().start - this.getSelection().end) === this.element.textContent.length;
	}
	isSelected() {
		return Math.abs(this.getSelection().start - this.getSelection().end) !== 0;
	}
}