export const manifest = {
    bundles: [
        {
            name: 'back-screen',
            assets: [
                {
                    name: 'background',
                    srcs: './assets/floor.png',
                    pos: [0, 0],
                },
            ],
        },
        {
            name: 'furniture-screen',
            assets: [
                {
                    name: 'vase2',
                    srcs: './assets/vase_1.png',
                    pos: [35, -12],
                },
                {
                    name: 'stairs_old',
                    srcs: './assets/stairs.png',
                    pos: [41, 10],
                },
                {
                    name: 'vase1',
                    srcs: './assets/vase_1.png',
                    pos: [-19, -35],
                },

                {
                    name: 'vase3',
                    srcs: './assets/vase_2.png',
                    pos: [45, 30],
                },
                {
                    name: 'stand',
                    srcs: './assets/book_stand.png',
                    pos: [18, -32],
                },
                {
                    name: 'globe',
                    srcs: './assets/globe.png',
                    pos: [-39, -15],
                },
                {
                    name: 'sofa',
                    srcs: './assets/sofa.png',
                    pos: [-28, 25],
                },
                {
                    name: 'table',
                    srcs: './assets/table.png',
                    pos: [-23, 0],
                },
                {
                    name: 'ostin',
                    srcs: './assets/ostin.png',
                    pos: [3, -8],
                },
            ],
        },
        {
            name: 'interactive-stairs-screen',
            assets: [
                {
                    name: 'button-repair',
                    srcs: './assets/button_repair.png',
                    pos: [30, 5],
                    options: {
                        waiting: 2,                 // waiting is time of show sprite
                        firstAction: 'shaking'       // func after spawn
                    }
                },
            ],
        },
        {
            name: 'final-screen',
            assets: [
                {
                    name: 'plug-continue',
                    srcs: './assets/plug_continue.png',
                },
                {
                    name: 'button-continue',
                    srcs: './assets/button_continue.png',
                },
            ],
        },
    ]
};