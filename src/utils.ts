/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
/**
 * Creates a `style` DOM element and adds it to the given DOM Element's child list with the CSS style
 * received in parameter
 *
 * @param {HTMLElement | ShadowRoot} domElement The DOM Element in which we want to add the style element
 * @param {string} styles The CSS style
 * @returns {void}
 */
export const applyStyleToElement = (
  domElement: HTMLElement | ShadowRoot,
  styles: string
) => {
  const styleElement = document.createElement("style");
  styleElement.textContent = styles;
  domElement.appendChild(styleElement);
};
