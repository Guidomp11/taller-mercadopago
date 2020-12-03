const mercadopago = require('mercadopago');

mercadopago.configure({
    access_token: 'APP_USR-6317427424180639-042414-47e969706991d3a442922b0702a0da44-469485398',
    integrator_id: 'dev_24c65fb163bf11ea96500242ac130004'
});

module.exports = {
    home: (req, res) => {
        return res.render("index");
    },
    detail: (req, res) => {
        return res.render("detail", { ...req.query });
    },
    callback: (req, res) => {
        console.log(req.query);
        switch(req.query.status[0]){
            case 'success':
                return res.render('success');
            case 'pending':
                return res.render('pending');
            case 'failure':
                return res.render('failure');
            default:
                return res.status(404).end()
        }
    },
    notifications: (req, res) => {
        res.status(200).end('ok');
    },
    comprar: (req, res) => {
        const host = 'http://localhost:3000/';
        const url = host+'callback?status=';
        

        let item = {
            id: 1234,
            picture_url: 'https://mercado-pago-certificado.herokuapp.com/images/products/jordan.jpg',
            title: 'Titulo del Producto',
            description: 'Dispositivo móvil de Tienda e-commerce',
            unit_price: 999,
            quantity: 1
        }

        let preference = {
            back_urls:{
                success: url+'success',
                pending: url+'pending',
                failure: url+'failure'
            },

            notification_url: host+'notifications',

            auto_return: 'approved',

            payer: { //informacion del que paga
                name: 'Ryan',
                surname: 'Dahl',
                email: 'test_user_63274575@testuser.com',
                phone: {
                    area_code: '11',
                    number: 54821529
                },
                address: {
                    zip_code: '1234',
                    street_name: 'Avenida Siempre Viva',
                    street_number: 300
                }
            },

            payment_methods: {
                excluded_payment_methods: [ //excluir un metodo de pago
                    {id: 'visa'}
                ],
                excluded_payment_types: [ //excluir un tipo de pago
                    {id: 'atm'}
                ],
                installments: 12 //hasta cuantas cuotas quiero que se peuda hacer el pago
            },
            
            items: [
                item
            ],

            external_reference: 'ponce.guido@gmail.com'
        }

        mercadopago.preferences.create(preference)
        .then(response => {
            global.init_point = response.body.init_point;
            res.render('confirmarcompra');
        })
        .catch(error => {
            console.log(error);
            res.send('error');
        })

        //res.send('ok');
    }
}