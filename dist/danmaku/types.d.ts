import { ViewProps } from 'react-native';
export interface DanmakuRef {
    play: () => void;
    pause: () => void;
    stop: () => void;
    /**
     * @description 跳转至某时间点
     * @param time 时间点，毫秒
     * @param play 可选 跳转后是否播放 默认为false
     */
    jump: (time: number, play?: boolean) => void;
    /**
     * @description 发送弹幕
     * @param data 弹幕数据
     * @param time 可选 弹幕所在时间点，默认为当前时间
     */
    send: (data: DanmakuBaseData, time?: number) => void;
}
export interface DanmakuProps extends ViewProps {
    data: Array<DanmakuData>;
    visible: boolean;
    maxLine?: number;
    playSpeed?: number;
    itemFontSize?: number;
    itemOpacity?: number;
    itemSpeed?: number;
    itemShadowHidden?: boolean;
}
export interface DanmakuData extends DanmakuBaseData {
    playTime: number;
}
export interface DanmakuBaseData {
    msg: string;
    mode?: number;
    color?: string;
    mark?: boolean;
}
export interface DanmakuItemProps {
    msg: string;
    color?: string;
    fontSize: number;
    opacity: number;
    speed: number;
    shadowHidden: boolean;
    mark: boolean;
    initLeft: number;
    containerWidth: number;
    playState: boolean;
    initVertical: number;
    onEnd: () => void;
}
export interface DanmakuRollItemProps extends DanmakuItemProps {
    setRight: (value: boolean) => void;
}
export interface DanmakuFixedItemProps extends DanmakuItemProps {
    positon: 'top' | 'bottom';
}
