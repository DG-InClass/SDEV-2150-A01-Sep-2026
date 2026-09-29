// announcement.jsx
//   under lesson-07-jsx/src/ folder

import { h } from './h';

export function announcement(message) {
    return <div class="banner">{message}</div>
}

/*
export function announcement(message) {
    const el = document.createElement('div');
    el.setAttribute('class', 'banner');
    const text = document.createTextNode(message);
    el.appendChild(text);
    return el;
}
*/