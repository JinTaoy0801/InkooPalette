const sceneOptions = {
    physics: {
        groupNames: ["ground", "player", "enemy", "shield", "env", "playerattack"],
        collisions:
        [
            [0, 1, 1, 0, 0, 0],
            [1, 0, 0, 1, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 1, 0, 0, 0, 0],
            [0, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0]
        ]
    }
}

export const getSceneOptions = () => {
    return sceneOptions;
};