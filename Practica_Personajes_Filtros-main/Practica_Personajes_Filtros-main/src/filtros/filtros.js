const op = {  
    "==": (a,b)=> a==b ,
    "!=": (a,b)=> a!=b ,
    ">":  (a,b)=> Number(a) > Number(b),
    "<":  (a,b)=> Number(a) < Number(b),
    ">=": (a,b)=> Number(a) >= Number(b),
    "<=": (a,b)=> Number(a) <= Number(b),
    "includes": (a,b) => Array.isArray(a) && a.includes(b)
}
                   //  "habilidades" ,  "includes"   ,  dash"
                   //    ||        ||       ||

const makeFiltro = (attribute, operator, value) => {
    if(!op[operator]) throw new Error("Operador no soportado")

    return (personaje) => op[operator]( personaje[attribute] , value)
    
}

module.exports = {makeFiltro, op}