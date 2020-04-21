"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Creates a `style` DOM element and adds it to the given DOM Element's child list with the CSS style
 * received in parameter
 *
 * @param {HTMLElement | ShadowRoot} domElement The DOM Element in which we want to add the style element
 * @param {string} styles The CSS style
 * @returns {void}
 */
exports.applyStyleToElement = (domElement, styles) => {
    const styleElement = document.createElement("style");
    styleElement.textContent = styles;
    domElement.appendChild(styleElement);
};
//# sourceMappingURL=utils.js.map