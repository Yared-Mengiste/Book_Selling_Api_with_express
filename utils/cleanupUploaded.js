import fs from "fs/promises";

const cleanupUploaded = async (file) => {
    if (!file || !file.path) return;

    try {
        await fs.unlink(file.path);
    } catch (err) {
        console.log(err.message);
    }
}

export default cleanupUploaded;