// TODO ADD A BORDER BLOCK AND COLLISION
// FIX THE PROBLEM WITH RIGHT MOVING CHARACTER
// todo add page on github
import * as PIXI from 'pixi.js';

const WIDTH = 600;
const HEIGHT = 600;

const app = new PIXI.Application({
    width: WIDTH,
    height: HEIGHT,
    backgroundColor: 0x1099bb, // light blue
    sharedTicker: true,
    sharedLoader: true,
});
document.body.appendChild(app.view);

const data = require('./data/enemies.json'); // enemies data
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
loader.add('tileset', './assets/img/enemy/enemy-spritesheet.json')
    .add('background', './assets/background.png')
    .load(onload);

function onload (loader, resources) {
    const texture = resources.background.texture;
    const background = new PIXI.Sprite(texture);
    addChild(background);

    const textures = [];
    for (let i = 0; i < 3; i++) {
        textures.push(PIXI.Texture.from(`left-step${i+1}.png`))
    }

    const enemy = new PIXI.AnimatedSprite(textures);
    // enemy.position.set(200, 200);
    enemy.scale.set(2, 2);
    app.stage.addChild(enemy);

    enemy.play();
    enemy.animationSpeed = 0.1;
}


// utils
function addChild (child) {
    app.stage.addChild(child);
}
