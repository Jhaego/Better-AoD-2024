import { curor, fumus, glacies, umbra } from "./audio"

export const minions = {
    Umbra: {
        name: "Umbra",
        initial: "U",
        color: "#904090",
        audio: umbra
    },
    Glacies: {
        name: "Glacies",
        initial: "G",
        color: "#2090A0",
        audio: glacies
    },
    Curor: {
        name: "Cruor",
        initial: "C",
        color: "#A04040",
        audio: curor
    },
    Fumus: {
        name: "Fumus",
        initial: "F",
        color: "#708070",
        audio: fumus
    }
} as const

export type minion = typeof minions[keyof typeof minions]

export const minionList = Object.values(minions)
