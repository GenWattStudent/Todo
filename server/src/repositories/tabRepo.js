const Tab = require('../models/Tab.js')

class TabRepo {
  async createTab(tab) {
    const newTab = new Tab(tab)
    console.log(tab)
    return await newTab.save()
  }

  async getTabs() {
    const todos = await Tab.find().sort({ order: 1 }).populate('items')
    todos.forEach((tab) => {
      tab.items.sort((a, b) => a.order - b.order)
    })
    return todos
  }

  async getTabById(id) {
    return await Tab.findById(id)
  }

  async updateTab(id, tab) {
    return await Tab.findByIdAndUpdate(id, tab, { new: true })
  }

  async deleteTab(id) {
    return await Tab.findByIdAndDelete(id)
  }

  async updateManyTabs(tabs) {
    const promises = tabs.map((tab) => Tab.updateOne({ _id: tab._id }, { $set: tab }))
    return await Promise.all(promises)
  }
}

module.exports = TabRepo
