export const newKill = new Audio("../resources/NewKill.mp3")
export const updateNewKillVolume = (volume: number) => {
    newKill.volume = volume
}

export const north = new Audio("../resources/North.mp3")
export const east = new Audio("../resources/East.mp3")
export const updateSmokeVolume = (volume: number) => {
    north.volume = volume
    east.volume = volume
}

export const pool = new Audio("../resources/Pool.mp3")
export const poolPop = new Audio("../resources/PoolPopping.mp3")
export const updatePoolVolume = (volume: number) => {
    pool.volume = volume
    poolPop.volume = volume
}

export const bomb = new Audio("../resources/Bomb.mp3")
export const updateBombVolume = (volume: number) => {
    bomb.volume = volume
}

export const umbra = new Audio("../resources/Umbra.mp3")
export const glacies = new Audio("../resources/Glacies.mp3")
export const curor = new Audio("../resources/Curor.mp3")
export const fumus = new Audio("../resources/Fumus.mp3")
export const updateOrderVolume = (volume: number) => {
    umbra.volume = volume
    glacies.volume = volume
    curor.volume = volume
    fumus.volume = volume
}
