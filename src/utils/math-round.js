export const round_hundred_thousand =(input) => Math.round(input * 100000) / 100000
export const round_ten_thousand =(input) => Math.round((input + Number.EPSILON) * 1000) / 1000
export const round =(input) => Math.round(input)