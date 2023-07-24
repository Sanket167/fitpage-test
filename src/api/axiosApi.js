import axios from 'axios';

/**
 * Get api handler
 * @param {*} url 
 * @returns 
 */
export const getData = (url) => {
    return new Promise((resolve, reject) => {
        try {
            axios.get(url)
                .then(res => {
                    if (res) {
                        resolve({ status: true, ...res.data });
                    } else {
                        reject({ status: false, message: 'No Data Found' })
                    }
                })
        } catch (error) {
            console.log('error: ', error);
        }
    })
}