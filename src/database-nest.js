const ChangeMonitor = require('./change-monitor.js')

module.exports.nest = function (list, groupsDefinitions) {
  let groups = {}
  let topGroups = []
  let changeMonitor = new ChangeMonitor(list)
  for (let c of changeMonitor) {
    let newTopChange = false
    // Changes detected. Creates groups for each change
    if (c.changed.length > 0) {
      for (let i = 0; i < groupsDefinitions.length - 1; i++) { // last group definitions are details
        let d = groupsDefinitions[i]
        if (d.by && c.changed.includes(d.by)) {
          // changed. Create new group
          let newGroup = groups[d.by] = d.create(c.item)
          if (!newGroup[d.children]) {
            newGroup[d.children] = []
          }
          // put new group in its parent if there is one
          if (i > 0) {
            let prevD = groupsDefinitions[i-1]
            let parent = groups[prevD.by]
            parent[prevD.children].push(newGroup)
          }
          if (i === 0) {
            newTopChange = true
          }
        }
      }
    }
    // Details are stored in its parent
    let parentDef = groupsDefinitions[groupsDefinitions.length - 2]
    let parentStorage = groups[parentDef.by][parentDef.children]
    let details = groupsDefinitions[groupsDefinitions.length - 1].create(c.item)
    parentStorage.push(details)
    
    if (newTopChange) {
      topGroups.push(groups[groupsDefinitions[0].by])
    }
  }
  return topGroups
}