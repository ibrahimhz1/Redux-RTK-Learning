const state = {
    account: { amount: 1 },
    bonus: { points: 2 }
};

const newState = {
    account: {...state.account},
    bonus: {points: state.bonus.points+1}
}


console.log(state);
console.log(newState);
state.account.amount = 100;
console.log(state);
console.log(newState);