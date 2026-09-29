// lesson-07-jsx/src/h.js
// This will be a "factory" function to help
// in transforming JSX into ordinary JavaScript

/**
 * h() is a factory function used by Oxc to transpile JSX into JavaScript.
 * 
 * @param {string} tag - A string representing the tag name
 * @param {object} props - An object representing all the attributes for the tag
 * @param  {...any} children - Any nested tags
 */
export function h(tag, props, ...children) {
    const element = document.createElement(tag);

    const properties = Object.entries(props ?? {});

    for (const [name, value] of properties) {
        if (name.startsWith('on') && typeof value === 'function') {
            // e.g.: if name is 'onclick', the event is 'click'
            const eventName = name.slice(2).toLowerCase();
            element.addEventListener(eventName, value);
        } else {
            element.setAttribute(name, value);
        }
    }

    element.append(...children.flat()); // .flat() is like copying
    return element;
}
