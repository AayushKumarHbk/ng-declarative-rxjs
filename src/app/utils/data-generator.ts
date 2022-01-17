import { v4 as uuidv4 } from 'uuid';
import { Camera } from "../modules/polling-examples/models/camera.model";

export function generateRandomData(dataLength: number): Camera[] {
    const cameras: Camera[] = [];
    for (let dataIndex = 1; dataIndex <= dataLength; dataIndex++) {
        cameras.push(getCameraObject(dataIndex));
    }
    return cameras;
}

function getCameraObject(dataIndex: number): Camera {
    return {
        id: uuidv4(),
        name: `Camera-00${dataIndex}`
    }
}