import { Camera } from "../modules/polling-examples/models/camera.model";
import { generateRandomData } from "./data-generator";

export class DataSender {

    private readonly sampleResponses = [
        [],
        generateRandomData(3),
        generateRandomData(4)
    ];

    public getResponse(): Camera[] {
        const randomNumber = Math.floor(Math.random() * this.sampleResponses.length);
        return this.sampleResponses[randomNumber];
    }
}