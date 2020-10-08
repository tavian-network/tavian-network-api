const express = require('express')
const app = express()
require('dotenv').config()
const reachable = require('is-port-reachable')

app.listen(process.env.port, () => {
    console.log(process.env.name) })

app.get('/', (request, response) => {
    response.json(process.env.name) })

app.get('/online/web-service/:name', async (request, response) => {
    const { name } = request.params

    switch (name) {
        case 'protection':
            const protection = await online(process.env.protection_port, process.env.protection)
            response.json(protection)
        break

        case 'website':
            const website = await online(process.env.website_port, process.env.website)
            response.json(website)
        break

        case 'monitoring':
            const monitoring = await online(process.env.monitoring_port, process.env.monitoring)
            response.json(monitoring)
        break
    }
})

app.get('/online/game-service/:name', async (request, response) => {
    const { name } = request.params

    switch (name) {
        case 'minecraft-vanilla':
            const minecraft_vanilla = await online(process.env.minecraft_vanilla_port, process.env.minecraft_vanilla)
            response.json(minecraft_vanilla)
        break

        case 'ark-survival-evolved':
            const ark_survival_evolved = await online(process.env.ark_survival_evolved_port, process.env.ark_survival_evolved)
            response.json(ark_survival_evolved)
        break

        case 'minecraft-modded':
            const minecraft_modded = await online(process.env.minecraft_modded_port, process.env.minecraft_modded)
            response.json(minecraft_modded)
        break

        case 'space-engineers':
            const space_engineers = await online(process.env.space_engineers_port, process.env.space_engineers)
            response.json(space_engineers)
        break
    }
})

async function online(port, ip) {
    if (await reachable(port, { host: ip })) { return 'online' } else { return 'offline' }
}