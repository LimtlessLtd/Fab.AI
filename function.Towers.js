var runTowers = {

    /** @param {Creep} creep **/
    run: function(myRoom) {
        
            var hostiles = myRoom.find(FIND_HOSTILE_CREEPS);
            
            if(hostiles.length > 0) {
                var username = hostiles[0].owner.username;
                Game.notify(`User ${username} spotted in myRoom ${myRoom.roomName}`);
                var towers = myRoom.find(
                    FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
                towers.forEach(tower => tower.attack(hostiles[0]));
            } else{
                var towers = myRoom.find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
                    
                var repairTargets = myRoom.find(FIND_STRUCTURES, {
                       filter: (structure) => {
                            return (structure.structureType == STRUCTURE_ROAD ||
                            structure.structureType == STRUCTURE_CONTAINER ||
                            structure.structureType == STRUCTURE_RAMPART ||
                            (structure.structureType == STRUCTURE_WALL && structure.hits < 1000000)) && structure.hits < (structure.hitsMax - 500);
                         }
                     });
                
                repairTargets.sort(function (a,b) {return (a.hits - b.hits)});
                
                if (repairTargets.length > 0){
                    towers.forEach(tower => tower.repair(repairTargets[0]));
                }
            }
        }
}

module.exports = runTowers;