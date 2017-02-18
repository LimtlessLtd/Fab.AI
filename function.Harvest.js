module.exports = function (creep){
    
            if(creep.memory.currentSource != '' && creep.memory.currentSource != undefined)
            {
            
                if(creep.harvest(Game.getObjectById(creep.memory.currentSource)) == ERR_NOT_IN_RANGE)
                {
            
                    creep.moveTo(Game.getObjectById(creep.memory.currentSource), {visualizePathStyle: {stroke: '#ffffff'}});
                    
                }
                else
                {
                    
                    creep.harvest(Game.getObjectById(creep.memory.currentSource))
                    
                }
                
            }
            else
            {
                
                var sources = creep.room.find(FIND_SOURCES);
                 
                 creep.memory.currentSource = sources[Math.floor(Math.random() * sources.length)].id
                
            }
            
}