let request = require("request");
let domain = "https://api.yelp.com";

exports.list_ice_cream_places = function (req, res) {

    let params = req.query;
    let url = domain + "/v3/businesses/search?location=Alpharetta&categories=icecream" + (params.offset ? "&offset=" + params.offset : "")
        + (params.limit ? "&limit=" + params.limit : "");

    doRequest(url).then(body => {
        getReviews(body, (success) => res.json(success));
    }).catch(err => console.log(err));
}

let getReviews = async function (body, success) {
    let result = await Promise.all(body.businesses.map(async (b) =>
        getReview(b).then((res) => res))).catch(err => console.log(err));
    success(result);
}

let getReview = function (b) {
    return new Promise(function (resolve, reject) {
        doRequest(domain + "/v3/businesses/" + b.id + "/reviews").then(reviewBody => {
            b['reviews'] = reviewBody.reviews;
            resolve(b);
        }).catch(err => reject(err));
    });
}

let doRequest = function (url) {
    return new Promise(function (resolve, reject) {
        request.get(getRequest(url), (error, res, body) => {
            if (error || res.statusCode !== 200) {
                reject(error || { statusCode: res.statusCode });
            }
            resolve(body);
        });
    });
}

let getRequest = function (url) {
    return {
        "headers": {
            "content-type": "application/json",
            "Authorization": "Bearer mRjBItZCB_L54ZKRvOGOWtlSxekHtbc_jpOhUWHY2_GLwMqMItO72ILymISDiU3nioh7mgfG-28cKUetmf0Klxap3tckOJA_3JUC6PosLRFoh19E_OwwjMso_fakXXYx"
        },
        "url": url,
        "json": true
    }
}




