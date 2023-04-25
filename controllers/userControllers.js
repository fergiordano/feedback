const { validationResult } = require('express-validator') 
const usuario = require('../models/usermodel')
const bcrypt = require('bcrypt');

const paginaPrincipal = (req, res) => { 
    console.log(req);
    res.status(200).json({
        mensaje: "Código 200 - Todo OK!"
    })
}

const paginaError = (req, res) => { 
    console.log('Error');
    res.status(500).send(`<h1>Todo mal!!</h1>`)
}


const registrarUsuario = async (req, res) => {

    //1. verificamos si los datos son correctos - viene de check
    const errores = validationResult(req);

        if(!errores.isEmpty()){
            return res.status(400).json({
                errores: errores.array()
            })
        }

    //2.desestructuramos las variables
    const { nombre, email, password } = req.body;
    console.log(`Mis datos son: ${nombre} - ${email} - ${password}`);

    //3. verificar si el usuario ya existe
    try {
        let usuarioExiste = await usuario.findOne({email});
        console.log(`2. ${usuarioExiste}`);

        if (usuarioExiste) {
            return res.status(400).json({
                errores:'el usuario ya existe'
            })
        }

    //4.si no existe, creamos un nuevo usuario
    let nuevoUsuario = new usuario(req.body);

    console.log(`3. nuevo usuario a guardar ${nuevoUsuario}`);

    //5.creamos la salt para la mezcla con el password
    const salt = bcrypt.genSaltSync();
    
    console.log(`4. sal para incriptacion ${salt}`);
    console.log(`5. el password sin salt es: ${nuevoUsuario.password}`);

    //6. mezclamos la salt con el password del usuario
    nuevoUsuario.password = bcrypt.hashSync(password, salt);
    console.log(`6. el password con salt es: ${nuevoUsuario.password}`);

    //7.insertamos en la database en el nuevo usuairo
    await nuevoUsuario.save();

    //8. respondemos a la peticion del cliente si todo va bien
    res.status(200).end('tus datos fueron recibidos y guardados en la DB')

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            mensaje: 'nuestros mejores devs estan trabajando para solucionar el inconveniente'
        })
    }

    res.status(200).end('Tus datos fueron recibidos')
}


const paginaPrueba = (req, res) => {

        const { nombre, email, password } = req.body;
    
        const errores = validationResult(req);

        if(!errores.isEmpty()){
            return res.status(400).json({
                errores: errores.array()
            })
        }

        res.status(200).json({
            mensaje: 'User creado'
        })

        console.log(`Mis datos son: ${nombre} - ${email} - ${password}`);

};

module.exports = {
    paginaPrincipal,
    paginaError,
    registrarUsuario,
    paginaPrueba
}