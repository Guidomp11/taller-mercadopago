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
    comprar: (req, res) => {
        let item = {
            id: 1,
            picture_url: 'https://mercado-pago-certificado.herokuapp.com/images/products/jordan.jpg',
            title: 'Titulo del Producto',
            description: 'Esta es la descripcion',
            unit_price: 100,
            quantity: 1
        }

        let preference = {
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