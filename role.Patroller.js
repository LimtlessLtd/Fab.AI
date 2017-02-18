var rolePatroller = {
  
    /** @param {Creep} creep **/
    run: function(creep) {
        
        
        var hostiles = creep.room.find(FIND_HOSTILE_CREEPS);
        
        if(!creep.memory.patrolling && !creep.memory.defending && creep.carry.energy == creep.carryCapacity)
        {
            creep.memory.patrolling = true
            creep.say('🚓 Patrol')
        }
        
        if(!creep.memory.defending && hostiles.length > 0 && creep.carry.energy == creep.carryCapacity)
        {
            var username = hostiles[0].owner.username;
            Game.notify(`User ${username} spotted in creep.room ${creep.room.roomName}`);
            creep.memory.defending = true
            creep.memory.patrolling = false
            creep.say('🛡 Defending Room')
        }    
            
        if(creep.memory.defending && hostiles.length == 0)
        {
            creep.memory.defending = false
        }
        

        if(creep.memory.defending) {
            
            if (!creep.pos.isNearTo(hostiles[0])) {
                creep.moveTo(hostiles[0], {visualizePathStyle: {stroke: '#db0000'}});
            }else{
                
                creep.attack(hostiles[0])
            }
            
        } else {
            
            if (!creep.pos.isNearTo(Game.flags['PatrollerFlag'])) {
                creep.moveTo(Game.flags['PatrollerFlag']);
            }
            
        }
    }
    
};

module.exports = rolePatroller;