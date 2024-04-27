const sceneOptions = {
    physics: {
        groupNames: ["ground", "player", "enemy"],
        collisions:
        [
            [0, 1, 1],
            [1, 0, 1],
            [1, 1, 0]
        ]
    }
}

export const getSceneOptions = () => {
    return sceneOptions;
};