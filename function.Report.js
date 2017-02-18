module.exports = function(rolesInUse){
    
    
    console.log("  ")
    console.log("----------------------------------------------------------Reporter------------------------------------------------------------------------")
    
    for (var x in rolesInUse) {
        
        var filter = _.filter(Game.creeps, (creep) => creep.memory.role == rolesInUse[x])
        
        console.log("Total Number of " + rolesInUse[x] + ":  " + filter.length)
    }
    
    console.log("------------------------------------------------------------------------------------------------------------------------------------------")
    console.log("  ")
    
    
}