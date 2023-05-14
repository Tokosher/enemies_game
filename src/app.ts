import * as PIXI from 'pixi.js';
import { Constants } from './utils/utils';
import { Enemy } from './components/enemy';
import { EnemiesController } from './components/controllers/enemies-controller';
import { REQUIRED_DATA_FOR_LOADER } from './utils/utils'
import { Counter } from './components/enemies-counter';
// todo чекнуть импорты
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

  // Enemies creating
  const enemies = [];

  enemiesData.forEach(enemyData => {
    const enemy = new Enemy(enemyData);
    addChild(enemy);
    enemies.push(enemy);
  })

  // Enemies controller creating
  const enemiesControllerObject = new EnemiesController({
    enemies,
    app,
    onEnemyKill
  })

  // Enemies counter creating
  const enemyCounter = new Counter({
    amount: enemies.length,
    prefix: Constants.textBeforeEnemiesCounter,
    position: Constants.enemyCounterPosition
  })
  addChild(enemyCounter);

  function onEnemyKill () {
    enemyCounter.textAmount = enemiesControllerObject.enemyAmount;
  }
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
