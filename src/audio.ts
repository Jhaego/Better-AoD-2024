export const newKill = new Audio("../public/resources/NewKill.mp3")
export const updateNewKillVolume = (volume: number) => {
    newKill.volume = volume
}

export const north = new Audio("../public/resources/North.mp3")
export const east = new Audio("../public/resources/East.mp3")
export const updateSmokeVolume = (volume: number) => {
    north.volume = volume
    east.volume = volume
}

export const pool = new Audio("../public/resources/Pool.mp3")
export const poolPop = new Audio("../public/resources/PoolPopping.mp3")
export const updatePoolVolume = (volume: number) => {
    pool.volume = volume
    poolPop.volume = volume
}

export const bomb = new Audio("../public/resources/Bomb.mp3")
export const updateBombVolume = (volume: number) => {
    bomb.volume = volume
}

export const umbra = new Audio("../public/resources/Umbra.mp3")
export const glacies = new Audio("../public/resources/Glacies.mp3")
export const curor = new Audio("../public/resources/Curor.mp3")
export const fumus = new Audio("../public/resources/Fumus.mp3")
export const updateOrderVolume = (volume: number) => {
    umbra.volume = volume
    glacies.volume = volume
    curor.volume = volume
    fumus.volume = volume
}