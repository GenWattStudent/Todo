const router = require('express').Router()

const TabRepo = require('../../repositories/tabRepo')
const TabService = require('../../services/tabService')
const TabController = require('../../controllers/tabController')

const tabRepo = new TabRepo()
const tabService = new TabService(tabRepo)
const tabController = new TabController(tabService)

router.get('/tab', async (req, res) => {
  console.log('getTabs')
  try {
    const tabs = await tabController.getTabs(req, res)
    console.log(tabs)
    res.json(tabs)
  } catch (error) {
    res.status(500).json(error)
  }
})

router.post('/tab', async (req, res) => {
  console.log('createTab')
  try {
    const tab = await tabController.createTab(req, res)

    res.json(tab)
  } catch (error) {
    res.status(500).json(error)
  }
})

router.put('/tab/:id', async (req, res) => {
  console.log('updateTab')
  try {
    const tab = await tabController.updateTab(req, res)
    res.json(tab)
  } catch (error) {
    res.status(500).json(error)
  }
})

router.delete('/tab/:id', async (req, res) => {
  console.log('deleteTab')
  try {
    console.log(req.params.id)
    const tab = await tabController.deleteTab(req, res)
    console.log('DEL', tab)
    res.json(tab)
  } catch (error) {
    res.status(500).json(error)
  }
})

router.put('/tabs/reorder', (req, res) => tabController.reorderTabs(req, res))

module.exports = router
