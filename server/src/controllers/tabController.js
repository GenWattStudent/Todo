class TabController {
  constructor(tabService) {
    this.tabService = tabService
  }

  async getTabs(req, res) {
    try {
      const tabs = await this.tabService.getTabs()
      res.json(tabs)
    } catch (error) {
      res.status(500).json(error)
    }
  }

  async getTab(req, res) {
    try {
      const tab = await this.tabService.getTab(req.params.id)
      res.json(tab)
    } catch (error) {
      res.status(500).json(error)
    }
  }

  async createTab(req, res) {
    try {
      if (!req.body.title) return res.status(400).json({ message: 'Title is required' })
      if (!req.body.color) return res.status(400).json({ message: 'Color is required' })
      if (!req.body.textColor) return res.status(400).json({ message: 'Text color is required' })
      if (req.body.title.length <= 2)
        return res.status(400).json({ message: 'Tile should have more than 2 characters' })

      const tab = await this.tabService.createTab(req.body)
      res.json(tab)
    } catch (error) {
      console.log(error)
      res.status(500).json(error)
    }
  }

  async updateTab(req, res) {
    try {
      const tab = await this.tabService.updateTab(req.params.id, req.body)
      res.json(tab)
    } catch (error) {
      res.status(500).json(error)
    }
  }

  async deleteTab(req, res) {
    try {
      const tab = await this.tabService.deleteTab(req.params.id)
      res.json(tab._id)
    } catch (error) {
      res.status(500).json(error)
    }
  }

  async reorderTabs(req, res) {
    try {
      const tab = await this.tabService.reorderTabs(req.body)
      res.json(tab)
    } catch (error) {
      res.status(500).json(error.message)
    }
  }
}

module.exports = TabController
