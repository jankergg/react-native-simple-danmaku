import { useRef, useEffect } from 'react';
export const useRafLoop = (props) => {
    const ref = useRef();
    useEffect(() => {
        ref.current = props.callback;
    });
    const loop = (time, init) => {
        const rv = ref.current(time, init);
        rv && props.state && requestAnimationFrame(time => loop(time, false));
    };
    useEffect(() => {
        props.state && requestAnimationFrame(time => loop(time, true));
    }, [props.state]);
};
//# sourceMappingURL=hooks.js.map