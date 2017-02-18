var roleHealer = {
  
    /** @param {Creep} creep **/
    run: function(creep) {
        
        var targets = _.filter(Game.creeps, (target) => target.hits < target.hitsMax)
        
        targets.sort(function (a,b) {return (a.hits - b.hits)});

        if(creep.memory.healing && targets.length == 0) {
            
            creep.memory.healing = false;
            creep.say('🚓 Patrol')
            
        }
        
        if(!creep.memory.healing && targets.length > 0) {
            
            creep.memory.healing = true;
            creep.say('🏥 Heal')
            
        }

        if(creep.memory.healing) {
            
            if(targets.length > 0) {
                
                if(creep.heal(targets[0]) == ERR_NOT_IN_RANGE) {
                    
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#00ff20'}});
                    
                }else{
                    creep.heal(targets[0])
                }
            }
            
        } 
        else
        {
            
            if (!creep.pos.isNearTo(Game.flags['PatrollerFlag'])) {
                creep.moveTo(Game.flags['PatrollerFlag']);
            }
                
        }
    }
};

module.exports = roleHealer;