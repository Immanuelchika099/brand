import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
export default function useGsap(setup, deps = []) {
 const scope = useRef(null);
 useLayoutEffect(() => {
  const ctx = gsap.context(() => setup(gsap), scope.current);
  return () => ctx.revert();
 // eslint-disable-next-line react-hooks/exhaustive-deps
 }, deps);
 return scope;
}