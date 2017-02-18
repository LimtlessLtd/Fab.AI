var roleHarvester = require('role.Harvester')
var roleUpgrader = require('role.Upgrader')
var roleBuilder = require('role.Builder')
var roleRepairer = require('role.Repairer')
var roleHealer = require('role.Healer')
var rolePatroller = require('role.Patroller')
var runTowers = require('function.Towers')

var reporter = require('function.Report')
var creepCreator = require('function.CreateCreep')

var SpawnRooms = ['W8N3']
var SpawnRoomRoles = [
    {role: "harvester", desiredNo: 5},{role: "patroller", desiredNo: 0}, {role: "upgrader", desiredNo: 6},
    {role: "builder", desiredNo: 4}, {role: "repairer", desiredNo: 2}, {role: "healer", desiredNo: 0}, {role: "miner", desiredNo: 0}
]

module.exports.loop = function() {
    
    //---Memory clearing---//
    for (var name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name]
            console.log('Clearing non-existing creep memory:', name)
        }
    }
    //---Memory clearing---//
    
    for(var roomInt in Game.rooms)
    {
        
        var myRoom = Game.rooms[roomInt]
        
        var spawns = myRoom.find(FIND_MY_STRUCTURES, {filter: (s) => s.structureType == STRUCTURE_SPAWN});
        
        if(myRoom.find(FIND_CONSTRUCTION_SITES).length == 0)
        {
            SpawnRoomRoles[3] = 0
        }
        
        if(Game.time % 5 ===  0){
            reporter(SpawnRoomRoles)
        }
        
        for (var spawnInt in spawns)
        {
            var mySpawn = spawns[spawnInt]
            if (mySpawn.spawning) {
                
                var spawningCreep = Game.creeps[mySpawn.spawning.name]
                
                mySpawn.room.visual.text(
                    '🛠️' + spawningCreep.memory.role,
                    mySpawn.pos.x + 1,
                    mySpawn.pos.y, {
                        align: 'left',
                        opacity: 0.8
                    })
            }
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
                    
                    for (var x in SpawnRoomRoles)
                    {
                        
                        if(!roleReAssigned){
                            var noOfRolesAlready = _.filter(Game.creeps, (localcreep) => localcreep.memory.role == SpawnRoomRoles[x].role.toString())
                            
                            if (noOfRolesAlready.length < SpawnRoomRoles[x].desiredNo) {
                                creep.memory.role = SpawnRoomRoles[x].role.toString()
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
            
            creepCreator(SpawnRoomRoles)
            
        }
        
        runTowers.run(myRoom)
    }
}