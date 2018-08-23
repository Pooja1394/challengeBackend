/**
 * status Messages
 */

// SERIES 2xx 
const ok = 200


// SERIES 3xx
const found = "Already Exist!";

// SERIES 4xx
const bad = "Incomplete Parameters!";
const notFound = "Not Found!";


// SERIES 5xx
const internal = "Internal Server Error!";

module.exports={
    ok:ok,
    bad:bad,
    found:found,
    notFound:notFound,
    internal:internal
}