
export const numDiscriminant = (input) => {
    if (input) {
        return input.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
        
    }
}
export const numDiscriminantInput = (input) => {
    if (input) {
        if (input.toString().includes(" ")) {
            input = input.toString().replace(/\s/g, "");
          }
            return input.toString().replace(/,/g, "").replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",").replace(/ /g,'');
        
    }
}
export const clearDiscriminant = (input) => {
    if (input) {
        return input.toString().replace(/,/g, "");
        
    }
}

export const numberRegex = /^[0-9,]+$/;


export const decimalLimitInput =(originWallet) => {    
    if (originWallet === "usdt") {
        return /^\d{0,100}(\.\d{0,2})?$/
    } else if (originWallet === "irr" ) {
        return /^\d{0,100}(\.\d{0,0})?$/
    } else {
        return new RegExp(`^\\d{0,100}(\\.\\d{0,${originWallet}})?$`)
    }

}


// \d+\.\d\d(?!\d)
// ^\d{1,6}(\.\d{1,5})?$
// \B(?<!\.\d*)(?=(\d{3})+(?!\d))