export function fromShekelToX(amountInShekel, dollarRate, currncyType) {
    const amount = (currncyType === "dollar") ? (amountInShekel / dollarRate) : (amountInShekel);
    return amount;
}

export function fromXtoShekel(amount, amountType, dollarRate) {
    const totalamount = (amountType === "dollar") ? (amount * dollarRate) : (amount);
    return totalamount;
}