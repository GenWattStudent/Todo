const Todo = require('../models/Todo.js')

function createTabBody(body, order) {
  return {
    title: body.title,
    color: body.color,
    textColor: body.textColor,
    order,
    items: [],
  }
}

class TabService {
  constructor(tabRepository) {
    this.tabRepository = tabRepository
  }

  async getTabs() {
    return this.tabRepository.getTabs()
  }

  async getTabById(id) {
    return this.tabRepository.getTabById(id)
  }

  async createTab(tab) {
    const tabs = await this.tabRepository.getTabs()
    const maxOrder = tabs.length > 0 ? Math.max(...tabs.map((tab) => tab.order)) : 0
    const tabBody = createTabBody(tab, maxOrder + 1)

    return this.tabRepository.createTab(tabBody)
  }

  async updateTab(id, tab) {
    return this.tabRepository.updateTab(id, tab)
  }

  async deleteTab(id) {
    const tab = await this.tabRepository.getTabById(id)

    tab.items.forEach(async (todo) => {
      await Todo.deleteOne({ _id: todo })
    })

    return this.tabRepository.deleteTab(id)
  }

  async reorderTabs(newOrder) {
    newOrder = newOrder.map((tab, index) => ({ ...tab, order: index + 1 }))
    this.tabRepository.updateManyTabs(newOrder)
    return this.getTabs()
  }
}

module.exports = TabService
