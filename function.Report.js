module.exports = function(SpawnRoomRoles){
    
    
    console.log("  ")
    console.log("----------------------------------------------------------Reporter------------------------------------------------------------------------")
    
    for (var x in SpawnRoomRoles) {
        
        var filter = _.filter(Game.creeps, (creep) => creep.memory.role == SpawnRoomRoles[x].role.toString())
        
        console.log("Total Number of " + SpawnRoomRoles[x].role.toString() + ":  " + filter.length + '  out of  ' + SpawnRoomRoles[x].desiredNo)
    }
    
    console.log("------------------------------------------------------------------------------------------------------------------------------------------")
    console.log("  ")
    
    
}