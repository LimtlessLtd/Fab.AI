var funcHarvest = require('function.Harvest')

var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
            
        if(creep.carry.energy < creep.carryCapacity)
        {
            funcHarvest(creep)
        }
        else
        {
            creep.memory.currentSource = ''
            
            DepositStuff(creep)
            
        }
    }
    
};
    
function DepositStuff(creep){
    
    var targets = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_EXTENSION ||
                    structure.structureType == STRUCTURE_SPAWN) && structure.energy < structure.energyCapacity;
            }
        });
    
    if(targets.length > 0) {
        if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
        }
    } else {
        creep.moveTo(Game.spawns['Spawn1'])
    }

}

module.exports = roleHarvester;