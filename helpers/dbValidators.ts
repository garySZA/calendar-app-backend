import { UserModel as User } from '../models';

const isUniqueField = async ( value: string, field: string ) => {
    const query = {
        [field]: value
    }

    const existField = await User.findOne( query );
    
    if( existField ) {
        throw new Error(`El ${ field } ya existe`);
    }
}

export {
    isUniqueField,
}