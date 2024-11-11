//אני רוצה להציג למשתמש את תוכן המערך ששמור בשקלים בסוג המטבע שיבחר
export function fromShekelToX(amountInShekel, dollarRate, currncyType) {
    const amount = (currncyType === "dollar") ? (amountInShekel / dollarRate) : (amountInShekel);
    return amount;
}
//משתמש מכניס בX ואנו רוצים שתמיד יכנס למערך בשקלים
export function fromXtoShekel(amount, amountType, dollarRate) {
    const totalamount = (amountType === "dollar") ? (amount * dollarRate) : (amount);
    return totalamount;
}