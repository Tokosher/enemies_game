import * as PIXI from 'pixi.js';
import { Constants } from './utils/utils';
import { Enemy } from './components/enemy';
import { EnemiesController } from './components/enemies-controller';
import { REQUIRED_DATA_FOR_LOADER } from './utils/utils'

const app = createApplication();
document.body.appendChild(app.view);

// getting base setup data
const enemiesData = require('./data/enemies.json');

// Loader settings
loadRequiredData(onload);

function onload(loader, resources) {

  // background creating
  if (resources.background) {
    const { texture } = resources.background;
    createBackground(texture);
  }

  // Enemies creating // todo I stopped here
  const enemies = [];

  enemiesData.forEach(enemyData => {
    const enemy = new Enemy(enemyData);
    addChild(enemy);
    enemies.push(enemy);
  })

  // Enemies counter creating
  new EnemiesController({
    enemies,
    app
  })
}

function createApplication () {
  return new PIXI.Application({
    width: Constants.WIDTH,
    height: Constants.HEIGHT,
    backgroundColor: Constants.BACKGROUND_COLOR, // light blue
    sharedTicker: true,
    sharedLoader: true,
  });
}

function loadRequiredData (onLoadCallback) {
  const loader = PIXI.Loader.shared;

  for (let key in REQUIRED_DATA_FOR_LOADER) {
    loader.add(key, REQUIRED_DATA_FOR_LOADER[key])
  }

  loader.load(onLoadCallback);
}

function createBackground (texture) {
  const background = new PIXI.Sprite(texture);
  addChild(background);
}

function addChild(child) {
  app.stage.addChild(child);
}
