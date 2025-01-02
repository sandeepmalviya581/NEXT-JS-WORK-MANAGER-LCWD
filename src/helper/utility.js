import { jwtVerify } from 'jose';


export const checkEmpty = (value) => {
    return value == null || value.trim() == '';
}


export const getUserIdFromToken = async (request) => {
    const joseToken = request.cookies.get('joseToken')?.value;
    const { payload } = await jwtVerify(joseToken, new TextEncoder().encode('workmanager'));
    const userId = payload._doc._id
    return userId;
}

export const notNullAndNotUndefined = (value) => {
    return value != undefined && value != null;
}





