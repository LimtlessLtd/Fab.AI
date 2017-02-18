var funcHarvest = require('function.Harvest')
            
var roleRepairer = {
  
    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.repairing && creep.carry.energy == 0) {
            creep.memory.repairing = false;
            creep.say('🔄 harvest');
        }
        
        if(!creep.memory.repairing && creep.carry.energy == creep.carryCapacity) {
            creep.memory.repairing = true;
            creep.say('⚒️ refill')
        }

        if(creep.memory.repairing) {
            
            var targets = creep.room.find(FIND_STRUCTURES, {
                   filter: (structure) => {
                        return (structure.structureType == STRUCTURE_ROAD ||
                        structure.structureType == STRUCTURE_CONTAINER ||
                        structure.structureType == STRUCTURE_RAMPART) && structure.hits < (structure.hitsMax - 100);
                     }
                 });
            
            var towers = creep.room.find(FIND_STRUCTURES, {
               filter: (structure) => {
                    return structure.structureType == STRUCTURE_TOWER && structure.energy < (structure.energyCapacity - 100);
                 }
             });
            
            if(towers.length > 0)
            {
                creep.memory.doingNothing = false;
                towers.sort((a,b) => a.energy - b.energy);
                
                if(creep.transfer(towers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    creep.moveTo(towers[0], {visualizePathStyle: {stroke: '#ffaa00'}});    
                } else{
                    creep.transfer(towers[0], RESOURCE_ENERGY)
                }
                
            } else if(targets.length > 0) {
                creep.memory.doingNothing = false;
                targets.sort((a,b) => a.hits - b.hits);
                
                if(creep.repair(targets[0]) == ERR_NOT_IN_RANGE){
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffaa00'}});    
                }
                
            } else {
                
                creep.memory.doingNothing = true;
                
            }
        } else {
            
            funcHarvest(creep)
        }
    }
};

module.exports = roleRepairer;