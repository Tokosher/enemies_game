import { CounterPosition } from '../components/enemies-counter';
export declare class Constants {
    static WIDTH: number;
    static HEIGHT: number;
    static BACKGROUND_COLOR: number;
    static ANIMATION_STEP_AMOUNT: number;
    static TEXT_STYLE: {
        fontName: string;
        fontSize: number;
    };
    static textBeforeEnemiesCounter: string;
    static enemyCounterPosition: CounterPosition;
}
export declare const REQUIRED_DATA_FOR_LOADER: {
    tileset: string;
    background: string;
    Desyrel: string;
};
export interface PositionData {
    x: number;
    y: number;
}
