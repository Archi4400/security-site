import type { ThemeName } from './config';

export interface HeadScriptData {
  lang: string;
  files: Record<string, string>;
  color: Record<ThemeName, string>;
}

/**
 * Runs before first paint: the stored theme, the `js` class, and a preload of
 * the stored language's dictionary so the swap is not a full round trip late.
 */
export function headScript(data: HeadScriptData): string {
  const json = JSON.stringify(data).replace(/</g, '\\u003c');
  return `(function(){var c=${json};var d=document.documentElement;d.classList.add('js');try{var s=localStorage.getItem('theme');if(s==='light'||s==='dark')d.setAttribute('data-theme',s)}catch(e){}var m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute('content',c.color[d.getAttribute('data-theme')==='light'?'light':'dark']);var l=null;try{l=new URLSearchParams(location.search).get('lang')||localStorage.getItem('lang')}catch(e){}if(l&&l!==c.lang&&Object.prototype.hasOwnProperty.call(c.files,l)){var p=document.createElement('link');p.rel='preload';p.as='fetch';p.setAttribute('crossorigin','anonymous');p.href=c.files[l];document.head.appendChild(p)}})();`;
}
