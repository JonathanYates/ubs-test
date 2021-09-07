import { Application } from "../models/ApplicationModels";

const serverUrl = 'http://localhost:8080'

const ApplicationService = {
    getApplicationData: async () : Promise<Application[]> => {
        var response = await fetch(`${serverUrl}/data`);
        return response.json();
    }
}

export default ApplicationService;
