var isInvincible: boolean = false;

export const setBG_Invincible = (value: boolean) => {
    isInvincible = value;
};

export const getBG_Invincible = () => {
    return isInvincible;
};