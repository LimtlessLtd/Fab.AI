var roleHarvester = require('role.Harvester')
var roleUpgrader = require('role.Upgrader')
var roleBuilder = require('role.Builder')
var roleRepairer = require('role.Repairer')
var roleHealer = require('role.Healer')
var rolePatroller = require('role.Patroller')

var reporter = require('function.Report')
var creepCreator = require('function.CreateCreep')

module.exports.loop = function() {
    
    //---Memory clearing---//
    for (var name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name]
            console.log('Clearing non-existing creep memory:', name)
        }
    }
    //---Memory clearing---//
    
    var rolesInUse = ["harvester", "patroller", "upgrader", "builder", "repairer", "healer", 'miner']
    var desiredNo = [5, 0, 6, 5, 4, 0, 0]
    var myRoom = Game.spawns['Spawn1'].room
    
    if(myRoom.find(FIND_CONSTRUCTION_SITES).length == 0)
    {
        desiredNo[3] = 0
    }
    
    if(Game.time % 5 ===  0){
        reporter(rolesInUse)
    }
    
    if (Game.spawns['Spawn1'].spawning) {
        var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name]
        myRoom.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1,
            Game.spawns['Spawn1'].pos.y, {
                align: 'left',
                opacity: 0.8
            })
    }

    for (var name in Game.creeps) {
        var creep = Game.creeps[name]
        
        switch(creep.memory.role) {
            case 'harvester':
                
                roleHarvester.run(creep)
                
                break;
            case 'upgrader':
                
                roleUpgrader.run(creep)
                
                break;
            case 'builder':
                
                roleBuilder.run(creep)
                
                break;
            case 'repairer':
                
                roleRepairer.run(creep)
                
                break;
            case 'healer':
                
                roleHealer.run(creep)
                
                break;
            case 'patroller':
                
                rolePatroller.run(creep)
                
                break;
            default:
            
            if(creep.memory.doingNothing)
            {
                var roleReAssigned = false
                for (var x in rolesInUse) {
                    
                    if(!roleReAssigned){
                        var noOfRolesAlready = _.filter(Game.creeps, (localcreep) => localcreep.memory.role == rolesInUse[x].toString())
                        
                        if (noOfRolesAlready.length < desiredNo[x]) {
                            creep.memory.role = rolesInUse[x]
                            creep.memory.doingNothing = false
                            roleReAssigned = true
                        }
                    }
                }
                if(!roleReAssigned)
                    creep.memory.role = 'harvester'
            }   
        }
    }
    
    if(Game.spawns['Spawn1'].canCreateCreep([WORK, CARRY, MOVE]) === OK){
        
        creepCreator(rolesInUse, desiredNo)
        
    }
    
    runTowers(myRoom)
    
    function runTowers(myRoom){
        
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