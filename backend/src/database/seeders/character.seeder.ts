const axios = require('axios');

import { sequelizeConfig } from "../config";
import { Character } from "../models/Character.model";

require('dotenv').config();

const seedCharacters = async () => {
    try {
        await sequelizeConfig.authenticate();

        console.log('Starting database seeding...');

        const rickMortyAPI = process.env.RICK_MORTY_API || 'https://rickandmortyapi.com/api';
        const response = await axios.get(`${rickMortyAPI}/character`);

        const charactersData = response.data.results.slice(0, 15);

        const charactersToInsert = charactersData.map((char: any) => ({
            id: char.id,
            name: char.name,
            status: char.status,
            species: char.species,
            gender: char.gender,
            origin: char.origin.name,
            image: char.image
        }));

        const result = await Character.bulkCreate(charactersToInsert, {
            updateOnDuplicate: ['name', 'status', 'species', 'gender', 'origin', 'location', 'image']
        });

        console.log(`Successfully seeded ${result.length} characters`);

        charactersToInsert.forEach((char: any, index: number) => {
            console.log(`${index + 1}. ${char.name} (${char.species}) - ${char.status}`);
        });

        process.exit(0);
    } catch (error: any) {
        console.error('Error seeding database:', error.message);
        process.exit(1);
    }
};

seedCharacters();