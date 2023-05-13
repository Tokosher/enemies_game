// FIX THE PROBLEM WITH RIGHT MOVING CHARACTER
// todo add page on github
import * as PIXI from 'pixi.js';
import { Constants } from './utils/utils';
import {Enemy} from "./components/enemy";

const app = new PIXI.Application({
    width: Constants.WIDTH,
    height: Constants.HEIGHT,
    backgroundColor: 0x1099bb, // light blue
    sharedTicker: true,
    sharedLoader: true,
});
document.body.appendChild(app.view);

const enemiesData = require('./data/enemies.json'); // enemies data
const loader = PIXI.Loader.shared;

// adding a background // todo make a separate class for that
// loader.add('background', './assets/background.png'); // todo add Names space with enemies / background
// loader.load(onBackgroundLoaded);

function onBackgroundLoaded (loader, resources) {

}
// loader.add('tileset', './assets/img/spritesheet.json')
//     .load(onload)
//
// function  onload (loader, resources) {
//     const dragonTexture = PIXI.Texture.from("monster.png");
//     const sprite = new PIXI.Sprite(dragonTexture);
//     sprite.position.set(200, 200);
//     app.stage.addChild(sprite);
// }
loader.add('tileset', './assets/img/spritesheet.json')
    .add('background', './assets/background.png')
    .load(onload);

function onload (loader, resources) {
    // adding a background todo move to separate class / function
    const texture = resources.background.texture;
    const background = new PIXI.Sprite(texture);
    addChild(background);

    const enemy = new Enemy(enemiesData[0])
    addChild(enemy);
}


// utils
function addChild (child) {
    app.stage.addChild(child);
}
