module.exports = function (rolesRequired, desiredNo){
    
    var body = getBestWorkerBody()
    
    for (var x in rolesRequired) {
        
        if(Game.spawns['Spawn1'].canCreateCreep(body) === OK && !Game.spawns['Spawn1'].spawning){
            
            var noOfRolesAlready = _.filter(Game.creeps, (creep) => creep.memory.role == rolesRequired[x].toString())
            
            if (noOfRolesAlready.length < desiredNo[x]) {
                
                if(rolesRequired[x].toString() == 'healer')
                {
                    
                    var bestHealerBody = getBestMilitaryBody(body.length, 'healer')
                    
                    bestHealerBody.splice(bestHealerBody.length, 1);
                    bestHealerBody.push(HEAL)
                    
                    if(Game.spawns['Spawn1'].canCreateCreep(bestHealerBody) === OK)
                    {
                        
                        body = bestHealerBody
                        
                    }else {
                        
                        body = [MOVE, HEAL, HEAL]
                        
                    }
                    
                }
                else if(rolesRequired[x].toString() == 'patroller')
                {
                    
                    var bestPatrollerBody = getBestMilitaryBody(body.length, 'patroller')
                    
                    bestPatrollerBody.splice(bestPatrollerBody.length, 1);
                    bestPatrollerBody.push(ATTACK)
                    
                    if(Game.spawns['Spawn1'].canCreateCreep(bestPatrollerBody) === OK)
                    {
                        
                        body = bestPatrollerBody
                        
                    }else {
                        
                        body = [MOVE, MOVE, ATTACK]
                        
                    }
                    
                }
                
                var newName
                newName = Game.spawns['Spawn1'].createCreep(body, undefined,{
                    role: rolesRequired[x].toString()
                })
                
                console.log('Spawning new ' + rolesRequired[x].toString() + ': ' + newName + ' || With a body of : ' + body)
                
                return
            }
            
        }
        else if (!Game.spawns['Spawn1'].canCreateCreep(body) === OK)
        {
            
            body = getBestWorkerBody()
            
        }
        
    }
    
    function getBestMilitaryBody(bodyPartLimit, role){
        
        bodyPartLimit = bodyPartLimit - 3
                
        switch(role) {
            case 'patroller':
                
                if(bodyPartLimit > 0)
                {
                    if (Game.spawns['Spawn1'].canCreateCreep([MOVE, MOVE, MOVE, MOVE, ATTACK, ATTACK, ATTACK, ATTACK]) === OK){
                         return [MOVE, MOVE, MOVE, MOVE, ATTACK,  ATTACK, ATTACK, ATTACK]
                     } else if (Game.spawns['Spawn1'].canCreateCreep([MOVE, MOVE, MOVE, MOVE, ATTACK,  ATTACK, ATTACK]) === OK){
                         return [MOVE, MOVE, MOVE, MOVE, ATTACK,  ATTACK, ATTACK]
                     } else if (Game.spawns['Spawn1'].canCreateCreep([MOVE, MOVE, MOVE, ATTACK,  ATTACK, ATTACK]) === OK){
                         return [MOVE, MOVE, MOVE, ATTACK,  ATTACK, ATTACK]
                     } else if (Game.spawns['Spawn1'].canCreateCreep([MOVE, MOVE, ATTACK,  ATTACK, ATTACK]) === OK){
                         return [MOVE, MOVE, ATTACK,  ATTACK, ATTACK]
                     } else if (Game.spawns['Spawn1'].canCreateCreep([MOVE, MOVE, ATTACK, ATTACK]) === OK){
                         return [MOVE, MOVE, ATTACK, ATTACK]
                     }
                }
                
                return [MOVE, MOVE, ATTACK]
                
                break;
            case 'healer':
                
                if(bodyPartLimit > 0)
                {
                    if (Game.spawns['Spawn1'].canCreateCreep([MOVE, MOVE, MOVE, HEAL, HEAL, HEAL, HEAL, HEAL]) === OK){
                         return [MOVE, MOVE, MOVE, HEAL, HEAL, HEAL, HEAL, HEAL]
                     } else if (Game.spawns['Spawn1'].canCreateCreep([MOVE, MOVE, HEAL, HEAL, HEAL, HEAL, HEAL]) === OK){
                         return [MOVE, MOVE, HEAL, HEAL, HEAL, HEAL, HEAL]
                     } else if (Game.spawns['Spawn1'].canCreateCreep([MOVE, MOVE, HEAL, HEAL, HEAL, HEAL]) === OK){
                         return [MOVE, MOVE, HEAL, HEAL, HEAL, HEAL]
                     } else if (Game.spawns['Spawn1'].canCreateCreep([MOVE, MOVE, HEAL, HEAL, HEAL]) === OK){
                         return [MOVE, MOVE, HEAL, HEAL, HEAL]
                     } else if (Game.spawns['Spawn1'].canCreateCreep([MOVE, MOVE, HEAL, HEAL]) === OK){
                         return [MOVE, MOVE, HEAL, HEAL]
                     }
                }
                
                return [MOVE, HEAL, HEAL]
                
                break;
                default:
                
        }
                
        return body
        
    }
    
    function getBestWorkerBody(){
        
         if (Game.spawns['Spawn1'].canCreateCreep([WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE]) === OK){
             return [WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE]
         } else if (Game.spawns['Spawn1'].canCreateCreep([WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE]) === OK){
             return [WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE]
         } else if (Game.spawns['Spawn1'].canCreateCreep([WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE]) === OK){
             return [WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE]
         } else if (Game.spawns['Spawn1'].canCreateCreep([WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE]) === OK){
             return [WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE]
         } else if (Game.spawns['Spawn1'].canCreateCreep([WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE]) === OK){
             return [WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE]
         } else if (Game.spawns['Spawn1'].canCreateCreep([WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE]) === OK){
             return [WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE]
         } else if (Game.spawns['Spawn1'].canCreateCreep([WORK, WORK, CARRY, CARRY, MOVE, MOVE]) === OK){
             return [WORK, WORK, CARRY, CARRY, MOVE, MOVE]
         } else if (Game.spawns['Spawn1'].canCreateCreep([WORK, WORK, CARRY, MOVE, MOVE]) === OK){
             return [WORK, WORK, CARRY, MOVE, MOVE]
         } else if (Game.spawns['Spawn1'].canCreateCreep([WORK, CARRY, MOVE, MOVE]) === OK){
             return [WORK, CARRY, MOVE, MOVE]
         }
        
        return [WORK, CARRY, MOVE]
    }
    
}