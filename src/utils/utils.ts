import { CounterPosition } from '../components/enemies-counter';

export class Constants {
    public static WIDTH = 600;
    public static HEIGHT = 600;
    public static BACKGROUND_COLOR = 0x1099bb;

    public static ANIMATION_STEP_AMOUNT = 3;

    public static TEXT_STYLE = {
        fontName: 'Desyrel',
        fontSize: 50,
    };
    public static textBeforeEnemiesCounter: string = 'Enemies: ';
    public static enemyCounterPosition: CounterPosition = 'topLeft';
}

export const REQUIRED_DATA_FOR_LOADER = {
    'tileset': './assets/atlases/spritesheet.json',
    'background': './assets/images/background.png',
    'Desyrel': './assets/fonts/desyrel.xml'
}

export interface PositionData {
    x: number,
    y: number
}
