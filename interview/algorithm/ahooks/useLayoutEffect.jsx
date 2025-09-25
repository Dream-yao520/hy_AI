import { useLayoutEffect, useRef } from 'react';

function useUpdateLayoutEffect(fn, deps) {
    const firstRef = useRef(true);

    useLayoutEffect(() => {
        if (firstRef.current) {
            firstRef.current = false;
            return;
        }
        return fn();
    }, deps);
}

export default useUpdateLayoutEffect;