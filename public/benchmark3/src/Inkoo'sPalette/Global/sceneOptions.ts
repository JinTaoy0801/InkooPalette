const sceneOptions = {
    physics: {
        groupNames: ["ground", "player", "enemy", "shield"],
        collisions:
        [
            [0, 1, 1, 0],
            [1, 0, 0, 1],
            [1, 0, 0, 0],
            [0, 1, 0, 0]
        ]
    }
}

export const getSceneOptions = () => {
    return sceneOptions;
};