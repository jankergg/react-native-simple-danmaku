interface RafLoopProps {
    state: boolean;
    callback: (time: number, init: boolean) => boolean;
}
export declare const useRafLoop: (props: RafLoopProps) => void;
export {};
