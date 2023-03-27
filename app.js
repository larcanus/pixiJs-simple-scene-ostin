import {Assets, Application} from "./pixi.min.mjs";
import {manifest} from "./manifest.js";
import {BaseContainer} from "./container.js";

export const App = {
    /**
     * @type {Map<string,Object>} - hash created containers by name
     */
    containers: new Map(),

    /**
     * @type {string} - current selected stairs name
     */
    selectedStairs: '',

    screenWidth: Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
    screenHeight: Math.max(document.documentElement.clientHeight, window.innerHeight || 0),

    async init() {
        await Assets.init({manifest});

        await Assets.loadBundle('back-screen');
        await Assets.loadBundle('furniture-screen');
        await Assets.loadBundle('repair-stairs');
        await Assets.loadBundle('circle-stairs');
        await Assets.loadBundle('change-stairs');

        this.game = new Application({
            hello: true,
            backgroundColor: '#000000',
            resolution: window.devicePixelRatio || 1,
            autoDensity: true,
            width: this.screenWidth,
            height: this.screenHeight
        });

        this.buildGame();
    },

    buildGame() {
        document.body.appendChild(this.game.view);

        this.setPositionStage();
        // create back
        this.createBundleAssets(this.getAssetsBundleByName('back-screen'));
        // create start scene
        this.createBundleAssets(this.getAssetsBundleByName('furniture-screen'));
        // create interactive btns
        this.createBundleAssets(this.getAssetsBundleByName('repair-stairs'));

        this.resize();
        this.addEventListeners();
    },

    setPositionStage() {
        this.game.stage.position.set(this.screenWidth / 2, this.screenHeight / 2);
    },

    resize() {
        // current screen size
        const screenWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        const screenHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

        // uniform scale for our game
        const scale = Math.min(screenWidth / this.screenWidth, screenHeight / this.screenHeight);

        // the "uniformly englarged" size for our game
        const enlargedWidth = Math.floor(scale * this.screenWidth);
        const enlargedHeight = Math.floor(scale * this.screenHeight);

        // margins for centering our game
        const horizontalMargin = (screenWidth - enlargedWidth) / 2;
        const verticalMargin = (screenHeight - enlargedHeight) / 2;

        // now we use css trickery to set the sizes and margins
        this.game.view.style.width = `${enlargedWidth}px`;
        this.game.view.style.height = `${enlargedHeight}px`;
        this.game.view.style.marginLeft = this.game.view.style.marginRight = `${horizontalMargin}px`;
        this.game.view.style.marginTop = this.game.view.style.marginBottom = `${verticalMargin}px`;
    },

    /**
     * @param {string} name
     * @return {Object[]}
     */
    getAssetsBundleByName(name) {
        return manifest.bundles.filter(value => value.name === name)?.[0]?.assets;
    },

    addEventListeners() {
        window.addEventListener('resize', (e) => {
            requestAnimationFrame(() => this.resize());
        }, true);

        const btnRepairContainer = this.containers.get('button-repair');
        btnRepairContainer.sprite.onclick = function () {
            arguments[0].destroy();
            this.changeStairs();
        }.bind(this, btnRepairContainer);
    },

    /**
     * @param {Object[]} assetsBundle
     */
    createBundleAssets(assetsBundle) {
        for (const data of assetsBundle) {
            this.createBaseContainer(data);
        }
    },

    /**
     * @param {Object} assetsData
     * @param {number[]} [pos = [0,0]]
     */
    createBaseContainer(assetsData, pos = [0, 0]) {
        const container = new BaseContainer(assetsData);
        const position = assetsData.pos ?? pos;
        const [x, y] = this.convertPercentToPixel(position)
        container.setPosition(x, y);
        this.game.stage.addChild(container);
        this.containers.set(assetsData.name, container);
    },

    convertPercentToPixel(percent) {
        const x = ((percent[0] / 100) * window.innerWidth).toFixed(2);
        const y = ((percent[1] / 100) * window.innerHeight).toFixed(2);
        return [x, y];
    },

    changeStairs() {
        this.createBundleAssets(this.getAssetsBundleByName('circle-stairs'));
        const blueCircle = this.containers.get(`circle-blue-stairs`);
        const goldCircle = this.containers.get(`circle-gold-stairs`);
        const greenCircle = this.containers.get(`circle-green-stairs`);
        blueCircle.sprite.onclick = () => {
            this.selectedStairs = 'blue';
            this.addChangeStairsContainers();
        }
        goldCircle.sprite.onclick = () => {
            this.selectedStairs = 'gold';
            this.addChangeStairsContainers();
        };
        greenCircle.sprite.onclick = () => {
            this.selectedStairs = 'green';
            this.addChangeStairsContainers();
        };
    },

    addChangeStairsContainers() {
        this.removeChangeStairsContainers();
        const assetsChange = this.getAssetsBundleByName('change-stairs').filter(asset => {
            if (asset.name.endsWith(this.selectedStairs)) {
                return true;
            } else {
                return asset.name.includes('ok');
            }
        });

        // delete old stairs
        const oldStairs = this.containers.get('stairs');
        oldStairs.destroy();

        const containerCircle = this.containers.get(`circle-${this.selectedStairs}-stairs`);
        const x = containerCircle.x;
        const y = containerCircle.y;

        for (const data of assetsChange) {
            if (data.name.includes(`circle-${this.selectedStairs}`)) {
                this.updateCircleChangeContainers();
                this.createBaseContainer(data);
                const chooseContainer = this.containers.get(data.name);
                chooseContainer.width = containerCircle.width;
                chooseContainer.height = containerCircle.height;
                const midY = chooseContainer.height / 2;
                chooseContainer.position.set(containerCircle.x + 5, containerCircle.y - midY + 11);

            } else if (data.name.includes('ok')) {
                this.createBaseContainer(data);
                const chooseContainer = this.containers.get(data.name);
                chooseContainer.width = 100;
                chooseContainer.height = 60;
                // chooseContainer.position.set(x + 14, y + 55);
                chooseContainer.position.set(x + 14, y + 55);
                chooseContainer.sprite.onclick = () => this.createFinalPlug();
            } else {
                this.createBaseContainer(data);
                const chooseContainer = this.containers.get(data.name);
                chooseContainer.width = 500;
                chooseContainer.height = 600;
                chooseContainer.position.set(chooseContainer.width / 2 - 40, 0 - chooseContainer.height / 2);
            }
        }
        // update vase3 before stairs
        this.game.stage.addChild(this.containers.get('vase3'));
    },

    removeChangeStairsContainers() {
        this.containers.forEach((container, name,) => {
            if (name.startsWith('change')) {
                container.destroy();
            }
        });
    },

    updateCircleChangeContainers() {
        this.game.stage.addChild(
            this.containers.get(`circle-green-stairs`),
            this.containers.get(`circle-blue-stairs`),
            this.containers.get(`circle-gold-stairs`)
        );
    },

    createFinalPlug() {
        console.log('final')
    }
}