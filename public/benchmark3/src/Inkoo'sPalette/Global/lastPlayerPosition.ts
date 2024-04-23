import Vec2 from "../../Wolfie2D/DataTypes/Vec2";

let lastPlayerPosition: Vec2 = Vec2.ZERO;

export const setLastPlayerPosition = (value:Vec2) => {
    lastPlayerPosition = value;
};

export const getLastPlayerPosition = () => {
    return lastPlayerPosition;
};