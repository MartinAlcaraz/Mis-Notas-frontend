// Transforma un numero en un string con formato de precio => 10.50 o 10.00

export const PriceFormatter = (price) => {

    let num = price.toString();

    if (num.indexOf(".") != -1) {
        // se toman los primeros dos decimales despues de la coma Ej: 10.999 => 10.99
        num = num.slice(0, (num.indexOf(".")) + 3);

        const regExp = /^[0-9]+([.][0-9]{2})?$/g;
        // se agregan los ceros necesarios para que coincida con la expresion regualar;
        while (!num.match(regExp)) {
            num = num + '0';
        }
    } else {
        // si el numero es entero se le agregan los dos ceros .00
        num = num + '.00';
    }
    return num;
}