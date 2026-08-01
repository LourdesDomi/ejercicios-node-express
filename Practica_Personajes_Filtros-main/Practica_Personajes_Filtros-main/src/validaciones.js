const validacion = (data) => 
{
    if( !data.nombre || data.nombre?.length <= 3)
        return false
    if ( !data.salud || data?.salud <=0)
        return false
    return true
}

module.exports = validacion