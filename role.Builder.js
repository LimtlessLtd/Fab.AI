var funcHarvest = require('function.Harvest')

var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false
            creep.say('🔄 harvest')
        }
        
        if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
            creep.memory.building = true
            creep.say('🚧 build')
        }

        if(creep.memory.building) {
            
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
                
                
            if(!creep.room.find(FIND_CONSTRUCTION_SITES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION);
                }})
            )
                targets = creep.room.find(FIND_CONSTRUCTION_SITES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION);
                }})
            
            if(targets.length) {
                targets.sort(function(a,b){return a.progress > b.progress ? -1 : 1});
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {reusePath: 10});
                }
            } else {
                creep.memory.doingNothing = true;
            }
        }
        else {
            funcHarvest(creep)
        }
        
    }
};

module.exports = roleBuilder;