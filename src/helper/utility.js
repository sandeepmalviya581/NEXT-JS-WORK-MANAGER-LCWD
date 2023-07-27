import { toast } from 'react-toastify';


export const checkEmpty = (value) => {
    if (value == null || value.trim() == '') {
        return true;
    }
    return false;
}



