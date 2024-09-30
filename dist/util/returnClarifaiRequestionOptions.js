"use strict";
// PUT to update entries
/* Declaring a custom callback to accept passed-in param 'imageUrl' */
Object.defineProperty(exports, "__esModule", { value: true });
exports.returnClarifaiRequestOptions = void 0;
const returnClarifaiRequestOptions = (imageUrl) => {
    const PAT = process.env.PAT;
    const USER_ID = process.env.USER_ID;
    const APP_ID = process.env.APP_ID;
    const IMAGE_URL = imageUrl;
    const raw = JSON.stringify({
        user_app_id: {
            user_id: USER_ID,
            app_id: APP_ID
        },
        inputs: [
            {
                data: {
                    image: {
                        url: IMAGE_URL
                    }
                }
            }
        ]
    });
    const requestOptions = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            Authorization: 'Key ' + PAT
        },
        body: raw
    };
    return requestOptions;
};
exports.returnClarifaiRequestOptions = returnClarifaiRequestOptions;
//# sourceMappingURL=returnClarifaiRequestionOptions.js.map