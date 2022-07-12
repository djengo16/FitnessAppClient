const tokenIndetifier = 'token';
var Buffer = require('buffer/').Buffer

const tokenStorage = {
    saveToken: (token) => localStorage.setItem(tokenIndetifier, token),
    getToken: () => localStorage.getItem(tokenIndetifier),
    deleteToken: () => localStorage.removeItem(tokenIndetifier),
    decodeToken: () => {
        try{
            const token = JSON.parse(Buffer.from(localStorage.getItem(tokenIndetifier).split('.')[1], 'base64').toString());
             return token;
        }catch(err){
            return console.log(err);
        }
    }
}

export default tokenStorage;