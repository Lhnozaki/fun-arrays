var dataset = require("./dataset.json");

/*
  create an array with accounts from bankBalances that are
  greater than 100000
  assign the resulting new array to `hundredThousandairs`
*/

var hundredThousandairs = dataset.bankBalances.filter(function(e) {
  if (e.amount > 100000) {
    return e;
  }
});

// set sumOfBankBalances to be the sum of all value held at `amount` for each bank object
var sumOfBankBalances = dataset.bankBalances
  .map(function(e) {
    return parseInt(e.amount);
  })
  .reduce(function(p, c) {
    return p + c;
  });

/*
  from each of the following states:
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  take each `amount` and add 18.9% interest to it rounded to the nearest dollar 
  and then sum it all up into one value saved to `sumOfInterests`
 */
var sumOfInterests = dataset.bankBalances
  .filter(function(e) {
    if (
      e.state === "WI" ||
      e.state === "IL" ||
      e.state === "WY" ||
      e.state === "OH" ||
      e.state === "GA" ||
      e.state === "DE"
    ) {
      return e;
    }
  })
  .map(function(e) {
    return e.amount * 0.189;
  })
  .reduce(function(p, c) {
    return Math.round(p + c);
  });

/*
  aggregate the sum of bankBalance amounts
  grouped by state
  set stateSums to be a hash table where

  the key is:
    the two letter state abbreviation
  and the value is:
    the sum of all amounts from that state
    the value must be rounded to the nearest dollar

  note: During your summation (
    if at any point durig your calculation where the number looks like `2486552.9779399997`
    round this number to the nearest dollar before moving on.
  )
 */
var stateSums = dataset.bankBalances.reduce(function(p, c) {
  if (p.hasOwnProperty(c.state)) {
    p[c.state] += Math.round(parseInt(c.amount));
  } else {
    p[c.state] = parseInt(c.amount);
  }
  return p;
}, {});

/*
  for all states *NOT* in the following states:
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  sum the amount for each state (stateSum)
  take each `stateSum` and calculate 18.9% interest for that state
  sum the interest values that are greater than 50,000 and save it to `sumOfHighInterests`

  note: During your summation (
    if at any point durig your calculation where the number looks like `2486552.9779399997`
    round this number to the nearest dollar before moving on.
  )
 */

var sumOfHighInterests = Object.entries(stateSums)
  .filter(function(e) {
    if (
      e[0] !== "WI" &&
      e[0] !== "IL" &&
      e[0] !== "WY" &&
      e[0] !== "OH" &&
      e[0] !== "GA" &&
      e[0] !== "DE"
    ) {
      return e;
    }
  })
  .map(function(e) {
    return Math.round(e[1] * 0.189);
  })
  .filter(function(e) {
    if (e > 50000) {
      return e;
    }
  })
  .reduce(function(p, c) {
    return p + c;
  }, 0);

/*
  set `lowerSumStates` to be an array of two letter state
  abbreviations of each state where the sum of amounts
  in the state is less than 1,000,000
 */
var lowerSumStates = Object.entries(stateSums)
  .filter(function(e) {
    if (e[1] < 1000000) {
      return e;
    }
  })
  .reduce(function(p, c) {
    p.push(c[0]);
    return p;
  }, []);

/*
  aggregate the sum of each state into one hash table
  `higherStateSums` should be the sum of all states with totals greater than 1,000,000
 */
var higherStateSums = Object.entries(stateSums)
  .filter(function(e) {
    if (e[1] > 1000000) {
      return e;
    }
  })
  .reduce(function(p, c) {
    p.push(c[1]);
    return p;
  }, [])
  .reduce(function(p, c) {
    return p + c;
  });

/*
  from each of the following states:
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware

  Check if all of these states have a sum of account values
  greater than 2,550,000

  if true set `areStatesInHigherStateSum` to `true`
  otherwise set it to `false`
 */

let isTrue = true;
let isFalse = false;

var areStatesInHigherStateSum = Object.entries(stateSums)
  .filter(function(e) {
    if (
      e[0] === "WI" ||
      e[0] === "IL" ||
      e[0] === "WY" ||
      e[0] === "OH" ||
      e[0] === "GA" ||
      e[0] === "DE"
    ) {
      return e;
    }
  })
  .every(function(e) {
    return e[1] > 2550000;
  });

/*
  Stretch Goal && Final Boss

  set `anyStatesInHigherStateSum` to be `true` if
  any of these states:
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  have a sum of account values greater than 2,550,000
  otherwise set it to be `false`
 */
var anyStatesInHigherStateSum = Object.entries(stateSums)
  .filter(function(e) {
    if (
      e[0] === "WI" ||
      e[0] === "IL" ||
      e[0] === "WY" ||
      e[0] === "OH" ||
      e[0] === "GA" ||
      e[0] === "DE"
    ) {
      return e;
    }
  })
  .some(function(e) {
    return e[1] > 2550000;
  });

module.exports = {
  hundredThousandairs: hundredThousandairs,
  sumOfBankBalances: sumOfBankBalances,
  sumOfInterests: sumOfInterests,
  sumOfHighInterests: sumOfHighInterests,
  stateSums: stateSums,
  lowerSumStates: lowerSumStates,
  higherStateSums: higherStateSums,
  areStatesInHigherStateSum: areStatesInHigherStateSum,
  anyStatesInHigherStateSum: anyStatesInHigherStateSum
};
