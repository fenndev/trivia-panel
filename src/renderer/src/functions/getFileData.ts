import type FileData from '../../../shared/interfaces/FileData';

export default async function getFileData(file: File): Promise<FileData> {
    return {
        filename: file.name,
        extension: file.name.slice(file.name.lastIndexOf('.') + 1),
        buffer: await file.arrayBuffer(),
    };
}
