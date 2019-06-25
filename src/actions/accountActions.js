import fire from '../config/Fire';

export function createUser(account, uid){
    console.log(`In createUser action ${account}`)
    let app = fire.database().ref('users/'+uid);
    return app.push(account);
}
