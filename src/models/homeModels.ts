class homdeModels{
    name: string;
    photo: string;
    icon: string;

    constructor(data : {name: string, photo: string, icon: string})
    {
        this.name = data.name;
        this.photo = data.photo;
        this.icon = data.icon;
    }
}

export default homdeModels;