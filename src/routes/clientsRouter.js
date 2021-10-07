const router = require('express').Router()
const { Client } = require('../db/models')
const adminCheck = require('../middlewares/adminCheck')

router.get('/', async (req, res, next) => {
    const clientsList = await Client.findAll();
    res.render('clients', { clientsList })
})

router.route('/:id')
    .get(async (req, res, next) => {
        const curClient = await Client.findOne({ where: { id: req.params.id } });
        res.render('clients', { curClient })
    })
    .delete(adminCheck, async (req, res) => {
        await Client.destroy({ where: { id: req.params.id } });
        res.redirect('/')
    })


module.exports = router


