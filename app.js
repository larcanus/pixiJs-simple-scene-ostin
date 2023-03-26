import {Assets, Application} from "./pixi.min.mjs";
import {manifest} from "./manifest.js";
import {BaseContainer} from "./container.js";

export const App = {
    /**
     * @type {Map<string,Object>} - hash created containers by name
     */
    containers: new Map(),
    screenWidth: Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
    screenHeight: Math.max(document.documentElement.clientHeight, window.innerHeight || 0),

    async init() {
        await Assets.init({manifest});

        await Assets.loadBundle('back-screen');
        await Assets.loadBundle('furniture-screen');
        await Assets.loadBundle('repair-stairs-screen');
        await Assets.loadBundle('interactive-stairs-screen');

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
        this.createBundleAssets(this.getAssetsBundleByName('repair-stairs-screen'));

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
        btnRepairContainer.onclick = function () {
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
     */
    createBaseContainer(assetsData) {
        const container = new BaseContainer(assetsData);
        if ('pos' in assetsData) {
            const [x, y] = this.convertPercentToPixel(assetsData.pos)
            container.setPosition(x, y);
        }
        this.game.stage.addChild(container);
        this.containers.set(assetsData.name, container);
    },

    convertPercentToPixel(percent) {
        const x = ((percent[0] / 100) * window.innerWidth).toFixed(2);
        const y = ((percent[1] / 100) * window.innerHeight).toFixed(2);
        return [x, y];
    },

    changeStairs() {
        this.createBundleAssets(this.getAssetsBundleByName('interactive-stairs-screen'));
        const blueCircle = this.containers.get(`circle-blue-stairs`);
        const goldCircle = this.containers.get(`circle-gold-stairs`);
        const greenCircle = this.containers.get(`circle-green-stairs`);

        blueCircle.onclick = function () {
            console.log(this.sprite.x,this.sprite.y)
        };
        blueCircle.onclick = function () {
            console.log(this.sprite.x,this.sprite.y)
        };
        console.log(blueCircle)
    }
}