const router = require('express').Router()

const TabRepo = require('../../repositories/tabRepo')
const TabService = require('../../services/tabService')
const TabController = require('../../controllers/tabController')

const tabRepo = new TabRepo()
const tabService = new TabService(tabRepo)
const tabController = new TabController(tabService)

router.get('/tab', (req, res) => tabController.getTabs(req, res))

router.post('/tab', (req, res) => tabController.createTab(req, res))

router.put('/tab/:id', (req, res) => tabController.updateTab(req, res))

router.delete('/tab/:id', (req, res) => tabController.deleteTab(req, res))

router.put('/tabs/reorder', (req, res) => tabController.reorderTabs(req, res))

module.exports = router
