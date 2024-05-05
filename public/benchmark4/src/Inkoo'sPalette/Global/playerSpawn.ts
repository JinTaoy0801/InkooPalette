
import Vec2 from "../../Wolfie2D/DataTypes/Vec2";

var playerSpawn: Vec2;

export const setPlayerSpawn = (value: Vec2) => {
    playerSpawn = new Vec2(value.x, value.y);
};

export const getPlayerSpawn = () => {
    return playerSpawn;
};