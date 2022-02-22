import pLimit from 'p-limit';
import fs from 'fs/promises';
import glob from 'glob';

const limit = pLimit(100);

const IPFSPath = process.argv[2];
if(!IPFSPath) {
    throw new Error('IPFS path not provided');
}

async function updateMetadata(filepath: string) {
    const data = await fs.readFile(filepath);
    const metadata = JSON.parse(data.toString());
    metadata.image = `https://gateway.pinata.cloud/ipfs/${IPFSPath}/${metadata.id}.png`;

    await fs.writeFile(filepath, JSON.stringify(metadata, null, 2));
}

async function bootstrap() {
    glob(__dirname + '/out/metadata/*.json', async (err, files) => {
        await Promise.all(
            files.map(filepath => 
                limit(updateMetadata, filepath)
            )
        )
    })
}

bootstrap();