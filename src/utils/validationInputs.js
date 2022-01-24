export function validateEmail(mail){
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) return true;
 return false;
}

export function validName(name){
    if (/^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/.test(name)) return true;
    return false;
}